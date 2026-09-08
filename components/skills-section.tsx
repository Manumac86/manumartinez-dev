export function SkillsSection() {
  const topSkills = ["Small Team Management", "MVP Launch", "Product Discovery"];

  const languages = [
    { name: "Spanish", level: "Native or Bilingual" },
    { name: "English", level: "Full Professional" },
    { name: "French", level: "Elementary" },
  ];

  const certifications = [
    "Fundamentos de JavaScript",
    "React Fundamentals workshop",
    "Curso de SCRUM",
    "Curso de Backend con Node.js: API REST con Express.js",
    "Carrera de Arquitectura FrontEnd",
  ];

  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Skills & Certifications</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Top Skills */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Top Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {topSkills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-sm rounded-md bg-primary/10 text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Languages
          </h3>
          <div className="space-y-2">
            {languages.map((lang, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-foreground">{lang.name}</span>
                <span className="text-sm text-muted-foreground">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Certifications
          </h3>
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">{">"}</span>
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
