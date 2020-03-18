import React from "react";
import {
  IdentityComponent,
  useEntitySetIdentityMutation,
} from "generated/graphql";
import {Label, Input} from "reactstrap";

interface IdentityEditProps {
  id: string;
  identity: IdentityComponent;
}
const Identity: React.FC<IdentityEditProps> = ({id, identity}) => {
  const [setName] = useEntitySetIdentityMutation();

  return (
    <>
      <h3>Identity</h3>
      <Label>
        Name
        <Input
          type="text"
          value={identity.name || ""}
          onChange={e => {
            setName({
              variables: {id, name: e.target.value},
            });
          }}
        />
      </Label>
    </>
  );
};

export default Identity;
