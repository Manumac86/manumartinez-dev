"use client";

import { cn } from "@/lib/utils";

interface SidebarNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "projects", label: "PROJECTS" },
  { id: "skills", label: "SKILLS" },
  { id: "education", label: "EDUCATION" },
];

export function SidebarNav({ activeSection, onSectionChange }: SidebarNavProps) {
  return (
    <nav className="sticky top-8">
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "flex items-center gap-4 text-sm tracking-widest transition-all duration-300 group",
                activeSection === item.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  activeSection === item.id
                    ? "w-16 bg-foreground"
                    : "w-8 bg-muted-foreground group-hover:w-16 group-hover:bg-foreground"
                )}
              />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
