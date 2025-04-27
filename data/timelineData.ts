// Timeline data array for /hannah page
// Images should be placed in /public/timeline1.jpg, timeline2.jpg, etc.
export interface TimelineEvent {
  title: string;
  description: string;
  image: string; // relative path, e.g. '/timeline1.jpg'
  date: string; // ISO format, e.g. '2024-10-16'
}

export const timelineData: TimelineEvent[] = [
  {
    title: "First Meeting",
    description: "We met for the very first time.",
    image: "/timeline1.jpg",
    date: "2023-02-14",
  },
  {
    title: "First Trip",
    description: "Our first trip together.",
    image: "/timeline2.jpg",
    date: "2023-05-10",
  },
  {
    title: "Moved In",
    description: "We moved in together!",
    image: "/timeline3.jpg",
    date: "2023-09-01",
  },
  {
    title: "Engagement",
    description: "We got engaged!",
    image: "/timeline4.jpg",
    date: "2024-03-22",
  },
];
