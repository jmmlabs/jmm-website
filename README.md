# JMM Website

## Overview

This is a modern, component-driven web application built with Next.js (v15+), TypeScript, and Tailwind CSS. It leverages shadcn/ui, Radix UI, and other best-in-class libraries for accessible, theme-able, and interactive UIs.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS variables, PostCSS
- **UI Components:** shadcn/ui, Radix UI, Lucide Icons
- **Forms:** React Hook Form, Zod
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Other:** Embla Carousel, Sonner (toasts), date-fns, etc.

## Project Structure
- `app/` – Application entry, layout, and global styles
- `components/` – Shared React components (with `ui/` subfolder for base UI)
- `hooks/` – Custom React hooks
- `lib/` – Utility functions
- `public/` – Static assets
- `styles/` – Additional CSS

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Best Practices
- All code is written in TypeScript for type safety.
- Only one Next.js config file (`next.config.js`) is used.
- Tailwind CSS is fully customized via CSS variables for theming.
- Path aliases are set up for clean imports.
- All custom CSS variables are defined in global styles.
- Strict TypeScript mode is enforced.

## Recommendations
- Add automated testing (Jest, React Testing Library, or Playwright) for critical components and pages.
- Audit dependencies periodically to remove unused packages.
- Keep documentation up to date as the project evolves.

## Contributing
1. Fork the repo & clone it.
2. Create a new branch for your feature or fix.
3. Submit a pull request with a clear description.

## License
MIT
