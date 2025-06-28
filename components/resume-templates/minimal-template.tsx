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

interface MinimalTemplateProps {
  data: ResumeData
  className?: string
}

export function MinimalTemplate({ data, className = "" }: MinimalTemplateProps) {
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
      <div className="p-12 space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-light text-gray-900 tracking-wide">{data.personalInfo.fullName}</h1>
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
            {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
          </div>
          <div className="w-16 h-px bg-gray-300 mx-auto"></div>
        </header>

        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{data.personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">EXPERIENCE</h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                  <p className="text-gray-600 mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
                      {exp.description.split("\n").map((line, i) => (
                        <p key={i} className="mb-2">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                  {index < data.experience.length - 1 && <div className="w-8 h-px bg-gray-200 mx-auto mt-6"></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">EDUCATION</h2>
            <div className="space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx} className="text-center">
                  <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 mb-1">{edu.school}</p>
                  <p className="text-sm text-gray-500">
                    {edu.graduationYear}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                  {idx < data.education.length - 1 && <div className="w-8 h-px bg-gray-200 mx-auto mt-4"></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">PROJECTS</h2>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center items-center gap-4 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                    {project.link && (
                      <a href={project.link} className="text-gray-600 text-sm hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto mb-2">{project.description}</p>
                  {project.technologies && <p className="text-sm text-gray-500">{project.technologies}</p>}
                  {index < data.projects.length - 1 && <div className="w-8 h-px bg-gray-200 mx-auto mt-6"></div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">SKILLS</h2>
          <div className="text-center space-y-4">
            {technicalSkills.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Technical</h4>
                <p className="text-gray-700 text-sm">{technicalSkills.join(" • ")}</p>
              </div>
            )}
            {softSkills.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Soft Skills</h4>
                <p className="text-gray-700 text-sm">{softSkills.join(" • ")}</p>
              </div>
            )}
            {languages.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                <p className="text-gray-700 text-sm">{languages.join(" • ")}</p>
              </div>
            )}
          </div>
        </section>

        {/* Extra Curricular Activities */}
        {data.extraCurricular && data.extraCurricular.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">EXTRA CURRICULAR</h2>
            <ul className="list-disc list-inside text-gray-700 text-center space-y-1">
              {data.extraCurricular.map((act, idx) => (
                <li key={idx}>{act}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <section>
            <h2 className="text-xl font-light text-gray-900 mb-6 text-center tracking-wide">ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-gray-700 text-center space-y-1">
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
