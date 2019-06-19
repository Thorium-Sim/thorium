import React, { Component, Fragment } from "react";
import FontAwesome from "react-fontawesome";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";
import { withApollo } from "react-apollo";
import gql from "graphql-tag.macro";
import {
  FaSpaceShuttle,
  FaHome,
  FaDesktop,
  FaImage,
  FaUserSecret,
  FaWindowRestore,
  FaList,
  FaMap,
  FaTasks,
  FaCogs,
  FaFileAlt,
  FaKeyboard,
  FaTerminal,
  FaCodeBranch,
  FaClone,
  FaCog,
  FaCamera,
  FaMousePointer,
  FaTimes
} from "react-icons/fa";

import IssueTracker from "../../components/admin/IssueTracker";

import "./sideNav.scss";

const makeLinks = () => {
  const links = [
    {
      link: "/",
      name: "Home",
      icon: FaHome
    },
    {
      link: "/client",
      name: "Client",
      icon: FaDesktop
    },
    {
      name: "Simulator Config",
      icon: FaSpaceShuttle,
      link: "/config/simulator"
    },
    {
      name: "Asset Config",
      icon: FaImage,
      link: "/config/assetConfig"
    },
    {
      name: "Mission Config",
      icon: FaUserSecret,
      link: "/config/mission"
    },
    {
      name: "Macros Config",
      icon: FaWindowRestore,
      link: "/config/macros"
    },
    {
      name: "Macro Buttons Config",
      icon: FaMousePointer,
      link: "/config/macroButtons"
    },
    {
      name: "Task Templates",
      icon: FaList,
      link: "/config/taskTemplates"
    },
    {
      name: "Tactical Map Config",
      icon: FaMap,
      link: "/config/tacticals"
    },
    {
      name: "Sets Config",
      icon: FaTasks,
      link: "/config/sets"
    },
    {
      name: "Software Panel Config",
      icon: FaCogs,
      link: "/config/panels"
    },
    {
      name: "Survey Form Config",
      icon: FaFileAlt,
      link: "/config/survey"
    },
    {
      name: "Keyboard Config",
      icon: FaKeyboard,
      link: "/config/keyboard"
    },
    {
      name: "Command Line Config",
      icon: FaTerminal,
      link: "/config/commandLine"
    },
    {
      name: "Triggers Config",
      icon: FaCodeBranch,
      link: "/config/triggers"
    },
    {
      name: "Interfaces Config",
      icon: FaClone,
      link: "/config/interfaces"
    },
    {
      name: "Settings",
      icon: FaCog,
      link: "/config/settings"
    }
  ];
  if (process.env.NODE_ENV !== "production") {
    links.push({
      name: "Snapshot",
      icon: FaCamera,
      onClick: (client, e) => {
        e.preventDefault();
        client.mutate({
          mutation: gql`
            mutation M {
              snapshot
            }
          `
        });
      }
    });
  }

  return links;
};
class SideNav extends Component {
  state = { open: false };
  toggleIssueTracker = () => {
    this.setState({
      issuesOpen: !this.state.issuesOpen
    });
  };
  render = () => (
    <Fragment>
      <div className="top-bar">
        <div className="left-side">
          <Button
            size="sm"
            color="dark"
            className="menu-button"
            onClick={() => this.setState({ open: true })}
          >
            <FontAwesome name="bars" />
          </Button>
          <img
            alt="Logo"
            src={require("../../components/client/logo.png")}
            draggable="false"
            height="30px"
          />
          <h3>Thorium</h3>
        </div>
        <ButtonGroup className="pull-right">
          <Button color="success" size="sm" onClick={this.props.startTraining}>
            Help
          </Button>
          <Button
            color="secondary"
            size="sm"
            onClick={() => this.setState({ issuesOpen: true })}
          >
            Bug Report
          </Button>
        </ButtonGroup>
        <Modal isOpen={this.state.issuesOpen} toggle={this.toggleIssueTracker}>
          <ModalHeader toggle={this.toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker close={this.toggleIssueTracker} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Nav vertical className={`sideNav ${this.state.open ? "open" : ""}`}>
        <SideNavLink
          icon={FaTimes}
          name="Close"
          link="#"
          onClick={() => {
            this.setState({ open: false });
          }}
        />

        {makeLinks().map(m => (
          <SideNavLink
            key={`sidemenu-${m.id || m.name}`}
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
export const SideNavLink = withApollo(
  class SideNavLinkComp extends Component {
    state = { open: false };
    render() {
      const m = this.props;
      const Icon = m.icon;
      const { open } = this.state;
      return (m.children && m.children.length > 0) || m.link || m.onClick ? (
        <NavItem>
          <NavLink
            tag={Link}
            to={m.link ? m.link : "#"}
            onClick={
              m.link
                ? m.onClick
                : e => {
                    m.onClick && m.onClick(m.client, e);
                    this.setState({ open: !open });
                  }
            }
          >
            {Icon && <Icon />} {m.name}{" "}
            {m.children && m.children.length > 0 && (
              <FontAwesome
                name={open ? "chevron-down" : "chevron-left"}
                className="pull-right"
              />
            )}
          </NavLink>
          {m.children && m.children.length > 0 && open && (
            <Nav vertical style={{ marginLeft: "20px" }}>
              {m.children.concat().map(c => (
                <SideNavLink
                  key={`sidemenu-${c.id || c.name}`}
                  {...c}
                  onClick={e => {
                    c.onClick && c.onClick(m.client, e);
                    m.onClick(e);
                  }}
                />
              ))}
            </Nav>
          )}
        </NavItem>
      ) : null;
    }
  }
);

export default SideNav;
