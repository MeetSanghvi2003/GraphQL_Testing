import User from "./models/User.js";
import Quotes from "./models/quote.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const JWT_SECRET = "MEET";

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (par, { _id }) => await User.findById(_id),
    quotes: async () => await Quotes.find(),
    quote: async (par, { by }) => await Quotes.find({ by }),
    myprofile: async (p, a, { userId }) => {
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (ur) => await Quotes.find({ by: ur._id }),
  },
  Mutation: {
    signupUser: async (par, { firstname, lastname, email, password }) => {
      let user = await User.findOne({ email });
      if (user) {
        throw new Error("EXISTS");
      }
      const hashed = await bcrypt.hash(password, 12);
      user = new User({
        firstname,
        lastname,
        email,
        password: hashed,
      });
      return user.save();
    },
    signinUser: async (par, { email, password }) => {
      let user = await User.findOne({ email });
      if (!user) {
        throw new Error("Doesnt EXISTS");
      }
      const comparison = await bcrypt.compare(password, user.password);
      if (!comparison) {
        throw new Error("Password Doesnt Match");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    createQuote: async (par, { name }, { userId }) => {
      if (!userId) {
        throw new Error("You Must Be Login");
      }
      const quote = new Quotes({
        name,
        by: userId,
      });
      await quote.save();
      return "Quote Saved Successfully";
    },
  },
};

export default resolvers;
