import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "Universidad Nacional de Rio Cuarto",
    degree: "Telecommunications Engineering, Radiocommunications",
    period: "2004 - 2014",
  },
  {
    institution: "Colegio Universitario IES",
    degree: "Administración de Empresas de Diseño Multimedia, Diseño de Multimedios",
    period: "2013 - 2015",
  },
];

const platziCertifications = [
  "Web Development",
  "Front End Architecture",
  "Certification, Artificial Intelligence",
  "Curse of Backend with Node.js: API REST with Express.js",
  "Terminal y Command line",
  "Curse of Handling Arrays in JavaScript",
  "Software Architecture",
  "Backend Architecture",
  "MongoDB Atlas",
  "Architecture CSS",
  "Server Side Render",
  "Astro Advanced",
  "Authentication, Microservices and Redis",
];

export function EducationSection() {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Education</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <div key={index} className="p-4 rounded-lg bg-card hover:bg-card/80 transition-colors">
            <div className="flex gap-4">
              <div className="shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                <p className="text-sm text-muted-foreground mt-1">{edu.degree}</p>
                {edu.period && <p className="text-xs text-muted-foreground mt-2">{edu.period}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Platzi Certifications */}
      <div className="mt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Award className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Platzi Certifications</h3>
            <p className="text-sm text-muted-foreground">Online Tech Education Platform</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {platziCertifications.map((cert, index) => (
            <span
              key={index}
              className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
