import cors from "cors";

import express from 'express';

import bodyParser from "body-parser";

import { port } from "./settings";

import * as dotenv from "dotenv";

import apiRoutes from "./routes/api-endpoints";

// Refer to dotenv variables
dotenv.config();

const PORT = port;

const app = express();

// CORS middleware definition
app.use(
    cors({
      origin: "*",
      credentials: true,
    })
 );

// Uncaught exception
process.on("uncaughtException", (err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// CRUD Routes
app.use("/devtest/api", apiRoutes);

// Test Route
app.get("/", (req: express.Request, res: express.Response) => res.send(
    "<html>" +
        "<body>" +
            "<h1>Test Page Only</h1>" +
        "</body>" +
    "</html>"
));

// Middleware to capture errors
app.use((req: express.Request,
    res: express.Response,
    next: express.NextFunction
   ) => {
              res.status(404);
              res.json({ error: "NOT FOUND - Check CORRECT Address" });
        }
);

app.set("port", PORT);

app.listen(PORT, () => {
  console.log(`Listening on port - ${PORT} ...`)
});
app.on("error", (err: any) => {
  console.log(err);
});







