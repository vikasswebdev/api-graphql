const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const bodyParser = require("body-parser");
const graphqlSchema = require("./graphql/schema");
const graphqlResolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");

app.use(bodyParser.json());

app.use(auth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/firstgraphql")
  .then((result) => {
    app.listen(8080, () => {
      console.log("server running at 8080");
    });
  })
  .catch((err) => console.log(err));
