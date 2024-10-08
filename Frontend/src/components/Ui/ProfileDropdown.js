// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { SetLogout } from "../../redux/slices/AuthSlice";
import profileImg from "../../assets/images/users/avatar-1.jpg";

const ProfileDropdown = (props) => {
  const profilePic = profileImg;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();

  /*
   * toggle profile-dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant="link"
        id="dropdown-profile"
        as={Link}
        to="#"
        onClick={toggleDropdown}
        className="nav-link dropdown-toggle nav-user arrow-none me-0"
      >
        <span className="account-user-avatar">
          <img src={profilePic} className="rounded-circle" alt="user" />
        </span>
        <span>

          <span className="account-user-name">{props.UserDetails}</span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align={"end"}
        className="dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
      >
        <div onClick={toggleDropdown}>
          <div className="dropdown-header noti-title">
            <h6 className="text-overflow m-0">Welcome !</h6>
          </div>
          {props.menuItems.map((item, i) => {
            return item.label === "Logout" ? (
              <Link
                onClick={() => dispatch(SetLogout())}
                to={item.redirectTo}
                className="dropdown-item notify-item"
                key={i + "-profile-menu"}
              >
                <i className={classNames(item.icon, "me-1")}></i>
                <span>{item.label}</span>
              </Link>
            ) : (
              <Link
                to={item.redirectTo}
                className="dropdown-item notify-item"
                key={i + "-profile-menu"}
              >
                <i className={classNames(item.icon, "me-1")}></i>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
