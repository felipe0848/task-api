import fs from "node:fs/promises";
const pathDatabase = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(pathDatabase, "utf8")
      .then((data) => {
        this.#database = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    fs.writeFile(pathDatabase, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();
    return data;
  }

  select(table) {
    let data = this.#database[table] || [];
    return data;
  }
}
