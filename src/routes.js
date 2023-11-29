import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    path: "/tasks",
    method: "GET",
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    path: "/tasks",
    method: "POST",
    handler: (req, res) => {
      const { title, description } = req.body;
      if (title && description) {
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

      return res
        .writeHead(400)
        .end("titulo ou descrição da tarefa não existe(m)");
    },
  },
];
