"use client"

import { motion, useReducedMotion } from "motion/react"

export function RisingWords({ text, replayKey, className }: { text: string; replayKey: string; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <span key={replayKey} className={className}>
      {text.split(" ").map((word, i, words) => (
        <span key={`${word}-${i}`} data-word className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.12 + i * 0.06 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  )
}
