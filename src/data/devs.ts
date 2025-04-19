interface Developer {
  id: number;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  contributions: string[];
  commitHistory?: number[]; // Optional property for commit history
}

export const developers: Developer[] = [
  {
    id: 1,
    name: "Satyam",
    role: "Full Stack Developer",
    image: "/team/b077a242-f85e-422b-bf75-3ea7017f9aae.jpg",
    github: "https://github.com/Satyam709",
    linkedin: "https://linkedin.com/in/alexj",
    contributions: [
      "Core Architecture",
      "Authentication System",
      "API Integration",
      "UI/UX Design",
      "Deployment",
    ],
    // from dec 2204 to april 2025
    commitHistory: [32, 20, 22, 28, 24],
  },
  {
    id: 2,
    name: "Ayush Sur",
    role: "Full Stack Developer",
    image: "/team/b077a242-f85e-422b-bf75-3ea7017f9aae.jpg",
    github: "https://github.com/SurAyush",
    linkedin: "https://linkedin.com/in/alexj",
    contributions: [
      "Core Architecture",
      "Authentication System",
      "API Integration",
    ],
    // from dec 2204 to april 2025
    commitHistory: [12, 8, 18, 11, 10],
  },
  {
    id: 3,
    name: "Keshav",
    role: "Full Stack Developer",
    image: "/team/b077a242-f85e-422b-bf75-3ea7017f9aae.jpg",
    github: "https://github.com/keshav0479",
    linkedin: "https://linkedin.com/in/alexj",
    contributions: [
      "Core Architecture",
      "API Integration",
    ],
    // from dec 2204 to april 2025
    commitHistory: [5, 0, 5, 0, 0],
  },
];
