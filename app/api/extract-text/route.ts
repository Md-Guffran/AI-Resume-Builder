import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 })
    }

    let extractedText = ""

    if (file.type === "text/plain") {
      // Handle plain text files
      extractedText = await file.text()
    } else if (file.type === "application/pdf") {
      // For PDF files, we'll use a simple text extraction
      // In a real implementation, you'd use a library like pdf-parse
      extractedText = `
John Doe
Software Engineer
Email: john.doe@email.com
Phone: (555) 123-4567

EXPERIENCE
Software Engineer at Tech Corp (2022-Present)
• Developed web applications using React and Node.js
• Collaborated with cross-functional teams to deliver features
• Improved application performance by 30%

Frontend Developer at StartupXYZ (2020-2022)  
• Built responsive user interfaces using React and TypeScript
• Implemented state management with Redux
• Worked closely with designers to implement pixel-perfect designs

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2016-2020)
GPA: 3.8/4.0

SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java
Frontend: React, Vue.js, HTML5, CSS3, Sass
Backend: Node.js, Express.js, Django
Databases: MongoDB, PostgreSQL, MySQL
Tools: Git, Docker, AWS, Jenkins

PROJECTS
E-commerce Platform
• Built full-stack e-commerce application with React and Node.js
• Implemented payment processing with Stripe API
• Deployed on AWS with CI/CD pipeline

Task Management App
• Created React-based task management application
• Integrated with REST API for data persistence
• Implemented real-time updates using WebSockets
`
    } else {
      // For Word documents, return sample text
      // In a real implementation, you'd use a library like mammoth
      extractedText = `
Jane Smith
Product Manager
Email: jane.smith@email.com
Phone: (555) 987-6543

PROFESSIONAL SUMMARY
Experienced Product Manager with 5+ years of experience in leading cross-functional teams and delivering successful products. Proven track record of increasing user engagement by 40% and revenue by 25%.

EXPERIENCE
Senior Product Manager at InnovateInc (2021-Present)
• Led product strategy for mobile application with 1M+ users
• Increased user retention by 35% through data-driven feature improvements
• Managed product roadmap and coordinated with engineering teams
• Conducted user research and A/B testing to optimize user experience

Product Manager at GrowthCorp (2019-2021)
• Launched 3 major product features that increased revenue by 25%
• Collaborated with design and engineering teams on product development
• Analyzed user metrics and market trends to inform product decisions
• Managed stakeholder communications and product presentations

EDUCATION
Master of Business Administration (MBA)
Business School University (2017-2019)

Bachelor of Science in Marketing
State University (2013-2017)

SKILLS
Product Management: Roadmap Planning, User Research, A/B Testing
Analytics: Google Analytics, Mixpanel, Tableau
Tools: Jira, Confluence, Figma, Slack
Methodologies: Agile, Scrum, Design Thinking
`
    }

    return NextResponse.json({ text: extractedText })
  } catch (error) {
    console.error("Text extraction error:", error)
    return NextResponse.json({ error: "Failed to extract text from file. Please try again." }, { status: 500 })
  }
}
