"use client";

import { useState } from "react";

const weeks = Array.from({ length: 40 }, (_, i) => {
  const week = i + 1;
  const trimester = week <= 13 ? 1 : week <= 26 ? 2 : 3;
  return { week, trimester };
});

const weekData: Record<number, { size: string; sizeEmoji: string; babyDev: string; bodyChanges: string; tips: string[] }> = {
  4: { size: "Poppy seed", sizeEmoji: "🫘", babyDev: "The embryo has implanted in your uterus. The neural tube, which becomes the brain and spinal cord, is forming.", bodyChanges: "You might notice implantation bleeding, mild cramping, and breast tenderness.", tips: ["Start taking prenatal vitamins", "Schedule your first prenatal appointment", "Begin cutting out alcohol and raw fish"] },
  8: { size: "Raspberry", sizeEmoji: "🫐", babyDev: "Baby's fingers and toes are forming. The heart is beating at about 150-170 beats per minute. Facial features are starting to develop.", bodyChanges: "Morning sickness may peak. You might feel more tired than usual and experience food aversions.", tips: ["Eat small, frequent meals to combat nausea", "Stay hydrated", "Get extra rest when you can"] },
  12: { size: "Lime", sizeEmoji: "🍋", babyDev: "Baby's reflexes are developing — fingers can open and close. Fingernails are growing. Most organs are fully formed.", bodyChanges: "Nausea often starts to improve. You might notice a small bump forming. Energy levels may increase.", tips: ["Consider sharing the news with family", "Start thinking about maternity clothes", "Keep up with gentle exercise"] },
  16: { size: "Avocado", sizeEmoji: "🥑", babyDev: "Baby can make facial expressions and may start sucking their thumb. The skeleton is hardening from cartilage to bone.", bodyChanges: "Your bump is becoming more visible. You might feel the first flutters of movement (quickening).", tips: ["Schedule your anatomy scan (around week 18-20)", "Start sleeping on your side", "Moisturize your growing belly"] },
  20: { size: "Banana", sizeEmoji: "🍌", babyDev: "You're halfway there! Baby can hear sounds and recognizes your voice. Hair is starting to grow on their head.", bodyChanges: "You'll likely have your anatomy scan this week. Braxton Hicks contractions may begin.", tips: ["Talk and sing to your baby", "Stay active with pregnancy-safe exercises", "Consider a babymoon trip"] },
  24: { size: "Ear of corn", sizeEmoji: "🌽", babyDev: "Baby's lungs are developing branches and producing surfactant. They have a regular sleep-wake cycle and respond to light.", bodyChanges: "Your uterus is about the size of a soccer ball. You might experience back pain and Braxton Hicks.", tips: ["Take your glucose screening test", "Start researching birthing classes", "Practice pelvic floor exercises"] },
  28: { size: "Eggplant", sizeEmoji: "🍆", babyDev: "Welcome to the third trimester! Baby can open and close their eyes and has regular periods of sleeping and waking.", bodyChanges: "You might notice shortness of breath as your uterus pushes against your diaphragm. Swelling in feet and ankles.", tips: ["Start counting kicks daily", "Tour the birthing facility", "Begin preparing the nursery"] },
  32: { size: "Butternut squash", sizeEmoji: "🎃", babyDev: "Baby is practicing breathing movements. Their bones are fully formed but still soft. They're gaining weight quickly.", bodyChanges: "Heartburn and indigestion may increase. You might have trouble sleeping due to your size.", tips: ["Pack your hospital bag", "Finalize your birth plan", "Install the car seat"] },
  36: { size: "Honeydew melon", sizeEmoji: "🍈", babyDev: "Baby is considered early term. Their lungs are nearly mature. They're dropping lower into your pelvis (lightening).", bodyChanges: "You might feel increased pressure in your pelvis. Braxton Hicks may become more frequent.", tips: ["Attend weekly prenatal checkups", "Prepare meals to freeze", "Wash baby clothes and set up the crib"] },
  40: { size: "Watermelon", sizeEmoji: "🍉", babyDev: "Your baby is full term and ready to meet you! They weigh about 6-9 pounds and are about 20 inches long.", bodyChanges: "You might experience nesting urges, loss of mucus plug, and early labor signs.", tips: ["Rest as much as possible", "Watch for signs of labor", "Enjoy these last moments before baby arrives!"] },
};

const currentWeek = 24;

export default function WeeklyGuide() {
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const data = weekData[selectedWeek];
  const closestWeek = data ? selectedWeek : Object.keys(weekData).map(Number).reduce((prev, curr) => Math.abs(curr - selectedWeek) < Math.abs(prev - selectedWeek) ? curr : prev);
  const displayData = weekData[closestWeek];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">Weekly Guide</h1>
        <p className="mt-1 text-text-secondary">
          Learn what&apos;s happening with you and your baby each week
        </p>
      </div>

      {/* Week selector */}
      <div className="mb-8 rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Select Week</h2>
          <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary-dark">
            You are here: Week {currentWeek}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-10 gap-1 sm:grid-cols-20">
          {weeks.map(({ week, trimester }) => (
            <button
              key={week}
              onClick={() => setSelectedWeek(week)}
              className={`flex h-8 w-full items-center justify-center rounded-md text-xs font-medium transition-all ${
                selectedWeek === week
                  ? "bg-primary-dark text-white scale-110"
                  : week === currentWeek
                  ? "bg-primary/30 text-primary-dark ring-1 ring-primary-dark"
                  : week < currentWeek
                  ? "bg-primary/10 text-primary-dark"
                  : trimester === 1
                  ? "bg-muted text-text-secondary hover:bg-border"
                  : trimester === 2
                  ? "bg-accent/50 text-text-secondary hover:bg-accent"
                  : "bg-secondary/30 text-text-secondary hover:bg-secondary/50"
              }`}
              title={`Week ${week}`}
            >
              {week}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-muted" /> T1</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-accent/50" /> T2</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-secondary/30" /> T3</span>
          <span className="flex items-center gap-1"><span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary/10" /> Completed</span>
        </div>
      </div>

      {/* Week details */}
      {displayData && (
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-accent/15 to-secondary/10 p-6 text-center md:p-8">
            <div className="text-6xl">{displayData.sizeEmoji}</div>
            <h2 className="mt-3 text-3xl font-bold">Week {closestWeek}</h2>
            <p className="mt-2 text-text-secondary">
              Baby is the size of a <strong>{displayData.size.toLowerCase()}</strong>
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Baby development */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">👶</span>
                <h3 className="text-lg font-semibold">Baby&apos;s Development</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {displayData.babyDev}
              </p>
            </div>

            {/* Body changes */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤰</span>
                <h3 className="text-lg font-semibold">Your Body</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {displayData.bodyChanges}
              </p>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="text-lg font-semibold">Tips for This Week</h3>
            </div>
            <ul className="mt-3 flex flex-col gap-2">
              {displayData.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                  <span className="mt-0.5 text-primary-dark">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {!data && (
        <p className="mt-4 text-center text-sm text-text-secondary">
          Showing closest available guide for Week {closestWeek}. Detailed guides for Week {selectedWeek} coming soon!
        </p>
      )}
    </div>
  );
}
