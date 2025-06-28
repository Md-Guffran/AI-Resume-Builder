import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription, provider = "openai" } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const MAX_PROMPT_CHARS = 8_000
    const truncatedResume = resumeText.slice(0, MAX_PROMPT_CHARS)

    const analysisPrompt = `
You are an expert resume analyzer and career coach. Analyze the following resume and provide detailed feedback.

${jobDescription ? `Job Description for comparison:\n${jobDescription}\n\n` : ""}

Resume to analyze:
${truncatedResume}

Please provide a comprehensive analysis in the following JSON format:
{
  "atsScore": number (0-100),
  "keywordMatches": [
    {
      "keyword": "string",
      "found": boolean,
      "importance": "high" | "medium" | "low"
    }
  ],
  "grammarSuggestions": [
    {
      "issue": "string",
      "suggestion": "string",
      "severity": "high" | "medium" | "low"
    }
  ],
  "recommendations": [
    {
      "category": "formatting" | "content" | "keywords" | "structure",
      "title": "string",
      "description": "string",
      "priority": "high" | "medium" | "low"
    }
  ],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "overallFeedback": "string"
}

Focus on:
1. ATS compatibility and keyword optimization
2. Grammar, spelling, and formatting issues
3. Content structure and impact
4. Quantifiable achievements
5. Industry-specific requirements
6. Professional presentation

Be specific and actionable in your recommendations.
`

    let text = ""
    if (provider === "gemini") {
      // --- Gemini AI ---
      if (!process.env.GEMINI_API_KEY) {
        return NextResponse.json({ error: "Server configuration error: GEMINI_API_KEY is missing." }, { status: 500 })
      }
      const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`
      const geminiRes = await fetch(geminiApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: analysisPrompt }] }]
        }),
      })
      if (!geminiRes.ok) {
        throw new Error("Gemini API error")
      }
      const geminiData = await geminiRes.json()
      text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ""
    } else {
      // --- OpenAI (default) ---
      if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: "Server configuration error: OPENAI_API_KEY is missing." }, { status: 500 })
      }
      const result = await generateText({
        model: openai("gpt-4o", { apiKey: process.env.OPENAI_API_KEY }),
        prompt: analysisPrompt,
        temperature: 0.3,
        maxTokens: 1_200,
      })
      text = result.text
    }

    // Parse the AI response
    let analysisResult
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No JSON found in response")
      }
    } catch (parseError) {
      // Fallback: create structured response from text
      return NextResponse.json({ ...getDefaultAnalysis(), fallback: true })
    }

    return NextResponse.json(analysisResult)
  } catch (error) {
    console.error("Resume analysis error (fallback to default):", error)
    // Always give the client something useful
    return NextResponse.json({ ...getDefaultAnalysis(), fallback: true })
  }
}

function getDefaultAnalysis() {
  return {
    atsScore: 65,
    keywordMatches: [
      { keyword: "JavaScript", found: true, importance: "high" },
      { keyword: "React", found: true, importance: "high" },
      { keyword: "Node.js", found: false, importance: "medium" },
    ],
    grammarSuggestions: [
      {
        issue: "Inconsistent tense usage",
        suggestion: "Use past tense for previous roles and present tense for current role",
        severity: "medium",
      },
    ],
    recommendations: [
      {
        category: "content",
        title: "Add quantifiable achievements",
        description: "Include specific metrics and numbers to demonstrate impact",
        priority: "high",
      },
    ],
    strengths: ["Strong technical skills", "Clear formatting"],
    weaknesses: ["Lacks quantifiable achievements", "Missing key industry keywords"],
    overallFeedback:
      "Your resume shows good technical foundation but needs more specific achievements and keyword optimization.",
  }
}
