import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { Button } from './ui/button';

const projects = [
  {
    title: 'Long Title Goes Here',
    description: 'Description text paragraph goes here...',
    badges: ['Design', 'Development', 'Strategy', 'Research'],
    image: '/placeholder.jpg',
    direction: 'right',
  },
  {
    title: 'Long Title Goes Here',
    description: 'Description text paragraph goes here...',
    badges: ['Design', 'Development', 'Strategy', 'Research'],
    image: '/placeholder.jpg',
    direction: 'left',
  },
  {
    title: 'Long Title Goes Here',
    description: 'Description text paragraph goes here...',
    badges: ['Design', 'Development', 'Strategy', 'Research'],
    image: '/placeholder.jpg',
    direction: 'right',
  },
  {
    title: 'Long Title Goes Here',
    description: 'Description text paragraph goes here...',
    badges: ['Design', 'Development', 'Strategy', 'Research'],
    image: '/placeholder.jpg',
    direction: 'left',
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function FeaturedProjects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  // Only animate in if at least 50% of the section is visible (not on load)
  const isInView = useInView(titleRef, { amount: 0.5, once: true });
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 w-full max-w-5xl mx-auto px-4">
      <motion.h2
        ref={titleRef}
        className="text-3xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        FEATURED PROJECTS
      </motion.h2>
      <div className="flex flex-col gap-20">
        {projects.map((project, i) => (
          <ProjectCard key={i} {...project} />
        ))}
      </div>
      <div className="flex justify-center mt-16">
        <Button asChild>
          <a href="/projects">VIEW ALL PROJECTS</a>
        </Button>
      </div>
    </section>
  );
}
