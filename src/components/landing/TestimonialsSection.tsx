"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Sarah Chen",
    role: "CTO & Co-Founder",
    company: "LaunchPad AI",
    avatar: "SC",
    avatarBg: "from-blue-500 to-indigo-600",
    quote:
      "Morphix cut our frontend redesign timeline from 6 weeks to 3 days. The Design DNA extraction is pure magic — it captured our brand perfectly on the first try.",
    rating: 5,
    tag: "Startup Founder",
    tagClass: "badge-blue",
  },
  {
    id: "testimonial-2",
    name: "Marcus Rodriguez",
    role: "Senior Frontend Engineer",
    company: "Stripe",
    avatar: "MR",
    avatarBg: "from-violet-500 to-purple-600",
    quote:
      "As someone who writes code for a living, I was skeptical. But Morphix's code export is genuinely clean. React components with proper TypeScript, Tailwind classes that actually make sense. I'm impressed.",
    rating: 5,
    tag: "Developer",
    tagClass: "badge-purple",
  },
  {
    id: "testimonial-3",
    name: "Priya Kapoor",
    role: "Lead Product Designer",
    company: "Notion",
    avatar: "PK",
    avatarBg: "from-teal-500 to-emerald-500",
    quote:
      "I use Morphix to quickly prototype design directions for client presentations. What used to take a week of Figma work now takes an afternoon. The component library alone is worth it.",
    rating: 5,
    tag: "Designer",
    tagClass: "badge-teal",
  },
  {
    id: "testimonial-4",
    name: "Alex Thompson",
    role: "Agency Director",
    company: "Pixel & Code Studio",
    avatar: "AT",
    avatarBg: "from-amber-500 to-orange-500",
    quote:
      "We've onboarded 4 new clients this quarter alone using Morphix. The ability to extract a client's existing design DNA and remix it into something premium is exactly what agencies need.",
    rating: 5,
    tag: "Agency",
    tagClass: "badge-amber",
  },
  {
    id: "testimonial-5",
    name: "Jordan Kim",
    role: "Indie Developer",
    company: "Solo Maker",
    avatar: "JK",
    avatarBg: "from-pink-500 to-rose-500",
    quote:
      "I'm a solo developer with no design skills. Morphix lets me build products that look like they were designed by a full design team. The GitHub PR integration is seamless.",
    rating: 5,
    tag: "Indie Dev",
    tagClass: "badge-blue",
  },
  {
    id: "testimonial-6",
    name: "Emma Wilson",
    role: "Head of Design",
    company: "Linear",
    avatar: "EW",
    avatarBg: "from-slate-600 to-slate-800",
    quote:
      "The Live Preview Studio is genuinely impressive. Real-time, interactive, no lag. Combined with the component swap feature, we've completely changed how we do design reviews.",
    rating: 5,
    tag: "Design Lead",
    tagClass: "badge-purple",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-50/80 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="badge badge-blue mb-4 mx-auto">
            <span>Loved by Teams Worldwide</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
            What our users{" "}
            <span className="gradient-text-blue-purple">are saying</span>
          </h2>
          <p className="text-lg text-slate-600">
            Developers, designers, founders, and agencies trust Morphix to
            build better websites faster.
          </p>

          {/* Aggregate rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <StarRating count={5} />
            <span className="text-lg font-bold text-slate-900">4.9</span>
            <span className="text-slate-500 text-sm">from 2,400+ reviews</span>
          </div>
        </div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              id={t.id}
              className={`morphix-card p-7 flex flex-col ${
                index === 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-blue-100 mb-4 flex-shrink-0" />

              {/* Rating */}
              <StarRating count={t.rating} />

              {/* Quote text */}
              <p className="text-slate-700 leading-relaxed mt-4 mb-6 flex-1 text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarBg} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white text-xs font-bold">{t.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {t.role} · {t.company}
                  </div>
                </div>
                <span className={`badge ${t.tagClass} text-[10px] py-0.5 flex-shrink-0`}>
                  {t.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "10,000+", label: "Active Users" },
            { value: "50M+", label: "Components Served" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "3x", label: "Faster Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold gradient-text-blue-purple mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
