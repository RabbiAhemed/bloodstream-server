const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
// middleware
app.use(cors());
app.use(express.json());

//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster3.qsamybe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.esmmy.mongodb.net/?retryWrites=true&w=majority`;
// // console.log(uri);
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });

async function run() {
  try {
    const donorsCollection = client.db("bloodstream").collection("donors");
    // get all donors
    app.get("/donors", async (req, res) => {
      const query = {};
      const cursor = donorsCollection.find(query);
      const donors = await cursor.toArray();
      res.send(donors);
    });
  } finally {
  }
}

run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("bloodstream server is live and running");
});

app.listen(port, () => {
  console.log(`bloodstream server is running on port ${port}`);
});
