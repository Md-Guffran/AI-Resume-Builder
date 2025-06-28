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

interface CreativeTemplateProps {
  data: ResumeData
  className?: string
}

export function CreativeTemplate({ data, className = "" }: CreativeTemplateProps) {
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
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gradient-to-b from-purple-600 to-purple-800 text-white p-6">
          <div className="space-y-6">
            {/* Profile */}
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">
                  {data.personalInfo.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <h1 className="text-xl font-bold mb-2">{data.personalInfo.fullName}</h1>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Contact</h3>
              <div className="space-y-2 text-sm">
                {data.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    <span className="text-xs">{data.personalInfo.email}</span>
                  </div>
                )}
                {data.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span className="text-xs">{data.personalInfo.phone}</span>
                  </div>
                )}
                {data.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span className="text-xs">{data.personalInfo.location}</span>
                  </div>
                )}
                {data.personalInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <Linkedin className="h-3 w-3" />
                    <span className="text-xs">{data.personalInfo.linkedin}</span>
                  </div>
                )}
                {data.personalInfo.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-3 w-3" />
                    <span className="text-xs">{data.personalInfo.website}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Skills</h3>
              <div className="space-y-3">
                {technicalSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-purple-200">Technical</h4>
                    <div className="space-y-1">
                      {technicalSkills.slice(0, 6).map((skill, i) => (
                        <div key={i} className="text-xs">
                          <div className="flex justify-between mb-1">
                            <span>{skill}</span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <div
                              className="bg-white rounded-full h-1"
                              style={{ width: `${85 + Math.random() * 15}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {softSkills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-purple-200">Soft Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {softSkills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="text-xs bg-white/20 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {languages.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold mb-2 text-purple-200">Languages</h4>
                    <div className="space-y-1">
                      {languages.map((lang, i) => (
                        <div key={i} className="text-xs">
                          {lang}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Education */}
            {Array.isArray(data.education) && data.education.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Education</h3>
                <div className="text-xs space-y-2">
                  {data.education.map((edu, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="font-semibold">{edu.degree}</div>
                      <div className="text-purple-200">{edu.school}</div>
                      <div className="text-purple-200">{edu.graduationYear}</div>
                      {edu.gpa && <div className="text-purple-200">GPA: {edu.gpa}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra Curricular Activities */}
            {data.extraCurricular && data.extraCurricular.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Extra Curricular</h3>
                <ul className="list-disc ml-4 text-xs space-y-1">
                  {data.extraCurricular.map((act, idx) => (
                    <li key={idx}>{act}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {data.achievements && data.achievements.length > 0 && (
              <div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-wide">Achievements</h3>
                <ul className="list-disc ml-4 text-xs space-y-1">
                  {data.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6 space-y-6">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section>
              <h2 className="text-lg font-bold text-purple-800 mb-3 relative">
                ABOUT ME
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-purple-600"></div>
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-800 mb-4 relative">
                EXPERIENCE
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-purple-600"></div>
              </h2>
              <div className="space-y-4">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-purple-600 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-purple-200"></div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{exp.position}</h3>
                        <p className="text-purple-600 font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </div>
                    </div>
                    {exp.description && (
                      <div className="text-gray-700 text-xs leading-relaxed">
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

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-purple-800 mb-4 relative">
                PROJECTS
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-purple-600"></div>
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border-l-2 border-purple-200 pl-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-sm">{project.title}</h3>
                      {project.link && (
                        <a href={project.link} className="text-purple-600 text-xs hover:underline">
                          View
                        </a>
                      )}
                    </div>
                    <p className="text-gray-700 text-xs mb-2 leading-relaxed">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies
                          .split(",")
                          .slice(0, 4)
                          .map((tech, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs px-2 py-0 border-purple-300 text-purple-700"
                            >
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
        </div>
      </div>
    </div>
  )
}
