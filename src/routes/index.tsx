import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PiggyBank, Wallet, TrendingUp, Sparkles, Briefcase, ShieldAlert,
  ShoppingBag, Repeat, Trophy, Zap, Flame, Instagram, ArrowRight,
  BookOpen, Rocket, Target, Award,
} from "lucide-react";
import bookCover from "@/assets/book-cover.png";
import authorImg from "@/assets/author.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Teen's Money Mastery — Level Up Your Money Game" },
      { name: "description", content: "The Gen-Z finance book that turns saving, investing, and side hustles into a game. For teens 13-19 ready to own their financial future." },
      { property: "og:title", content: "Teen's Money Mastery" },
      { property: "og:description", content: "Money skills that actually slap. Built for teens, by FinwithAnwesha." },
    ],
  }),
  component: Index,
});

const AMAZON_URL = "https://www.amazon.in/Teens-Money-Mastery-Anwesha-Patro-ebook/dp/B0GX38W4W3/ref=sr_1_1?crid=2287LTZPXE9MM&dib=eyJ2IjoiMSJ9.wIBoYKj2OZxeR0b07WB6XzAORpCnRTJfXl-KV_Z8GrIo-nt0LlE_xy7dYFlk6Z0dMwDU6Z5P_Ufh3W3pYjQ0aB8tQdnGIrr3Y_tCkTuyn1FJDMybPR8-ddj3a3hm9IRTz6lUWaRZBCtH56TupPn6VpCs5QaG2FHWW3AIuWa3dAhzU65tFYaovk3BJtHIN4f1hKRG64I6UInwosDbv7hStXi57EmkBeYDyzVLtGcqX7c.PUD6Pm5blmsXfrLFQGIKOPlf5pR5dD_nvYRcC-iBq_k&dib_tag=se&keywords=teen%27s+money+mastery&qid=1778220835&sprefix=%2Caps%2C365&sr=8-1";

const skills = [
  { icon: PiggyBank, title: "Saving", desc: "Stack cash like a pro, even on allowance.", color: "neon-green" },
  { icon: Wallet, title: "Budgeting", desc: "Track every rupee without the headache.", color: "electric-blue" },
  { icon: TrendingUp, title: "Investing", desc: "Make your money work the night shift.", color: "neon-pink" },
  { icon: Sparkles, title: "Compound Interest", desc: "The 8th wonder. Start early, win bigger.", color: "neon-yellow" },
  { icon: Briefcase, title: "Side Hustles", desc: "Turn skills into your first paycheck.", color: "neon-purple" },
  { icon: ShieldAlert, title: "Avoiding Scams", desc: "Spot fake gurus and shady DMs instantly.", color: "neon-pink" },
  { icon: ShoppingBag, title: "Smart Spending", desc: "Buy what matters. Skip the FOMO.", color: "electric-blue" },
  { icon: Repeat, title: "Money Habits", desc: "Build routines that compound for life.", color: "neon-green" },
];

const levels = [
  { lvl: "01", title: "Money Rookie", xp: 30, badge: "🪙", color: "neon-green" },
  { lvl: "02", title: "Budget Boss", xp: 55, badge: "💸", color: "electric-blue" },
  { lvl: "03", title: "Investor IQ", xp: 75, badge: "📈", color: "neon-pink" },
  { lvl: "04", title: "Wealth Wizard", xp: 95, badge: "👑", color: "neon-yellow" },
];

