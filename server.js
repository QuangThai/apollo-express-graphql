const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const Noti = require("./models/noti.model");

const typeDefs = gql`
  type Noti {
    id: ID
    type: String
    desc: String
  }

  type Query {
    hello: String
    getAllNoti: [Noti]
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world",
    getAllNoti: async () => {
      return await Noti.find();
    },
  },
};

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/notifications", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  app.listen(4000, () => console.log("Server in running on port 4000"));
};

startServer();
