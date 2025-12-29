# Abhiman Panwar's Portfolio

A modern, responsive portfolio website showcasing my work as a Full Stack Developer. Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI. Features a blog system, project showcase, work experience timeline, and contact form with Telegram integration.

![Portfolio Preview](/public/meta/hero.png)

> **Credits:** This portfolio is built on top of the amazing [Sleek Portfolio](https://github.com/ramxcodes/sleek-portfolio) template created by [@ramxcodes](https://github.com/ramxcodes). The original template is licensed under the MIT License and has been customized for my personal use.

## About Me

I'm a Full Stack Developer and Open Source Contributor with a passion for building innovative web applications. I specialize in React.js, Next.js, and TypeScript, with expertise in creating 3D web experiences using Three.js and React Three Fiber.

**Current Status:** B.Tech in Information Technology at Manipal University Jaipur (2023-2027)

**Tech Stack:**

- **Frontend:** React.js, Next.js, TypeScript, Tailwind CSS, GSAP, Three.js, React Three Fiber
- **Backend:** Node.js, Express.js, Django, GraphQL, Prisma ORM
- **Database:** MongoDB, MySQL, PostgreSQL, Supabase, Firebase
- **Tools:** Git, Docker, Vercel, CI/CD (GitHub Actions)

## Features

- **Next.js 15** with App Router
- **Tailwind CSS** for styling
- **Shadcn UI** components
- **Dark/Light** mode
- **Responsive** design
- **MDX** for blog posts and project details
- **Contact Form** with Telegram integration
- **SEO** optimized
- **TypeScript** for type safety
- **Umami Analytics** for privacy-focused web analytics

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- Bun (preferred) or npm

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
TELEGRAM_BOT_TOKEN="your-token"
TELEGRAM_CHAT_ID="your-chat-id"
GEMINI_API_KEY="your-api-key"
NODE_ENV="development"
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_UMAMI_SRC="your-umami-script-url"
NEXT_PUBLIC_UMAMI_ID="your-umami-website-id"
```

### Setting up Telegram Integration

1. Create a new bot with [@BotFather](https://t.me/botfather) on Telegram
2. Copy the bot token and add it to your `.env` file as `TELEGRAM_BOT_TOKEN`
3. Start a chat with your bot and send any message (e.g., "hello")
4. Get your chat ID:

   ```bash
   # Run the test script to get your chat ID
   bun run testTelegram
   ```

   - The script will show your Chat ID from the message you sent
   - Copy the Chat ID and add it to your `.env` file as `TELEGRAM_CHAT_ID`
   - Run the script again to verify everything works

### Setting up Umami Analytics

1. Visit Umami:
   - Self-host Umami or use [Umami Cloud](https://cloud.umami.is)
   - Follow Umami's [installation guide](https://umami.is/docs/install)

2. Get your credentials:
   - Copy your Umami script URL (ends with `/script.js`)
   - Get your website ID from Umami dashboard

3. Configure environment variables:
   ```env
   NEXT_PUBLIC_UMAMI_SRC="https://[your-umami-instance]/script.js"
   NEXT_PUBLIC_UMAMI_ID="your-website-id"
   ```

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/Kroszborg/sleek-portfolio.git
   cd sleek-portfolio
   ```

2. Install dependencies:

   ```bash
   # Using bun (recommended)
   bun install

   # Using npm
   npm install
   ```

3. Run the development server:

   ```bash
   # Using bun
   bun dev

   # Using npm
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The project uses configuration files in the `src/config` directory for easy customization:

- `About.tsx` - About section content
- `Contact.tsx` - Contact form settings
- `Experience.tsx` - Work experience details
- `Footer.tsx` - Footer links and content
- `Gears.tsx` - Setup/gear section
- `Hero.tsx` - Hero section content
- `Meta.tsx` - SEO and metadata
- `Navbar.tsx` - Navigation links
- `Projects.tsx` - Project showcase settings
- `Quote.ts` - Random quotes configuration
- `Resume.ts` - Resume section details
- `Setup.tsx` - Development setup information
- `cat.ts` - Enable disable the cat

## Adding New Technology Icons

1. Visit [Devicon](https://devicon.dev/) to find the icon you want to add
2. Create a new component in `src/components/technologies/`
3. Follow the existing component structure for consistency

Example:

```tsx
export const NewTechIcon = () => {
  return <svg>// SVG content from devicon</svg>;
};
```

## Adding Content

### Blog Posts

1. Create a new MDX file in `src/data/blog/`
2. Add metadata and content following existing post structure
3. Add blog thumbnail in `public/blog/`

### Projects

1. Create a new MDX file in `src/data/projects/`
2. Add metadata and content following existing project structure
3. Add project thumbnail in `public/project/`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Original Template:** [Sleek Portfolio](https://github.com/ramxcodes/sleek-portfolio) by [@ramxcodes](https://github.com/ramxcodes) (MIT License)

## Contact

- **Email:** abhimanpanwar6@gmail.com
- **LinkedIn:** [abhiman-panwar-272aa7228](https://www.linkedin.com/in/abhiman-panwar-272aa7228/)
- **GitHub:** [Kroszborg](https://github.com/Kroszborg)
- **Twitter:** [@kroszborgg](https://x.com/kroszborgg)

---

**Built with** by Abhiman Panwar using the Sleek Portfolio template as a base and customized for my personal use.
