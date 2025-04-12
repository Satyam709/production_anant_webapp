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
      imageURL:
        "https://images.unsplash.com/photo-1503023345631-0b7dc97a583e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
      imageURL:
        "https://images.unsplash.com/photo-1494790108377-be9c29b10213?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
      imageURL:
        "https://images.unsplash.com/photo-1534528741702-c0f7db169ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
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
      imageURL:
        "https://images.unsplash.com/photo-1500648767791-00d562229aa3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  // Create merchandise
  const merch1 = await prisma.merchandise.create({
    data: {
      name: "Tech Club T-Shirt",
      description: "A comfortable t-shirt with the tech club logo.",
      price: 20.0,
      stock_quantity: 100,
      category: "Apparel",
      image_url:
        "https://images.unsplash.com/photo-1576566561071-c2f58120951c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHRzaGlydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch2 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Mug",
      description: "A ceramic mug with the club's branding.",
      price: 10.0,
      stock_quantity: 50,
      category: "Accessories",
      image_url:
        "https://images.unsplash.com/photo-1517784629615-451983fefd79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVnfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch3 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Sticker Pack",
      description: "A pack of cool stickers featuring club logos.",
      price: 5.0,
      stock_quantity: 200,
      category: "Accessories",
      image_url:
        "https://images.unsplash.com/photo-1623843858980-9a449a634d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3RpY2tlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch4 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Hoodie",
      description: "A warm hoodie with the club emblem.",
      price: 35.0,
      stock_quantity: 75,
      category: "Apparel",
      image_url:
        "https://images.unsplash.com/photo-1598515994362-449892014996?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aG9vZGllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch5 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Water Bottle",
      description: "Eco-friendly water bottle with the club logo.",
      price: 15.0,
      stock_quantity: 150,
      category: "Accessories",
      image_url:
        "https://images.unsplash.com/photo-1549644808-26297e859c6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch6 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Pen",
      description: "A sleek pen with the club's name engraved.",
      price: 3.0,
      stock_quantity: 500,
      category: "Stationery",
      image_url:
        "https://images.unsplash.com/photo-1550565299-b18638d7943b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch7 = await prisma.merchandise.create({
    data: {
      name: "Tech Club Notebook",
      description: "A spiral-bound notebook with the club logo.",
      price: 7.5,
      stock_quantity: 200,
      category: "Stationery",
      image_url:
        "https://images.unsplash.com/photo-1593720213489-699959c2ad4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch8 = await prisma.merchandise.create({
    data: {
      name: "Tech Club USB Drive (16GB)",
      description: "A 16GB USB drive with the club's branding.",
      price: 12.0,
      stock_quantity: 100,
      category: "Gadgets",
      image_url:
        "https://images.unsplash.com/photo-1579586337278-3befd478c557?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNiJTIwZHJpdmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch9 = await prisma.merchandise.create({
    data: {
      name: "Introduction to Python Programming",
      description: "A beginner-friendly book on Python programming.",
      price: 25.0,
      stock_quantity: 50,
      category: "Books",
      image_url:
        "https://images.unsplash.com/photo-1595278618635-191f252c76d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym9va3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    },
  });

  const merch10 = await prisma.merchandise.create({
    data: {
      name: "Advanced Machine Learning Concepts",
      description: "A comprehensive guide to advanced ML topics.",
      price: 40.0,
      stock_quantity: 30,
      category: "Books",
      image_url:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    },
  });

  // Create orders and associate with users
  const order1 = await prisma.order.create({
    data: {
      user_id: user1.id,
      total_price: 55.0,
      status: "PENDING",
      payment_method: "UPI",
      transaction_id: "txn123456",
      orderItems: {
        create: [
          {
            item_id: merch1.item_id,
            quantity: 2,
            price_per_item: 20.0,
          },
          {
            item_id: merch2.item_id,
            quantity: 1,
            price_per_item: 10.0,
          },
        ],
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      user_id: user2.id,
      total_price: 25.0,
      status: "PENDING",
      payment_method: "BANK_TRANSFER",
      transaction_id: "txn654321",
      orderItems: {
        create: [
          {
            item_id: merch3.item_id,
            quantity: 5,
            price_per_item: 5.0,
          },
        ],
      },
    },
  });

  const order3 = await prisma.order.create({
    data: {
      user_id: user3.id,
      total_price: 35.0,
      status: "PENDING",
      payment_method: "UPI",
      transaction_id: "txn789123",
      orderItems: {
        create: [
          {
            item_id: merch4.item_id,
            quantity: 1,
            price_per_item: 35.0,
          },
        ],
      },
    },
  });

  const order4 = await prisma.order.create({
    data: {
      user_id: user4.id,
      total_price: 15.0,
      status: "PENDING",
      payment_method: "CARD",
      transaction_id: "txn987654",
      orderItems: {
        create: [
          {
            item_id: merch5.item_id,
            quantity: 1,
            price_per_item: 15.0,
          },
        ],
      },
    },
  });

  const order5 = await prisma.order.create({
    data: {
      user_id: user1.id,
      total_price: 10.5,
      status: "APPROVED",
      payment_method: "UPI",
      transaction_id: "txn112233",
      orderItems: {
        create: [
          {
            item_id: merch6.item_id,
            quantity: 2,
            price_per_item: 3.0,
          },
          {
            item_id: merch7.item_id,
            quantity: 1,
            price_per_item: 4.5,
          },
        ],
      },
    },
  });

  const order6 = await prisma.order.create({
    data: {
      user_id: user2.id,
      total_price: 24.0,
      status: "PENDING",
      payment_method: "BANK_TRANSFER",
      transaction_id: "txn445566",
      orderItems: {
        create: [
          {
            item_id: merch8.item_id,
            quantity: 2,
            price_per_item: 12.0,
          },
        ],
      },
    },
  });

  const order7 = await prisma.order.create({
    data: {
      user_id: user3.id,
      total_price: 25.0,
      status: "APPROVED",
      payment_method: "CARD",
      transaction_id: "txn778899",
      orderItems: {
        create: [
          {
            item_id: merch9.item_id,
            quantity: 1,
            price_per_item: 25.0,
          },
        ],
      },
    },
  });

  const order8 = await prisma.order.create({
    data: {
      user_id: user4.id,
      total_price: 80.0,
      status: "PENDING",
      payment_method: "UPI",
      transaction_id: "txn009988",
      orderItems: {
        create: [
          {
            item_id: merch4.item_id,
            quantity: 2,
            price_per_item: 35.0,
          },
          {
            item_id: merch10.item_id,
            quantity: 1,
            price_per_item: 10.0,
          },
        ],
      },
    },
  });

  // Create admin verification for orders
  const adminVerification1 = await prisma.adminVerification.create({
    data: {
      order_id: order1.order_id,
      admin_id: user1.id,
      status: "APPROVED",
      remarks: "Payment verified, order approved.",
    },
  });

  const adminVerification2 = await prisma.adminVerification.create({
    data: {
      order_id: order2.order_id,
      admin_id: user2.id,
      status: "APPROVED",
      remarks: "Payment confirmed, order approved.",
    },
  });

  const adminVerification3 = await prisma.adminVerification.create({
    data: {
      order_id: order3.order_id,
      admin_id: user1.id,
      status: "PENDING",
      remarks: "Waiting for payment confirmation.",
    },
  });

  const adminVerification4 = await prisma.adminVerification.create({
    data: {
      order_id: order4.order_id,
      admin_id: user3.id,
      status: "APPROVED",
      remarks: "Order processed and ready for shipment.",
    },
  });

  const adminVerification5 = await prisma.adminVerification.create({
    data: {
      order_id: order5.order_id,
      admin_id: user2.id,
      status: "APPROVED",
      remarks: "Order completed successfully.",
    },
  });

  const adminVerification6 = await prisma.adminVerification.create({
    data: {
      order_id: order6.order_id,
      admin_id: user4.id,
      status: "APPROVED",
      remarks: "Items shipped.",
    },
  });

  const adminVerification7 = await prisma.adminVerification.create({
    data: {
      order_id: order7.order_id,
      admin_id: user1.id,
      status: "APPROVED",
      remarks: "Delivery confirmed.",
    },
  });

  const adminVerification8 = await prisma.adminVerification.create({
    data: {
      order_id: order8.order_id,
      admin_id: user3.id,
      status: "PROCESSING",
      remarks: "Preparing items for shipment.",
    },
  });

  // Create meetings and associate with users
  const meeting1 = await prisma.meeting.create({
    data: {
      venue: "Conference Room 1",
      starts: new Date("2025-01-10T10:00:00Z"),
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
      starts: new Date("2025-04-12T14:00:00Z"),
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
      starts: new Date("2025-06-15T11:00:00Z"),
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
      starts: new Date("2025-05-20T09:00:00Z"),
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
      starts: new Date("2025-01-25T16:00:00Z"),
      duration: 45, // 45 minutes
      topic_of_discussion: "Informal Catchup and Networking",
      hostID: user1.id, // John Doe as the host
      attendees: {
        connect: [{ id: user3.id }, { id: user4.id }],
      },
    },
  });

  const meeting6 = await prisma.meeting.create({
    data: {
      venue: "Online Platform X",
      starts: new Date("2025-07-01T15:30:00Z"),
      duration: 90,
      topic_of_discussion: "New Project Brainstorming",
      hostID: user2.id,
      attendees: {
        connect: [{ id: user3.id }, { id: user4.id }],
      },
    },
  });

  const meeting7 = await prisma.meeting.create({
    data: {
      venue: "Seminar Hall A",
      starts: new Date("2024-11-10T10:30:00Z"),
      duration: 60,
      topic_of_discussion: "Guest Speaker Session",
      hostID: user3.id,
      attendees: {
        connect: [{ id: user1.id }, { id: user4.id }],
      },
    },
  });

  const meeting8 = await prisma.meeting.create({
    data: {
      venue: "Tech Club Office",
      starts: new Date("2025-03-05T17:00:00Z"),
      duration: 30,
      topic_of_discussion: "Quick Updates and Planning",
      hostID: user4.id,
      attendees: {
        connect: [{ id: user1.id }, { id: user2.id }],
      },
    },
  });

  // Create notices
  const notice1 = await prisma.notice.create({
    data: {
      headline: "Club Meeting Rescheduled",
      body: "The upcoming Tech Club meeting has been rescheduled to Friday at 5 PM in Conference Room 2.",
      category: "General",
      userID: user1.id,
    },
  });

  const notice2 = await prisma.notice.create({
    data: {
      headline: "Workshop on AI & ML",
      body: "Join us for an exclusive workshop on AI and Machine Learning this Saturday. Registrations are open!",
      category: "Technical",
      userID: user2.id,
    },
  });

  const notice3 = await prisma.notice.create({
    data: {
      headline: "Hackathon Sponsorship",
      body: "We are looking for sponsors for the upcoming inter-college hackathon. Interested parties, please contact us.",
      category: "Sponsorship",
      userID: user3.id,
    },
  });

  const notice4 = await prisma.notice.create({
    data: {
      headline: "Tech Fest Volunteers Needed",
      body: "We need volunteers for the upcoming Tech Fest. Interested students can sign up by Wednesday.",
      category: "General",
      userID: user4.id,
    },
  });

  const notice5 = await prisma.notice.create({
    data: {
      headline: "Blockchain Seminar Registration",
      body: "Registrations for the Blockchain Seminar are now open! Secure your spot before the deadline.",
      category: "Technical",
      userID: user1.id,
    },
  });

  const notice6 = await prisma.notice.create({
    data: {
      headline: "Call for Design Ideas",
      body: "Submit your creative design ideas for the new club merchandise by the end of the week.",
      category: "General", // Assuming 'Design' maps to 'General' for notices
      userID: user2.id,
    },
  });

  const notice7 = await prisma.notice.create({
    data: {
      headline: "Public Relations Campaign Launch",
      body: "Our new PR campaign starts next Monday. Members are requested to actively participate.",
      category: "General", // Assuming 'PR' maps to 'General' for notices
      userID: user3.id,
    },
  });

  const notice8 = await prisma.notice.create({
    data: {
      headline: "Important Announcement Regarding Membership Fees",
      body: "Please note the deadline for membership fee payment is approaching. Ensure timely payment.",
      category: "General",
      userID: user4.id,
    },
  });

  // Create teams
  const team1 = await prisma.team.create({
    data: {
      team_name: "AlphaTech",
      team_leader_id: user1.id,
      team_members: {
        connect: [{ id: user2.id }, { id: user3.id }],
      },
    },
  });

  const team2 = await prisma.team.create({
    data: {
      team_name: "CodeWarriors",
      team_leader_id: user4.id,
      team_members: {
        connect: [{ id: user1.id }],
      },
    },
  });

  const team3 = await prisma.team.create({
    data: {
      team_name: "Innovators",
      team_leader_id: user2.id,
      team_members: {
        connect: [{ id: user3.id }, { id: user4.id }],
      },
    },
  });

  const team4 = await prisma.team.create({
    data: {
      team_name: "WebWizards",
      team_leader_id: user3.id,
      team_members: {
        connect: [{ id: user1.id }, { id: user4.id }],
      },
    },
  });

  // Create pending requests
  const pendingRequest1 = await prisma.pending_requests.create({
    data: {
      user_id: user3.id,
      team_id: team1.team_id,
    },
  });

  const pendingRequest2 = await prisma.pending_requests.create({
    data: {
      user_id: user2.id,
      team_id: team2.team_id,
    },
  });

  const pendingRequest3 = await prisma.pending_requests.create({
    data: {
      user_id: user1.id,
      team_id: team3.team_id,
    },
  });

  const pendingRequest4 = await prisma.pending_requests.create({
    data: {
      user_id: user4.id,
      team_id: team1.team_id,
    },
  });

  // Create competitions
  const competition1 = await prisma.competitions.create({
    data: {
      competitionName: "CodeMaster Challenge",
      conductedBy: "Tech Club",
      conductedOn: new Date("2025-05-15T09:00:00Z"),
      registration_deadline: new Date("2025-05-10T23:59:00Z"),
      venue: "Coding Lab A",
      prize: "₹10,000",
      description: "A competitive programming contest.",
      imageURL:
        "https://images.unsplash.com/photo-1555076914-419e47c49113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcGV0aXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      min_team_size: 1,
      max_team_size: 2,
      creator_id: user1.id,
      users_participated: {
        connect: [{ id: user2.id }, { id: user3.id }],
      },
      teams_participated: {
        connect: [{ team_id: team1.team_id }],
      },
      first_prize: {
        connect: [{ id: user2.id }],
      },
    },
  });

  const competition2 = await prisma.competitions.create({
    data: {
      competitionName: "Ideathon 2025",
      conductedBy: "Innovation Cell",
      conductedOn: new Date("2025-06-20T10:00:00Z"),
      registration_deadline: new Date("2025-06-15T23:59:00Z"),
      venue: "Auditorium",
      prize: "Incubation Opportunity",
      description: "An idea pitching competition.",
      imageURL:
        "https://images.unsplash.com/photo-1509869175650-a1dca98e292a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y29tcGV0aXRpb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      min_team_size: 1,
      max_team_size: 3,
      creator_id: user2.id,
      users_participated: {
        connect: [{ id: user1.id }, { id: user4.id }],
      },
      teams_participated: {
        connect: [{ team_id: team2.team_id }],
      },
      second_prize: {
        connect: [{ id: user4.id }],
      },
    },
  });

  const competition3 = await prisma.competitions.create({
    data: {
      competitionName: "Web Design Challenge",
      conductedBy: "Web Development Club",
      conductedOn: new Date("2025-07-10T11:00:00Z"),
      registration_deadline: new Date("2025-07-05T23:59:00Z"),
      venue: "Computer Lab B",
      prize: "₹5,000",
      description: "A competition focused on web design skills.",
      imageURL:
        "https://images.unsplash.com/photo-1515879236874-67db64d3ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGNvbXBldGl0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      min_team_size: 1,
      max_team_size: 2,
      creator_id: user3.id,
      users_participated: {
        connect: [{ id: user1.id }, { id: user3.id }],
      },
      teams_participated: {
        connect: [{ team_id: team3.team_id }],
      },
      third_prize: {
        connect: [{ id: user1.id }],
      },
    },
  });

  const competition4 = await prisma.competitions.create({
    data: {
      competitionName: "AI Innovation Contest",
      conductedBy: "AI/ML Club",
      conductedOn: new Date("2025-08-05T14:00:00Z"),
      registration_deadline: new Date("2025-07-30T23:59:00Z"),
      venue: "Seminar Hall B",
      prize: "Internship Opportunity",
      description: "A contest showcasing innovative AI/ML projects.",
      imageURL:
        "https://images.unsplash.com/photo-1550207865-201813418ef8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbXBldGl0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      min_team_size: 1,
      max_team_size: 3,
      creator_id: user4.id,
      users_participated: {
        connect: [{ id: user2.id }, { id: user4.id }],
      },
      teams_participated: {
        connect: [{ team_id: team4.team_id }],
      },
      first_prize: {
        connect: [{ id: user2.id }],
      },
    },
  });

  // Create events
  const event1 = await prisma.events.create({
    data: {
      eventName: "Tech Symposium 2025",
      conductedBy: "Tech Club",
      conductedOn: new Date("2025-09-15T09:00:00Z"),
      registration_deadline: new Date("2025-09-10T23:59:00Z"),
      venue: "Main Auditorium",
      description: "A flagship tech event with talks and workshops.",
      imageURL:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      creator_id: user1.id,
      users_participated: {
        connect: [{ id: user2.id }, { id: user3.id }, { id: user4.id }],
      },
      first_prize_id: user1.id,
    },
  });

  const event2 = await prisma.events.create({
    data: {
      eventName: "Coding Workshop for Beginners",
      conductedBy: "Programming Club",
      conductedOn: new Date("2025-05-25T10:00:00Z"),
      registration_deadline: new Date("2025-05-20T23:59:00Z"),
      venue: "Computer Lab A",
      description: "An introductory workshop to programming.",
      imageURL:
        "https://images.unsplash.com/photo-1583508915841-08173022681a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8d29ya3Nob3B8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      creator_id: user2.id,
      users_participated: {
        connect: [{ id: user1.id }, { id: user3.id }],
      },
    },
  });

  const event3 = await prisma.events.create({
    data: {
      eventName: "Guest Lecture on AI Ethics",
      conductedBy: "AI/ML Society",
      conductedOn: new Date("2025-07-20T14:00:00Z"),
      registration_deadline: new Date("2025-07-15T23:59:00Z"),
      venue: "Seminar Hall A",
      description:
        "A lecture on the ethical implications of Artificial Intelligence.",
      imageURL:
        "https://images.unsplash.com/photo-1550005865-98889494c3fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGVjdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      creator_id: user3.id,
      users_participated: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user4.id }],
      },
      first_prize_id: user3.id,
    },
  });

  const event4 = await prisma.events.create({
    data: {
      eventName: "Annual Tech Fest",
      conductedBy: "All Clubs",
      conductedOn: new Date("2026-03-10T09:00:00Z"),
      registration_deadline: new Date("2026-03-05T23:59:00Z"),
      venue: "Campus Grounds",
      description: "The annual technology festival of the college.",
      imageURL:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGVjaCUyMGZlc3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      creator_id: user4.id,
      users_participated: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }],
      },
    },
  });

  // Create albums
  const album1 = await prisma.album.create({
    data: {
      name: "Tech Symposium 2024",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1603481588273-2f908dd7c741?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3l0bXBvc2l1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          },
          {
            url: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c3l0bXBvc2l1bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    },
  });

  const album2 = await prisma.album.create({
    data: {
      name: "Club Events 2023",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2x1YiUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          },
          {
            url: "https://images.unsplash.com/photo-1504384308090-c894fdc013b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2x1YiUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          },
          {
            url: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2x1YiUyMGV2ZW50fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    },
  });

  const album3 = await prisma.album.create({
    data: {
      name: "Hackathon Winners",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1573497005953-9c29a964e841?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGFja2F0aG9uJTIwd2lubmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          },
          {
            url: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aGFja2F0aG9uJTIwd2lubmVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    },
  });

  const album4 = await prisma.album.create({
    data: {
      name: "Merchandise Showcase",
      images: {
        create: [
          {
            url: "https://images.unsplash.com/photo-1580912692952-3c8aa4440629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWVyY2hhbmRpc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          },
          {
            url: "https://images.unsplash.com/photo-1610824350589-c1188358d212?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bWVyY2hhbmRpc2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          },
        ],
      },
    },
  });

  // Create latest news
  const news1 = await prisma.latestNews.create({
    data: {
      title: "Upcoming Tech Symposium Announced",
      description: "The annual Tech Symposium will be held on September 15th.",
      link: "/events/tech-symposium-2025",
      is_active: true,
    },
  });

  const news2 = await prisma.latestNews.create({
    data: {
      title: "Registrations Open for Coding Workshop",
      description: "Enroll now for the beginner-friendly coding workshop.",
      link: "/events/coding-workshop",
      is_active: true,
    },
  });

  const news3 = await prisma.latestNews.create({
    data: {
      title: "Call for Volunteers - Tech Fest 2026",
      description:
        "Students are invited to volunteer for the upcoming Tech Fest.",
      link: "/volunteer/tech-fest-2026",
      is_active: true,
    },
  });

  const news4 = await prisma.latestNews.create({
    data: {
      title: "New Merchandise Available!",
      description: "Check out the latest Tech Club merchandise.",
      link: "/merchandise",
      is_active: true,
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .then(() => {
    console.log("Seeding completed successfully.");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
