import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Server configuration error: OPENAI_API_KEY is missing." }, { status: 500 })
  }

  try {
    const { section, userInput, jobDescription } = await request.json()

    if (!section || !userInput) {
      return NextResponse.json({ error: "Section and user input are required" }, { status: 400 })
    }

    let prompt = ""

    switch (section) {
      case "summary":
        prompt = `
Create a professional resume summary based on this information:
${userInput}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Write a compelling 2-3 sentence professional summary that highlights key strengths and career objectives. Make it ATS-friendly and impactful.
`
        break

      case "experience":
        prompt = `
Transform this work experience into professional resume bullet points:
${userInput}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Create 3-5 strong bullet points that:
1. Start with action verbs
2. Include quantifiable achievements where possible
3. Highlight relevant skills and technologies
4. Are ATS-optimized
5. Show impact and results

Format as bullet points with • symbol.
`
        break

      case "skills":
        prompt = `
Organize and optimize these skills for a resume:
${userInput}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Categorize skills into relevant groups (e.g., Programming Languages, Frameworks, Tools, etc.) and present them in a clean, ATS-friendly format. Prioritize skills most relevant to the target role.
`
        break

      case "projects":
        prompt = `
Write a professional project description based on:
${userInput}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Create a concise project description that includes:
1. Project title and brief overview
2. Technologies used
3. Key features or achievements
4. Your specific role and contributions
5. Quantifiable results if applicable

Keep it professional and relevant to the target role.
`
        break

      default:
        prompt = `
Improve this resume content for the ${section} section:
${userInput}

${jobDescription ? `Target job description: ${jobDescription}` : ""}

Make it more professional, ATS-friendly, and impactful while maintaining accuracy.
`
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.3,
      maxTokens: 800,
    })

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error("Content generation error:", error)
    return NextResponse.json({ content: "Unable to generate AI content at this time. Please try again later." })
  }
}
