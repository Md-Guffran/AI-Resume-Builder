import { ModernTemplate } from "./modern-template"
import { ProfessionalTemplate } from "./professional-template"
import { CreativeTemplate } from "./creative-template"
import { MinimalTemplate } from "./minimal-template"

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    website: string
    summary: string
  }
  education: {
    degree: string
    school: string
    graduationYear: string
    gpa: string
  }[]
  experience: {
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }[]
  projects: {
    title: string
    description: string
    technologies: string
    link: string
  }[]
  skills: {
    technical: string
    soft: string
    languages: string
  }
  extraCurricular?: string[]
  achievements?: string[]
}

interface TemplateSelectorProps {
  template: string
  data: ResumeData
  className?: string
}

export function TemplateSelector({ template, data, className }: TemplateSelectorProps) {
  switch (template.toLowerCase()) {
    case "modern":
      return <ModernTemplate data={data} className={className} />
    case "professional":
      return <ProfessionalTemplate data={data} className={className} />
    case "creative":
      return <CreativeTemplate data={data} className={className} />
    case "minimal":
      return <MinimalTemplate data={data} className={className} />
    default:
      return <ModernTemplate data={data} className={className} />
  }
}

export const templatePreviews = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean design with blue accents and modern layout",
    preview: "/placeholder.svg?height=300&width=200&text=Modern",
    features: ["Gradient header", "Badge skills", "Clean sections"],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional format perfect for corporate roles",
    preview: "/placeholder.svg?height=300&width=200&text=Professional",
    features: ["Classic layout", "Border accents", "Formal styling"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Eye-catching design with sidebar and visual elements",
    preview: "/placeholder.svg?height=300&width=200&text=Creative",
    features: ["Sidebar layout", "Skill bars", "Purple theme"],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with plenty of white space",
    preview: "/placeholder.svg?height=300&width=200&text=Minimal",
    features: ["Clean typography", "Centered layout", "Minimal design"],
  },
]
