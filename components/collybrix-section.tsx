import { Rocket, Zap, Shield, Target, Handshake } from "lucide-react";

export function CollybrixSection() {
  const values = [
    { icon: Zap, label: "Technical excellence" },
    { icon: Rocket, label: "Purpose-driven speed" },
    { icon: Target, label: "Continuous innovation" },
    { icon: Shield, label: "Results focus" },
    { icon: Handshake, label: "Authentic partnership" },
  ];

  const services = [
    "AI-assisted diagnosis and automatic roadmap generation",
    "DevOps + security by design for frictionless scaling",
    "Hybrid fee + equity models that align incentives",
  ];

  return (
    <div className="mt-8 p-6 rounded-xl bg-card border border-border">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Rocket className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">What is Collybrix?</h3>
          <p className="text-primary text-sm mt-1">
            &ldquo;We fast-track startup tech — and rewrite the standards.&rdquo;
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
        We are the technical accelerator redefining the growth standards for startups across Europe
        and the Americas. Backed by 15+ years of software-engineering expertise, applied AI, agile
        methodologies, and sharp business focus, our senior team—backend, frontend, data & AI,
        UX/UI, and DevOps—guides founders from concept to a robust, scalable product (Prototype →
        MVP → v 1.0) in just a few months.
      </p>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-2">Mission</h4>
        <p className="text-muted-foreground text-sm">
          To drive the exponential success of tech startups through strategic, top-tier development
          and intelligent resource investment.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">Values</h4>
        <div className="flex flex-wrap gap-3">
          {values.map((value, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <value.icon className="w-4 h-4 text-primary" />
              <span>{value.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">What we do</h4>
        <ul className="space-y-2">
          {services.map((service, index) => (
            <li key={index} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-primary shrink-0">{">"}</span>
              <span>{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
