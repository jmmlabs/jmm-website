// Timeline data array for /hannah page
// Images should be placed in /public/timeline/timeline1-1.jpg, timeline1-2.jpg, etc.
export interface TimelineEvent {
  title: string;
  description: string;
  images: string[]; // array of relative paths, e.g. ['/timeline/timeline1-1.jpg', '/timeline/timeline1-2.jpg']
  date: string; // ISO format, e.g. '2024-10-16'
}

export const timelineData: TimelineEvent[] = [
  {
    title: "Meet Cute",
    description: "Jacob spots Hannah from across the bar and a golden ray of light shines down on her stylish gray outfit. He approaches her and learns about her love for swamp water martinis, her handsome cat, Monkey Boy, and that she is unfortunately seeing someone at the time. Jacob knows he can't miss this once in a lifetime opportunity and somehow persists to get her number. Once this tremendous feat has been accomplished he knows his work is done and he can promptly leaves, smiling all the way home, hoping they will meet again one day.",
    images: [
      "/hannah-timeline/01-meet-cute/img1-speed-dating.jpg",
      "/hannah-timeline/01-meet-cute/img2-first-text.jpg",
      "/hannah-timeline/01-meet-cute/img3-julia-eric-text.jpg"
    ],
    date: "2024-10-16",
  },
  {
    title: "Our First Date",
    description: "After months of patiently waiting, back and forth over Hinge and text, multiple flat tires, and a Dallaskan snow storm, Jacob and Hannah finally get to reconnect for their first date over martinis at Hudson House and share their first kiss in the chilly parking lot as Jacob fills up Hannah's tires and wishes her a safe drive home.",
    images: [
      "/hannah-timeline/02-first-date/img1-hudson-house.jpg",
      "/hannah-timeline/02-first-date/img2-frisc-first-look.jpg",
      "/hannah-timeline/02-first-date/img3-fortune.jpg"
    ],
    date: "2025-01-10",
  },
  {
    title: "Hole in One",
    description: "After a tough day day prior and a Blue Velvet pre-game. Hannah showed off her competitive side and golf prowess to made quick work of Jacob with a combined 6 holes in one!! But the best part of the night was yet to come with the drive home and nightcap, sharing special songs, 'In Spite of Ourselves,' and 'Enchanted,' our old school films, creating new memories together, and getting to meet Frisc!!! Hannah might have gotten the holes in one but Jacob was the lucky one :). ",
    images: [
      "/hannah-timeline/03-hole-in-one/img1-hannah-winner-jacob-loser.jpg",
      "/hannah-timeline/03-hole-in-one/img3-golf-score.jpg",
      "/hannah-timeline/03-hole-in-one/img4-text-last-names.jpg",
      "/hannah-timeline/03-hole-in-one/img5-blue-velvet-poster.jpg"
    ],
    date: "2025-01-17",
  },
  {
    title: "First Vday",
    description: "tough then great",
    images: [
      "/hannah-timeline/04-first-vday/img1-borderlands-comments.jpg",
      "/hannah-timeline/04-first-vday/img2-roses.jpg",
      "/hannah-timeline/04-first-vday/img3-carbone-candle.jpg",
      "/hannah-timeline/04-first-vday/img4-frisc-toy.jpg"
    ],
    date: "2025-02-15",
  },
  {
    title: "Exclusive",
    description: "Jacob professes his feelings over Mickey 17",
    images: [
      "/hannah-timeline/05-exclusive/img1-creeper.jpg",
      "/hannah-timeline/05-exclusive/img2-mickey17.jpg",
      "/hannah-timeline/05-exclusive/img3-flix-brewhouse.jpg"
    ],
    date: "2025-03-12",
  },
  {
    title: "St Patty's",
    description: "Meet all my friends :) almost die because of spicy food - also watched borderlands the night before",
    images: [
      "/hannah-timeline/06-st-pattys/img1-hannah-adam-abby.jpg",
      "/hannah-timeline/06-st-pattys/img2-borderlands-patty.jpg",
      "/hannah-timeline/06-st-pattys/img3-tarot.jpg"
    ],
    date: "2025-03-15",
  },
  {
    title: "First Airport Trip",
    description: "airport trip",
    images: [
      "/hannah-timeline/07-first-airport-trip/img1-rock.jpg",
      "/hannah-timeline/07-first-airport-trip/img2-hannah-family.jpg",
      "/hannah-timeline/07-first-airport-trip/img3-hannah-g.jpg"
    ],
    date: "2025-03-27",
  },
  {
    title: "Popstroke",
    description: "most fun date ever, car, cosm, ping pong",
    images: [
      "/hannah-timeline/08-popstroke/img1-popstroke-ghibli.jpg"
    ],
    date: "2025-04-12",
  },
  {
    title: "First Joust",
    description: "medieval times",
    images: [
      "/hannah-timeline/09-medieval-times/img1-medieval-times.jpg",
      "/hannah-timeline/09-medieval-times/img4-cleanser.jpeg"
    ],
    date: "2025-04-19",
  },
  {
    title: "Best Call Ever",
    description: "Opening up about past relationships",
    images: [
      "/hannah-timeline/10-best-call-ever/img1-phone-ghibli.jpg",
      "/hannah-timeline/10-best-call-ever/img2-playlist.jpg"
    ],
    date: "2025-04-25",
  },
  {
    title: "First Film Together",
    description: "Sequoia",
    images: [
      "/hannah-timeline/11-first-film-together/img1-hannah-light.jpg",
      "/hannah-timeline/11-first-film-together/img2-hannah-light2.jpg",
      "/hannah-timeline/11-first-film-together/img3-hannah-under.jpg",
      "/hannah-timeline/11-first-film-together/img4-hannah-under2.jpg",
      "/hannah-timeline/11-first-film-together/img5-hannah-scared.jpg"
    ],
    date: "2025-05-03",
  },
  {
    title: "28th Birthday",
    description: "Tonight!!",
    images: [
      "/hannah-timeline/12-28th-birthday/img1-birthday-ghibli.jpg"
    ],
    date: "2025-05-10",
  },
];

// --- Data Validation: Remove empty or duplicate image paths from all timeline events at runtime ---
export const getValidatedTimelineData = (): TimelineEvent[] => {
  // Helper to filter out empty/falsey and duplicate image paths per event
  return timelineData.map(event => ({
    ...event,
    images: Array.from(new Set(event.images.filter(img => !!img && img.trim() !== "")))
  })).filter(event => event.images.length > 0);
};
