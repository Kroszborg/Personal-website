import Bun from '@/components/technologies/Bun';
import Expo from '@/components/technologies/Expo';
import FFmpeg from '@/components/technologies/FFmpeg';
import Github from '@/components/technologies/Github';
import Go from '@/components/technologies/Go';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import OpenAI from '@/components/technologies/OpenAI';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import ReactIcon from '@/components/technologies/ReactIcon';
import Supabase from '@/components/technologies/Supabase';
import TailwindCss from '@/components/technologies/TailwindCss';
import ThreeJs from '@/components/technologies/ThreeJs';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Rune',
    description:
      'Customizable QR Code Library - Lightweight, framework-agnostic QR codes built from scratch per ISO/IEC 18004. Pure SVG with zero dependencies, React/Vue/Web Component adapters, a from-scratch decoder, and a CLI. Every style is proven scannable in CI.',
    image: '/project/rune.webp',
    link: 'https://rune.kroszborg.co',
    technologies: [
      { name: 'TypeScript', icon: <TypeScript key="typescript-rune" /> },
      { name: 'React', icon: <ReactIcon key="react-rune" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs-rune" /> },
      { name: 'Next.js', icon: <NextJs key="nextjs-rune" /> },
    ],
    github: 'https://github.com/Kroszborg/rune',
    live: 'https://rune.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/rune',
    isWorking: true,
  },
  {
    title: 'Beam',
    description:
      'End-to-end encrypted, peer-to-peer file transfer - Files are encrypted in the browser and streamed directly between devices over WebRTC. The server is a blind relay that only brokers the handshake. No uploads, no accounts.',
    image: '/project/beam.webp',
    link: 'https://beam.kroszborg.co',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react-beam" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript-beam" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs-beam" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind-beam" /> },
    ],
    live: 'https://beam.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/beam',
    isWorking: true,
  },
  {
    title: 'GearOne',
    description:
      'Smart Automobile Service Platform - Production-ready mobile app ecosystem with React Native, Node.js backend, Next.js admin dashboard, and Razorpay payment integration deployed to Google Play',
    image: '/project/gearon.webp',
    link: 'https://play.google.com/store/apps/details?id=com.gearon.gearonjaipur&hl=en_IN',
    technologies: [
      { name: 'React Native', icon: <ReactIcon key="react-native" /> },
      { name: 'Expo', icon: <Expo key="expo" /> },
      { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
      { name: 'Supabase', icon: <Supabase key="supabase" /> },
      { name: 'PostgreSQL', icon: <PostgreSQL key="postgresql" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    ],
    live: 'https://play.google.com/store/apps/details?id=com.gearon.gearonjaipur&hl=en_IN',
    details: true,
    projectDetailsPageSlug: '/projects/gearon',
    isWorking: true,
  },
  {
    title: 'Sugi',
    description:
      'Terminal UI Git Client - Feature-rich TUI git client in Go with GitHub/GitLab PR management, AI-powered commit messages, interactive rebase, bisect, worktrees, and multi-account support',
    image: '/project/sugi.webp',
    link: 'https://www.npmjs.com/package/@kroszborg/sugi',
    technologies: [
      { name: 'Go', icon: <Go key="go" /> },
      { name: 'GitHub', icon: <Github key="github" /> },
    ],
    github: 'https://github.com/Kroszborg/sugi',
    live: 'https://www.npmjs.com/package/@kroszborg/sugi',
    details: true,
    projectDetailsPageSlug: '/projects/sugi',
    isWorking: true,
  },
  {
    title: 'LaunchKit',
    description:
      'AI Launch Copy Generator - Paste a GitHub URL or describe your project and instantly get landing page copy, platform-tuned social posts for Twitter/X, LinkedIn, Product Hunt, and a perfect pitch',
    image: '/project/launchkit.webp',
    link: 'https://launchkit.kroszborg.co',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript-lk" /> },
      { name: 'Google AI', icon: <OpenAI key="openai" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwind" /> },
      { name: 'Bun', icon: <Bun key="bun" /> },
    ],
    github: 'https://github.com/Kroszborg/launchkit-4951',
    live: 'https://launchkit.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/launchkit',
    isWorking: true,
  },
  {
    title: 'LocalGov',
    description:
      'AI-powered Legal Explainer - Built an AI-driven platform that simplifies local government policies into plain language with SSR for SEO',
    image: '/project/LocalGovAI.webp',
    link: 'https://localgov.kroszborg.co',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'OpenAI', icon: <OpenAI key="openai" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    github: 'https://github.com/Kroszborg/localgov',
    live: 'https://localgov.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/localgov',
    isWorking: true,
  },
  {
    title: 'ZAxis',
    description:
      'Minimal 3D Components Library - Production-ready 3D UI components for seamless integration into web apps with real-time customization',
    image: '/project/zaxis.webp',
    link: 'https://zaxis.kroszborg.co',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Three.js', icon: <ThreeJs key="threejs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    ],
    github: 'https://github.com/Kroszborg/zaxis',
    live: 'https://zaxis.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/zaxis',
    isWorking: true,
  },
  {
    title: 'MetaMorpher',
    description:
      'Web-based Multimedia Conversion Tool - Privacy-focused, client-side conversion tool using FFmpeg.wasm for image, audio, and video formats',
    image: '/project/Metamorpher.webp',
    link: 'https://metamorpher.kroszborg.co',
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'FFmpeg.wasm', icon: <FFmpeg key="ffmpeg" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Vercel', icon: <Vercel key="vercel" /> },
    ],
    github: 'https://github.com/Kroszborg/metamorpher',
    live: 'https://metamorpher.kroszborg.co',
    details: true,
    projectDetailsPageSlug: '/projects/metamorpher',
    isWorking: true,
  },
];
