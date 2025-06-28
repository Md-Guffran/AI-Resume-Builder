import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Server configuration error: OPENAI_API_KEY is missing." }, { status: 500 })
  }

  try {
    const { resumeText, jobDescription, improvementType } = await request.json()

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    let prompt = ""

    switch (improvementType) {
      case "keywords":
        prompt = `
Analyze this resume and suggest keyword improvements for better ATS compatibility:

${jobDescription ? `Target Job Description:\n${jobDescription}\n\n` : ""}

Resume:
${resumeText}

Provide specific keyword suggestions and where to incorporate them. Focus on:
1. Industry-specific terms
2. Technical skills
3. Action verbs
4. Certifications and qualifications

Return suggestions in a clear, actionable format.
`
        break

      case "grammar":
        prompt = `
Review this resume for grammar, spelling, and writing improvements:

Resume:
${resumeText}

Identify and suggest fixes for:
1. Grammar errors
2. Spelling mistakes
3. Awkward phrasing
4. Inconsistent formatting
5. Unclear statements

Provide specific corrections with explanations.
`
        break

      case "structure":
        prompt = `
Analyze the structure and organization of this resume:

Resume:
${resumeText}

Suggest improvements for:
1. Section organization
2. Information hierarchy
3. Bullet point effectiveness
4. Overall flow and readability
5. Professional formatting

Provide specific structural recommendations.
`
        break

      default:
        prompt = `
Provide comprehensive improvement suggestions for this resume:

${jobDescription ? `Target Job Description:\n${jobDescription}\n\n` : ""}

Resume:
${resumeText}

Suggest improvements across all areas: keywords, grammar, structure, content, and formatting.
`
    }

    const { text } = await generateText({
      model: openai("gpt-4o", { apiKey: process.env.OPENAI_API_KEY }),
      prompt,
      temperature: 0.3,
      maxTokens: 1000,
    })

    return NextResponse.json({ suggestions: text })
  } catch (error) {
    console.error("Resume improvement error:", error)
    return NextResponse.json(
      { suggestions: "Unable to generate AI suggestions at this time. Please try again later." },
      { status: 200 },
    )
  }
}
