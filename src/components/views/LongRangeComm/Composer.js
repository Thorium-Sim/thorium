import React from 'react';
import { withApollo } from 'react-apollo';
import { Button, Row, Col, Container, Input } from 'reactstrap';

const MessageComposer = () => {
  return (
    <Container fluid>
    <Row>
    <Col sm={2}>
    <h2>To:</h2>
    </Col>
    <Col sm={10}>
    <Input />
    </Col>
    </Row>
    <Row>
    <Col sm={12}>
    <textarea style={{
      width: '100%',
      height: '20vw',
      resize: 'none'
    }}></textarea>
    </Col>
    </Row>
    <Row>
    <Col sm={{size: 6}}>
    <Button color="danger" block>Clear</Button>
    </Col>
    <Col sm={6}>
    <Button block>Queue for Sending</Button>
    </Col>
    </Row>
    </Container>
    );
};


export default withApollo(MessageComposer);
