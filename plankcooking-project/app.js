const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const bodyParser = require("body-parser");
const path = require("path");
const sql = require("mssql");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
liveReloadServer.watch(path.join(__dirname, "src"));
const port = process.env.PORT;

const app = express();

const config = {
  user: "ECraigen_W20",
  password: "L3v1athan!!",
  server: "134.39.173.35",
  database: "ECraigen_W20",
  options: {
    enableArithAbort: true,
    encrypt: false
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};
const newId = uuidv4();
app.set("uniqueID", newId);

sql.connect(config).catch((err) => debug(err));

app.use(session({
  secret: "something",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 36000000, secure: false, httpOnly: true }
}));
app.use(connectLivereload());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "css")
  )
);
app.use(
  "/js",
  express.static(
    path.join(__dirname, "node_modules", "bootstrap", "dist", "js")
  )
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules", "jquery", "dist"))
);

app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
  {
    extended: true
  }
));

const singlePagesRouter = require("./src/routes/singlePagesRoutes")();
const shopRouter = require("./src/routes/shopRoutes")();
const cartRouter = require("./src/routes/cartRoutes")();

app.use("/", singlePagesRouter);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  console.log(req.app.settings.uniqueID);
  res.render("index");
});

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.listen(port, "0.0.0.0", () => {
  debug(`Listening on port ${chalk.green(port)}`);

  if (process.send) {
    process.send("online");
  }
});
