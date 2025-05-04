# Hannah Timeline Event Images

## Folder Structure
- Each event in the timeline has its own numbered, descriptive folder (e.g., `01-meet-cute`, `02-first-date`, etc.).
- Place all images for a given event in its respective folder.

## Image Guidelines
- **Format:** Use JPG or WebP for photos. PNG for graphics if needed.
- **Max Width:** 1200px (optimize for web, ~200–400kb per image).
- **Naming:** Use descriptive, kebab-case filenames (e.g., `jacob-hannah-bar.jpg`).
- **Aspect Ratio:** Keep images consistent (ideally 16:9 or 4:3) for best display in the modal.
- **Order:** Images will be shown in the order listed in `timelineData.ts`.

## Example
```
hannah-timeline/
  01-meet-cute/
    jacob-hannah-bar.jpg
    monkey-boy.jpg
  02-first-date/
    hudson-house.jpg
```

## How to Add Images
1. Place new images in the correct event folder.
2. Reference them in `timelineData.ts` using the path `/hannah-timeline/XX-event-name/your-image.jpg`.

---

For overall site asset guidelines, see `/public/README.md`.
