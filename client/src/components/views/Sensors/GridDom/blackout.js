import React, { Component } from "react";
import gql from "graphql-tag";
import { withApollo } from "react-apollo";
class SensorsSegments extends Component {
  state = { pointerEvents: "none" };
  keydown = e => {
    if (e.key === "Alt") {
      this.setState({ pointerEvents: "all" });
    }
  };
  keyup = e => {
    if (e.key === "Alt") {
      this.setState({ pointerEvents: "none" });
    }
  };
  componentDidMount() {
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydown);
    document.removeEventListener("keyup", this.keyup);
  }
  render() {
    const { segments, client, sensors } = this.props;
    const setSegment = segment => {
      const mutation = gql`
        mutation SensorsSegment($id: ID!, $segment: String!, $state: Boolean!) {
          setSensorsSegment(id: $id, segment: $segment, state: $state)
        }
      `;
      const variables = {
        id: sensors,
        segment,
        state: !segments.find(s => s.segment === segment).state
      };
      client.mutate({
        mutation,
        variables
      });
    };
    return (
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        strokeLinejoin="round"
        strokeMiterlimit="1.414"
        className="grid-segments"
        style={{ pointerEvents: this.state.pointerEvents }}
      >
        <path
          className={
            segments.find(s => s.segment === "a12") &&
            segments.find(s => s.segment === "a12").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a12")}
          d="M54.476,33.86C53.018,33.456 51.513,33.251 50,33.251C48.487,33.251 46.982,33.456 45.524,33.86L50,50L54.476,33.86Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b12") &&
            segments.find(s => s.segment === "b12").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b12")}
          d="M58.886,17.959C55.992,17.156 53.003,16.749 50,16.749C46.997,16.749 44.008,17.156 41.114,17.959L45.531,33.887C46.987,33.483 48.49,33.278 50,33.278C51.51,33.278 53.013,33.483 54.469,33.887L58.886,17.959Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c12") &&
            segments.find(s => s.segment === "c12").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c12")}
          d="M63.308,2.014C58.974,0.813 54.497,0.203 50,0.203C45.503,0.203 41.026,0.813 36.692,2.014L41.128,18.01C44.017,17.208 47.002,16.802 50,16.802C52.998,16.802 55.983,17.208 58.872,18.01L63.308,2.014Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a11") &&
            segments.find(s => s.segment === "a11").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a11")}
          d="M45.806,33.784C44.342,34.163 42.935,34.738 41.625,35.495C40.315,36.251 39.114,37.181 38.053,38.26L50,50L45.806,33.784Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b11") &&
            segments.find(s => s.segment === "b11").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b11")}
          d="M41.675,17.808C38.767,18.56 35.975,19.703 33.375,21.204C30.774,22.706 28.389,24.552 26.284,26.694L38.073,38.28C39.132,37.203 40.331,36.274 41.639,35.519C42.947,34.764 44.351,34.189 45.813,33.811L41.675,17.808Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c11") &&
            segments.find(s => s.segment === "c11").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c11")}
          d="M37.532,1.79C33.178,2.916 28.996,4.626 25.102,6.875C21.207,9.124 17.635,11.889 14.483,15.097L26.322,26.731C28.423,24.593 30.805,22.749 33.401,21.25C35.998,19.751 38.785,18.61 41.688,17.86L37.532,1.79Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a10") &&
            segments.find(s => s.segment === "a10").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a10")}
          d="M38.26,38.053C37.181,39.114 36.251,40.315 35.495,41.625C34.738,42.935 34.163,44.342 33.784,45.806L50,50L38.26,38.053Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b10") &&
            segments.find(s => s.segment === "b10").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b10")}
          d="M26.694,26.284C24.552,28.389 22.706,30.774 21.204,33.375C19.703,35.975 18.56,38.767 17.808,41.675L33.811,45.813C34.189,44.351 34.764,42.947 35.519,41.639C36.274,40.331 37.203,39.132 38.28,38.073L26.694,26.284Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c10") &&
            segments.find(s => s.segment === "c10").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c10")}
          d="M15.097,14.483C11.889,17.635 9.124,21.207 6.875,25.102C4.626,28.996 2.916,33.178 1.79,37.532L17.86,41.688C18.61,38.785 19.751,35.998 21.25,33.401C22.749,30.805 24.593,28.423 26.731,26.322L15.097,14.483Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a9") &&
            segments.find(s => s.segment === "a9").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a9")}
          d="M33.86,45.524C33.456,46.982 33.251,48.487 33.251,50C33.251,51.513 33.456,53.018 33.86,54.476L50,50L33.86,45.524Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b9") &&
            segments.find(s => s.segment === "b9").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b9")}
          d="M17.959,41.114C17.156,44.008 16.749,46.997 16.749,50C16.749,53.003 17.156,55.992 17.959,58.886L33.887,54.469C33.483,53.013 33.278,51.51 33.278,50C33.278,48.49 33.483,46.987 33.887,45.531L17.959,41.114Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c9") &&
            segments.find(s => s.segment === "c9").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c9")}
          d="M2.014,36.692C0.813,41.026 0.203,45.503 0.203,50C0.203,54.497 0.813,58.974 2.014,63.308L18.01,58.872C17.208,55.983 16.802,52.998 16.802,50C16.802,47.002 17.208,44.017 18.01,41.128L2.014,36.692Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a8") &&
            segments.find(s => s.segment === "a8").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a8")}
          d="M33.784,54.194C34.163,55.658 34.738,57.065 35.495,58.375C36.251,59.685 37.181,60.886 38.26,61.947L50,50L33.784,54.194Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b8") &&
            segments.find(s => s.segment === "b8").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b8")}
          d="M17.808,58.325C18.56,61.233 19.703,64.025 21.204,66.625C22.706,69.226 24.552,71.611 26.694,73.716L38.28,61.927C37.203,60.868 36.274,59.669 35.519,58.361C34.764,57.053 34.189,55.649 33.811,54.187L17.808,58.325Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c8") &&
            segments.find(s => s.segment === "c8").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c8")}
          d="M1.79,62.468C2.916,66.822 4.626,71.004 6.875,74.898C9.124,78.793 11.889,82.365 15.097,85.517L26.731,73.678C24.593,71.577 22.749,69.195 21.25,66.599C19.751,64.002 18.61,61.215 17.86,58.312L1.79,62.468Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a7") &&
            segments.find(s => s.segment === "a7").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a7")}
          d="M38.053,61.74C39.114,62.819 40.315,63.749 41.625,64.505C42.935,65.262 44.342,65.837 45.806,66.216L50,50L38.053,61.74Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b7") &&
            segments.find(s => s.segment === "b7").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b7")}
          d="M26.284,73.306C28.389,75.448 30.774,77.294 33.375,78.796C35.975,80.297 38.767,81.44 41.675,82.192L45.813,66.189C44.351,65.811 42.947,65.236 41.639,64.481C40.331,63.726 39.132,62.797 38.073,61.72L26.284,73.306Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c7") &&
            segments.find(s => s.segment === "c7").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c7")}
          d="M14.483,84.903C17.635,88.111 21.207,90.876 25.102,93.125C28.996,95.374 33.178,97.084 37.532,98.21L41.688,82.14C38.785,81.39 35.998,80.249 33.401,78.75C30.805,77.251 28.423,75.407 26.322,73.269L14.483,84.903Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a6") &&
            segments.find(s => s.segment === "a6").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a6")}
          d="M45.524,66.14C46.982,66.544 48.487,66.749 50,66.749C51.513,66.749 53.018,66.544 54.476,66.14L50,50L45.524,66.14Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b6") &&
            segments.find(s => s.segment === "b6").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b6")}
          d="M41.114,82.041C44.008,82.844 46.997,83.251 50,83.251C53.003,83.251 55.992,82.844 58.886,82.041L54.469,66.113C53.013,66.517 51.51,66.722 50,66.722C48.49,66.722 46.987,66.517 45.531,66.113L41.114,82.041Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c6") &&
            segments.find(s => s.segment === "c6").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c6")}
          d="M36.692,97.986C41.026,99.187 45.503,99.797 50,99.797C54.497,99.797 58.974,99.187 63.308,97.986L58.872,81.99C55.983,82.792 52.998,83.198 50,83.198C47.002,83.198 44.017,82.792 41.128,81.99L36.692,97.986Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a5") &&
            segments.find(s => s.segment === "a5").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a5")}
          d="M54.194,66.216C55.658,65.837 57.065,65.262 58.375,64.505C59.685,63.749 60.886,62.819 61.947,61.74L50,50L54.194,66.216Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b5") &&
            segments.find(s => s.segment === "b5").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b5")}
          d="M58.325,82.192C61.233,81.44 64.025,80.297 66.625,78.796C69.226,77.294 71.611,75.448 73.716,73.306L61.927,61.72C60.868,62.797 59.669,63.726 58.361,64.481C57.053,65.236 55.649,65.811 54.187,66.189L58.325,82.192Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c5") &&
            segments.find(s => s.segment === "c5").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c5")}
          d="M62.468,98.21C66.822,97.084 71.004,95.374 74.898,93.125C78.793,90.876 82.365,88.111 85.517,84.903L73.678,73.269C71.577,75.407 69.195,77.251 66.599,78.75C64.002,80.249 61.215,81.39 58.312,82.14L62.468,98.21Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a4") &&
            segments.find(s => s.segment === "a4").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a4")}
          d="M61.74,61.947C62.819,60.886 63.749,59.685 64.505,58.375C65.262,57.065 65.837,55.658 66.216,54.194L50,50L61.74,61.947Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b4") &&
            segments.find(s => s.segment === "b4").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b4")}
          d="M73.306,73.716C75.448,71.611 77.294,69.226 78.796,66.625C80.297,64.025 81.44,61.233 82.192,58.325L66.189,54.187C65.811,55.649 65.236,57.053 64.481,58.361C63.726,59.669 62.797,60.868 61.72,61.927L73.306,73.716Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c4") &&
            segments.find(s => s.segment === "c4").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c4")}
          d="M84.903,85.517C88.111,82.365 90.876,78.793 93.125,74.898C95.374,71.004 97.084,66.822 98.21,62.468L82.14,58.312C81.39,61.215 80.249,64.002 78.75,66.599C77.251,69.195 75.407,71.577 73.269,73.678L84.903,85.517Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a3") &&
            segments.find(s => s.segment === "a3").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a3")}
          d="M66.14,54.476C66.544,53.018 66.749,51.513 66.749,50C66.749,48.487 66.544,46.982 66.14,45.524L50,50L66.14,54.476Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b3") &&
            segments.find(s => s.segment === "b3").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b3")}
          d="M82.041,58.886C82.844,55.992 83.251,53.003 83.251,50C83.251,46.997 82.844,44.008 82.041,41.114L66.113,45.531C66.517,46.987 66.722,48.49 66.722,50C66.722,51.51 66.517,53.013 66.113,54.469L82.041,58.886Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c3") &&
            segments.find(s => s.segment === "c3").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c3")}
          d="M97.986,63.308C99.187,58.974 99.797,54.497 99.797,50C99.797,45.503 99.187,41.026 97.986,36.692L81.99,41.128C82.792,44.017 83.198,47.002 83.198,50C83.198,52.998 82.792,55.983 81.99,58.872L97.986,63.308Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a2") &&
            segments.find(s => s.segment === "a2").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a2")}
          d="M66.216,45.806C65.837,44.342 65.262,42.935 64.505,41.625C63.749,40.315 62.819,39.114 61.74,38.053L50,50L66.216,45.806Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b2") &&
            segments.find(s => s.segment === "b2").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b2")}
          d="M82.192,41.675C81.44,38.767 80.297,35.975 78.796,33.375C77.294,30.774 75.448,28.389 73.306,26.284L61.72,38.073C62.797,39.132 63.726,40.331 64.481,41.639C65.236,42.947 65.811,44.351 66.189,45.813L82.192,41.675Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c2") &&
            segments.find(s => s.segment === "c2").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c2")}
          d="M98.21,37.532C97.084,33.178 95.374,28.996 93.125,25.102C90.876,21.207 88.111,17.635 84.903,14.483L73.269,26.322C75.407,28.423 77.251,30.805 78.75,33.401C80.249,35.998 81.39,38.785 82.14,41.688L98.21,37.532Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "a1") &&
            segments.find(s => s.segment === "a1").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("a1")}
          d="M61.947,38.26C60.886,37.181 59.685,36.251 58.375,35.495C57.065,34.738 55.658,34.163 54.194,33.784L50,50L61.947,38.26Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "b1") &&
            segments.find(s => s.segment === "b1").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("b1")}
          d="M73.716,26.694C71.611,24.552 69.226,22.706 66.625,21.204C64.025,19.703 61.233,18.56 58.325,17.808L54.187,33.811C55.649,34.189 57.053,34.764 58.361,35.519C59.669,36.274 60.868,37.203 61.927,38.28L73.716,26.694Z"
        />
        }
        <path
          className={
            segments.find(s => s.segment === "c1") &&
            segments.find(s => s.segment === "c1").state
              ? "active"
              : "hidden"
          }
          onClick={() => setSegment("c1")}
          d="M85.517,15.097C82.365,11.889 78.793,9.124 74.898,6.875C71.004,4.626 66.822,2.916 62.468,1.79L58.312,17.86C61.215,18.61 64.002,19.751 66.599,21.25C69.195,22.749 71.577,24.593 73.678,26.731L85.517,15.097Z"
        />
        }
      </svg>
    );
  }
}

export default withApollo(SensorsSegments);
