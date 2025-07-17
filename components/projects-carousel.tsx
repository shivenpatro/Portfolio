"use client"

import React, { useRef, useMemo, useCallback } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, EffectCoverflow, Mousewheel } from "swiper/modules"
import type { Swiper as SwiperInstance } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-coverflow"

// Icons for navigation arrows
import { ChevronLeft, ChevronRight } from "lucide-react"

import { motion } from "framer-motion"
import { ThreeDCard } from "./3d-card"
import { RevealElement } from "./reveal-element"
import DecryptedText from "./decrypted-text"
import { ExternalLink } from "lucide-react"
import ScrambledText from "./scrambled-text"

// Re-use existing tag + button styles from Tailwind classes already used in cards

interface Project {
  title: string
  description: string
  image: string
  url: string
  tags: string[]
  category: string
}

interface ProjectsCarouselProps {
  projects: Project[]
  onContactClick: () => void
}

const PRIMARY_GREEN = "#4CAF50"

/**
 * ProjectsCarousel renders a swipeable (Swiper.js) carousel that shows one project card at a time with
 * a peek of the neighbouring cards.  After the last real project a special "Final Call-To-Action" card
 * is appended.  Navigation arrows + pagination bullets are enabled and fully responsive.
 */
export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects, onContactClick }) => {
  const swiperRef = useRef<any>(null)

  // Append the static final card *only once* per render cycle
  const slides = useMemo(() => {
    return [...projects, { title: "__final__" } as Project]
  }, [projects])

  const handleGithubClick = useCallback(() => {
    window.open("https://github.com/shivenpatro", "_blank")
  }, [])

  return (
    <div className="relative w-full max-w-5xl mx-auto" id="projects-carousel">
      {/* Custom navigation buttons */}
      <button
        id="projects-prev"
        className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-700/40 text-white hover:bg-[var(--primary-green)] transition-colors"
        style={{
          // Using CSS variable lets us reuse in dark / light seamlessly
          //@ts-ignore
          "--primary-green": PRIMARY_GREEN,
        }}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        id="projects-next"
        className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-gray-700/40 text-white hover:bg-[var(--primary-green)] transition-colors"
        style={{
          //@ts-ignore
          "--primary-green": PRIMARY_GREEN,
        }}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <Swiper
        // key prop forces Swiper to remount when project list changes (important for filter buttons)
        key={projects.map(p => p.title).join("-")}
        modules={[Navigation, Pagination, EffectCoverflow, Mousewheel]}
        onSwiper={(swiper: SwiperInstance) => (swiperRef.current = swiper)}
        centeredSlides
        effect="coverflow"
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 1, slideShadows: false }}
        grabCursor
        slidesPerView={1.1}
        spaceBetween={-80}
        mousewheel={{ forceToAxis: true }}
        navigation={{ prevEl: "#projects-prev", nextEl: "#projects-next" }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: -60 },
          640: { slidesPerView: 1.1, spaceBetween: -80 },
          1024: { slidesPerView: 1.3, spaceBetween: -100 },
        }}
        className="pb-12" // extra bottom padding for pagination dots
      >
        {slides.map((project, idx) => (
          <SwiperSlide key={idx} className="!flex !justify-center">
            {project.title === "__final__" ? (
              // Final Call-To-Action card
              <ThreeDCard className="max-w-md w-full">
                <div className="bg-gradient-to-br from-purple-600/60 to-indigo-800/60 dark:from-purple-800/60 dark:to-indigo-900/60 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-800 text-center flex flex-col h-full">
                  <h3 className="text-3xl font-bold mb-4 text-white">
                    Let's Build Something Amazing
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Thank you for exploring my work. If you have an idea, a project, or an opportunity you'd like to discuss, I'm ready to connect.
                  </p>

                  <div className="mt-auto flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={onContactClick}
                      className="px-6 py-3 rounded-lg bg-[var(--primary-green)] text-white font-medium hover:bg-green-600 transition-colors"
                      style={{ //@ts-ignore
                        "--primary-green": PRIMARY_GREEN,
                      }}
                    >
                      Contact Me
                    </button>
                    <button
                      onClick={handleGithubClick}
                      className="px-6 py-3 rounded-lg border-2 border-[var(--primary-green)] text-[var(--primary-green)] font-medium hover:bg-[var(--primary-green)] hover:text-white transition-colors"
                      style={{ //@ts-ignore
                        "--primary-green": PRIMARY_GREEN,
                      }}
                    >
                      See More on GitHub
                    </button>
                  </div>
                </div>
              </ThreeDCard>
            ) : (
              // Regular project card; re-use existing markup inside SwiperSlide
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="max-w-md w-full"
              >
                <RevealElement direction="up" >
                  <ThreeDCard className="h-full">
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 h-full flex flex-col">
                      <div className="relative h-48 lg:h-56 overflow-hidden group">
                        <motion.div
                          className="absolute inset-0 bg-gray-900/30"
                          whileHover={{ opacity: 0.3 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white z-20">
                          <ScrambledText>
                            <DecryptedText
                              text={project.title}
                              animateOn="view"
                              sequential
                              parentClassName="text-white"
                            />
                          </ScrambledText>
                        </h3>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <p className="mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                          {project.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <motion.a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center font-medium mt-auto"
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project <ExternalLink className="ml-1 w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </ThreeDCard>
                </RevealElement>
              </motion.div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProjectsCarousel 