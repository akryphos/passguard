const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const postsToCreate = [
  {
    id: "69d8b260-3195-42fe-b4a8-d20846d4812e",
    title: "First Post",
    content: "This is the content of the first post.",
  },
  {
    id: "d134324f-cf73-4ba4-984f-b528a7fa61af",
    title: "Second Post",
    content: "This is the content of the second post.",
  },
  {
    id: "24d1489c-3656-4b55-913b-24b6d85a5678",
    title: "Third Post",
    content: "This is the content of the third post.",
  },
  {
    id: "f21f6a4b-e6d5-4161-b0cd-b4ce3bbbe32b",
    title: "Fourth Post",
    content: "This is the content of the fourth post.",
  },
  {
    id: "e76578b7-3f5c-41ac-80fc-6060df94997c",
    title: "Fifth Post",
    content: "This is the content of the fifth post.",
  },
];

const seed = async (posts) => {
  console.log("Seeding posts...");

  for (let i = 0; i < posts.length; i++) {
    await client.post.upsert({
      where: { id: posts[i].id },
      update: posts[i],
      create: posts[i],
    });
  }
};

seed(postsToCreate)
  .then(() => {
    console.log("Created/Updated posts successfully!");
  })
  .catch((error) => {
    console.log("Error seeding posts: ", error);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Disconnected Prisma Client, exiting.");
  });
