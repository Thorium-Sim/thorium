import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "helpers/reactstrap";
import {useNavigate} from "react-router-dom";
import {useQuery, useMutation} from "react-apollo";
import gql from "graphql-tag.macro";
import {Rings} from "../helpers/loaders";
import {DateTime} from "luxon";
import SearchableList from "helpers/SearchableList";

const QUERY = gql`
  query SideNav {
    missions {
      id
      name
      aux
      category
    }
  }
`;

const MISSION_LIBRARY = gql`
  query Externals {
    externals {
      missions {
        title
        author
        description
        url
        date
      }
    }
  }
`;
const IMPORT_MUTATION = gql`
  mutation ImportMission($url: String!) {
    importMissionFromUrl(url: $url)
  }
`;
const MissionLibrary = ({missions, triggerAlert}) => {
  const {data, loading} = useQuery(MISSION_LIBRARY, {
    fetchPolicy: "cache-and-network",
  });

  const [importMission, {loading: importing}] = useMutation(IMPORT_MUTATION);
  const extMissions = data?.externals?.missions;

  return (
    <>
      <h2>Mission Library</h2>
      <div
        style={{
          height: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {(loading || !data) && <Rings color="#08f" width={100} height={100} />}
        {extMissions?.filter(s => !missions.find(m => s.title === m.name))
          .length > 0 ? (
          extMissions
            ?.filter(s => !missions.find(m => s.title === m.name))
            .map(s => (
              <Card key={s.title} style={{width: "100%"}}>
                <CardBody>
                  {!importing && (
                    <Button
                      style={{float: "right"}}
                      color="success"
                      onClick={() => {
                        triggerAlert({
                          color: "info",
                          title: "Downloading mission...",
                          body:
                            "This mission is downloading in the background. Don't turn off Thorium Server. You can monitor download progress on your Thorium Server window.",
                        });
                        importMission({variables: {url: s.url}});
                      }}
                    >
                      Download
                    </Button>
                  )}

                  <h3>{s.title}</h3>
                  <div>Author: {s.author}</div>
                  <div>
                    Date Published:{" "}
                    {DateTime.fromJSDate(new Date(s.date)).toFormat("D")}
                  </div>
                  <div>Description:</div>
                  <div>{s.description}</div>
                </CardBody>
              </Card>
            ))
        ) : (
          <Card>
            <CardBody>
              <h2>No missions available.</h2>
              <p>You've already imported all of the available missions.</p>
            </CardBody>
          </Card>
        )}
      </div>
      )
    </>
  );
};

const MissionPicker = ({triggerAlert}) => {
  const [loadingMission, setLoadingMission] = React.useState(false);
  const navigate = useNavigate();
  const [addMission] = useMutation(gql`
    mutation AddMission($name: String!) {
      createMission(name: $name)
    }
  `);
  const createMission = () => {
    let name = prompt("What is the mission name?");
    if (name) {
      addMission({variables: {name}, refetchQueries: [{query: QUERY}]});
    }
  };
  const importMission = evt => {
    if (evt.target.files[0]) {
      const data = new FormData();
      Array.from(evt.target.files).forEach((f, index) =>
        data.append(`files[${index}]`, f),
      );
      setLoadingMission(true);
      fetch(`/importMission`, {
        method: "POST",
        body: data,
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const {data, loading} = useQuery(QUERY, {fetchPolicy: "cache-and-network"});

  return loading ? null : (
    <Container>
      <Row>
        <Col sm={4} style={{maxHeight: "70vh"}}>
          <h2>Missions</h2>
          <SearchableList
            items={data?.missions.map(m => ({
              id: m.id,
              label: m.name,
              category: m.category,
              aux: m.aux,
            }))}
            selectedItem={null}
            setSelectedItem={item =>
              navigate(`/config/mission/${item}/mission`)
            }
            renderItem={item => (
              <span className={item.aux ? "text-warning" : ""}>
                {item.label}
              </span>
            )}
          />

          <Label>
            <Button size="sm" block color="success" onClick={createMission}>
              Create Mission
            </Button>
          </Label>
          <Label>
            <div className="btn btn-sm btn-info btn-block">Import Mission</div>
            <Input hidden type="file" onChange={importMission} />
          </Label>
        </Col>
        <Col sm={{size: 7, offset: 1}}>
          <MissionLibrary
            missions={data?.missions}
            triggerAlert={triggerAlert}
          />
        </Col>
      </Row>
      {loadingMission && (
        <div className="loading">
          <svg
            id="loader-1"
            version="1.1"
            viewBox="0 0 40 40"
            x="0px"
            y="0px"
            xmlSpace="preserve"
          >
            <path
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946&#xA;    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634&#xA;    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
              fill="#000"
              opacity="0.2"
            />
            <path
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0&#xA;    C22.32,8.481,24.301,9.057,26.013,10.047z"
              fill="#000"
            />
          </svg>
          <h1>Loading Mission</h1>
          <h4>This page will automatically refresh</h4>
        </div>
      )}
    </Container>
  );
};

export default MissionPicker;
