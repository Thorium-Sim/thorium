import React, { Component } from 'react';
import { InputField, OutputField, TypingField } from '../../generic/core';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

class PowerCore extends Component {

}

const POWER_QUERY = gql``
export default graphql()(withApollo(PowerCore))