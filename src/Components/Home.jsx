import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../gqlOpt/queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      <div className="container">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          data.quotes.map((qu, ind) => {
            return (
              <>
                <blockquote key={ind}>
                  <h6>{qu.name}</h6>
                </blockquote>
              </>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
