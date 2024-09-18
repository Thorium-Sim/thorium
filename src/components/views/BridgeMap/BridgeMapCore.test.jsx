import React from "react";
import {waitForElementToBeRemoved, wait} from "@testing-library/react";
import render from "../../../helpers/testHelper";
import baseProps from "../../../stories/helpers/baseProps";
import Core from "./core";
import BridgeMapMock from "mocks/cards/BridgeMap.mock";

it.skip("should render", async () => {
  let oldFetch = window.fetch;
  window.fetch = arg => {
    if (arg === "/assets/Simulator/default/bridge.svg") {
      return new Promise(resolve =>
        resolve({
          text: () =>
            Promise.resolve(`<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
      <svg width="100%" height="100%" viewBox="0 0 550 474" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
          <g id="Command" transform="matrix(1.09484,0,0,1.28987,-1.3153,-65.8501)">
              <rect x="221.17" y="386.877" width="58.2" height="27.4" style="fill:rgb(13,13,13);" data-name="Command" data-description= "The captain's terminal." data-client="Magellan-Command.local"/>
          </g>
          <g id="First-Officer" serif:id="First Officer" transform="matrix(1.0145,0,0,1.28987,-163.734,116.226)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="First Officer" data-description="Second in command, also in charge of the Magellan's navigational systems." data-client="Magellan-First-Officer.local"/>
          </g>
          <g id="CAG" transform="matrix(0.998018,0,0,1.28987,-228.361,116.226)">
              <path d="M418.125,159.034L349.081,159.034L328.703,198.599L418.125,198.599L418.125,159.034Z" style="fill:rgb(13,13,13);" data-name="CAG" data-description="In charge of all docking systems" data-client="Magellan-Helm.local"/>
          </g>
          <g id="Surveillance-" serif:id="Surveillance " transform="matrix(-1.0145,1.43204e-16,1.43204e-16,1.28987,708.095,116.226)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="Surveillance" data-description="Also known as Sensors, they are in charge of the sensors array, which allows them to view the outside of the ship" data-client="Magellan-Sensors.local"/>
          </g>
          <g id="Counterintellligence" transform="matrix(-0.993897,1.40295e-16,1.43204e-16,1.28987,771.367,116.226)">
              <path d="M418.125,159.034L349.081,159.034L328.703,198.599L418.125,198.599L418.125,159.034Z" style="fill:rgb(13,13,13);" data-name="Counterintelligence" data-description="In charge of probes, and gathering any kind of intelligence and/or scientific information" data-client="Magellan-Science.local"/>
          </g>
          <g id="Engineer" transform="matrix(0.779947,0,0,1.25166,-61.4422,24.463)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="Engineer" data-description="The main station of the Engineer, this allows them to control the main reactor and coolant" data-client="Magellan-Engineer.local"/>
          </g>
          <g id="Power-Distribution" serif:id="Power Distribution" transform="matrix(0.556,0,0,1.2356,-23.1366,27.5902)">
              <path d="M418.125,158.57L349.081,158.57L310.804,198.599L418.125,198.599L418.125,158.57Z" style="fill:rgb(13,13,13);" data-name="Power Distribution" data-description="Secondary screen of the Engineer, this controls the flow of power to and from specific systems" data-client="Magellan-Power-Distribution.local"/>
          </g>
          <g id="Strategic-Operations" serif:id="Strategic Operations" transform="matrix(0.705274,0.705274,-0.912075,0.912075,20.4633,-215.758)">
              <path d="M417.58,158.726L348.003,159.034L348.003,198.599L437.47,197.64L417.58,158.726Z" style="fill:rgb(13,13,13);" data-name="Strategic Operations" data-description="Allows the Strategic Operations officer to upgrade and maintain specific offensive and defensive systems" data-client="Magellan-Tactical.local"/>
          </g>
          <g id="Weapons-Control" serif:id="Weapons Control" transform="matrix(0.71314,0.71314,-0.912075,0.912075,-33.5295,-269.77)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="Weapons Control" data-description="Controls the main weapon systems on the Magellan" data-client="Magellan-Strategic-Ops.local" />
          </g>
          <g id="Division-Communications" serif:id="Division Communications" transform="matrix(-0.779947,7.16021e-17,4.19385e-16,1.25166,609.505,24.463)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="Division Communications" data-description="Controls the long range messaging system, and the signal jammer" data-client="Magellan-Division-Comm.local"/>
          </g>
          <g id="Remote-Communications" serif:id="Remote Communications" transform="matrix(-0.556,1.07403e-16,2.86408e-16,1.28987,571.265,17.1168)">
              <path d="M418.125,159.971L349.081,159.971L310.804,198.315L418.125,198.363L418.125,159.971Z" style="fill:rgb(13,13,13);" data-name="Remote Communications" data-description="Allows ship to ship communication, and internal communication between decks" data-client="Magellan-Remote-Comm.local"/>
          </g>
          <g id="Computer-Core" serif:id="Computer Core" transform="matrix(-0.694772,0.694772,0.912075,0.912075,523.618,-211.529)">
              <path d="M417.868,158.836L349.081,159.034L349.081,198.599L437.51,198.011L417.868,158.836Z" style="fill:rgb(13,13,13);" data-name="Computer Core" data-description="controls and maintains the main computer systems on the Magellan" data-client="Magellan-Computer-Core.local"/>
          </g>
          <g id="Chief-of-Operations" serif:id="Chief of Operations" transform="matrix(-0.761417,0.761417,0.912075,0.912075,600.382,-288.293)">
              <rect x="349.081" y="159.034" width="69.044" height="39.565" style="fill:rgb(13,13,13);" data-name="Chief of Operations" data-description="Controls all general operations on board the Magellan, including, but not limited too; Cargo, Transwarp, and Transporters." data-client="Magellan-Chief-of-Ops.local"/>
          </g>
          <g id="Security-Scans" serif:id="Security Scans" transform="matrix(0.661241,0.661241,-0.912075,0.912075,96.5994,-292.631)">
              <path d="M417.523,159.916L349.081,159.034L349.081,198.599L441.092,198.948L417.523,159.916Z" style="fill:rgb(13,13,13);" data-name="Security Scans" data-description="Used to scan different decks on the Magellan internally for any problems/security risks, along with the ability to close and evacuate decks" data-client="Magellan-Security-Scans.local"/>
          </g>
          <g id="Security-Chief" serif:id="Security Chief" transform="matrix(0.645994,0,0,1.28987,-2.76297,-75.8252)">
              <path d="M414.108,159.161L357.003,159.034L326.02,198.717L414.108,198.717L414.108,159.161Z" style="fill:rgb(13,13,13);" data-name="Security Chief" data-description="Allows for creation and distribution of security teams throughout the Magellan" data-client="Magellan-Security-Teams.local"/>
          </g>
          <g id="Damage-Status" serif:id="Damage Status" transform="matrix(0.912075,-0.912075,0.912075,0.912075,-176.105,261.207)">
              <rect x="386.393" y="200.648" width="48.25" height="38.5" style="fill:rgb(13,13,13);" data-name="Damage Status" data-description="Monitors all damage throughout the Magellan, and loads possible repair reports if a system is damaged, so an officer can repair it" data-client="Magellan-Damage-Status.local"/>
          </g>
          <g id="Damage-Teams" serif:id="Damage Teams" transform="matrix(0.92985,-0.92985,0.912075,0.912075,-228.887,313.988)">
              <path d="M434.643,200.648L396.143,200.648L378.143,239.148L434.643,239.148L434.643,200.648Z" style="fill:rgb(13,13,13);" data-name="Damage Teams" data-description="Allows for creation and distribution of damage teams throughout the Magellan" data-client="Magellan-Damage-Teams.local"/>
          </g>
          <g id="Viewscreen" transform="matrix(1.27979,0,0,1.28987,-59.6106,-70.3431)">
              <rect x="218.583" y="58.789" width="85.75" height="5.25" style="fill:rgb(13,13,13);" data-name="Main View Screen" data-description="The Main View Screen is the main display in most starships, which is used to display important details, or visuals outside or inside of the ship." data-client="Magellan-MVS"/>
          </g>
          <g id="Hall-Terminal" serif:id="Hall Terminal" transform="matrix(0.644934,0,0,0.907685,1.09936,-44.3002)">
              <rect x="51.443" y="73.739" width="22.392" height="36" style="fill:rgb(13,13,13);" data-name="Hall Terminal" data-description="An additional terminal used by the Engineer to help prevent damage to ship systems, and allows the Engineer to perform general maintainence on most systems." data-client="Magellan-Hall-Terminal.local"/>
          </g>
      </svg>`),
        }),
      );
    }
    throw new Error("Network request failed");
  };
  const {container, getByText} = render(<Core {...baseProps} />, {
    mocks: BridgeMapMock,
  });
  await waitForElementToBeRemoved(() => getByText("Loading..."));
  await wait();
  // eslint-disable-next-line require-atomic-updates
  window.fetch = oldFetch;
  expect(container.innerHTML).toBeTruthy();
  expect(container.innerHTML).not.toBe("Error");
});
