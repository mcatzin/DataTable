const express = require("express");
const chance = require("chance").Chance();
const shuffleArray = require("shuffle-array");

const app = express();

app.use(express.static("public"));

const data = {
  headers: ["Part Number", "Company", "Date", "Item", "Measurement"],
  rows: new Array(10).fill(undefined).map(() => {
    return [
      chance.integer({ min: 0, max: 100 }),
      chance.company(),
      chance.date({ string: true }),
      chance.word(),
      chance.floating({ min: 0, max: 100, fixed: 3 }),
    ];
  }),
};

app.get("/data", (req, res) => {
  res.json({
    headers: data.headers,
    rows: shuffleArray(data.rows),
    lastUpdated: new Date().toISOString(),
  });
});

app.listen(3001, () => console.log("app is running"));
