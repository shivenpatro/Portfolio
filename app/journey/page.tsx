"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Code, Award, X, Calendar, MapPin, Users, Target } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    icon: <Code className="w-6 h-6" />,
    title: "Computer Science Student",
    company: "Vellore Institute of Technology",
    location: "Amaravati, India",
    date: "2023 – 2027",
    period: "Jul 2023 – May 2027",
    description:
      "B.Tech in CSE with coursework spanning DSA, Software Engineering, AI & Web Development.",
    achievements: [
      "Secured 8.5+ CGPA across 4 semesters",
      "Built mini-projects in OS, CN & DBMS",
    ],
    skills: [
      "DSA",
      "Python",
      "Java",
      "OOP",
      "Software Engineering",
      "DAA",
      "OS",
      "CN",
      "DBMS",
      "Web Dev",
      "AI/ML",
      "COA",
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: <Code className="w-6 h-6" />,
    title: "Social Summer Of Code Contributor",
    company: "Social (Script Foundation)",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Active contributor to Bolt.DIY, delivering features & fixing critical bugs in production.",
    achievements: [
      "Merged 20+ PRs with full test coverage",
      "Cut bug backlog by 50% in 2 months",
      "Mentored 3 new contributors on Git flow",
    ],
    skills: ["TypeScript", "GitHub Actions", "Open Source", "CI/CD"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: <Briefcase className="w-6 h-6" />,
    title: "Software Engineer Intern",
    company: "Cordly AI",
    location: "Dover, Delaware · Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Spearheaded healthcare vertical, managing full SDLC & optimising APIs by 40%.",
    achievements: [
      "Deployed 10+ client-requested features",
      "Resolved 30+ full-stack bugs",
      "Acted as key technical liaison with clients",
    ],
    skills: [
      "React.js",
      "Node.js",
      "Supabase",
      "API Integration",
      "Technical Communication",
      "Back-End Dev",
      "CSS",
      "UI Design",
      "Tailwind CSS",
      "Software Development",
    ],
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    icon: <Users className="w-6 h-6" />,
    title: "Campus Ambassador",
    company: "Internshala",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Promoted Internshala trainings & internships through online/offline campus outreach.",
    achievements: [
      "Organised 3 webinars reaching 800+ students",
      "Top-performer among 150+ ambassadors",
    ],
    skills: ["Marketing", "Leadership", "Communication"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    icon: <Users className="w-6 h-6" />,
    title: "Human Resources Intern",
    company: "EdLernity",
    location: "Bengaluru, India · Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description: "Assisting in HR operations & talent acquisition for fast-growing ed-tech start-up.",
    achievements: [
      "Screened 200+ applicant resumes",
      "Co-led onboarding for 15 new hires",
    ],
    skills: ["Recruitment", "People Ops", "Communication"],
    color: "from-pink-500 to-fuchsia-500",
  },
  {
    id: 6,
    icon: <Award className="w-6 h-6" />,
    title: "Campus Ambassador",
    company: "GirlScript Summer of Code",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Advocated open-source culture & mentored beginners on Git & GitHub workflows.",
    achievements: [
      "Guided 50+ students’ first OSS PRs",
      "Referral ID: 0838a2a8-dc21-4d55-a4f1-5efa8a360802",
    ],
    skills: ["Open Source", "Mentorship", "Git"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: 7,
    icon: <Briefcase className="w-6 h-6" />,
    title: "Data Science & Analytics Intern",
    company: "Zidio Development",
    location: "Bengaluru, India · Remote",
    date: "May 2025 – Present",
    period: "May 2025 – Present",
    description:
      "Extracted insights from 10k+ reviews via NLP & built 92% accurate classifier guiding product road-map.",
    achievements: [
      "Reduced manual triage by 75%",
      "Visualised trends to prioritise 3 new features",
    ],
    skills: ["Python", "NLP", "Scikit-Learn", "Pandas", "Data Viz"],
    color: "from-teal-500 to-emerald-500",
  },
];

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline items on scroll
      gsap.utils.toArray(".journey-item").forEach((item: any, index) => {
        gsap.fromTo(item, 
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Parallax effect for background elements
      gsap.to(".parallax-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0">
        <div className="parallax-bg absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-40 right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
        </div>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"
          style={{ y: backgroundY }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 p-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            My Journey
          </motion.h1>
          <Link href="/">
            <motion.button
              className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            A journey through innovation, learning, and growth. Each experience has shaped my skills and perspective as a developer and engineer.
          </p>
        </motion.div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 px-8 pb-32">
        <div className="max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/20 via-white/10 to-transparent -translate-x-1/2 hidden md:block" />

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`journey-item relative flex items-center mb-24 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } flex-col`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:block">
                <motion.div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} p-0.5`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                    {exp.icon}
                  </div>
                </motion.div>
              </div>

              {/* Content card */}
              <motion.div
                className={`w-full md:w-[calc(50%-4rem)] ${
                  index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="relative group">
                  {/* Card glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${exp.color} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                  
                  {/* Card content */}
                  <div className="relative bg-gray-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-lg text-gray-300">{exp.company}</p>
                      </div>
                      <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${exp.color} text-sm font-medium`}>
                        {exp.period}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {exp.date}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 leading-relaxed mb-6">{exp.description}</p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        KEY ACHIEVEMENTS
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="text-emerald-400 mt-1">▪</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-[calc(50%-4rem)]" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-6">Let's Build Something Together</h3>
          <p className="text-gray-400 mb-8">
            I'm always excited to work on new projects and collaborate with passionate teams.
          </p>
          <Link href="/#contact">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold text-white hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
} 