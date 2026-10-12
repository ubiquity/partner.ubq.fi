# Ubiquity Landing Page

A modern landing page for Ubiquity's GitHub Repository Management Services built with Next.js and Tailwind CSS.

## Features

- Responsive design for all device sizes
- Modern UI with dark theme and cyan accents
- Interactive components using shadcn UI
- Form integration with Fillout

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable UI components
- [Lucide React](https://lucide.dev/) - Icon library
- [Fillout](https://fillout.com/) - Form integration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/` - Next.js app directory with pages and layouts
- `components/` - Reusable UI components
- `public/` - Static assets like images and fonts
- `lib/` - Utility functions

## Customization

The website can be customized by editing:
- `app/page.tsx` - Main content and sections
- `app/globals.css` - Global styles and Tailwind configuration
- `tailwind.config.ts` - Tailwind theme configuration

## Hosting (2026-10-12)

Served by the Cloudflare Workers static-assets worker `partner-ubq-fi` from the
Next.js static export (`out/`, `next.config.mjs` has `output: "export"`), routed
at `partner.ubq.fi/*` with the export's `404.html`. Deno Deploy is no longer
used (shutdown April 2027).

Build and deploy: `bun install && bun run build && npx wrangler deploy`.
