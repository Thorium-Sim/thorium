import { Component } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";

const assetPath = `${window.location.protocol}//${window.location.host}/assets`;
export default (assetKey, simulatorId, extension, CORS) => {
  return `${assetPath}${assetKey}/${simulatorId}.${extension}`;
};

class AssetComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: `${assetPath}${props.asset}/default.${props.extension || "svg"}`
    };
  }
  state = { src: "http://unsplash.it/300" };
  componentWillMount() {
    const query = gql`
      query GetAsset($assetKey: String!, $simulatorId: ID) {
        asset(assetKey: $assetKey, simulatorId: $simulatorId) {
          assetKey
          url
        }
      }
    `;
    const variables = {
      assetKey: this.props.asset,
      simulatorId: this.props.simulatorId
    };
    this.props.client
      .query({
        query,
        variables
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          src: res.data.asset.url
        });
      });
  }
  render() {
    const { children } = this.props;
    const { src } = this.state;
    return children({ src });
  }
}

export const Asset = withApollo(AssetComponent);
