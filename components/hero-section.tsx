import Image from "next/image";

export function HeroSection() {
  return (
    <section className="pb-12 md:pb-20">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative shrink-0">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-primary/20">
              <Image
                src="/images/avatar.jpg"
                alt="Emmanuel Martinez"
                width={144}
                height={144}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-4 border-background" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-balance">
              Emmanuel Martinez
            </h1>
            <p className="mt-3 text-lg md:text-xl text-primary font-medium">
              CEO & Co-Founder @ Collybrix | Driving Technical Acceleration
            </p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed max-w-3xl text-pretty">
          CEO and Founder of Collybrix, where we serve as temporary technical co-founders for
          startups navigating the critical journey from idea validation to 100K users. We blend
          senior engineering expertise with AI-powered development methodologies to help founders
          build faster, smarter, and with the strategic clarity they need to scale.
        </p>

        <p className="text-muted-foreground leading-relaxed max-w-3xl text-pretty">
          With a hands-on technical background in full-stack development, product architecture, and
          systems design, I stay close to the work while leading strategy and mentoring our
          technical team. I&apos;ve built comprehensive frameworks spanning PRDs, multi-tenant
          architectures, DevOps pipelines, and rapid prototyping processes—always with a focus on
          what actually moves the needle for early-stage companies.
        </p>

        <p className="text-muted-foreground leading-relaxed max-w-3xl text-pretty">
          Technology executive and entrepreneur with over 15 years of experience spanning software
          engineering, technical leadership, and startup acceleration. Progressed from frontend
          development to VP of Engineering, leading AI-native platform development with Gen AI and
          multi-agent systems. Founded two companies, including Collybrix, a technical acceleration
          firm helping startups scale from idea validation to 100K users. As a Fullstack Freelance
          Developer, delivered projects across diverse domains—healthcare, security, marketing,
          genomics, and entertainment—building a reputation for technical excellence and strong
          client relationships. Deep expertise in full-stack development (React, Next.js, Node.js),
          product architecture, and building high-performing engineering teams. Passionate about
          mentoring founders and developers, with teaching experience at Coderhouse and a track
          record of delivering MVPs that evolve into scalable products.
        </p>


      </div>
    </section>
  );
}
