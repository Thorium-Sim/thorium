import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Row, Col, Button, Input } from 'reactstrap';
import { graphql, withApollo } from 'react-apollo';
import { OutputField } from '../../generic/core';
import Immutable from 'immutable';
import './style.scss';

const NAVIGATION_SUB = gql`
subscription NavigationUpdate($simulatorId: ID){
  navigationUpdate(simulatorId: $simulatorId) {
    id
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    scanning
    calculate
    destination
    currentCourse {
      x
      y
      z
    }
    calculatedCourse {
      x
      y
      z
    }
  }
}`;

class NavigationCore extends Component {
  constructor(props){
    super(props);
    this.subscription = null;
    this.state = {
      calculatedCourse: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.subscription && !nextProps.data.loading) {
      this.subscription = nextProps.data.subscribeToMore({
        document: NAVIGATION_SUB,
        variables: {
          simulatorId: nextProps.simulator.id
        },
        updateQuery: (previousResult, { subscriptionData }) => {
          const returnResult = Immutable.Map(previousResult);
          return returnResult.merge({ navigation: subscriptionData.data.navigationUpdate }).toJS();
        }
      });
    }
    if (!nextProps.data.loading){
      const navigation = nextProps.data.navigation[0];
      if (navigation){
        this.setState({
          calculatedCourse: navigation.calculatedCourse
        })
      }
    }
  }
  randomNums(){
    this.setState({
      calculatedCourse: {
        x: Math.round(Math.random() * 100000)/100,
        y: Math.round(Math.random() * 100000)/100,
        z: Math.round(Math.random() * 100000)/100,
      }
    })
  }
  unknownCourse(){
    this.setState({
      calculatedCourse: {
        x: 'No',
        y: 'Course',
        z: 'Available',
      }
    })
  }
  sendCourse(){
    const course = this.state.calculatedCourse;
    const navigation = this.props.data.navigation[0];
    const mutation = gql`
    mutation CourseSend($id: ID!, $x: String!, $y: String!, $z: String!){
      navCourseResponse(id: $id, x: $x, y: $y, z: $z)
    }`;
    const variables = {
      id: navigation.id,
      x: course.x,
      y: course.y,
      z: course.z
    }
    this.props.client.mutate({
      mutation,
      variables
    })
  }
  render(){
    if (this.props.data.loading) return null;
    const navigation = this.props.data.navigation[0];
    if (!navigation) return <p>No Navigation Systems</p>
      return <div className="docking-core">
    <p>Navigation</p>
    <Input type="checkbox" />
    <Row>
    <Col sm="1">

    </Col>
    <Col sm="4">
    Current
    </Col>
    <Col sm="4">
    New
    </Col>
    <Col sm="3">

    </Col>
    </Row>
    <Row>
    <Col sm="1">
    <p style={{textAlign: 'right'}}>X</p>
    </Col>
    <Col sm="3">
    <OutputField>{navigation.currentCourse.x}</OutputField>
    </Col>
    <Col sm="3">
    <OutputField>{this.state.calculatedCourse.x}</OutputField>
    </Col>
    <Col sm="4">
    <Button onClick={this.randomNums.bind(this)} block size="sm" color="secondary">Random</Button>
    </Col>
    </Row>
    <Row>
    <Col sm="1">
    <p style={{textAlign: 'right'}}>Y</p>
    </Col>
    <Col sm="3">
    <OutputField>{navigation.currentCourse.y}</OutputField>
    </Col>
    <Col sm="3">
    <OutputField>{this.state.calculatedCourse.y}</OutputField>
    </Col>
    <Col sm="4">
    <Button onClick={this.sendCourse.bind(this)} block size="sm" color="secondary">Send</Button>
    </Col>
    </Row>
    <Row>
    <Col sm="1">
    <p style={{textAlign: 'right'}}>Z</p>
    </Col>
    <Col sm="3">
    <OutputField>{navigation.currentCourse.z}</OutputField>
    </Col>
    <Col sm="3">
    <OutputField>{this.state.calculatedCourse.z}</OutputField>
    </Col>
    <Col sm="4">
    <Button onClick={this.unknownCourse.bind(this)} block size="sm" color="secondary">Unknown</Button>
    </Col>
    </Row>
    <Row>
    <Col sm="12">
    <OutputField alert={navigation.scanning}>{navigation.destination}</OutputField>
    </Col>
    </Row>

    </div>
  }
}

const NAVIGATION_QUERY = gql`
query Navigation($simulatorId: ID){
  navigation(simulatorId: $simulatorId) {
    id
    power {
      power
      powerLevels
    }
    damage {
      damaged
      report
    }
    scanning
    calculate
    destination
    currentCourse {
      x
      y
      z
    }
    calculatedCourse {
      x
      y
      z
    }
  }
}`;

export default graphql(NAVIGATION_QUERY, {
  options: (ownProps) => ({
    variables: {
      simulatorId: ownProps.simulator.id
    }
  })
})(withApollo(NavigationCore));
