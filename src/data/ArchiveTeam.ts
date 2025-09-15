// archives for past post holders
// organized by academic years (e.g., "2024-25", "2023-24", etc.)

export interface ArchiveOfficeBearerData {
  id: number;
  name: string;
  role: string;
  image: string;
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
}

export interface ArchiveTeamMember {
  Title: string;
  ID: string;
  "Created Date": string;
  "Updated Date": string;
  Owner: string;
  phone: string;
  "insta link": string;
  photo: string;
  mail: string;
  Team: string;
  Linkedin: string;
  "Git Hub": string;
}

export interface YearlyTeamData {
  academicYear: string;
  displayYear: string; // e.g., "2024-25"
  officeBearers: ArchiveOfficeBearerData[];
  executiveTeam: ArchiveTeamMember[];
}

// Archive data - moving current team data here as 2024-25 archive
export const archiveTeamData: YearlyTeamData[] = [
  {
    academicYear: "2024-25",
    displayYear: "2024-25",
    officeBearers: [
      {
        id: 1,
        name: "Mamta Saini",
        role: "President",
        image: "/team/office/mamta.png",
        email: "723410004@nitkkr.ac.in",
        phone: "+917827902202",
        website: "https://myselfdk03.wixsite.com/mamtasaini",
        instagram: undefined,
        linkedin: undefined,
      },
      {
        id: 2,
        name: "Rajveer Pathak",
        role: "Vice President",
        image: "/team/office/rajveer.png",
        email: "123110041@nitkkr.ac.in",
        phone: "+918854958743",
        website: undefined,
        instagram: "https://www.instagram.com/rajveer_pathak1/",
        linkedin:
          "https://www.linkedin.com/in/rajveer-pathak-668582276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      },
      {
        id: 3,
        name: "Manoj Solanki",
        role: "Secretary (PG)",
        image: "/team/office/manoj.png",
        email: "723410009@nitkkr.ac.in",
        phone: "+919351266108",
        website: "https://manojmsmaths.wixsite.com/manoj-solanki",
        instagram: "https://www.instagram.com/manoj.solanki_ms/",
        linkedin: "https://www.linkedin.com/in/manoj-solanki-05950a273/",
      },
      {
        id: 4,
        name: "Anushika Jindal",
        role: "Secretary (UG)",
        image: "/team/office/anushika.png",
        email: "123110027@nitkkr.ac.in",
        phone: "+919023230312",
        website: undefined,
        instagram: "https://www.instagram.com/its_anushika_here/",
        linkedin: "https://www.linkedin.com/in/anushikajindal/",
      },
      {
        id: 5,
        name: "Saurav Jain",
        role: "Coordinator (PG)",
        image: "/team/office/saurav.png",
        email: "723410001@nitkkr.ac.in",
        phone: "+917896515900",
        website: undefined,
        instagram: "https://www.instagram.com/100rav_____/",
        linkedin: "https://linkedin.com/in/saurav-jain-7738a8251",
      },
    ],
    executiveTeam: [
      {
        Title: "Nanshi",
        ID: "05305983-9f9d-4542-abb4-b3ee6b7c8606",
        "Created Date": "2024-08-04T08:53:04Z",
        "Updated Date": "2024-08-04T19:35:05Z",
        Owner: "ee96e39b-72c4-4953-8423-d1ec0e4ce3d0",
        phone: "",
        "insta link": "",
        photo: "/team/05305983-9f9d-4542-abb4-b3ee6b7c8606.jpg",
        mail: "123110022@nitkkr.ac.in",
        Team: "Content/Newsletter Team",
        Linkedin: "",
        "Git Hub": "",
      },
      {
        Title: "Rishabh Gupta",
        ID: "16b9b342-6095-49bf-b481-2ab40e080d01",
        "Created Date": "2024-08-04T05:55:06Z",
        "Updated Date": "2024-08-04T19:34:23Z",
        Owner: "18dafa60-90f2-4d58-a04b-b380f6fa81e9",
        phone: "",
        "insta link": "",
        photo: "/team/16b9b342-6095-49bf-b481-2ab40e080d01.jpg",
        mail: "723410010@nitkkr.ac.in",
        Team: "Education Outreach Team",
        Linkedin: "linkedin.com/in/rishabh-gupta- b86b092b6",
        "Git Hub": "",
      },
      {
        Title: "Aman",
        ID: "240479f8-213d-4e69-b268-bb39b79f19b6",
        "Created Date": "2024-08-04T05:55:05Z",
        "Updated Date": "2024-08-04T19:34:41Z",
        Owner: "a880ec41-991a-4f61-90b7-888d448f963e",
        phone: "",
        "insta link": "aman_lohan96",
        photo: "/team/240479f8-213d-4e69-b268-bb39b79f19b6.jpg",
        mail: "lohanaman34@gmail.com",
        Team: "PR /Social Media Team",
        Linkedin: "",
        "Git Hub": "",
      },
      {
        Title: "Gungun Aggarwal",
        ID: "37393c5e-c93a-4c6e-bf49-0fe8d842a1cb",
        "Created Date": "2024-08-04T05:54:55Z",
        "Updated Date": "2024-08-04T19:35:14Z",
        Owner: "509e9556-ebad-45e7-97a3-eae62ca404b8",
        phone: "",
        "insta link": "",
        photo: "/team/37393c5e-c93a-4c6e-bf49-0fe8d842a1cb.jpg",
        mail: "123110012@nitkkr.ac.in",
        Team: "Education Outreach Team",
        Linkedin: "",
        "Git Hub": "",
      },
      {
        Title: "Keshav",
        ID: "c595d2b3-8eff-45db-a815-5c8bc86d3bc4",
        "Created Date": "2024-08-04T05:56:06Z",
        "Updated Date": "2024-08-04T19:34:40Z",
        Owner: "bb9acfd7-35af-4926-9f69-ffa5a5c7df64",
        phone: "",
        "insta link": "https://www.instagram.com/keshav.0479/",
        photo: "/team/c595d2b3-8eff-45db-a815-5c8bc86d3bc4.jpg",
        mail: "keshav.rsk07@gmail.com",
        Team: "Tech Team",
        Linkedin: "",
        "Git Hub": "https://github.com/keshav0479",
      },
      {
        Title: "Goutam Khandelwal",
        ID: "f2c0a88a-0e0f-406a-b79d-2c7ade09266b",
        "Created Date": "2024-08-04T05:55:22Z",
        "Updated Date": "2024-08-04T19:35:02Z",
        Owner: "c4fd59e8-1b21-4c83-9ec6-53f5a2b73be4",
        phone: "",
        "insta link": "https://www.instagram.com/ajay_jangal_?igsh=b2I5M2V0cTVnZG53",
        photo: "/team/f2c0a88a-0e0f-406a-b79d-2c7ade09266b.jpg",
        mail: "goutam.ind.2005@gmail.com",
        Team: "PR /Social Media Team",
        Linkedin: "http://linkedin.com/in/goutam-khandelwal-778862289",
        "Git Hub": "",
      },
      // Add more executive team members here...
    ],
  },
  // Add more years as needed
];

// Helper functions
export const getAvailableYears = (): string[] => {
  return archiveTeamData.map((data) => data.displayYear).sort().reverse();
};

export const getTeamDataByYear = (year: string): YearlyTeamData | undefined => {
  return archiveTeamData.find((data) => data.displayYear === year);
};

export const getAllArchiveData = (): YearlyTeamData[] => {
  return archiveTeamData;
};