import { label } from "framer-motion/client";

export const navItems = {
  about: {
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Team Anant", href: "/team_anant" },
      { label: "Photos", href: "/gallery" },
      { label: "Developers", href: "/developers" },
    ],
  },
  Maths_Dept:{
    label: "Maths Department",
    items: [
      { label: "Maths Department", href: "/department" }
    ],
  },
  Community: {
    label: "Community",
    items: [
      { label: "Internships", href: "/internship" },
      { label: "Shop", href: "/shop" },
    ],
  },
  events: {
    label: "Events",
    items: [
      { label: "Event", href: "/events" },
      { label: "Team Events/Compitition", href: "/compete" },
    ],
  },
  Student: {
    label: "Student",
    items: [
      { label: "Profile", href: "/profile" },
      { label: "Meetings", href: "/meet" },
      { label: "Notices", href: "/notices" }
    ],
  },
  Blogs:{
    label: "Blogs",
    items: [
      { label: "Blogs", href: "/blogs" }
    ],
  },
  NewsLetter:{
    label: "News Letter",
    items: [
      { label: "News Letter", href: "/newsletter" }
    ],
  },
  ContactUs:{
    label: "Contact Us",
    items: [
      { label: "Contact Us", href: "/contact" }
    ],
  }
};



  export const shopNavItems = {
    categories: {
      label: 'Categories',
      items: [
        { label: 'All Items', href: '/shop' },
        { label: 'Apparel', href: '/shop/apparel' },
        { label: 'Accessories', href: '/shop/accessories' },
      ]
    },
    cart: {
      label: 'Cart',
      items: [
        { label: 'View Cart', href: '/shop/cart' },
        { label: 'Checkout', href: '/shop/checkout' },
      ]
    },
  };