const express = require("express");
const app = express();

app.use(express.json());

let domains = {};

// create
app.post("/create", (req, res) => {
  const { name, target } = req.body;

  if (domains[name]) {
    return res.json({ error: "Already exists" });
  }

  domains[name] = target;
  res.json({ success: true });
});

// handle
app.use((req, res) => {
  const host = req.headers.host;
  const sub = host.split(".")[0];

  if (domains[sub]) {
    return res.redirect(domains[sub]);
  }

  res.send("Not found");
});

app.listen(3000, () => console.log("Running"));
