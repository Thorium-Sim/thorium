import React, { Fragment } from "react";
import gql from "graphql-tag.macro";
import MosaicConfig from "./mosaicConfig";
import { useMutation } from "@apollo/react-hooks";
import useQueryAndSubscription from "helpers/hooks/useQueryAndSubscribe";

const SUB = gql`
  subscription CoreLayoutsUpdate {
    coreLayoutChange {
      id
      name
      config
    }
  }
`;
const CORE_LAYOUTS = gql`
  query CoreLayouts {
    coreLayouts {
      id
      name
      config
    }
  }
`;
const ADD_CORE_LAYOUT = gql`
  mutation SaveCoreLayout($name: String!, $config: String!) {
    addCoreLayout(layout: { name: $name, config: $config })
  }
`;
const DELETE_CORE_LAYOUT = gql`
  mutation RemoveCoreLayout($id: ID!) {
    removeCoreLayout(id: $id)
  }
`;
const DynamicPicker = ({ onChange }) => {
  const [layout, setLayout] = React.useState("nothing");
  const [modal, setModal] = React.useState(false);
  const { loading, data } = useQueryAndSubscription([CORE_LAYOUTS], [SUB]);
  const [addCoreLayout] = useMutation(ADD_CORE_LAYOUT);
  const [deleteCoreLayout] = useMutation(DELETE_CORE_LAYOUT);
  if (loading) return null;
  const { coreLayouts } = data;
  const add = () => {
    const name = prompt("What is the name of the new core layout?");
    if (name) {
      addCoreLayout({
        variables: {
          name,
          config: JSON.stringify(this.props.mosaic)
        }
      });
    }
  };
  const deleteLayout = () => {
    const { layout: value } = this.state;
    const layout = coreLayouts.find(l => l.id === value);
    if (
      window.confirm(
        `Are you sure you want to delete the '${layout.name}' layout?`
      )
    ) {
      setLayout("nothing");
      deleteCoreLayout({ variables: { id: layout.id } });
    }
  };
  const onChangeDropdown = value => {
    if (value === "new") {
      return add();
    }
    if (value === "delete") {
      return deleteLayout();
    }
    if (value === "change") {
      return setModal(true);
    }
    setLayout(value);
    onChange(JSON.parse(coreLayouts.find(l => l.id === value).config));
  };
  return (
    <Fragment>
      <select
        value={layout}
        className="btn btn-warning btn-sm"
        onChange={e => onChangeDropdown(e.target.value)}
      >
        <option value={"nothing"} disabled>
          Change Mosaic Layout
        </option>
        {coreLayouts.map(l => (
          <option value={l.id} key={l.id}>
            {l.name}
          </option>
        ))}
        <option value="new">Save Core Layout</option>
        <option disabled={layout === "nothing"} value="delete">
          Delete Core Layout
        </option>
        <option value="change">Reorder Core Layouts</option>
      </select>
      {modal && <MosaicConfig modal={modal} toggle={() => setModal(false)} />}
    </Fragment>
  );
};

export default DynamicPicker;
