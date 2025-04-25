import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Badge } from './ui/badge';

const fadeInVariants = (direction: 'left' | 'right') => ({
  hidden: { opacity: 0, x: direction === 'left' ? -80 : 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
});

interface ProjectCardProps {
  title: string;
  description: string;
  badges: string[];
  image: string;
  direction: 'left' | 'right';
}

export default function ProjectCard({ title, description, badges, image, direction }: ProjectCardProps) {
  const isImageLeft = direction === 'left';
  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
      <motion.div
        className="flex-1 w-full max-w-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants(isImageLeft ? 'left' : 'right')}
      >
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="rounded-xl object-cover w-full h-48 md:h-56 lg:h-64 shadow-lg bg-gray-200"
          priority={false}
        />
      </motion.div>
      <motion.div
        className="flex-1 w-full flex flex-col items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInVariants(isImageLeft ? 'right' : 'left')}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2">{title}</h3>
        <p className="mb-4 text-base md:text-lg text-muted-foreground">{description}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {badges.map((badge, i) => (
            <Badge key={i} variant={badge.toLowerCase() as "design" | "development" | "strategy" | "research"}>{badge}</Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
