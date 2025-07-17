"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, Code, Award, Calendar, MapPin, ArrowRight, Users } from "lucide-react";
import Link from 'next/link';

const allExperiences = [
  {
    id: 1,
    icon: <Code className="w-5 h-5" />,
    title: "Computer Science Student",
    company: "Vellore Institute of Technology",
    location: "Amaravati, India",
    date: "2023 – 2027",
    period: "Jul 2023 – May 2027",
    description:
      "Pursuing B.Tech in Computer Science focusing on Data Structures, Algorithms, Software Engineering & AI.",
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
    icon: <Code className="w-5 h-5" />,
    title: "Social Summer Of Code Contributor",
    company: "Social (formerly Script Foundation)",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Shipped 5+ features & fixed 15+ bugs for Bolt.DIY, merging 20+ PRs with rigorous code reviews.",
    skills: ["Open Source", "Git", "GitHub", "TypeScript", "CI/CD"],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    icon: <Briefcase className="w-5 h-5" />,
    title: "Software Engineer Intern",
    company: "Cordly AI",
    location: "Dover, Delaware · Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Led healthcare vertical, launching 10+ features & cutting API latency by 40% through DB optimisations.",
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
    icon: <Users className="w-5 h-5" />,
    title: "Campus Ambassador",
    company: "Internshala",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Drove campus campaigns to promote Internshala trainings & internships, boosting student sign-ups.",
    skills: ["Marketing", "Leadership", "Communication"],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    icon: <Users className="w-5 h-5" />,
    title: "Human Resources Intern",
    company: "EdLernity",
    location: "Bengaluru, India · Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description: "Supporting HR operations & talent acquisition in an ed-tech start-up.",
    skills: ["HR", "Recruitment", "People Ops"],
    color: "from-pink-500 to-fuchsia-500",
  },
  {
    id: 6,
    icon: <Award className="w-5 h-5" />,
    title: "Campus Ambassador",
    company: "GirlScript Summer of Code",
    location: "Remote",
    date: "Jun 2025 – Present",
    period: "Jun 2025 – Present",
    description:
      "Promoted open-source culture, mentoring first-time contributors & bridging with GSSoC core team.",
    skills: ["Open Source", "Mentoring", "Git", "GitHub"],
    color: "from-violet-500 to-indigo-500",
  },
  {
    id: 7,
    icon: <Briefcase className="w-5 h-5" />,
    title: "Data Science & Analytics Intern",
    company: "Zidio Development",
    location: "Bengaluru, India · Remote",
    date: "May 2025 – Present",
    period: "May 2025 – Present",
    description:
      "Applied NLP on 10k+ reviews; built 92%-accurate classifier & visualised insights guiding 3 feature rollouts.",
    skills: ["Python", "NLP", "Scikit-Learn", "Pandas", "Data Viz"],
    color: "from-teal-500 to-emerald-500",
  },
];

// Show only first 4 on the main timeline
const experiences = allExperiences.slice(0, 4);

interface ExperienceCardProps {
  experience: typeof experiences[0];
  index: number;
}

function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-white/20 to-transparent" />

      {/* Experience card */}
      <div className="relative flex gap-4">
        {/* Timeline dot */}
        <motion.div
          className="relative z-10 flex-shrink-0"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${experience.color} p-0.5`}>
            <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              {experience.icon}
            </div>
          </div>
          {isInView && (
            <motion.div
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${experience.color} blur-xl`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1.5 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          className="flex-1 pb-12"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Gradient overlay on hover */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0`}
              animate={{ opacity: isHovered ? 0.05 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Header */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
                  <p className="text-gray-300 font-medium">{experience.company}</p>
                </div>
                <motion.div
                  className={`px-3 py-1 rounded-full bg-gradient-to-r ${experience.color} text-xs font-medium text-white`}
                  whileHover={{ scale: 1.05 }}
                >
                  {experience.period}
                </motion.div>
              </div>

              {/* Location and date */}
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {experience.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {experience.date}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-200 leading-relaxed mb-4">{experience.description}</p>

              {/* Skills (glowing static badges) */}
              <div className="flex flex-wrap gap-2 mt-4">
                {experience.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="relative inline-flex items-center justify-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-transparent text-xs text-emerald-200 font-medium border border-emerald-400/40 backdrop-blur-sm"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(52,211,153,0.0)",
                        "0 0 8px rgba(52,211,153,0.8)",
                        "0 0 0px rgba(52,211,153,0.0)"
                      ],
                      textShadow: [
                        "0 0 0px rgba(52,211,153,0.0)",
                        "0 0 6px rgba(52,211,153,0.8)",
                        "0 0 0px rgba(52,211,153,0.0)"
                      ],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperienceTimelineModern() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={containerRef}
      className="relative max-w-4xl mx-auto py-20"
      style={{ opacity, scale }}
    >
      {/* Section header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Professional Journey
        </h2>
        <p className="text-xl text-gray-400">
          A timeline of my experiences and achievements
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {experiences.map((experience, index) => (
          <ExperienceCard key={experience.id} experience={experience} index={index} />
        ))}
      </div>

      {/* View full journey button */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Link href="/journey" passHref legacyBehavior>
          <motion.a
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Full Journey</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        </Link>
      </motion.div>
    </motion.div>
  );
} 