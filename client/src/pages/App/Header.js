import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { HeaderContainer } from "../../components/common/Header";
import { UserContext } from "../../contexts/UserContext";

export function Header() {
  const { user, setNewToken } = useContext(UserContext);

  const logout = async (e) => {
    setNewToken("", "");
  };

  return (
    <HeaderContainer>
      <h3 style={{ margin: 0 }}>Website Builder</h3>
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
