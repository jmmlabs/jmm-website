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
    title: "First Date",
    description: "Our first date was at the campus coffee shop.",
    image: "/timeline6.jpg",
    date: "2021-02-13",
  },
  {
    title: "Trip to the Lake",
    description: "We spent a sunny weekend at the lake with friends.",
    image: "/timeline2.jpg",
    date: "2021-05-22",
  },
  {
    title: "First Concert Together",
    description: "Saw our favorite band live for the first time.",
    image: "/timeline3.jpg",
    date: "2021-09-10",
  },
  {
    title: "Moved In Together",
    description: "We moved into our first apartment.",
    image: "/timeline4.jpg",
    date: "2022-01-15",
  },
  {
    title: "Adopted Luna",
    description: "Brought home our cat Luna!",
    image: "/timeline5.jpg",
    date: "2022-06-01",
  },
];
