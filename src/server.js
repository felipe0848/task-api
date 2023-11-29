import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);

  const route = routes.find(
    (route) => route.method === req.method && route.path === req.url
  );
  if (route) {
    return route.handler(req, res);
  }
  return res.writeHead(404);
});

server.listen(3333);
