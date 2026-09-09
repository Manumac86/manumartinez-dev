"use client";

import React from "react";
import { LinkedinIcon } from "@/components/icons/brand";

import { useState, useEffect, useRef } from "react";
import { HeroSection } from "@/components/hero-section";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillsSection } from "@/components/skills-section";
import { EducationSection } from "@/components/education-section";
import { SidebarNav } from "@/components/sidebar-nav";
import { CollybrixSection } from "@/components/collybrix-section";
import { ProjectsSection } from "@/components/projects-section";
import { Mail, Calendar, Globe } from "lucide-react";

export default function CVPage() {
  const [activeSection, setActiveSection] = useState("about");

  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      about: aboutRef,
      experience: experienceRef,
      projects: projectsRef,
      skills: skillsRef,
      education: educationRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = [aboutRef, experienceRef, projectsRef, skillsRef, educationRef];
    for (const ref of sections) {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block lg:col-span-3 py-20">
            <div className="sticky top-20">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground">Emmanuel Martinez</h2>
                <p className="text-sm text-primary mt-1">CEO & Co-Founder</p>
                
                {/* Contact Links */}
                <div className="mt-4 space-y-2">
                  <a
                    href="mailto:emmartinez@me.com"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>emmartinez@me.com</span>
                  </a>
                  <a
                    href="https://calendly.com/emmartinez86/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Schedule a Meeting</span>
                  </a>
                  <a
                    href="https://collybrix.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                    <span>collybrix.com</span>
                  </a>
                </div>
              </div>
              <SidebarNav activeSection={activeSection} onSectionChange={handleSectionChange} />

              {/* Social Links */}
              <div className="mt-12 flex gap-4">
                <a
                  href="https://www.linkedin.com/in/emmartinez-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 py-8 lg:py-20">
            {/* About Section */}
            <section id="about" ref={aboutRef}>
              <HeroSection />
            </section>

            {/* Experience Section */}
            <section
              id="experience"
              ref={experienceRef}
              className="py-12 border-t border-border"
            >
              <h2 className="text-2xl font-bold text-foreground mb-8">Experience</h2>
              <CollybrixSection />
              <div className="mt-12">
                <ExperienceTimeline />
              </div>
            </section>

            {/* Projects Section */}
            <div id="projects" ref={projectsRef}>
              <ProjectsSection />
            </div>

            {/* Skills Section */}
            <div id="skills" ref={skillsRef}>
              <SkillsSection />
            </div>

            {/* Education Section */}
            <div id="education" ref={educationRef}>
              <EducationSection />
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-border text-center">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Emmanuel Martinez. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Madrid, Spain
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
