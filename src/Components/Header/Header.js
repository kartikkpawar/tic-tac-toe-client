import { useState } from "react";
import { Redirect } from "react-router-dom";
import Logo from "../../Assets/logo.svg";
import "./Header.css";
const Header = () => {
  const [redirect, setRedirect] = useState(false);
  const makeReirect = () => {
    setRedirect(true);
  };
  return (
    <div className="header__container">
      {redirect && <Redirect to="/" />}
      <div className="logo_holder">
        <img
          src={Logo}
          alt="XOXO Logo"
          height="100%"
          onClick={() => makeReirect()}
        />
      </div>
    </div>
  );
};

export default Header;
