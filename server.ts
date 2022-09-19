import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3010;

const prisma = new PrismaClient();

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

app.get("/users/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await prisma.user.findUnique({
    where: { id },
    include: { posts: true },
  });
  res.send(user);
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { comments: true },
  });
  res.send(posts);
});

app.get("/posts/:id", async (req, res) => {
  const id = Number(req.params.id);
  const post = await prisma.post.findUnique({
    where: { id },
    include: { user: true } && { comments: true },
  });
  res.send(post);
});

app.listen(port, () => {
  console.log(`Server is live on: http://localhost:${port}`);
});
