import express from "express";
import "dotenv/config";
import cors from "cors";
import { createWriteStream } from "fs";
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const mkdirp = require("mkdirp");

import { ApolloServer, AuthenticationError } from "apollo-server-express";

import schema from "./schema/user";
import resolvers from "./resolvers/user";

// import models, { sequelize } from "./models";

const UPLOAD_DIR = "./uploads";
const db = lowdb(new FileSync("db.json"));

// Seed an empty DB.
db.defaults({ users: [] }).write();

// Ensure upload directory exists.
mkdirp.sync(UPLOAD_DIR);

const app = express();
app.use(cors());
app.use(express.static("uploads"));

const storeUpload = async (upload, id) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const path = `${UPLOAD_DIR}/${id}-${filename}`;
  const file = { id, filename, mimetype, path };

  // Store the file in the filesystem.
  await new Promise((resolve, reject) => {
    stream
      .on("error", error => {
        unlink(path, () => {
          reject(error);
        });
      })
      .pipe(createWriteStream(path))
      .on("error", reject)
      .on("finish", resolve);
  });

  return file;
};

const server = new ApolloServer({
  typeDefs: schema,
  uploads: {
    // Limits here should be stricter than config for surrounding
    // infrastructure such as Nginx so errors can be handled elegantly by
    // graphql-upload:
    // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20
  },
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message
    };
  },
  context: {
    db,
    storeUpload
  }
});

server.applyMiddleware({ app, path: "/graphql" });

app.listen({ port: 8000 }, () => {
  console.log("Apollo server running on http://localhost:8000/graphql");
});
