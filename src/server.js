import http from "node:http";
import { json } from "./middlewares/json.js";

const server = http.createServer(async (req, res) => {
  await json(req, res);

  if ((req.method === "GET", req.url === "/")) {
    res.end("teste teste OK");
  }
});

server.listen(3333);
