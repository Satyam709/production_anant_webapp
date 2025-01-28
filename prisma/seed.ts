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

  // Create merchandise
  const merch1 = await prisma.merchandise.create({
    data: {
      name: "Tech Club T-Shirt",
      description: "A comfortable t-shirt with the tech club logo.",
      price: 20.0,
      stock_quantity: 100,
      category: "Apparel",
      image_url:
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60",
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
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60",
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
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60",
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
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60",
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
        "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60",
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
