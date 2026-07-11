import Link from "next/link";

const features = [
  {
    icon: "📖",
    title: "Daily Journaling",
    description: "Capture your thoughts, feelings, and experiences every day of your pregnancy journey.",
  },
  {
    icon: "📅",
    title: "Weekly Guides",
    description: "Learn what's happening with your baby and body each week with expert-curated content.",
  },
  {
    icon: "🎯",
    title: "Milestone Tracking",
    description: "Record first kicks, ultrasounds, and all the special moments you never want to forget.",
  },
  {
    icon: "😊",
    title: "Mood & Symptoms",
    description: "Track your mood and symptoms to spot patterns and share with your healthcare provider.",
  },
  {
    icon: "📸",
    title: "Photo Memories",
    description: "Add bump photos and ultrasound images to create a beautiful visual timeline.",
  },
  {
    icon: "📊",
    title: "Pregnancy Dashboard",
    description: "See your journey at a glance — current week, countdown, and recent entries.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    week: "Week 32",
    text: "BumpJournal helped me document everything. Now I have a beautiful record to share with my baby someday.",
  },
  {
    name: "Priya K.",
    week: "Week 28",
    text: "The weekly guides kept me informed and the journaling helped me process all the emotions of pregnancy.",
  },
  {
    name: "Emily R.",
    week: "Postpartum",
    text: "I look back at my entries and feel so grateful I captured those fleeting moments.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-accent/20 to-background px-4 py-20 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 text-5xl md:text-6xl">🌸</div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Cherish Every Moment of Your{" "}
            <span className="text-primary-dark">Pregnancy Journey</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-text-secondary">
            A beautiful, private space to journal your pregnancy — track your baby&apos;s
            growth, capture milestones, and create memories that last a lifetime.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-full bg-primary-dark px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark/90 hover:shadow-xl"
            >
              Start Your Journal
            </Link>
            <Link
              href="/weekly-guide"
              className="rounded-full border border-border bg-card px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Explore Weekly Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Everything You Need for Your Journey
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-text-secondary">
            From daily reflections to weekly insights, BumpJournal is your companion
            through every trimester.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 text-3xl">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">How It Works</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Set Your Due Date", desc: "Enter your due date and we'll personalize your weekly guides and milestone timeline." },
              { step: "2", title: "Journal Daily", desc: "Write entries, log moods and symptoms, and add photos whenever inspiration strikes." },
              { step: "3", title: "Treasure Forever", desc: "Look back on your beautiful journey anytime — your memories are safe and private." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-dark text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">
            Loved by Moms-to-Be
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <p className="text-sm leading-relaxed text-text-secondary">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary-dark">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-text-secondary">{t.week}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary/20 via-accent/30 to-secondary/20 px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to Start Your Journal?
          </h2>
          <p className="mt-4 text-text-secondary">
            Join thousands of moms documenting their beautiful journey. Free to get
            started.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-full bg-primary-dark px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark/90 hover:shadow-xl"
          >
            Create Your Free Journal
          </Link>
        </div>
      </section>
    </div>
  );
}
