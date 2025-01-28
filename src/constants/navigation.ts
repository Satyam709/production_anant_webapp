import Shop from "@/app/shop/page";

export const navItems = {
    about: {
      label: 'About',
      items: [
        { label: 'Vision', href: '/' },
        { label: 'Team', href: '/team' },
        { label: 'Shop', href: '/shop' },
        { label: 'Timeline', href: '/' },  
      ]
    },
    events: {
      label: 'Events',
      items: [
        { label: 'Live', href: '/events' },
        { label: 'Upcoming', href: '/events' },
        { label: 'Past', href: '/events' }
      ]
    },
    Puzzles: {
      label: 'Puzzles',
      items: [
        { label: 'Weekly Challenge', href: '/' },
        { label: 'Archives', href: '/' },
        { label: 'Submit a Puzzle', href: '/' }
      ]
    },
    opportunities: {
      label: 'Opportunities',
      items: [
        { label: 'Internships', href: '/' },
        { label: 'Research', href: '/' },
        { label: 'Projects', href: '/' }
      ]
    },
  }