import { sequelize, User, Event } from "./db.js";

const seedDB = async () => {
  //await sequelize.sync({ force: true });
  await sequelize.sync({ alter: true });

  const users = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "12345678",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      password: "12345678",
    },
    {
      name: "Jane Doe",
      email: "Jae@example.com",
      password: "12345678",
    },
  ];

  const events = [
    {
      title: "Summer Festival",
      description: "A fun summer festival with music and food",
      date: new Date(),
      location: "Central Park",
      latitude: 40.785091,
      longitude: -73.968285,
      organizerId: 1,
      imageUrl:
        "https://images.pexels.com/photos/433452/pexels-photo-433452.jpeg",
    },
    {
      title: "Tech Conference",
      description: "A conference about the latest in tech",
      date: new Date(),
      location: "Convention Center",
      latitude: 37.774929,
      longitude: -122.419418,
      organizerId: 2,
      imageUrl:
        "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg",
    },
    {
      title: "Oktoberfest",
      description:
        "A traditional German beer festival held annually in Munich.",
      date: new Date("2024-09-21"),
      location: "Theresienwiese, Munich",
      latitude: 48.131271,
      longitude: 11.549669,
      organizerId: 1,
      imageUrl:
        "https://images.pexels.com/photos/1533864/pexels-photo-1533864.jpeg",
    },
    {
      title: "Berlin Marathon",
      description:
        "One of the world’s largest and most popular marathons held annually in Berlin.",
      date: new Date("2024-09-29"),
      location: "Brandenburg Gate, Berlin",
      latitude: 52.516275,
      longitude: 13.377704,
      organizerId: 3,
      imageUrl:
        "https://images.pexels.com/photos/29400389/pexels-photo-29400389.jpeg",
    },
    {
      title: "Christmas Market",
      description:
        "A traditional German Christmas market held in the heart of Berlin.",
      date: new Date("2024-12-01"),
      location: "Alexanderplatz, Berlin",
      latitude: 52.521918,
      longitude: 13.413215,
      organizerId: 3,
      imageUrl:
        "https://images.pexels.com/photos/1674432/pexels-photo-1674432.jpeg",
    },
  ];

  const userCount = await User.count();
  if (userCount === 0) {
    await User.bulkCreate(users, { individualHooks: true });
  }

  const eventCount = await Event.count();
  if (eventCount === 0) {
    await Event.bulkCreate(events, { individualHooks: true });
  }
  /*await User.bulkCreate(users, { individualHooks: true });
  await Event.bulkCreate(events, { individualHooks: true });*/
};

try {
  await seedDB();
  console.log("Database seeded");
} catch (error) {
  console.error({ error });
} finally {
  sequelize.close();
  console.log("Database connection closed");
}
