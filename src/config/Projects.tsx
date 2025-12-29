import FFmpeg from '@/components/technologies/FFmpeg';
import NextJs from '@/components/technologies/NextJs';
import OpenAI from '@/components/technologies/OpenAI';
import ReactIcon from '@/components/technologies/ReactIcon';
import TailwindCss from '@/components/technologies/TailwindCss';
import ThreeJs from '@/components/technologies/ThreeJs';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'ZAxis',
    description:
      'Minimal 3D Components Library - Production-ready 3D UI components for seamless integration into web apps with real-time customization',
    image: '/project/zaxis.png',
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
