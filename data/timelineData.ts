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
    description: "Jacob spots Hannah from across the bar, and a golden ray of light shines down on her beautiful smile and stylish gray outfit. He approaches her and learns about her love for swamp water martinis, her handsome cat, Monkey Boy, and that she is unfortunately seeing someone at the time. Jacob knows he can't miss this once-in-a-lifetime opportunity and somehow persists to get her number. Once this tremendous feat has been accomplished, he knows his work is done, and he promptly leaves, smiling all the way home, hoping they will meet again one day.",
    images: [
      "/hannah-timeline/01-meet-cute/img1-hannah-first-look.jpg",
      "/hannah-timeline/01-meet-cute/img1-speed-dating.jpg",
      "/hannah-timeline/01-meet-cute/img2-first-text.jpg",
      "/hannah-timeline/01-meet-cute/img3-julia-eric-text.jpg"
    ],
    date: "2024-10-16",
  },
  {
    title: "First Date",
    description: "After 4 months of patiently waiting, back-and-forths over Hinge and text, multiple flat tires, and a Dallaskan snowstorm, Jacob and Hannah overcome all the odds and finally reconnect for their first date. After enjoying a few martinis at Hudson House, they share their first kiss in the chilly parking lot as Jacob finishes filling up Hannah's tires, and wishes her a safe drive on her long ride home to Monkey Boy.",
    images: [
      "/hannah-timeline/02-first-date/img1-hudson-house.jpg",
      "/hannah-timeline/02-first-date/img2-frisc-first-look.jpg",
      "/hannah-timeline/02-first-date/img3-fortune.jpg"
    ],
    date: "2025-01-10",
  },
  {
    title: "Hole in One",
    description: "After an untimely `Blue Velvet` showing the day before, Hannah showed off her competitive side and golf prowess, making quick work of Jacob with a combined 6 holes-in-one!! Surprisingly, the best part of the night was yet to come: sharing intimate stories at the bar, special songs on the drive home, `In Spite of Ourselves` and `Enchanted,` and watching our old school films over a nightcap inside Hannah's apartment. Hannah and Jacob created new memories together, and Jacob got to meet Frisc for the first time!!! Hannah might have gotten the holes-in-one, but Jacob was the lucky one :)",
    images: [
      "/hannah-timeline/03-hole-in-one/img1-hannah-winner-jacob-loser.jpg",
      "/hannah-timeline/03-hole-in-one/img3-golf-score.jpg",
      "/hannah-timeline/03-hole-in-one/img4-text-last-names.jpg",
      "/hannah-timeline/03-hole-in-one/img5-blue-velvet-poster.jpg"
    ],
    date: "2025-01-17",
  },
  {
    title: "First Valentine's",
    description: "The day started off great with well wishes and a showering of love from Borderlands fans. The only hiccup was that they were a bit too optimistic about the timing of their date that night. Jacob was disappointed that they weren't able to see each other, but everything was easily reconciled over a call the following day. He realized he had overreacted after seeing how genuinely sorry Hannah was, and appreciated how quickly she rescheduled that night. It might not have been as smooth as they had originally intended, but Jacob is infinitely grateful for the care they showed each other, how Hannah handled the situation, and how they resolved their first minor conflict together. They both had an amazing night filled with their favorite wine (Prisoner), Bundt cakes, a donut card, and a celebration at Carbone the following week, where Hannah got to see Jacob's place for the first time! Even Frisc got to join in the fun with his new toy, thankfully playing with that instead of the lilies Jacob got for Hannah.",
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
    description: "Seeing movies together had become a staple in Hannah and Jacob's relationship, and in any healthy relationship for that matter. So, Hannah introduced Jacob to her favorite movie theater, Flix Brewhouse. The two enjoyed long talks at the bar, followed by Bong Joon Ho's latest movie, `Mickey 17`, over Old Fashioneds, soft pretzels, and chicken fingers. It was another great date in the books, but Jacob knew he had to express himself and lock down this unicorn of a woman by explicitly confirming that they were exclusive. Hannah agreed, and they were happily on the same page.",
    images: [
      "/hannah-timeline/05-exclusive/img1-creeper.jpg",
      "/hannah-timeline/05-exclusive/img2-mickey17.jpg",
      "/hannah-timeline/05-exclusive/img3-flix-brewhouse.jpg"
    ],
    date: "2025-03-12",
  },
  {
    title: "Family & Friends",
    description: "After watching the `Borderlands` movie the night before, Jacob was excited to see Hannah, to celebrate St. Paddy's Day with her, and more than anything, to introduce her to his brother Adam, Adam's girlfriend Abby, and many of his closest friends. Hannah fit in instantly with everyone and hit it off with Adam & Abby, learning about each other and reminiscing about their favorite shows and movies. She did just as well with all of Jacob's friends (especially Jenni), getting her tarot cards read, managing not to reveal any Borderlands 4 secrets, and even stayed after to grab a bite to eat with everyone. Unfortunately, that bite turned out to be a spicy ghost pepper wing that almost murdered them both. Even so, it was a perfect day. The next week Hannah was even thoughtful enough to briefly introduce Jacob to her siblings Spencer and Gigi and Spencer's girlfriend Abby over FaceTime. They had a great call, and it made Jacob really happy that Hannah went out of her way to share something so sweet with him.",
    images: [
      "/hannah-timeline/06-st-pattys/img1-hannah-adam-abby.jpg",
      "/hannah-timeline/06-st-pattys/img2-borderlands-patty.jpg",
      "/hannah-timeline/06-st-pattys/img3-tarot.jpg"
    ],
    date: "2025-03-15",
  },
  {
    title: "First Airport Trip",
    description: "Hannah was ready to face her fear of flying and to travel back home to her family in Aiken for the first time this year. Jacob knew how important Hannah's family is to her, and was happy to support her. He wanted her to feel safe and special on her journey home, so he gave her a token to hold onto during her flight and a note in her suitcase as he dropped her off at the airport. He'll still never understand why she decided to torture herself by watching `Twisters` on the plane, but was very happy she made it there and back safely after a joyous weekend of spray tans, music, White Claws, Trivial Pursuit, and only one forgotten water bottle.",
    images: [
      "/hannah-timeline/07-first-airport-trip/img1-rock.jpg",
      "/hannah-timeline/07-first-airport-trip/img2-hannah-family.jpg",
      "/hannah-timeline/07-first-airport-trip/img3-hannah-g.jpg"
    ],
    date: "2025-03-27",
  },
  {
    title: "Best Date Ever",
    description: "The date could have gotten off to a rocky start after Jacob couldn't find parking and tried to squeeze into a very tight spot, one that Hannah warned him against, where he ended up scraping the side of his car. Here he learned a very important lesson, always listen to Hannah. This was unfortunate, but nothing, not even cilantro on their nachos, or a ping pong ball to the chest, could ruin the night of fun they were about to have. There wasn't anything particularly extraordinary about the night, but spending quality time together and having fun laughing, playing games, and getting locked out of Cosm, made it Jacob's favorite date of all time. From now on, seeing those scratches will always remind him of how much fun they had that night, and how they were able to make the best of every situation.",
    images: [
      "/hannah-timeline/08-popstroke/img1-popstroke-ghibli.jpg",
      "/hannah-timeline/08-popstroke/img2-car-scratch.jpg"
    ],
    date: "2025-04-12",
  },
  {
    title: "First Joust",
    description: "You'd think it would be hard to follow such an amazing date, but the next weekend at Medieval Times might have been even more fun! Hannah finally got to meet Papi and later reunite with her budding friends, Jenni and Eric. After being heavily recruited to a short film competition by Setshi and his brother on the ride over, the four of them took the castle by storm with Hannah stealing the show after catching a flower from one of the knights (Jacob was only a little jealous). Little did they know, the night was just getting started. They returned to Stew & Setshi's after a quick restock of BuzzBalls (never again) and wine at 7-Eleven. What followed was an unforgettable night filled with new friends, celebrity crushes, and a rare moisturizer discovery!",
    images: [
      "/hannah-timeline/09-medieval-times/img1-medieval-times.jpg",
      "/hannah-timeline/09-medieval-times/img4-cleanser.jpeg"
    ],
    date: "2025-04-19",
  },
  {
    title: "Best Call Ever",
    description: "These two have really been on a roll, but this was a particularly special night. What started as an impromptu FaceTime the night before Jacob's flight to his friend's wedding ended as a 5-hour heart-to-heart, where both Hannah and Jacob opened up more about their exes and impactful experiences from their pasts, allowing themselves to be vulnerable and understand each other on a deeper level. It was a deeply meaningful conversation, one that meant so much to Jacob. To top it all off, Hannah created one of the best playlists of all time, introducing Jacob to 90+ amazing new songs and keeping him warm, happy, and grateful all weekend.",
    images: [
      "/hannah-timeline/10-best-call-ever/img1-phone-ghibli.jpg",
      "/hannah-timeline/10-best-call-ever/img2-playlist.jpg"
    ],
    date: "2025-04-25",
  },
  {
    title: "First Film Together",
    description: "Just when you thought it couldn't get any better, it did! The two didn't know exactly what they were getting themselves into when they first arrived on Saturday, but it ended up being much better (even if slightly more stressful) than they both could have imagined. After staying until 3am the first night, grinding from 9am to 7:30pm the next day, and submitting the film with only 20 seconds to spare, the two earned some well-deserved rest. There's no one else in the world Jacob could comfortably sit next to for 12+ hours in silence in a dark room and still have so much fun helping and supporting as assistant (to) the editor, except Hannah. It was so amazing to see how well she fit in with everyone and how much value, expertise, creativity, and fun she brought to the team. Her face lit up with excitement and passion whenever she came up with a new idea for a shot or found a way to solve one of the many challenges that came up throughout the process. It's very difficult to survive, much less thrive, in such a hectic and stressful environment for that long (especially with Jacob's horrible acting), but it felt so effortless and fun together, even with no food on the second day! This only further confirmed Jacob's confidence in Hannah's character, and in their relationship together, but the best part was hearing from Hannah herself just how much fun she had. There's nothing he loves more than seeing and making her happy.",
    images: [
      "/hannah-timeline/11-first-film-together/img1-hannah-light.jpg",
      "/hannah-timeline/11-first-film-together/img2-hannah-light2.jpg",
      "/hannah-timeline/11-first-film-together/img3-hannah-under.jpg",
      "/hannah-timeline/11-first-film-together/img4-hannah-under2.jpg",
      "/hannah-timeline/11-first-film-together/img4-sequoia-poster.jpg",
      "/hannah-timeline/11-first-film-together/img5-hannah-scared.jpg"
    ],
    date: "2025-05-03",
  },
  {
    title: "First Birthday Together",
    description: "And now for today. I know it's not officially your birthday yet, but Hannah Lee Terry, I'm so happy and grateful you made it another trip around the sun, and deeply honored that you'd choose to celebrate it with me. Your gift started off as a Roku-themed Easter egg hunt, since you don't believe Spencer and me when we show you the actual Roku Easter eggs. But it has turned into much more. I've had SOOOO much fun making this for you, even through the countless bugs, especially during a time when I'd lost some of my passion for my previous work. You inspired me to create something that means so much to me. It has been amazing to look back, relive some of our favorite moments together, and document them here for us both. You mean so much to me, and I hope you enjoy this gift even half as much as I enjoyed making it for you. I can't wait to see what's in store for us next! Happy 28th Birthday, Hannah ❤️ Jacob.",
    images: [
      "/hannah-timeline/12-28th-birthday/img1-birthday-ghibli.jpg",
      "/hannah-timeline/12-28th-birthday/img2-big-footage-films.jpg",
      "/hannah-timeline/12-28th-birthday/img3-gs-goodies.jpg",
      "/hannah-timeline/12-28th-birthday/img4-spencer-records.jpg",
      "/hannah-timeline/12-28th-birthday/img5-mini-golf.jpg", 
      "/hannah-timeline/12-28th-birthday/img6-brad-davidians.jpg",
      "/hannah-timeline/12-28th-birthday/img7-stamy-hospital.jpg",
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
