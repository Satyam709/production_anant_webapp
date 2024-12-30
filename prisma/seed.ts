
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    
  // Create users
  const user1 = await prisma.user.create({
    data: {
      roll_number: 101,
      name: "John Doe",
      password: "password123",
      branch: "AIML",
      batch: "2023",
      position: "President",
      club_dept: ["Tech"],
      imageURL: "https://example.com/john.jpg",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      roll_number: 102,
      name: "Jane Smith",
      password: "password123",
      branch: "CSE",
      batch: "2024",
      position: "Coordinator",
      club_dept: ["General"],
      imageURL: "https://example.com/jane.jpg",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      roll_number: 103,
      name: "Alice Brown",
      password: "password123",
      branch: "MSC",
      batch: "2022",
      position: "Member",
      club_dept: ["PR"],
      imageURL: "https://example.com/alice.jpg",
    },
  });

  const user4 = await prisma.user.create({
    data: {
      roll_number: 104,
      name: "Bob White",
      password: "password123",
      branch: "IT",
      batch: "2025",
      position: "Secretary",
      club_dept: ["Tech"],
      imageURL: "https://example.com/bob.jpg",
    },
  });

  // Create meetings and associate with users
  const meeting1 = await prisma.meeting.create({
    data: {
      venue: "Conference Room 1",
      starts: new Date("2024-01-10T10:00:00Z"),
      duration: 90, // 1.5 hours
      topic_of_discussion: "Tech Symposium Planning",
      hostID: user1.id, // John Doe as the host
      attendees: {
        connect: [{ id: user2.id }, { id: user3.id }, { id: user4.id }],
      },
    },
  });

  const meeting2 = await prisma.meeting.create({
    data: {
      venue: "Zoom Online Meeting",
      starts: new Date("2024-01-12T14:00:00Z"),
      duration: 60, // 1 hour
      topic_of_discussion: "Workshop Organization",
      hostID: user2.id, // Jane Smith as the host
      attendees: {
        connect: [{ id: user1.id }, { id: user4.id }],
      },
    },
  });

  const meeting3 = await prisma.meeting.create({
    data: {
      venue: "Auditorium",
      starts: new Date("2024-01-15T11:00:00Z"),
      duration: 120, // 2 hours
      topic_of_discussion: "Annual Budget Discussion",
      hostID: user3.id, // Alice Brown as the host
      attendees: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  const meeting4 = await prisma.meeting.create({
    data: {
      venue: "Library Meeting Room",
      starts: new Date("2024-01-20T09:00:00Z"),
      duration: 75, // 1 hour 15 minutes
      topic_of_discussion: "Club Strategy and Growth",
      hostID: user4.id, // Bob White as the host
      attendees: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }],
      },
    },
  });

  const meeting5 = await prisma.meeting.create({
    data: {
      venue: "Outdoor Patio",
      starts: new Date("2024-01-25T16:00:00Z"),
      duration: 45, // 45 minutes
      topic_of_discussion: "Informal Catchup and Networking",
      hostID: user1.id, // John Doe as the host
      attendees: {
        connect: [{ id: user3.id }, { id: user4.id }],
      },
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
