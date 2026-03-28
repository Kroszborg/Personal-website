/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" }, // Note: You'd need to create Python component
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the href values to your own social media profiles
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import X from '@/components/svgs/X';
import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Supabase from '@/components/technologies/Supabase';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';

// Component mapping for skills
export const skillComponents = {
  TypeScript: TypeScript,
  ReactIcon: ReactIcon,
  NextJs: NextJs,
  Bun: Bun,
  PostgreSQL: PostgreSQL,
  NodeJs: NodeJs,
  Supabase: Supabase,
  Prisma: Prisma,
  JavaScript: JavaScript,
};

export const heroConfig = {
  // Personal Information
  name: 'Abhiman Panwar',
  title: 'Full Stack Developer',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Next.js',
      href: 'https://nextjs.org/',
      component: 'NextJs',
    },
    {
      name: 'TypeScript',
      href: 'https://www.typescriptlang.org/',
      component: 'TypeScript',
    },
    {
      name: 'Node.js',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
    {
      name: 'Supabase',
      href: 'https://supabase.com/',
      component: 'Supabase',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build production-ready applications using {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}. Passionate about <b>3D web experiences</b> with <b>Three.js</b> and creating solutions that solve real-world problems.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'X',
    href: 'https://x.com/kroszborgg',
    icon: <X />,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhiman-panwar-272aa7228/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/Kroszborg',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:abhimanpanwar6@gmail.com',
    icon: <Mail />,
  },
];
