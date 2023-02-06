var express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
var cors = require("cors");
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
const Web3 = require("web3");

const web3 = new Web3("https://api.hyperspace.node.glif.io/rpc/v1"); // hyperspace network

const router = require("./routes/data.routes");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

const CONTRACT_ADDRESS = "0x56A2EF3d9ff17c94ccb8b62909887edB46eB5140"; // add your contract address here.
const CONTRACT_ABI = require("./abi/auction.json"); // add your abi to the abi json file.
const { GraphQLSchema } = require("graphql");
const { RootQueryType, RootMutationType } = require("./graphql/resolver");
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

let blockNumber = 57185;

async function getLastestBlock() {
  return await web3.eth.getBlockNumber();
}

async function getEvents() {
  let latest_block = await getLastestBlock();
  blockNumber = blockNumber === 0 ? latest_block - 1 : blockNumber;
  console.log(
    "before - latest: ",
    latest_block,
    "previous block: ",
    blockNumber
  );
  if (latest_block !== blockNumber) {
    const events = await contract.getPastEvents(
      "ProdcastCreated", // change if your looking for a different event
      { fromBlock: blockNumber + 1, toBlock: "latest" }
    );

    const eventsAuction = await contract.getPastEvents(
      "ProdcastCreated", // change if your looking for a different event
      { fromBlock: blockNumber + 1, toBlock: "latest" }
    );
    blockNumber = latest_block;
    if (events.length !== 0) {
      console.log(events[0].raw.topics, "topic");
    }

    if (eventsAuction.length !== 0) {
      console.log(events, "events");
      console.log(eventsAuction[0].raw.topics, "topic auction");
    }
    console.log(
      "after - before - latest: ",
      latest_block,
      "previous block: ",
      blockNumber
    );
    indexData();
  }
  getEvents();
}

async function indexData() {
  // query data logic.
  getEvents();
}

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
  });
  
  app.use(
    "/graphql",
    expressGraphQL({
      schema: schema,
      graphiql: true,
    })
  );

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use(router);

server.listen(
  PORT,
  () => console.log(`server has started on port ${PORT}`),
  getEvents(CONTRACT_ABI, CONTRACT_ADDRESS)
);
