import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useAuth } from "../Auth/useAuth";

const UserHead = styled.div`
  margin: 0 20%;
  border-bottom: 2px solid #34495e;
  display: flex;
  align-items: center;
  & img {
    width: 100px;
    height: 100px;
    margin-right: 30px;
  }
`;

const Sites = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Site = styled.div`
  flex: 0 0 20%;
`;

export function UserPage(props) {
  const [user, setUser] = useState();
  const auth = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      let response = await fetch(`/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      console.log(data);
      setUser(data);
    })();
  }, []);

  return user ? (
    <div>
      <UserHead>
        <img src="/default-user.png" alt="user" />
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          {auth && <h2>{`${auth.email}`}</h2>}
        </div>
      </UserHead>
      <Sites>{auth && auth.sites.map((item) => <Site>{item}</Site>)}</Sites>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
