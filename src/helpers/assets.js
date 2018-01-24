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
      src: null
    };
  }
  state = { src: "http://unsplash.it/300" };
  componentWillMount() {
    this.updateAsset(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.asset !== this.props.asset) {
      this.updateAsset(nextProps);
    }
  }
  updateAsset(props) {
    const query = gql`
      query GetAsset($assetKey: String!, $simulatorId: ID) {
        asset(assetKey: $assetKey, simulatorId: $simulatorId) {
          assetKey
          url
        }
      }
    `;
    const variables = {
      assetKey: props.asset,
      simulatorId: props.simulatorId
    };
    props.client
      .query({
        query,
        variables
      })
      .then(res => {
        this.setState({
          src: (res.data.asset.url || "").replace(
            /http(s|):\/\/.*:[0-9]{4}/gi,
            ""
          )
        });
      });
  }
  render() {
    const { children, fail } = this.props;
    const { src } = this.state;
    if (!fail && (!src || !this.props.asset)) return null;
    return children({ src });
  }
}

export const Asset = withApollo(AssetComponent);
