import Headphones from '@/components/svgs/devices/Headphones';
import Keyboard from '@/components/svgs/devices/Keyboard';
import Laptop from '@/components/svgs/devices/Laptop';
import Monitor from '@/components/svgs/devices/Monitor';
import Mouse from '@/components/svgs/devices/Mouse';
import Phone from '@/components/svgs/devices/Phone';

export const devices = [
  {
    name: 'Gaming Monitor',
    icon: <Monitor className="size-4" />,
    link: 'https://amzn.to/44o99tx',
  },
  {
    name: 'SSD Storage',
    icon: <Laptop className="size-4" />,
    link: 'https://amzn.to/3HRrnuJ',
  },
  {
    name: 'Gaming Headphones',
    icon: <Headphones className="size-4" />,
    link: 'https://amzn.to/3T1s1IC',
  },
  {
    name: 'Professional Microphone',
    icon: <Headphones className="size-4" />,
    link: 'https://amzn.to/45x91ZQ',
  },
  {
    name: 'Laptop Stand',
    icon: <Laptop className="size-4" />,
    link: 'https://amzn.to/3T1rOoO',
  },
  {
    name: 'Gaming Mousepad',
    icon: <Mouse className="size-4" />,
    link: 'https://amzn.to/3SVL1rX',
  },
  {
    name: 'Wireless Earbuds',
    icon: <Headphones className="size-4" />,
    link: 'https://amzn.to/3HRrnuJ',
  },
  {
    name: 'USB Hub',
    icon: <Keyboard className="size-4" />,
    link: 'https://amzn.to/4kLyseT',
  },
  {
    name: 'Gaming Controller',
    icon: <Keyboard className="size-4" />,
    link: 'https://amzn.to/3ZzYSYI',
  },
  {
    name: 'Iphone 16 pro (256 GB)',
    icon: <Phone className="size-4" />,
  },
];

export const webExtensions = [
  // { name: 'Unhook', href: 'https://unhook.app/' },
  { name: 'uBlock Origin', href: 'https://ublockorigin.com/' },
  {
    name: 'React Developer Tools',
    href: 'https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en',
  },
  // { name: 'daily.dev', href: 'https://daily.dev/' },
  { name: 'Grammarly', href: 'https://www.grammarly.com/' },
  // { name: 'Wappalyzer', href: 'https://www.wappalyzer.com/' },
  // {
  //   name: 'ColorZilla',
  //   href: 'https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?hl=en',
  // },
];

export const software = [
  // { name: 'Dia Browser', href: 'https://www.diabrowser.com/' },
  // { name: 'Notion', href: 'https://www.notion.so/desktop' },
  // { name: 'TickTick', href: 'https://ticktick.com/download' },
  { name: 'OBS Studio', href: 'https://obsproject.com/' },
  { name: 'VLC Media Player', href: 'https://www.videolan.org/vlc/' },
  // { name: 'Ghostty Terminal', href: 'https://ghostty.org/' },
  { name: 'VS Code', href: 'https://code.visualstudio.com/' },
  { name: 'Claude Code', href: 'https://claude.ai/code' },
  { name: 'Cursor', href: 'https://cursor.com/' },
  { name: 'Zen browser', href: 'https://zen-browser.app/' },
];
