import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./SchemaGQL.js";
import resolvers, { JWT_SECRET } from "./resolvers.js";
import mongoose from "mongoose";
import "./models/User.js";
import "./models/quote.js";
import jwt from "jsonwebtoken";

//db connection
const mongoURI = "mongodb://127.0.0.1:27017/graphqldb";
mongoose.connect(mongoURI);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { userId } = jwt.verify(authorization, JWT_SECRET);
      return { userId };
    }
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen(5000).then(({ url }) => console.log(url));
