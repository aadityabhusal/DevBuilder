import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  EditUserButton,
  Site,
  SiteForm,
  SiteList,
  Sites,
  UserHead,
} from "../../components/user/User";
import { UserContext } from "../../contexts/UserContext";

export function UserPage({ user: authUser }) {
  const [user, setUser] = useState();
  const [sites, setSites] = useState([]);
  const [siteName, setSiteName] = useState([]);
  const { userId } = useParams();
  const { authFetch } = useContext(UserContext);

  const createSite = async (e) => {
    let data = {
      name: siteName,
      userId: user._id,
    };

    let sitesData = await authFetch(`/api/site`, "POST", { body: data });
    setSites(sitesData);
    setSiteName("");
  };

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        let response = await authFetch(`/api/user/${userId}`, "GET");
        setUser(response);
        setSites(response.sites);
      } catch (error) {}
    };
    getUser(userId);
  }, [userId, authFetch]);

  return user ? (
    <div>
      <UserHead>
        <img src="/default-user.png" alt="user" />
        <div>
          <h1>{`${user.firstName} ${user.lastName}`}</h1>
          {authUser._id === user._id && (
            <>
              <h2>{`${user.email}`}</h2>
              <EditUserButton to={`/user/${user._id}/edit`}>
                Edit Profile
              </EditUserButton>
            </>
          )}
        </div>
      </UserHead>
      <Sites>
        {authUser._id === user._id && (
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
          {authUser._id === user._id && sites?.length ? (
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
