import React, { Component } from "react";
import { Container, Button, Row, Col, Card, CardBody } from "reactstrap";
import "./style.css";
var greekUtils = require("greek-utils");

export const cypherMap = {
  "RCSQ-804": "Andorian",
  "RZGY-282": "Decepticon",
  "OQMG-523": "Preservers",
  "FHXF-781": "Tengwar",
  "WVXH-213": "Aurabesh",
  "XXXJ-759": "Dethek",
  "UYMC-941": "Rihannsu",
  "GTCH-456": "Trill",
  "GJSB-313": "Borg",
  "HKPY-771": "DwarfSpiritas",
  "GFYN-182": "Shadow",
  "ZXFD-719": "Visitor",
  //"KCUB-610": "Cardassian",
  "XHSI-225": "Fabrini",
  "ZWRD-323": "Skaven",
  "XAIK-661": "Voth",
  // "QXGB-913": "DarkArts",
  "XSDM-421": "Klingon",
  "TTBS-639": "Symbol"
};
class Codes extends Component {
  state = {};
  print = () => {
    window.print();
  };
  render() {
    const { selectedCypher } = this.state;
    return (
      <Container className="card-codeCyphers">
        <Row>
          <Col sm={8}>
            <Card>
              <CardBody>
                {selectedCypher && (
                  <CodeList font={cypherMap[selectedCypher]} />
                )}
              </CardBody>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <CardBody>
                {Object.keys(cypherMap).map(c => (
                  <p
                    key={c}
                    className={`cypherList ${
                      selectedCypher === c ? "selected" : ""
                    }`}
                    onClick={() => this.setState({ selectedCypher: c })}
                  >
                    {c}
                  </p>
                ))}
              </CardBody>
            </Card>
            <Button disabled={!selectedCypher} block onClick={this.print}>
              Print
            </Button>
          </Col>
        </Row>
        <div className="printable">
          <h1>=== Code Cypher ===</h1>
          {selectedCypher && <CodeList font={cypherMap[selectedCypher]} />}
        </div>
      </Container>
    );
  }
}

const CodeList = ({ font = "Symbol" }) => {
  return (
    <div className="code-list">
      <div>
        A ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("a") : "a"}
        </span>
      </div>
      <div>
        B ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("b") : "b"}
        </span>
      </div>
      <div>
        C ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("c") : "c"}
        </span>
      </div>
      <div>
        D ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("d") : "d"}
        </span>
      </div>
      <div>
        E ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("e") : "e"}
        </span>
      </div>
      <div>
        F ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("f") : "f"}
        </span>
      </div>
      <div>
        G ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("g") : "g"}
        </span>
      </div>
      <div>
        H ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("h") : "h"}
        </span>
      </div>
      <div>
        I ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("i") : "i"}
        </span>
      </div>
      <div>
        J ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("j") : "j"}
        </span>
      </div>
      <div>
        K ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("k") : "k"}
        </span>
      </div>
      <div>
        L ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("l") : "l"}
        </span>
      </div>
      <div>
        M ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("m") : "m"}
        </span>
      </div>
      <div>
        N ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("n") : "n"}
        </span>
      </div>
      <div>
        O ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("o") : "o"}
        </span>
      </div>
      <div>
        P ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("p") : "p"}
        </span>
      </div>
      <div>
        Q ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("q") : "q"}
        </span>
      </div>
      <div>
        R ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("r") : "r"}
        </span>
      </div>
      <div>
        S ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("s") : "s"}
        </span>
      </div>
      <div>
        T ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("t") : "t"}
        </span>
      </div>
      <div>
        U ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("u") : "u"}
        </span>
      </div>
      <div>
        V ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("v") : "v"}
        </span>
      </div>
      <div>
        W ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("w") : "w"}
        </span>
      </div>
      <div>
        X ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("x") : "x"}
        </span>
      </div>
      <div>
        Y ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("y") : "y"}
        </span>
      </div>
      <div>
        Z ={" "}
        <span className={`coded ${font}`}>
          {font === "Symbol" ? greekUtils.toGreek("z") : "z"}
        </span>
      </div>
    </div>
  );
};
export default Codes;
