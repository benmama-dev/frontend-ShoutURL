import React from "react";
import css from "./Header.module.scss";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={`paddings bg-primary  ${css.wrapper}`}>
      <div className={`flexCenter innerWidth ${css.container}`}>
        <span className={css.name}>Short Url.</span>
        <ul className={`flexCenter ${css.menu}`}>
          <Link to={'/'} style={{textDecoration: "none"}}>
            <li>
            Shortener
            </li>
          </Link>
          <Link to={'/qrcode'} style={{textDecoration: "none"}}>
            <li>
              QRCode
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
