import tw from "twin.macro";
import css from "@emotion/css/macro";
import React from "react";
import {
  useDmxSetSetNameMutation,
  useDmxSetRemoveMutation,
  useDmxSetCreateMutation,
  useDmxSetsSubscription,
  useDmxSetDuplicateMutation,
} from "generated/graphql";
import SearchableList from "helpers/SearchableList";
import {useNavigate, useParams, Link} from "react-router-dom";
import {Button} from "reactstrap";
import DMXFixtures from "./fixtures";

const DMXSets: React.FC = () => {
  const {setId} = useParams();
  const navigate = useNavigate();
  const {data} = useDmxSetsSubscription();
  const [create] = useDmxSetCreateMutation();
  const [setName] = useDmxSetSetNameMutation();
  const [remove] = useDmxSetRemoveMutation();
  const [duplicate] = useDmxSetDuplicateMutation();

  const selectedSet = data?.dmxSets.find(d => d.id === setId);
  return (
    <div css={tw`h-full`}>
      <div
        css={[
          tw`grid grid-cols-4 gap-4`,
          css`
            height: calc(100% - 196px);
          `,
        ]}
      >
        <div css={tw`flex flex-col`}>
          <h3>Sets</h3>
          <SearchableList
            items={data?.dmxSets?.map(d => ({id: d.id, label: d.name})) || []}
            selectedItem={setId || null}
            setSelectedItem={item => navigate(`/config/dmx/sets/${item}`)}
          ></SearchableList>
          <Button
            block
            size="sm"
            color="success"
            onClick={() => {
              const name = prompt("What is the name of this DMX Set?");
              if (!name) return;
              create({variables: {name}}).then(res =>
                navigate(`/config/dmx/sets/${res.data?.dmxSetCreate || ""}`),
              );
            }}
          >
            Create DMX Set
          </Button>
          {selectedSet && (
            <React.Fragment>
              <Button
                block
                size="sm"
                color="info"
                onClick={() => {
                  const name = prompt("What is the name of this new DMX Set?");
                  if (!name) return;
                  duplicate({variables: {id: selectedSet.id, name}}).then(res =>
                    navigate(
                      `/config/dmx/sets/${res.data?.dmxSetDuplicate || ""}`,
                    ),
                  );
                }}
              >
                Duplicate DMX Set
              </Button>

              <Button
                block
                size="sm"
                color="warning"
                onClick={() => {
                  const name = prompt("What is the new name of this DMX Set?");
                  if (!name) return;
                  setName({variables: {id: selectedSet.id, name}});
                }}
              >
                Rename DMX Set
              </Button>
              <Button
                block
                size="sm"
                color="danger"
                onClick={() => {
                  remove({variables: {id: selectedSet.id}});
                  navigate(`/config/dmx/sets`);
                }}
              >
                Remove DMX Set
              </Button>
              <Button
                tag="a"
                href={`/exportDmxSets/${selectedSet.id}`}
                color="secondary"
                block
                size="sm"
              >
                Export DMX Set
              </Button>
            </React.Fragment>
          )}
          <label css={tw`mt-2`}>
            <div className="btn btn-sm btn-info btn-block">Import DMX Set</div>
            <input
              hidden
              type="file"
              onChange={evt => {
                if (evt?.target?.files?.[0]) {
                  const data = new FormData();
                  Array.from(evt.target.files).forEach((f, index) =>
                    data.append(`files[${index}]`, f),
                  );
                  fetch(`/importDmxSets`, {
                    method: "POST",
                    body: data,
                  }).then(() => {
                    window.location.reload();
                  });
                }
              }}
            />
          </label>
        </div>
        {selectedSet && <DMXFixtures dmxFixtures={selectedSet.fixtures} />}
      </div>
      <small>
        Don't forget to assign your lighting set to a{" "}
        <Link to="/config/sets">set configuration.</Link>
      </small>
    </div>
  );
};
export default DMXSets;
