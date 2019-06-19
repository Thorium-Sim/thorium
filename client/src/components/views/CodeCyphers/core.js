import React, { useState } from "react";
import { Container, Row, Col, Button } from "helpers/reactstrap";
import { TypingField, InputField } from "../../generic/core";
import { cypherMap } from "./index";
import Printable from "helpers/printable";

//var greekUtils = require("greek-utils");
const greekUtils = {
  toGreek: a => a
};
// Control what codes are available
// Code and print encoded messages
const CypherCore = () => {
  const [message, setMessage] = useState("");
  const [cypher, setCypher] = useState("");
  const [header, setHeader] = useState("=== Intercepted Message ===");
  const sendMessage = () => {
    setTimeout(() => {
      window.print();
    }, 1000);
  };
  return (
    <Container style={{ height: "100%" }} className="core-codeCyphers">
      <Row style={{ height: "100%" }}>
        <Col sm={12}>
          <InputField
            children={header}
            prompt={"What will you change the header to?"}
            onClick={e => setHeader(e)}
          />
          <TypingField
            style={{ height: "100%", textAlign: "left" }}
            controlled
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </Col>
        <Col sm={6}>
          <select
            className="btn btn-warning btn-block btn-sm"
            value={cypher || "nothing"}
            onChange={e => setCypher(e.target.value)}
          >
            <option disabled value="nothing">
              Select a cypher
            </option>
            {Object.keys(cypherMap).map(c => (
              <option value={c} key={c}>
                {c} - {cypherMap[c]}
              </option>
            ))}
          </select>
        </Col>
        <Col sm={6}>
          <Button
            size="sm"
            color="success"
            onClick={sendMessage}
            disabled={!cypher || !message}
          >
            Print Message
          </Button>
        </Col>
      </Row>
      <Printable>
        <div className="cypher-printing">
          <h1>{header}</h1>
          <pre className={`${cypherMap[cypher]}`}>
            {cypherMap[cypher] === "Symbol"
              ? greekUtils.toGreek(message.toLowerCase())
              : message}
          </pre>
        </div>
      </Printable>
    </Container>
  );
};

export default CypherCore;
