"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills?: string[];
  isCurrentRole?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Collybrix",
    role: "CEO & Co-Founder",
    period: "June 2025 - Present",
    location: "Madrid, Spain",
    description: [
      "Growing Collybrix, redefining startup technical acceleration.",
      "Guiding tech founders through the development process from concept to scalable product, leveraging 15+ years of software engineering expertise.",
      "Fostering authentic partnerships and continuous innovation, aligning resources with startup needs for rapid market entry.",
    ],
    isCurrentRole: true,
  },
  {
    company: "AKAIO by Kyra Group",
    role: "Vice President of Engineering",
    period: "November 2024 - September 2025",
    location: "Madrid, Spain",
    description: [
      "As VP of Engineering at AKAIO by Kyra Group, I lead the end-to-end technical strategy and execution for an AI-native innovation platform designed for organizations shaping the future. My role focuses on scaling architecture, refining product capabilities, and building world-class engineering culture.",
      "Successfully launched AKAIO v1.0, an AI-native platform that blends Gen AI, multi-agent systems, and semantic data search to simulate future scenarios and enhance innovation decision-making.",
      "Directed a multi-disciplinary team through full-stack development of AI agents infrastructure with KrakenD API Gateway, Milvus, MongoDB, and a high-performance frontend using Next.js and SSR.",
      "Delivered advanced features including customizable dashboards, AI-driven reporting, and organizational ecosystem mapping for innovation teams.",
      "Implemented agile product cycles with short feedback loops, enhancing delivery velocity and improving user adoption metrics.",
    ],
    skills: [
      "Product Scaling",
      "AI Platforms",
      "Technical Leadership",
      "Gen AI",
      "Multi-Agent Systems",
      "MongoDB",
      "Milvus",
      "KrakenD",
      "Next.js",
      "Python",
      "Strategic Innovation Systems",
    ],
  },
  {
    company: "AKAIO by Kyra Group",
    role: "Head of Development",
    period: "June 2024 - November 2024",
    location: "Madrid, Spain",
    description: [
      "In my role as Head of Development, I led the successful launch of the AKAIO MVP, validating the core use case of using AI agents and neural networks to empower innovation teams. This MVP was the foundation for the product's eventual v1.0 release.",
      "Directed technical design and architecture of a cloud-native SaaS platform focused on enabling innovation ecosystems.",
      "Delivered a working MVP that integrated AI agents, organizational graphs, and strategic scenario simulations.",
      "Introduced a rapid prototyping framework and CI/CD practices that enabled fast iteration cycles and early user testing.",
      "Played a pivotal role in building the core development team and establishing technical standards for scale.",
    ],
    skills: [
      "MVP Launch",
      "Product Discovery",
      "AI Agent Design",
      "Leadership",
      "Cloud Architecture",
      "Innovation SaaS",
      "Next.js",
      "Strategic Scenarios",
    ],
  },
  {
    company: "AKAIO by Kyra Group",
    role: "Technical Lead",
    period: "February 2024 - November 2024",
    location: "Madrid, Spain",
    description: [
      "Led the frontend and infrastructure development of the early AKAIO platform. Focused on transitioning from proof-of-concept to MVP, setting the stage for future AI agent system integrations.",
      "Built the first AI-driven frontend using React, Astro, and Next.js, integrated with GEN AI components.",
      "Defined architecture and deployment strategy across AWS, with a focus on modularity and security.",
      "Collaborated with product leadership to translate vision into technical roadmap and feature milestones.",
    ],
    skills: [
      "AI Architecture",
      "Frontend Engineering",
      "AWS",
      "React.js",
      "Astro",
      "Python",
      "Prototyping",
      "Innovation Ecosystems",
    ],
  },
  {
    company: "Between Technology",
    role: "Senior Fullstack Developer",
    period: "May 2023 - February 2024",
    location: "Spain",
    description: [
      "Led the Frontend team in developing an Integral Software Platform for electric assets management and data visualization. Circutor.com",
      "Implemented a brand new workspaces product with support chat, analytics, alerts, and events management for electric devices and assets networks.",
      "Utilized microservices architecture, golang, AWS, Gitlab CI/CD management, NextJS, Angular 12, and Turborepo.",
      "Build cross-company Design System package within npm to be used in all company applications. Storybook, npm, GitLab CI/CD with auto publish to NPM.",
    ],
    skills: ["Microservices", "Golang", "AWS", "GitLab CI/CD", "Next.js", "Angular 12", "Turborepo", "Design Systems", "Storybook", "npm"],
  },
  {
    company: "Sistemas Genómicos | member of SYNLAB",
    role: "Sr Fullstack Engineer",
    period: "April 2023 - October 2023",
    location: "Valencia, Spain",
    description: [
      "Developed a clean architecture React and NodeJS App with Kubernetes microservice architecture for Genomic Studies at Sistemas Genómicos.",
      "Implemented analysis reports and document administration functionalities for efficient data management.",
      "Collaborated with cross-functional teams to ensure seamless integration and functionality of the application.",
    ],
    skills: ["React", "Node.js", "Kubernetes", "Clean Architecture"],
  },
  {
    company: "EvoSecurity",
    role: "Sr. Frontend Engineer",
    period: "October 2021 - April 2023",
    location: "Madrid, Spain",
    description: [
      "Contributed to multiple ReactJS projects and features in a fast-paced startup environment.",
      "Utilized AWS and JAVA microservices architecture to develop scalable solutions.",
      "Collaborated in Agile methodologies such as Scrum and Kanban to deliver high-quality products.",
    ],
    skills: ["React", "AWS", "Java", "Microservices", "Scrum", "Kanban"],
  },
  {
    company: "iDocket",
    role: "Auth0 Engineer",
    period: "February 2022 - February 2023",
    location: "Texas, United States",
    description: [
      "Configured and supported Auth0 solutions for iDocket projects, ensuring high security standards.",
      "Developed and implemented SSO for the Justice Department of Texas, enhancing auto solutions.",
      "Collaborated with teams to improve authentication processes, leading to increased efficiency and security measures.",
    ],
    skills: ["Auth0", "SSO", "Security", "Authentication"],
  },
  {
    company: "Social Native",
    role: "Frontend Engineer",
    period: "June 2019 - August 2022",
    location: "Córdoba, Argentina",
    description: [
      "Working as a FrontEnd developer the first year and as a FullStack developer (PHP and NodeJS Frameworks) the last year.",
      "Migrate, refactor, maintenance and support on internal Chrome Extension on AngularJS, NodeJS and plain Javascript.",
    ],
    skills: [
      "AngularJS",
      "OpenShift",
      "React",
      "PHP Symphony",
      "Express",
      "Auth",
      "AWS S3",
      "GitHub",
      "Olapic Design System",
    ],
  },
  {
    company: "Coderhouse",
    role: "ReactJS Course Teacher",
    period: "August 2020 - April 2022",
    location: "Argentina",
    description: [
      "Taught ReactJS courses at Coderhouse, a leading Latin American online tech education platform.",
      "Mentored students through modern frontend concepts: component architecture, hooks, state management, and API integration.",
      "Provided code reviews, project guidance, and career advice to help students launch careers in tech.",
      "Contributed to shaping the next generation of frontend developers across Latin America.",
    ],
    skills: ["React", "Teaching", "Mentoring", "Frontend Development"],
  },
  {
    company: "MarketerHire",
    role: "Senior Frontend Developer",
    period: "June 2021 - October 2021",
    location: "United States",
    description: [
      "Developed VueJS applications for a fast-growing marketing talent marketplace, enabling seamless connections between brands and freelance marketers.",
      "Designed and implemented integrations with NoCode tools like Integromat (Make) and HubSpot, automating data flows and reducing manual processes.",
      "Connected Airtable, Salesforce, and Crunchbase data sources to create unified pipelines, improving data accuracy and operational efficiency across the platform.",
    ],
    skills: ["Vue.js", "Integromat", "HubSpot", "Airtable", "Salesforce", "Crunchbase"],
  },
  {
    company: "WRS Health",
    role: "Senior Frontend Developer",
    period: "March 2021 - June 2021",
    location: "United States",
    description: [
      "Joined as a Senior Frontend Developer to build and enhance a Medical Management Software platform used by healthcare providers.",
      "Developed responsive, user-friendly interfaces using ReactJS, ensuring compliance with healthcare industry standards for usability and data handling.",
      "Collaborated with cross-functional teams to deliver features that streamlined clinical workflows and improved patient data management.",
    ],
    skills: ["React", "Medical Software", "Healthcare"],
  },
  {
    company: "NaN",
    role: "Frontend Engineer",
    period: "November 2020 - March 2021",
    location: "Cordoba, Argentina",
    description: [
      "Joined as a Senior Frontend Developer to build and enhance a Transport Uber like application for Trucks.",
    ],
    skills: ["React", "Redux", "GraphQL", "ApolloGQL", "AWS Amplify", "GitHub", "Bitbucket CI/CD", "Docker", "Tailwind", "MaterialUI"],
  },
  {
    company: "Globant",
    role: "WebUI Developer",
    period: "June 2018 - June 2019",
    location: "Córdoba, Argentina",
    description: [
      "Developed and maintained the Disney Parks Tickets web platform, delivering seamless user experiences for one of the world's most visited entertainment brands.",
      "Contributed to the migration of the Parks Tickets page from a PHP-based architecture to a full JavaScript solution using WebComponents (Polymer), improving performance and maintainability.",
      "Built interactive UI components using ReactJS, AngularJS, and Vanilla JavaScript.",
      "Followed rigorous engineering practices including unit testing, GitFlow branching strategies, and CI/CD pipelines across multiple testing environments.",
      "Collaborated within a SCRUM framework using Jira and Confluence for agile delivery.",
    ],
    skills: ["PHP", "React", "AngularJS", "WebComponents", "Polymer", "SCRUM", "Jira", "Confluence"],
  },
  {
    company: "Orange Tools",
    role: "Founder",
    period: "September 2011 - June 2019",
    location: "",
    description: [
      "Founded and led a web development agency delivering end-to-end digital solutions for local and regional clients over 8 years.",
      "Managed the full project lifecycle—from discovery and design to deployment and ongoing maintenance—building web applications and static websites tailored to each client's needs.",
      "Handled domain registration, server configuration, and long-term technical support, ensuring reliable performance and client satisfaction.",
    ],
    skills: [
      "ReactJS",
      "AngularJS",
      "ExpressJS",
      "JWT Auth",
      "PHP",
      "WordPress",
      "Strapi CMS",
      "Firebase",
      "Heroku",
      "GitHub",
      "Bitbucket",
      "GitLab",
      "Adobe XD",
      "Photoshop",
      "Illustrator",
      "Figma",
      "Scrum",
      "Trello",
    ],
  },
  {
    company: "OneClick Apple Premier Partner",
    role: "Apple Certified Technician",
    period: "November 2015 - June 2018",
    location: "Cordoba, Argentina",
    description: [
      "Served as Apple Certified Technician and Store Service Manager at an Apple Premier Partner, overseeing all technical service operations.",
      "Managed the service department end-to-end, including diagnostics, repairs, customer support, and quality assurance for Apple devices.",
      "Led a team of technicians, ensuring adherence to Apple's strict certification standards and delivering exceptional service experiences that drove customer loyalty and repeat business.",
    ],
  },
  {
    company: "Ministerio de Educación Argentina",
    role: "Math, Tech and Physics High School Teacher",
    period: "January 2011 - June 2015",
    location: "Argentina",
    description: ["Math, Technology and Physics high school teacher."],
  },
  {
    company: "Intercity SRL",
    role: "Technical Office",
    period: "March 2010 - September 2013",
    location: "Rio Cuarto, Córdoba, Argentina",
    description: ["Tech Office for Intercity ISP provider."],
  },
];

