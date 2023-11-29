import http from "node:http";
import { json } from "./middlewares/json.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

const server = http.createServer(async (req, res) => {
  await json(req, res);

  if (req.method === "GET" && req.url === "/tasks") {
    const tasks = database.select("tasks");
    return res.writeHead(200).end(JSON.stringify(tasks));
  }
  if (req.method === "POST" && req.url === "/tasks") {
    const { title, description } = req.body;
    const task = {
      id: randomUUID(),
      title,
      description,
      completed_at: null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    database.insert("tasks", task);

    return res.writeHead(201).end(`tarefa ${title} criada!`);
  }
});

server.listen(3333);
