import { Schema, model } from "mongoose";

const quoteSchema = new Schema({
  name: { type: String, required: true },
  by: { type: Schema.Types.ObjectId, ref: "user" },
});

const Quotes = model("quotes", quoteSchema);
export default Quotes;
