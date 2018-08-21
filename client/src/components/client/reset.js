import { Component } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
import playSound from "../generic/SoundPlayer";

const CACHE_INVALID_SUB = gql`
  subscription ClearCache($client: ID!) {
    clearCache(client: $client)
  }
`;

class ResetCache extends Component {
  componentDidMount() {
    this.cacheSub = this.props.client
      .subscribe({
        query: CACHE_INVALID_SUB,
        variables: {
          client: this.props.clientId
        }
      })
      .subscribe({
        next: ({ loading }) => {
          if (!loading) {
            this.props.playSound({ url: "/sciences.ogg" });
            this.props.reset && this.props.reset();
          }
        },
        error(err) {
          console.error("Error resetting cache", err);
        }
      });
  }
  componentWillUnmount() {
    this.cacheSub && this.cacheSub.unsubscribe();
  }
  render() {
    return null;
  }
}

export default playSound(withApollo(ResetCache));
