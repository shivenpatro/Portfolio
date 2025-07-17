"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { AnimatedButton } from "@/components/animated-button";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xblyvjnk";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT) {
      alert("Formspree endpoint missing. Please set NEXT_PUBLIC_FORMSPREE_ENDPOINT env variable.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else throw new Error("network");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg focus:outline-none text-foreground border border-gray-300 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg focus:outline-none text-foreground border border-gray-300 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white transition-colors"
        />
      </div>
      <textarea
        name="message"
        rows={6}
        placeholder="Message"
        required
        value={formData.message}
        onChange={handleChange}
        className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg focus:outline-none text-foreground border border-gray-300 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white transition-colors"
      />

      {status === "sent" ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 font-medium">
          Message sent! I'll get back to you soon.
        </motion.p>
      ) : (
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <Mail className="w-5 h-5" />
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      )}

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again later.</p>
      )}
    </form>
  );
} 