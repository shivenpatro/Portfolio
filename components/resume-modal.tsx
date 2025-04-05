"use client"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Code, Database } from "lucide-react"
import { useState, useEffect } from "react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [resumeFiles, setResumeFiles] = useState({
    dataScienceResumeExists: false,
    softwareEngineeringResumeExists: false,
  })

  useEffect(() => {
    // Check if resume files exist
    const checkFiles = async () => {
      try {
        // Use a try-catch for each fetch to handle individual failures
        let dsExists = false
        let seExists = false

        try {
          const dsResponse = await fetch("/Shiven_Data_Science_Resume.pdf", {
            method: "HEAD",
            // Add cache control to prevent caching issues
            headers: { "Cache-Control": "no-cache" },
          })
          dsExists = dsResponse.ok
        } catch (e) {
          console.log("Could not check data science resume")
        }

        try {
          const seResponse = await fetch("/Shiven_Softeware_Engineering_Resume.pdf", {
            method: "HEAD",
            headers: { "Cache-Control": "no-cache" },
          })
          seExists = seResponse.ok
        } catch (e) {
          console.log("Could not check software engineering resume")
        }

        setResumeFiles({
          dataScienceResumeExists: dsExists,
          softwareEngineeringResumeExists: seExists,
        })
      } catch (error) {
        console.error("Error checking resume files:", error)
        // Set both to false if there's an overall error
        setResumeFiles({
          dataScienceResumeExists: false,
          softwareEngineeringResumeExists: false,
        })
      }
    }

    if (isOpen) {
      checkFiles()
    }
  }, [isOpen])

  const handleDownload = (type: string) => {
    const filename = type === "data-science" ? "Shiven_Data_Science_Resume.pdf" : "Shiven_Softeware_Engineering_Resume.pdf"

    // Check if file exists before attempting download
    const fileExists =
      type === "data-science" ? resumeFiles.dataScienceResumeExists : resumeFiles.softwareEngineeringResumeExists

    if (!fileExists) {
      alert(`The ${type} resume is not available yet. Please upload it to the public folder.`)
      return
    }

    // Create a temporary anchor element to trigger the download
    const link = document.createElement("a")
    link.href = `/${filename}`
    link.setAttribute("download", filename)
    link.setAttribute("target", "_blank")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-indigo-500/20">
              <div className="relative p-6">
                <motion.button
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  onClick={onClose}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
                <h3 className="text-2xl font-bold mb-2 text-white">Choose Resume Type</h3>
                <p className="text-gray-300 mb-6">Select the resume that best matches your interests</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg border border-indigo-500/30 hover:border-indigo-400 transition-all duration-300"
                    onClick={() => handleDownload("data-science")}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    disabled={!resumeFiles.dataScienceResumeExists}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-4 p-3 bg-indigo-600/30 rounded-full">
                        <Database className="w-8 h-8 text-indigo-300" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">Data Science</h4>
                      <p className="text-gray-300 text-center text-sm">ML, Data Analysis & AI focused resume</p>
                      <motion.div
                        className="mt-4 flex items-center text-indigo-400 font-medium"
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <FileText className="w-4 h-4 mr-1" /> Download
                      </motion.div>
                    </div>
                  </motion.button>

                  <motion.button
                    className="group relative flex flex-col items-center p-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-lg border border-purple-500/30 hover:border-purple-400 transition-all duration-300"
                    onClick={() => handleDownload("software-engineering")}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    disabled={!resumeFiles.softwareEngineeringResumeExists}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="mb-4 p-3 bg-purple-600/30 rounded-full">
                        <Code className="w-8 h-8 text-purple-300" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">Software Engineering</h4>
                      <p className="text-gray-300 text-center text-sm">
                        Web Dev, Programming & Software focused resume
                      </p>
                      <motion.div
                        className="mt-4 flex items-center text-purple-400 font-medium"
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <FileText className="w-4 h-4 mr-1" /> Download
                      </motion.div>
                    </div>
                  </motion.button>
                </div>

                {(!resumeFiles.dataScienceResumeExists || !resumeFiles.softwareEngineeringResumeExists) && (
                  <p className="mt-4 text-amber-400 text-sm text-center">
                    Note: Please upload your resume PDFs to the public folder for the download functionality to work
                    properly.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

