import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react"

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

interface ModernTemplateProps {
  data: ResumeData
  className?: string
}

export function ModernTemplate({ data, className = "" }: ModernTemplateProps) {
  const technicalSkills = data.skills.technical
    ? data.skills.technical.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const softSkills = data.skills.soft
    ? data.skills.soft.split(",").map((s) => s.trim()).filter(Boolean)
    : []
  const languages = data.skills.languages
    ? data.skills.languages.split(",").map((s) => s.trim()).filter(Boolean)
    : []

  return (
    <div className={`bg-white text-black min-h-[297mm] w-[210mm] mx-auto shadow-lg ${className}`}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              <span>{data.personalInfo.linkedin}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              <span>{data.personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed">
                      {exp.description.split("\n").map((line, i) => (
                        <p key={i} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">EDUCATION</h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-sm text-gray-600">{edu.graduationYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">PROJECTS</h2>
            <div className="space-y-3">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} className="text-blue-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.split(",").map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {technicalSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {technicalSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {softSkills.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Soft Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {softSkills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {languages.map((lang, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Extra Curricular Activities */}
        {data.extraCurricular && data.extraCurricular.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">EXTRA CURRICULAR</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
              {data.extraCurricular.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-blue-800 mb-3 border-b-2 border-blue-200 pb-1">ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1 pl-4">
              {data.achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}
