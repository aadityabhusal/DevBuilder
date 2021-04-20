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
  padding: 20px;
  margin: 0 20%;
`;

const SiteForm = styled.div`
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #34495e;

  & input {
    flex: 1;
    border: 1px solid #34495e;
    outline: 0;
    padding: 8px;
    margin-right: 20px;
  }

  & button {
    background-color: #34495e;
    border: none;
    color: #fff;
    padding: 8px;
    outline: 0;
    cursor: pointer;
  }
`;

const SiteList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Site = styled.div`
  flex: 0 0 25%;
  padding: 10px;
  margin: 20px 2%;
  box-shadow: 0 5px 10px 0 #bdc3c7;
  border-radius: 3px;
  text-align: center;

  & img {
    width: 100%;
  }

  & a {
    text-decoration: none;
    color: #34495e;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

export function UserPage(props) {
  const [user, setUser] = useState();
  const [siteName, setSiteName] = useState("");
  const [sites, setSites] = useState([]);

  const { auth, setLoggedIn } = useAuth();
  const { userId } = useParams();

  const createSite = async (e) => {
    let data = {
      name: siteName,
      userId: user._id,
    };
    let response = await fetch(`/site`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let sitesData = await response.json();
    setSites(sitesData);
    setSiteName("");
  };

  useEffect(() => {
    if (auth) {
      setLoggedIn(true);
    }
    getUser(userId, auth);
  }, [userId, auth, setLoggedIn]);

  const getUser = async (userId, auth) => {
    if (!auth) {
      let response = await fetch(`/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setUser(data);
    } else {
      setUser(auth);
      setSites(auth.sites);
    }
  };

  return user ? (
    <div>
      <UserHead>
        <img src="/default-user.png" alt="user" />
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          {auth && <h2>{`${auth.email}`}</h2>}
        </div>
      </UserHead>
      <Sites>
        {auth && (
          <SiteForm>
            <input
              type="text"
              placeholder="Enter your site name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
            ></input>
            <button onClick={createSite}>Create Site</button>
          </SiteForm>
        )}
        <SiteList>
          {sites.length ? (
            sites.map((item) => (
              <Site key={item.siteId}>
                <img src="/siteImage.png" alt="Site" />
                <a href={`/editor/${item.siteId}`}>{item.siteName}</a>
              </Site>
            ))
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              No Sites Created
            </div>
          )}
        </SiteList>
      </Sites>
    </div>
  ) : (
    <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
  );
}
