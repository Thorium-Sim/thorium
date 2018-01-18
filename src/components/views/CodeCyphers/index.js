import React, { Component } from "react";
import { Container, Button, Row, Col, Card, CardBody } from "reactstrap";
import "./style.css";
export const cypherMap = {
  "RCSQ-804": "Andorian",
  //"RZGY-282": "Decepticon",
  "OQMG-523": "Preservers",
  //"FHXF-781": "Tengwar",
  "WVXH-213": "Aurabesh",
  "XXXJ-759": "Dethek",
  "UYMC-941": "Rihannsu",
  "GTCH-456": "Trill",
  "GJSB-313": "Borg",
  //"HKPY-771": "DwarfSpiritas",
  "GFYN-182": "Shadow",
  "ZXFD-719": "Visitor",
  //"KCUB-610": "Cardassian",
  "XHSI-225": "Fabrini",
  "ZWRD-323": "Skaven",
  //"XAIK-661": "Voth",
  //"QXGB-913": "DarkArts",
  "XSDM-421": "Klingon"
  //"TTBS-639": "Symbol"
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
        A = <span className={`coded ${font}`}>a</span>
      </div>
      <div>
        B = <span className={`coded ${font}`}>b</span>
      </div>
      <div>
        C = <span className={`coded ${font}`}>c</span>
      </div>
      <div>
        D = <span className={`coded ${font}`}>d</span>
      </div>
      <div>
        E = <span className={`coded ${font}`}>e</span>
      </div>
      <div>
        F = <span className={`coded ${font}`}>f</span>
      </div>
      <div>
        G = <span className={`coded ${font}`}>g</span>
      </div>
      <div>
        H = <span className={`coded ${font}`}>h</span>
      </div>
      <div>
        I = <span className={`coded ${font}`}>i</span>
      </div>
      <div>
        J = <span className={`coded ${font}`}>j</span>
      </div>
      <div>
        K = <span className={`coded ${font}`}>k</span>
      </div>
      <div>
        L = <span className={`coded ${font}`}>l</span>
      </div>
      <div>
        M = <span className={`coded ${font}`}>m</span>
      </div>
      <div>
        N = <span className={`coded ${font}`}>n</span>
      </div>
      <div>
        O = <span className={`coded ${font}`}>o</span>
      </div>
      <div>
        P = <span className={`coded ${font}`}>p</span>
      </div>
      <div>
        Q = <span className={`coded ${font}`}>q</span>
      </div>
      <div>
        R = <span className={`coded ${font}`}>r</span>
      </div>
      <div>
        S = <span className={`coded ${font}`}>s</span>
      </div>
      <div>
        T = <span className={`coded ${font}`}>t</span>
      </div>
      <div>
        U = <span className={`coded ${font}`}>u</span>
      </div>
      <div>
        V = <span className={`coded ${font}`}>v</span>
      </div>
      <div>
        W = <span className={`coded ${font}`}>w</span>
      </div>
      <div>
        X = <span className={`coded ${font}`}>x</span>
      </div>
      <div>
        Y = <span className={`coded ${font}`}>y</span>
      </div>
      <div>
        Z = <span className={`coded ${font}`}>z</span>
      </div>
    </div>
  );
};
export default Codes;
