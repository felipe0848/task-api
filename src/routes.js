import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    path: buildRoutePath("/tasks"),
    method: "GET",
    handler: (req, res) => {
      const tasks = database.select("tasks");
      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    path: buildRoutePath("/tasks"),
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
        .end("titulo ou descrição da tarefa não enviado(s)");
    },
  },
  {
    path: buildRoutePath("/tasks/:id"),
    method: "PUT",
    handler: (req, res) => {
      const { title, description } = req.body || {};
      if (!title && !description)
        return res
          .writeHead(400)
          .end("titulo ou descrição da tarefa não enviado(s)");

      const { id } = req.params;
      const task = database.select("tasks").find((task) => task.id === id);

      if (task) {
        if (title) task.title = title;
        if (description) task.description = description;
        task.updated_at = new Date();
        database.update("tasks", id, task);
        return res.writeHead(200).end(JSON.stringify(task));
      }

      return res.writeHead(404).end("task não encontrada");
    },
  },
];
