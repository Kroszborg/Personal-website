# Contributing to Personal Portfolio

Thank you for considering contributing to this portfolio project! This document outlines the standards and guidelines for contributing.

## Project Structure

```
personal-portfolio/
├── public/              # Static assets
│   ├── assets/         # General assets
│   ├── blog/           # Blog post images
│   ├── company/        # Company logos
│   ├── meta/          # Meta images
│   ├── project/       # Project thumbnails
│   ├── setup/         # Setup related files
│   └── skills/        # Skill icons
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   │   ├── blog/     # Blog related components
│   │   ├── common/   # Shared components
│   │   ├── svgs/     # SVG icons
│   │   ├── technologies/ # Technology icons
│   │   └── ui/       # Shadcn UI components
│   ├── config/       # Configuration files
│   ├── data/         # MDX content
│   │   ├── blog/    # Blog posts
│   │   └── projects/ # Project details
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
```

## Naming Conventions

### Files and Directories

- Use **PascalCase** for:
  - React components: `BlogCard.tsx`
  - Type definitions: `Project.ts`
  - Component directories: `BlogComponents/`

- Use **camelCase** for:
  - Utility functions: `formatDate.ts`
  - Hooks: `useMobile.ts`
  - Configuration files: `chatPrompt.ts`

### Components

- Component files should be named using PascalCase and include the `.tsx` extension
- Each component should have its own file
- Group related components in a directory named after the feature

Example:

```tsx
// Good
components / blog / BlogCard.tsx;
components / common / Navbar.tsx;

// Bad
components / blog / blogcard.tsx;
components / common / nav - bar.tsx;
```

### Hooks

- Custom hooks should start with `use` and use camelCase
- Each hook should have its own file

Example:

```tsx
// Good
hooks / useMobile.ts;
hooks / useScrollPosition.ts;

// Bad
hooks / mobile.ts;
hooks / UseScroll.ts;
```

## Styling Conventions

- Use Tailwind CSS classes for styling
- Follow mobile-first approach
- Use CSS variables for theme colors (defined in globals.css)
- Maintain consistent spacing using Tailwind's spacing scale

Example:

```tsx
// Good
<div className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">

// Bad
<div style={{ marginTop: '16px', color: '#374151' }}>
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Define interfaces and types in separate files under `src/types/`
- Use explicit type annotations for function parameters and returns

Example:

```tsx
// types/project.ts
interface ProjectCaseStudyFrontmatter {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  live: string;
  timeline: string;
  role: string;
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  isPublished: boolean;
}

// components/projects/ProjectCard.tsx
const ProjectCard = ({
  project,
}: {
  project: ProjectCaseStudyFrontmatter;
}): JSX.Element => {
  // ...
};
```

### React Components

- Use functional components with hooks
- Props should be typed using interfaces
- Use destructuring for props
- Keep components focused and single-responsibility

Example:

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({
  label,
  onClick,
  variant = 'primary',
}: ButtonProps): JSX.Element => {
  // ...
};
```

## Content Guidelines

### Blog Posts

- Place MDX files in `src/data/blog/`
- Use kebab-case for file names: `my-blog-post.mdx`
- Include required frontmatter:
  ```mdx
  ---
  title: 'My Blog Post'
  description: 'A brief description'
  date: '2024-03-20'
  tags: ['nextjs', 'react']
  isPublished: true
  image: '/blog/my-post.png'
  ---
  ```

### Projects

- Place MDX files in `src/data/projects/`
- Use kebab-case for file names: `my-project.mdx`
- Include required frontmatter:
  ```mdx
  ---
  title: 'My Project'
  description: 'Project description'
  image: '/project/my-project.png'
  technologies: ['React', 'TypeScript', 'Tailwind CSS']
  github: 'https://github.com/username/repo'
  live: 'https://myproject.com'
  timeline: '2 weeks'
  role: 'Full Stack'
  team: 'Solo'
  status: 'completed'
  featured: true
  challenges: ['Challenge 1', 'Challenge 2']
  learnings: ['Learning 1', 'Learning 2']
  isPublished: true
  ---
  ```

## Git Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Commit using conventional commits:
   ```bash
   # Format: <type>(<scope>): <description>
   feat(blog): add new blog component
   fix(contact): resolve form submission issue
   ```
4. Push your changes
5. Create a Pull Request (if working with a team)

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Testing

- Run `bun run build` before pushing
- Ensure build is successful with no errors
- Test all pages and features locally

## Documentation

- Update README.md if adding new features
- Document new components with JSDoc comments
- Update type definitions when adding/modifying interfaces
- Keep configuration examples up to date

## Questions

If you have questions:

1. Check existing documentation
2. Review the codebase structure
3. Open an issue for clarification

---

Built with Next.js, TypeScript, and Tailwind CSS