const facts = [
  { icon: TrendingUp, title: "Compounding loves time", text: "Investing ₹100/month at 15 can outgrow ₹500/month started at 30. Time is the cheat code.", color: "neon-green" },
  { icon: ShieldAlert, title: "Most teens learn money the hard way", text: "Schools rarely teach budgeting, taxes, or investing — yet you'll use them every single month as an adult.", color: "neon-pink" },
  { icon: ShoppingBag, title: "Lifestyle creep starts young", text: "That ‘small’ daily ₹150 spend is ₹54,000 a year. Awareness now = freedom later.", color: "electric-blue" },
  { icon: Wallet, title: "Pocket money is practice money", text: "Treating allowance like a real income builds habits long before your first paycheck arrives.", color: "neon-yellow" },
  { icon: ShieldAlert, title: "Scams target young people", text: "Fake gurus, ‘double your money’ DMs, sketchy crypto — knowing the red flags protects your future earnings.", color: "neon-purple" },
  { icon: Sparkles, title: "Habits beat hacks", text: "Saving a fixed % every month for years quietly outperforms any viral get-rich trick.", color: "neon-green" },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Floating neon shapes */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-neon-purple/30 blur-3xl animate-float" />
        <div className="absolute top-1/2 -right-20 h-96 w-96 rounded-full bg-electric-blue/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-neon-pink/20 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* NAV */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-neon-green text-primary-foreground glow-green">$</span>
            <span className="text-gradient-neon">TMM</span>
          </a>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#why" className="hover:text-foreground">Why</a>
            <a href="#learn" className="hover:text-foreground">Learn</a>
            <a href="#game" className="hover:text-foreground">Game</a>
            <a href="#author" className="hover:text-foreground">Author</a>
            <a href="#reviews" className="hover:text-foreground">Why Early</a>
          </nav>
          <a href="#buy" className="rounded-full bg-neon-green px-5 py-2 text-sm font-semibold text-primary-foreground glow-green hover:scale-105 transition-transform">
            Buy Book
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 pt-16 pb-32 md:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium">
              <Flame className="h-4 w-4 text-neon-pink" />
              <span className="text-muted-foreground">For teens 13–19 · No boring lectures</span>
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.95] sm:text-6xl md:text-7xl">
              Teen's <br />
              <span className="text-gradient-neon">Money Mastery</span>
            </h1>
            <p className="mt-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl text-gradient-neon">
              Master money before money masters you.
            </p>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              The finance book that hits like your favorite game. Stack cash, dodge scams, level up your future — all before college.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#buy" className="group inline-flex items-center gap-2 rounded-full bg-neon-green px-7 py-4 text-base font-bold text-primary-foreground glow-green hover:scale-105 transition-transform animate-glow-pulse">
                Buy the Book <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#learn" className="inline-flex items-center gap-2 rounded-full border border-white/20 glass px-7 py-4 text-base font-bold hover:border-neon-pink/60 transition-colors">
                What's Inside
              </a>
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-neon-purple/40 via-electric-blue/30 to-neon-green/30 blur-3xl" />
            <img
              src={bookCover}
              alt="Teen's Money Mastery book cover"
              width={1024}
              height={1536}
              className="mx-auto max-h-[640px] w-auto drop-shadow-[0_25px_60px_oklch(0.65_0.27_305/0.5)] animate-float"
            />
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-green">Why now</p>
            <h2 className="font-display text-4xl font-black md:text-5xl">
              Schools teach Pythagoras. <br />
              <span className="text-gradient-neon">Nobody teaches money.</span>
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Rocket, title: "Start at 15, not 35", text: "₹500 invested today beats ₹5000 invested in 20 years. Math doesn't lie.", color: "neon-green" },
              { icon: Target, title: "Skip the rich-kid trap", text: "Money smarts > money inherited. Habits beat hand-outs every single time.", color: "neon-pink" },
              { icon: Award, title: "Adulting on easy mode", text: "First job? First flat? You'll laugh while friends panic about taxes.", color: "electric-blue" },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-7 hover:-translate-y-2 transition-transform">
                <div className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-${item.color}/20 text-${item.color}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section id="learn" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-pink">Skill tree</p>
            <h2 className="font-display text-4xl font-black md:text-5xl">What you'll <span className="text-gradient-neon">unlock</span></h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-2 hover:border-white/20"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-${s.color}/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-${s.color}/15 text-${s.color} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAME */}
      <section id="game" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-electric-blue">Player profile</p>
            <h2 className="font-display text-4xl font-black md:text-5xl">Level up your <span className="text-gradient-neon">money XP</span></h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Each chapter = a level. Each habit = a badge. Each rupee saved = real-world XP.</p>
          </div>

          <div className="glass rounded-3xl p-6 md:p-10 neon-border">
            {/* HUD */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-neon-green text-primary-foreground glow-green">
                  <Trophy className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">Reader rank</p>
                  <p className="font-display text-2xl font-bold">Wealth Wizard</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-full glass px-5 py-3">
                <Flame className="h-5 w-5 text-neon-pink" />
                <span className="font-bold">42 day streak</span>
              </div>
            </div>

            {/* Levels */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {levels.map((l) => (
                <div key={l.lvl} className="rounded-2xl bg-background/40 p-5 hover:scale-[1.03] transition-transform">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`text-xs font-bold text-${l.color}`}>LVL {l.lvl}</span>
                    <span className="text-2xl">{l.badge}</span>
                  </div>
                  <p className="mb-3 font-display text-lg font-bold">{l.title}</p>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className={`h-full bg-${l.color} rounded-full`} style={{ width: `${l.xp}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{l.xp}% XP</p>
                </div>
              ))}
            </div>

            {/* Achievements */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { icon: Zap, label: "First ₹1000 saved", color: "neon-yellow" },
                { icon: Sparkles, label: "Started compound interest", color: "neon-pink" },
                { icon: Briefcase, label: "Launched side hustle", color: "neon-green" },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl glass p-4">
                  <div className={`grid h-11 w-11 place-items-center rounded-lg bg-${a.color}/20 text-${a.color}`}>
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Achievement unlocked</p>
                    <p className="font-bold">{a.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section id="author" className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon-pink/40 to-neon-purple/40 blur-3xl" />
            <div className="glass rounded-3xl p-4 neon-border">
              <img src={authorImg} alt="Anwesha — author" loading="lazy" width={768} height={768} className="rounded-2xl w-full" />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-pink">Meet the author</p>
            <h2 className="font-display text-4xl font-black md:text-5xl">Hey, I'm <span className="text-gradient-neon">Anwesha</span></h2>
            <p className="mt-5 text-lg text-muted-foreground">
              I created this book because I realized that teenagers learn many subjects in school, but very few are taught how money actually works. I wanted to make finance fun, practical, and easy to understand so that teens can build smart money habits early.
            </p>
            <p className="mt-3 text-muted-foreground">
              No jargon. No cringe. Just real strategies that work — explained like a friend, not a textbook.
            </p>
            <a
              href="https://www.instagram.com/finwithanwesha"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-3 rounded-full glass px-6 py-3 hover:border-neon-pink/60 transition-colors"
            >
              <Instagram className="h-5 w-5 text-neon-pink" />
              <span className="font-bold">@FinwithAnwesha</span>
              <span className="text-xs text-muted-foreground">· Daily money tips</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHY EARLY */}
      <section id="reviews" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-neon-yellow">The real reason</p>
            <h2 className="font-display text-4xl font-black md:text-5xl">
              Why teens need <span className="text-gradient-neon">money skills early</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Small lessons learned in your teens compound into massive advantages by the time you're 25.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl glass p-6 hover:-translate-y-2 transition-transform">
                <div className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-${f.color}/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-${f.color}/15 text-${f.color}`}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUY */}
      <section id="buy" className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass rounded-3xl p-10 md:p-16 neon-border relative overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neon-green/20 via-electric-blue/20 to-neon-pink/20" />
            <BookOpen className="mx-auto mb-5 h-12 w-12 text-neon-green" />
            <h2 className="font-display text-4xl font-black md:text-6xl">
              Ready to <span className="text-gradient-neon">level up</span>?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Grab Teen's Money Mastery on Kindle. One book. A whole new mindset.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={AMAZON_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-neon-green px-9 py-5 text-lg font-bold text-primary-foreground glow-green animate-glow-pulse hover:scale-105 transition-transform">
                Buy on Amazon Kindle <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">Instant download · Read on any device</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Teen's Money Mastery · by FinwithAnwesha</p>
          <a href="https://www.instagram.com/finwithanwesha" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground">
            <Instagram className="h-4 w-4" /> @FinwithAnwesha
          </a>
        </div>
      </footer>

      {/* Sticky floating CTA */}
      <a
        href="#buy"
        className={`fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-neon-green px-6 py-4 font-bold text-primary-foreground glow-green hover:scale-105 transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <BookOpen className="h-5 w-5" /> Buy the Book
      </a>
    </div>
  );
}
