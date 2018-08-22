import React, { Component } from "react";
import Terminal from "terminal-in-react";
import pseudoFileSystemPlugin from "terminal-in-react-pseudo-file-system-plugin";
import Commands from "./commands";
const FileSystemPlugin = pseudoFileSystemPlugin();

export default class Hacking extends Component {
  showMsg = () => "Hello World";

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%"
        }}
      >
        <Terminal
          plugins={[/*{ class: FileSystemPlugin, config: {} },*/ Commands]}
          hideTopBar={true}
          allowTabs={false}
          prompt="green"
          color="green"
          outputColor="green"
          backgroundColor="rgba(0,0,0,0.7)"
          barColor="black"
          style={{
            fontWeight: "bold",
            fontSize: "1em",
            border: "solid 1px rgba(255,255,255,0.5)"
          }}
          commands={{
            disconnect: () => this.props.disconnect(),
            programmer: "Alex Anderson"
          }}
          msg={`Welcome to Ubuntu 31.04.5 LTS (GNU/Linux 3.13.0-125-generic x86_64)

  System information

  System load:  0.26                Processes:           133
  Usage of /:   63.7% of 147.51YB   Users logged in:     0
  Memory usage: 85%                 IP address for eth0: 172.19.45.181
  Swap usage:   0%

79 packages can be updated.
60 updates are security updates.


Last login: ip-10-0-43-69.ec2.internal

Type "help" to get a list of available commands`}
        />
      </div>
    );
  }
}
