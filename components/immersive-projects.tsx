"use client";

import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "hashchat",
    title: "HashChat",
    description: "A secure, real-time chat application with end-to-end encryption using the SHA-256 algorithm.",
    tech: ["React", "Firebase", "WebSockets", "Encryption"],
    backgroundImage: "/images/hashchat-bg.png", // Replace with your actual image
    url: "https://github.com/shivenpatro/Hash-Chat",
  },
  {
    id: "intelliapply",
    title: "IntelliApply",
    description: "An AI-powered platform that parses resumes, scrapes job boards, and ranks relevant openings.",
    tech: ["React", "FastAPI", "Supabase", "AI"],
    backgroundImage: "/images/intelliapply-bg.png", // Replace with your actual image
    url: "https://github.com/shivenpatro/IntelliApply",
  },
  {
    id: "chrome-dino-bot",
    title: "Chrome Auto-Dino Bot",
    description: "A self-contained project that teaches Google's offline Chrome Dino game to play itself using a hybrid JavaScript game-state tap and a small PyTorch Deep-Q-Network.",
    tech: ["Python", "PyTorch", "Selenium", "JavaScript"],
    backgroundImage: "/images/chrome-dino-bg.png",
    url: "https://github.com/shivenpatro/chrome-auto-dino-bot",
  },
];

export function ImmersiveProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray(".project-scene");
      scenes.forEach((scene: any, i: number) => {
        const isLast = i === scenes.length - 1;
        
        // Select the content *inside* the scene that will be animated.
        const image = scene.querySelector(".project-bg");
        const textContent = scene.querySelector(".project-text");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top top",
            pin: true,
            scrub: 1,
            // Extend the final scene's duration for a slower, more graceful exit.
            end: isLast ? "+=150%" : "bottom top",
          },
        });

        // Animate the content into view.
        tl.from(
          [image, textContent],
          { autoAlpha: 0, y: "5vh", stagger: 0.1, duration: 0.5, ease: "power2.out" }
        );

        // Add a subtle parallax and zoom to the background image for more depth.
        tl.fromTo(
          image,
          { yPercent: 0, scale: 1.05 },
          { yPercent: 10, scale: 1.15, ease: "none" },
          "<" // Start at the same time as the text animation.
        );

        // For the last scene, add a fade-out animation for its content.
        // This hides the content before the scene unpins, preventing any lingering images.
        if (isLast) {
          // This fade-out animation starts after the main content has appeared and
          // is timed to complete just as the scene is about to unpin.
          tl.to(
            [image, textContent],
            { autoAlpha: 0, filter: "blur(8px)", ease: "power1.in" },
            ">" // Start this immediately after the previous animations finish.
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {projects.map((project, i) => {
        const isLast = i === projects.length - 1;
        return (
          <section key={project.id} className="project-scene h-screen flex items-center justify-center">
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={project.backgroundImage}
                alt={project.title}
                layout="fill"
                // The last image now uses 'cover' to ensure it fills the screen,
                // completely hiding the project underneath it.
                objectFit="cover"
                className="project-bg"
              />
            </div>
            
            <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
              <div className="project-text bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
                <h2 className="text-4xl font-bold text-white mb-4">{project.title}</h2>
                <p className="text-lg text-gray-300 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.tech.map((tech) => (
                    <motion.span
                      key={tech}
                      className="px-3 py-1 bg-white/10 text-white text-sm rounded-full cursor-pointer"
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(52, 211, 153, 0.3)', color: '#6ee7b7' }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  <motion.span
                    className="inline-flex items-center gap-2 text-emerald-400 font-semibold"
                    whileHover={{ gap: "1rem" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    View Project <ExternalLink className="w-5 h-5" />
                  </motion.span>
                </Link>
              </div>
            </div>
          </section>
        );
      })}
      
      {/* Explore All Projects Section */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Ready for More?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Dive deeper into my complete portfolio of innovative projects and creative solutions
            </p>
            
            <Link href="/projects">
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Glowing background effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                
                <motion.button className="relative px-12 py-6 text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Explore All Projects
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      →
                    </motion.div>
                  </span>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                </motion.button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 