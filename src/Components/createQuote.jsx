import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Add_Quote } from "../gqlOpt/mutation";
import { GET_ALL_QUOTES } from "../gqlOpt/queries";

const CreateQuote = () => {
  const [createQuote, { loading, error }] = useMutation(Add_Quote, {
    refetchQueries: ["getAllQuotes", "getProfile"],
  });
  const [quote, setQuote] = useState("");
  const AddQuote = (e) => {
    e.preventDefault();
    if (quote) {
      createQuote({
        variables: {
          name: quote,
        },
      }).catch((err) => console.log(err));
      setQuote("");
    }
  };
  return (
    <>
      {error ? <div className="red card-panel"></div> : ""}
      <div className="container">
        <form onSubmit={AddQuote}>
          <div className="input-field">
            <input
              type="text"
              placeholder="Add Quote"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>
          <button className="btn deep-purple">
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateQuote;
