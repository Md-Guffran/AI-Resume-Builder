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

interface ProfessionalTemplateProps {
  data: ResumeData
  className?: string
}

export function ProfessionalTemplate({ data, className = "" }: ProfessionalTemplateProps) {
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
      <div className="p-8 space-y-6">
        {/* Header */}
        <header className="text-center border-b-2 border-gray-300 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.personalInfo.fullName}</h1>
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
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
        </header>

        {/* Professional Summary */}
        {data.personalInfo.summary && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wide">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed text-justify">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Professional Experience</h2>
            <div className="space-y-5">
              {data.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
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
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="border-l-4 border-gray-300 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-700 font-medium">{edu.school}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{edu.graduationYear}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-base font-bold text-gray-900">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} className="text-gray-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm mb-2 leading-relaxed">{project.description}</p>
                  {project.technologies && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Technologies:</span> {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
          <div className="space-y-3">
            {technicalSkills.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Technical Skills:</h4>
                <p className="text-gray-700 text-sm">{technicalSkills.join(" • ")}</p>
              </div>
            )}
            {softSkills.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Soft Skills:</h4>
                <p className="text-gray-700 text-sm">{softSkills.join(" • ")}</p>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Languages:</h4>
                <p className="text-gray-700 text-sm">{languages.join(" • ")}</p>
              </div>
            )}
          </div>
        </section>

        {/* Extra Curricular Activities */}
        {data.extraCurricular && data.extraCurricular.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Extra Curricular</h2>
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
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wide">Achievements</h2>
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
