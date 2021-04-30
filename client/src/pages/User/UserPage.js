import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

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

  & h1,
  h2 {
    margin-bottom: 0;
  }

  & > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-bottom: 20px;
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

const EditUserButton = styled(Link)`
  background-color: #34495e;
  border: none;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  align-self: flex-end;
`;

export function UserPage(props) {
  const [user, setUser] = useState();
  const [sites, setSites] = useState([]);
  const { user: authUser } = useContext(UserContext);
  const [siteName, setSiteName] = useState([]);
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
    getUser(userId);
    setSites(authUser?.sites || []);
  }, [userId, authUser]);

  const getUser = async (userId) => {
    try {
      let response = await fetch(`/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      let data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return user ? (
    <div>
      <UserHead>
        <img src="/default-user.png" alt="user" />
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          {authUser && (
            <>
              <h2>{`${authUser.email}`}</h2>
              <EditUserButton to={`/user/${authUser._id}/edit`}>
                Edit Profile
              </EditUserButton>
            </>
          )}
        </div>
      </UserHead>
      <Sites>
        {authUser && (
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
                <Link to={`/editor/${item.siteId}`}>{item.siteName}</Link>
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
