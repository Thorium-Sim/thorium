import React, {Fragment} from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "helpers/reactstrap";
import {Link} from "react-router-dom";
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
  FaTimes,
  FaBars,
  FaSlidersH,
  FaLightbulb,
  // FaRegStar,
} from "react-icons/fa";

import IssueTracker from "../../components/admin/IssueTracker";

import "./sideNav.scss";
import {IconType} from "react-icons/lib/cjs";
import {useApolloClient} from "@apollo/client";
import {TrainingContext} from "containers/TrainingContextProvider";

interface NavLinkI {
  link?: string;
  name: string;
  icon: IconType;
  onClick?: Function;
}

const links: (NavLinkI | null)[] = [
  {
    link: "/",
    name: "Home",
    icon: FaHome,
  },
  {
    link: "/client",
    name: "Client",
    icon: FaDesktop,
  },
  {
    name: "Simulator Config",
    icon: FaSpaceShuttle,
    link: "/config/simulator",
  },
  {
    name: "Asset Config",
    icon: FaImage,
    link: "/config/assetConfig",
  },
  {
    name: "Mission Config",
    icon: FaUserSecret,
    link: "/config/mission",
  },
  // {
  //   name: "Universal Sandbox",
  //   icon: FaRegStar,
  //   link: "/config/sandbox",
  // },
  {
    name: "Macros Config",
    icon: FaWindowRestore,
    link: "/config/macros",
  },
  {
    name: "Macro Buttons Config",
    icon: FaMousePointer,
    link: "/config/macroButtons",
  },
  {
    name: "Tasks",
    icon: FaList,
    link: "/config/tasks",
  },
  {
    name: "Tactical Map Config",
    icon: FaMap,
    link: "/config/tacticals",
  },
  {
    name: "Sets Config",
    icon: FaTasks,
    link: "/config/sets",
  },
  {
    name: "Software Panel Config",
    icon: FaCogs,
    link: "/config/panels",
  },
  {
    name: "Survey Form Config",
    icon: FaFileAlt,
    link: "/config/survey",
  },
  {
    name: "DMX Config",
    icon: FaLightbulb,
    link: "/config/dmx",
  },
  {
    name: "Keyboard Config",
    icon: FaKeyboard,
    link: "/config/keyboard",
  },
  {
    name: "Command Line Config",
    icon: FaTerminal,
    link: "/config/commandLine",
  },
  {
    name: "Triggers Config",
    icon: FaCodeBranch,
    link: "/config/triggers",
  },
  {
    name: "Interfaces Config",
    icon: FaClone,
    link: "/config/interfaces",
  },
  // {
  //   name: "Records Config",
  //   icon: FaFolderOpen,
  //   link: "/config/records",
  // },
  {
    name: "MIDI Config",
    icon: FaSlidersH,
    link: "/config/midi",
  },
  {
    name: "Settings",
    icon: FaCog,
    link: "/config/settings",
  },
  process.env.NODE_ENV !== "production"
    ? {
        name: "Snapshot",
        icon: FaCamera,
        onClick: (e: React.MouseEvent, client: any) => {
          e.preventDefault();
          client.mutate({
            mutation: gql`
              mutation M {
                snapshot
              }
            `,
          });
        },
      }
    : null,
].filter(Boolean);

const SideNav = () => {
  const [open, setOpen] = React.useState(false);
  const [issuesOpen, setIssuesOpen] = React.useState(false);
  const toggleIssueTracker = () => {
    setIssuesOpen(s => !s);
  };
  const {startTraining} = React.useContext(TrainingContext);

  return (
    <Fragment>
      <div className="top-bar">
        <div className="left-side">
          <Button
            size="sm"
            color="dark"
            className="menu-button"
            onClick={() => setOpen(true)}
          >
            <FaBars />
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
          <Button color="success" size="sm" onClick={startTraining}>
            Help
          </Button>
          <Button
            color="secondary"
            size="sm"
            onClick={() => setIssuesOpen(true)}
          >
            Bug Report
          </Button>
        </ButtonGroup>
        <Modal isOpen={issuesOpen} toggle={toggleIssueTracker}>
          <ModalHeader toggle={toggleIssueTracker}>
            Submit a Feature/Bug Report
          </ModalHeader>
          <ModalBody>
            <IssueTracker close={toggleIssueTracker} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleIssueTracker}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Nav vertical className={`sideNav ${open ? "open" : ""}`}>
        <SideNavLink
          icon={FaTimes}
          name="Close"
          onClick={() => {
            setOpen(false);
          }}
        />

        {links.map(
          m =>
            m && (
              <SideNavLink
                key={`sidemenu-${m.name}`}
                onClick={() => {
                  setOpen(false);
                }}
                {...m}
              />
            ),
        )}
      </Nav>
    </Fragment>
  );
};

export const SideNavLink: React.FC<NavLinkI> = ({
  icon: Icon,
  link,
  name,
  onClick,
}) => {
  const client = useApolloClient();
  return (
    <NavItem>
      <NavLink
        tag={link ? Link : "span"}
        to={link ? link : "#"}
        onClick={onClick ? e => onClick(e, client) : undefined}
      >
        {Icon && <Icon />} {name}{" "}
      </NavLink>
    </NavItem>
  );
};

export default SideNav;
