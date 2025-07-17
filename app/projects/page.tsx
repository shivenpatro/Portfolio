"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PageTransition } from "@/components/page-transition";

const projects = [
  {
    id: 1,
    title: "HashChat",
    description: "A secure, real-time chat DApp with end-to-end encryption using blockchain technology.",
    tech: ["Next.js", "Solidity", "Ethers.js", "Hardhat", "Tailwind CSS"],
    image: "/images/hashchat-bg.png",
    github: "https://github.com/shivenpatro/Hash-Chat",
    live: "https://hashchatbymechanoids.netlify.app/",
    category: "Blockchain",
    featured: true,
  },
  {
    id: 2,
    title: "IntelliApply",
    description: "AI platform to parse resumes & rank jobs. Frontend is live; backend deployment is paused due to free-tier resource limits.",
    tech: ["React", "FastAPI", "Supabase", "AI/ML", "Python", "Docker"],
    image: "/images/intelliapply-bg.png",
    github: "https://github.com/shivenpatro/IntelliApply",
    live: "https://intelli-apply.vercel.app/",
    category: "AI/ML",
    featured: true,
  },
  {
    id: 3,
    title: "Chrome Auto-Dino Bot",
    description: "An AI that learns to play Google's offline Chrome Dino game using a PyTorch Deep-Q-Network.",
    tech: ["Python", "PyTorch", "Selenium", "JavaScript", "Reinforcement Learning"],
    image: "/images/chrome-dino-bg.png",
    github: "https://github.com/shivenpatro/chrome-auto-dino-bot",
    live: null,
    category: "AI/ML",
    featured: true,
  },
  {
    id: 4,
    title: "Wine Quality Prediction",
    description: "A machine learning model to predict the quality of wine based on its chemical properties.",
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib", "Jupyter"],
    image: "/images/Wine Quality Prediction.png",
    github: "https://github.com/shivenpatro/wine_quality_prediction",
    live: null,
    category: "Data Science",
    featured: false,
  },
  {
    id: 5,
    title: "Stock Market Forecasting",
    description: "A web app for time-series analysis and forecasting of stock market data.",
    tech: ["Python", "Streamlit", "Prophet", "ARIMA", "Pandas"],
    image: "/images/Time Series Analysis and Forecasting.png",
    github: "https://github.com/shivenpatro/Time-Series-and-Forecasting",
    live: "https://stockpredictionforecast.streamlit.app/",
    category: "Data Science",
    featured: false,
  },
  {
    id: 6,
    title: "School Management API",
    description: "A comprehensive RESTful API for managing school operations.",
    tech: ["Node.js", "Express", "MongoDB", "REST API", "Mongoose"],
    image: "/images/School Management API.png",
    github: "https://github.com/shivenpatro/school-management-api",
    live: null,
    category: "Full Stack",
    featured: false,
  },
  {
    id: 7,
    title: "PopX UI Clone",
    description: "A pixel-perfect clone of the PopX UI, built as a frontend development task using ReactJS.",
    tech: ["React", "JavaScript", "CSS", "Vite"],
    image: "/images/Dev Task PopX UI Clone.png",
    github: "https://github.com/shivenpatro/DevTask",
    live: "https://dev-task-mocha.vercel.app/",
    category: "Frontend",
    featured: false,
  },
  {
    id: 8,
    title: "Budget Tracker",
    description: "A simple and intuitive web application to track income and expenses, with data visualization.",
    tech: ["HTML", "CSS", "JavaScript", "Chart.js"],
    image: "/images/budget-tracker-bg.png",
    github: "https://github.com/shivenpatro/budget-tracker",
    live: "https://shivenpatro.github.io/budget-tracker/",
    category: "Frontend",
    featured: false,
  },
   {
    id: 9,
    title: "Skincare Routine Timer",
    description: "A web app to help users follow their skincare routine with a step-by-step timer.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/images/skincare tracker timer.png",
    github: "https://github.com/shivenpatro/Skincare-Tracker-Timer",
    live: "https://skincare-tracker-timer.vercel.app/",
    category: "Frontend",
    featured: false,
  },
];

const categories = ["All", "Full Stack", "AI/ML", "Frontend", "Data Science", "Blockchain"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<number[]>([]);

  const toggleDescription = (id: number) => {
    setExpandedDescriptions(prev => 
        prev.includes(id) ? prev.filter(projId => projId !== id) : [...prev, id]
    );
  };

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 z-20">
          <motion.div
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ x: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.div>
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A collection of innovative solutions, creative experiments, and professional applications 
              that showcase the intersection of technology and imagination.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Highlighting the most innovative and impactful projects from my portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <p className="text-gray-200 mb-4">{project.description}</p>
                      <div className="flex gap-4 justify-center">
                        {project.github && (
                          <Link href={project.github} target="_blank">
                            <motion.div
                              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github className="w-6 h-6 text-white" />
                            </motion.div>
                          </Link>
                        )}
                        {project.live && (
                          <Link href={project.live} target="_blank">
                            <motion.div
                              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink className="w-6 h-6 text-white" />
                            </motion.div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              All Projects
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                      : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => {
              const isExpanded = expandedDescriptions.includes(project.id);
              return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-xs text-emerald-400 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="mb-4">
                    <p className={`text-gray-400 transition-all duration-300 ${!isExpanded ? 'line-clamp-2' : ''}`}>
                      {project.description}
                    </p>
                    <button 
                        onClick={() => toggleDescription(project.id)}
                        className="flex items-center text-sm text-emerald-400 hover:text-emerald-300 mt-2 font-medium"
                    >
                        <span>{isExpanded ? 'Show Less' : 'Show More'}</span>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-1"
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </button>
                  </div>
                  
                  <div className="flex-grow" />

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-md">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.github && (
                      <Link href={project.github} target="_blank" className="flex-1">
                        <motion.button
                          className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </motion.button>
                      </Link>
                    )}
                    {project.live && (
                      <Link href={project.live} target="_blank" className="flex-1">
                        <motion.button
                          className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-3xl p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Let's collaborate and bring your ideas to life with cutting-edge technology and innovative solutions.
            </p>
            <Link href="mailto:shivenrohini@gmail.com">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
} 