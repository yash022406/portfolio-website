"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import data from "@/lib/data.json";

const ease = [0.4, 0, 0.2, 1] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Photography() {
  const { photography } = data;
  const { instagram } = photography;
  const { trackEvent } = useTrackEvent();

  return (
    <section
      id="photography"
      className="px-6 md:px-12 py-16 md:py-24 bg-photography text-photography-foreground border-y-4 border-border"
    >
      <motion.div
        className="ml-auto mb-8 md:mb-12 max-w-2xl space-y-3 text-right"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease }}
      >
        <h2 className="text-3xl md:text-4xl font-heading">
          {photography.title}
        </h2>
        <p className="text-base md:text-lg opacity-90">
          {photography.subtitle}
        </p>
      </motion.div>

      {/* 2×2 grid of 4:5 photos */}
      <div className="mx-auto max-w-3xl">
        <motion.ul
          className="grid grid-cols-2 gap-4 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {photography.photos.map((photo) => (
            <motion.li
              key={photo.src}
              variants={itemVariants}
              className="overflow-hidden rounded-base border-4 border-border shadow-[6px_6px_0_0_var(--chart-3)]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 368px, 45vw"
                className="aspect-4/5 w-full object-cover motion-safe:transition-transform motion-safe:duration-500 hover:scale-105"
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <p className="mt-8 md:mt-10 text-center text-sm md:text-base opacity-90">
        Peek through my Lens at{" "}
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading underline underline-offset-4 hover:opacity-80"
          onClick={() =>
            trackEvent("photography_instagram_click", { url: instagram.url })
          }
        >
          {instagram.handle}
        </a>
      </p>
    </section>
  );
}
