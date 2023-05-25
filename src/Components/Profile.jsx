import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROFILE } from "../gqlOpt/queries";

const Profile = () => {
  const { data, loading } = useQuery(GET_PROFILE);

  return (
    <>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="container mycontainer">
          <div className="center-align">
            <img
              src="https://xsgames.co/randomusers/assets/avatars/male/46.jpg"
              alt="Img"
            />
            <h5>{data.user.firstname}</h5>
            <h6>{data.user.email}</h6>
          </div>
          <h4>Your Quotes</h4>
          {data.user.quotes.map((qu) => {
            return (
              <>
                <blockquote>
                  <h6>{qu.name}</h6>
                </blockquote>
              </>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Profile;
