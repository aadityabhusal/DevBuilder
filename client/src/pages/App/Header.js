import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import styled from "styled-components";

const HeaderContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #34495e;
  color: #ecf0f1;

  & a {
    text-decoration: none;
    margin-left: 20px;
    color: #ecf0f1;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #00a8ff;
  }
`;

export function Header() {
  const { user, setUser, setToken } = useContext(UserContext);

  const logout = async (e) => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <HeaderContainer>
      <div></div>
      <nav>
        <NavLink activeClassName="is-active" to="/" exact={true}>
          Home
        </NavLink>
        {user ? (
          <>
            <NavLink activeClassName="is-active" to={`/user/${user._id}`}>
              {`${user.firstName} ${user.lastName}`}
            </NavLink>
            <NavLink activeClassName="is-active" to="/login" onClick={logout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink activeClassName="is-active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="is-active" to="/signup">
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </HeaderContainer>
  );
}
