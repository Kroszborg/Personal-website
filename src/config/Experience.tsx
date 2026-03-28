import Django from '@/components/technologies/Django';
// import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
// import JavaScript from '@/components/technologies/JavaScript';
import NextJs from '@/components/technologies/NextJs';
// import NodeJs from '@/components/technologies/NodeJs';
// import Postman from '@/components/technologies/Postman';
import ReactIcon from '@/components/technologies/ReactIcon';
import Strapi from '@/components/technologies/Strapi';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'Bytehint',
    position: 'MERN Stack Intern',
    location: 'Remote',
    image: '/company/bytehint.png',
    description: [
      'Translated Figma UI/UX designs into pixel-perfect responsive interfaces using Next.js, React, and Tailwind CSS',
      'Worked on electron projects for Windows focusing on frontend development and UI/UX design',
      'Worked on ecommerce projects focusing on development and testing',
    ],
    startDate: 'Nov 2025',
    endDate: 'Feb 2026',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
    ],
    website: 'https://www.bytehint.com/',
  },
  {
    isCurrent: false,
    company: 'Code Help',
    position: 'Full Stack Developer Intern',
    location: 'Remote',
    image: '/company/codehelp.png',
    description: [
      'Translated Figma UI/UX designs into pixel-perfect responsive interfaces using Next.js, React, and Tailwind CSS',
      'Integrated the GraphQL backend with efficient API queries, improving data fetching and reducing over-fetching',
      'Implemented reusable components and performance optimizations, leading to faster load times and reduced bundle size',
    ],
    startDate: 'Aug 2025',
    endDate: 'Nov 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'React',
        href: 'https://react.dev/',
        icon: <ReactIcon />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'Figma',
        href: 'https://figma.com/',
        icon: <Figma />,
      },
    ],
    website: 'https://www.thecodehelp.in/',
  },
  {
    isCurrent: false,
    company: 'Astraea Solutions',
    position: 'Product Tech Intern',
    location: 'Remote',
    image: '/company/astraea.png',
    description: [
      'Built features for a CyberRange platform for hands-on cybersecurity training, leveraging Python/Django',
      'Built the Frontend of a Learning Management System (LMS) by implementing API-driven dashboards and progress tracking using Next.js/TypeScript',
      'Optimized cross-platform responsiveness with Tailwind CSS and reusable components, reducing UI bugs',
    ],
    startDate: 'Jun 2025',
    endDate: 'Aug 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Django',
        href: 'https://www.djangoproject.com/',
        icon: <Django />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
    ],
    website: 'https://astraeasolutions.com',
  },
  {
    isCurrent: false,
    company: 'Arkcore',
    position: 'Frontend Developer Intern',
    location: 'Remote',
    image: '/company/arkcore.png',
    description: [
      'Contributed to the core SaaS product frontend in a team of 3 developers, building modular UI components with Next.js and Tailwind CSS',
      "Developed the company's entire website using Next.js and TypeScript with Strapi CMS, SEO, and blog system",
    ],
    startDate: 'Apr 2025',
    endDate: 'Aug 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
      {
        name: 'Strapi',
        href: 'https://strapi.io/',
        icon: <Strapi />,
      },
    ],
    website: 'https://arkcore.io',
  },
  {
    isCurrent: false,
    company: 'The Waiter Company',
    position: 'Frontend Developer Intern',
    location: 'Remote',
    image: '/company/waiter.png',
    description: [
      'Led the design and development of a performant, server-rendered website and product using Next.js and TypeScript',
      'Integrated Analytics to track user engagement and provide actionable business insights',
      'Implemented a mobile-first, responsive UI using Tailwind CSS',
    ],
    startDate: 'Oct 2024',
    endDate: 'Jul 2025',
    technologies: [
      {
        name: 'Next.js',
        href: 'https://nextjs.org/',
        icon: <NextJs />,
      },
      {
        name: 'TypeScript',
        href: 'https://typescriptlang.org/',
        icon: <TypeScript />,
      },
      {
        name: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: <TailwindCss />,
      },
    ],
    website: 'https://thewaitercompany.com',
  },
];
