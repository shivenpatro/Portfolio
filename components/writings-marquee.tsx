"use client";

import { motion, useAnimation, Variants, RepeatType } from "framer-motion";
import { BlogCard, Blog } from "./blog-card";
import { useEffect } from "react";

// Real blog data
const blogs: Blog[] = [
  {
    title: "Deploy or Die Trying: The Broke Student’s Guide to Backend Hosting Meltdowns",
    description: "A relatable and humorous take on the struggles of deploying backend projects as a student on a budget.",
    link: "https://medium.com/@shivenpatro2018/deploy-or-die-trying-the-broke-students-guide-to-backend-hosting-meltdowns-95daf6920636",
    tags: ["Deployment", "Backend", "Student Life"],
  },
  {
    title: "Open Source Is Catching Up, and Honestly? It’s Kind of Iconic",
    description: "An exploration of the power and beauty of open-source software, and why it's a game-changer for indie devs.",
    link: "https://medium.com/@shivenpatro2018/open-source-is-catching-up-and-honestly-its-kind-of-iconic-dfc14bc1c450",
    tags: ["Open Source", "Development", "AI"],
  },
  {
    title: "Sweat & Syntax: How the Gym and Tech Together Built Me Better",
    description: "A reflection on the surprising parallels between weightlifting and coding, and how discipline in one area can improve the other.",
    link: "https://medium.com/@shivenpatro2018/sweat-syntax-how-the-gym-and-tech-together-built-me-better-fdce97c0e6b8",
    tags: ["Discipline", "Tech", "Lifestyle"],
  },
  // Add more blogs here if needed
];

const marqueeVariants: Variants = {
  animate: {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as RepeatType,
        duration: 40,
        ease: "linear",
      },
    },
  },
};

export function WritingsMarquee() {
  const controls = useAnimation();
  
  const handleHoverStart = () => {
    controls.stop();
  };

  const handleHoverEnd = () => {
    controls.start("animate");
  };

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  // Duplicate the blogs array to create a seamless loop
  const duplicatedBlogs = [...blogs, ...blogs, ...blogs];

  return (
    <div 
      className="relative w-full overflow-hidden py-12 group"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <motion.div
        className="flex"
        variants={marqueeVariants}
        animate={controls}
      >
        {duplicatedBlogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
    </div>
  );
} 