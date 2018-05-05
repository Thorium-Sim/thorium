import React, { Component, Fragment } from "react";
import FontAwesome from "react-fontawesome";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./sideNav.css";

const links = [
  {
    link: "/",
    name: "Home",
    icon: "home"
  },
  {
    name: "Simulator Config",
    icon: "space-shuttle",
    children: []
  },
  {
    name: "Asset Config",
    icon: "picture-o",
    link: "/config/assets"
  },
  {
    name: "Mission Config",
    icon: "user-secret",
    children: []
  },
  {
    name: "Tactical Map Config",
    icon: "map-o",
    link: "/config/tacticals"
  },
  {
    name: "Sets Config",
    icon: "tasks",
    link: "/config/sets"
  },
  {
    name: "Software Panel Config",
    icon: "cogs",
    link: "/config/panels"
  },
  {
    name: "Survey Form Config",
    icon: "file-text-o",
    link: "/config/survey"
  },
  {
    name: "Keyboard Config",
    icon: "keyboard-o",
    link: "/config/keyboard"
  }
];
class SideNav extends Component {
  state = { open: false };
  render = () => (
    <Fragment>
      <Button
        color="light"
        className="menu-button"
        onClick={() => this.setState({ open: true })}
      >
        <FontAwesome name="bars" />
      </Button>
      <Nav vertical className={`sideNav ${this.state.open ? "open" : ""}`}>
        <SideNavLink
          icon="times"
          name="Close"
          onClick={() => {
            this.setState({ open: false });
          }}
        />
        {links.map(m => (
          <SideNavLink
            key={`sidemenu-${m.name}`}
            onClick={() => {
              this.setState({ open: false });
            }}
            {...m}
          />
        ))}
      </Nav>
    </Fragment>
  );
}
export class SideNavLink extends Component {
  state = { open: false };
  render() {
    const m = this.props;
    const { open } = this.state;
    return (m.children && m.children.length > 0) || m.link || m.onClick ? (
      <NavItem>
        <NavLink
          tag={Link}
          to={m.link ? m.link : "#"}
          onClick={m.link ? m.onClick : () => this.setState({ open: !open })}
        >
          <FontAwesome name={m.icon.replace("fa-", "")} /> {m.name}{" "}
          {m.children &&
            m.children.length > 0 && (
              <FontAwesome
                name={open ? "chevron-down" : "chevron-left"}
                className="pull-right"
              />
            )}
        </NavLink>
        {m.children &&
          m.children.length > 0 &&
          open && (
            <Nav vertical style={{ marginLeft: "20px" }}>
              {m.children
                .concat()
                .sort((a, b) => {
                  if (a.name > b.name) return 1;
                  if (a.name < b.name) return -1;
                  return 0;
                })
                .map(c => <SideNavLink key={`sidemenu-${c.name}`} {...c} />)}
            </Nav>
          )}
      </NavItem>
    ) : null;
  }
}

const Welcome = () => {
  return <SideNav />;
};

export default Welcome;
