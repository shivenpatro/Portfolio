"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export interface Blog {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={blog.link} target="_blank" rel="noopener noreferrer" className="block w-[350px] h-[220px] flex-shrink-0 mx-4 group">
      <motion.div
        className="w-full h-full bg-gray-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col justify-between overflow-hidden relative"
        whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 10px 30px rgba(0, 255, 150, 0.1)" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Subtle gradient glow */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{blog.title}</h3>
          <p className="text-sm text-gray-400 line-clamp-3">{blog.description}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between mt-4">
          <div className="flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                {tag}
              </span>
            ))}
          </div>
          <div className="p-2 rounded-full bg-white/10 group-hover:bg-emerald-500/20 transition-colors">
            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
} 