export function ExperienceTimeline() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-2">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 md:pl-20">
            

            {/* Date indicator for desktop */}
            <div className="hidden md:flex md:justify-between md:items-center absolute left-0 w-16 text-right pr-4">
              {/* Timeline dot */}
              <div
                className={cn(
                  "left-0 md:left-8 w-3 h-3 rounded-full transition-all duration-300 bg-primary ring-4 ring-primary/20 transition-all duration-300",
                  exp.isCurrentRole
                    ? "bg-primary ring-4 ring-primary/20"
                    : expandedIndex === index
                      ? "bg-primary"
                      : "bg-muted-foreground/50"
                )}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {exp.period.split(" - ")[0].split(" ")[1] || exp.period.split(" - ")[0]}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={cn(
                "w-full text-left px-4 rounded-lg transition-all duration-300",
                "hover:bg-card/80",
                expandedIndex === index ? "bg-card" : "bg-transparent"
              )}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    {exp.isCurrentRole && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-primary mt-0.5">{exp.company}</p>
                </div>
                <div className="text-sm text-muted-foreground md:text-right shrink-0">
                  <p>{exp.period}</p>
                  {exp.location && <p className="text-xs">{exp.location}</p>}
                </div>
              </div>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedIndex === index ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"
                )}
              >
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary shrink-0">{">"}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
