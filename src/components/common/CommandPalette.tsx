'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Briefcase,
  Contact,
  FileText,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Moon,
  Share2,
  Sun,
  Twitter,
  Wrench,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CommandItemType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  group: 'navigation' | 'features' | 'actions';
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Prevent background scroll when dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleNavigate = (path: string) => {
    setOpen(false);
    // Wait for dialog to close before navigating
    setTimeout(() => {
      if (document.visibilityState === 'visible') {
        router.push(path);
      } else {
        // If document is hidden, wait until it's visible
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            router.push(path);
            document.removeEventListener(
              'visibilitychange',
              handleVisibilityChange,
            );
          }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
      }
    }, 150);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setOpen(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setOpen(false);
  };

  const handleGitHub = () => {
    window.open('https://github.com/Kroszborg', '_blank');
    setOpen(false);
  };

  const handleTwitter = () => {
    window.open('https://x.com/kroszborgg', '_blank');
    setOpen(false);
  };

  const handleLinkedIn = () => {
    window.open(
      'https://www.linkedin.com/in/abhiman-panwar-272aa7228/',
      '_blank',
    );
    setOpen(false);
  };

  const commands: CommandItemType[] = [
    // Navigation
    {
      id: 'home',
      label: 'Home',
      description: 'Navigate to the homepage',
      icon: <Home />,
      action: () => handleNavigate('/'),
      group: 'navigation',
    },
    {
      id: 'work',
      label: 'Work Experience',
      description: 'View work experience and employment history',
      icon: <Briefcase />,
      action: () => handleNavigate('/work-experience'),
      group: 'navigation',
    },
    {
      id: 'projects',
      label: 'Projects',
      description: 'View all projects and portfolio work',
      icon: <FolderKanban />,
      action: () => handleNavigate('/projects'),
      group: 'navigation',
    },
    {
      id: 'resume',
      label: 'Resume',
      description: 'View and download resume',
      icon: <FileText />,
      action: () => handleNavigate('/resume'),
      group: 'navigation',
    },
    {
      id: 'gears',
      label: 'Gears',
      description: 'View hardware and equipment setup',
      icon: <Wrench />,
      action: () => handleNavigate('/gears'),
      group: 'navigation',
    },
    {
      id: 'contact',
      label: 'Contact',
      description: 'Get in touch',
      icon: <Contact />,
      action: () => handleNavigate('/contact'),
      group: 'navigation',
    },

    // Features
    {
      id: 'theme',
      label: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: theme === 'dark' ? <Sun /> : <Moon />,
      action: handleToggleTheme,
      group: 'features',
    },

    // Actions
    {
      id: 'share',
      label: 'Share Page',
      description: 'Share the current page',
      icon: <Share2 />,
      action: handleShare,
      group: 'actions',
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'View GitHub profile',
      icon: <Github />,
      action: handleGitHub,
      group: 'actions',
    },
    {
      id: 'twitter',
      label: 'Twitter',
      description: 'View Twitter profile',
      icon: <Twitter />,
      action: handleTwitter,
      group: 'actions',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      description: 'View LinkedIn profile',
      icon: <Linkedin />,
      action: handleLinkedIn,
      group: 'actions',
    },
  ];

  // Group commands by category
  const navigationCommands = commands.filter(
    (cmd) => cmd.group === 'navigation',
  );
  const featureCommands = commands.filter((cmd) => cmd.group === 'features');
  const actionCommands = commands.filter((cmd) => cmd.group === 'actions');

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      showCloseButton={false}
      className="max-w-2xl"
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList className="max-h-[450px] overflow-y-auto">
        <CommandEmpty>No results found.</CommandEmpty>

        {navigationCommands.length > 0 && (
          <>
            <CommandGroup heading="Navigation">
              {navigationCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={command.action}
                  className="cursor-pointer"
                >
                  {command.icon}
                  <div className="flex flex-col">
                    <span>{command.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {command.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {featureCommands.length > 0 && (
          <>
            <CommandGroup heading="Features">
              {featureCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  onSelect={command.action}
                  className="cursor-pointer"
                >
                  {command.icon}
                  <div className="flex flex-col">
                    <span>{command.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {command.description}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        {actionCommands.length > 0 && (
          <CommandGroup heading="Actions">
            {actionCommands.map((command) => (
              <CommandItem
                key={command.id}
                onSelect={command.action}
                className="cursor-pointer"
              >
                {command.icon}
                <div className="flex flex-col">
                  <span>{command.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {command.description}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
