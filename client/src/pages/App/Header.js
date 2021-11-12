import React, { useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { HeaderContainer, Logo } from "../../components/common/Header";
import { UserContext } from "../../contexts/UserContext";

export function Header(props) {
  const { user, setNewToken } = useContext(UserContext);

  const logout = async (e) => {
    setNewToken("", "");
  };

  return !props.location.pathname.includes("/editor/") ? (
    <HeaderContainer>
      <Logo>
        <img src="/assets/logo.png" alt="DevBuilder Logo" />
      </Logo>
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
  ) : null;
}

export default withRouter(Header);
