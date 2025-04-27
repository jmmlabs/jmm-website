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
    title: "Meet Cute",
    description: "Jacob spots Hannah from across the bar and a golden ray of light shines down on her stylish gray outfit. He approaches her and learns about her love for swamp water martinis, her handsome cat, Monkey Boy, and that she is unfortunately seeing someone at the time. Jacob knows he can't miss this once in a lifetime opportunity and somehow persists to get her number. Once this tremendous feat has been accomplished he knows his work is done and he can promptly leaves, smiling all the way home, hoping they will meet again one day.",
    image: "/timeline1.jpg",
    date: "2024-10-16",
  },
  {
    title: "Our First Date",
    description: "After months of patiently waiting, back and forth over Hinge and text, multiple flat tires, and a Dallaskan snow storm, Jacob and Hannah finally get to reconnect for their first date over martinis at Hudson House and share their first kiss in the chilly parking lot as Jacob fills up Hannah's tires and wishes her a safe drive home.",
    image: "/timeline2.jpg",
    date: "2025-01-10",
  },
  {
    title: "Hole in One",
    description: "After a tough day day prior and a Blue Velvet pre-game. Hannah showed off her competitive side and golf prowess to made quick work of Jacob with a combined 6 holes in one!! But the best part of the night was yet to come with the drive home and nightcap, sharing special songs, 'In Spite of Ourselves,' and 'Enchanted,' our old school films, creating new memories together, and getting to meet Frisc!!! Hannah might have gotten the holes in one but Jacob was the lucky one :). ",
    image: "/timeline3.jpg",
    date: "2025-01-17",
  },
  {
    title: "Our First Movie",
    description: "Companion movie",
    image: "/timeline4.jpg",
    date: "2025-01-30",
  },
  {
    title: "First Valentine's Day",
    description: "tough then great",
    image: "/timeline5.jpg",
    date: "2025-02-15",
  },
  {
    title: "Exclusive",
    description: "Jacob professes his feelings over Mickey 17",
    image: "/timeline6.jpg",
    date: "2025-03-12",
  },
  {
    title: "Hannah Takes St. Patty's",
    description: "Meet all my friends :) almost die because of spicy food - also watched borderlands the night before",
    image: "/timeline7.jpg",
    date: "2025-03-14",
  },
  {
    title: "Jacob's feelings",
    description: "sappy",
    image: "/timeline8.jpg",
    date: "2025-04-02",
  },
  {
    title: "Jacob's revenge",
    description: "most fun date ever, car, cosm, ping pong",
    image: "/timeline9.jpg",
    date: "2025-04-12",
  },
  {
    title: "First Joust",
    description: "new best date ever",
    image: "/timeline10.jpg",
    date: "2025-04-19",
  },
  {
    title: "Best Movie Ever",
    description: "Sinners",
    image: "/timeline11.jpg",
    date: "2025-04-23",
  },
  {
    title: "Best Call Ever",
    description: "Opening up about past relationships",
    image: "/timeline12.jpg",
    date: "2025-04-25",
  },
];
