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
const DynamicPicker = ({ onChange, mosaic }) => {
  const [layout, setLayout] = React.useState("nothing");
  const [modal, setModal] = React.useState(false);
  const { loading, data } = useQueryAndSubscription([CORE_LAYOUTS], [SUB]);
  const [addCoreLayout] = useMutation(ADD_CORE_LAYOUT);
  const [deleteCoreLayout] = useMutation(DELETE_CORE_LAYOUT);
  const fileRef = React.useRef();

  if (loading) return null;
  const { coreLayouts } = data;
  const add = () => {
    const name = prompt("What is the name of the new core layout?");
    if (name) {
      addCoreLayout({
        variables: {
          name,
          config: JSON.stringify(mosaic)
        }
      });
    }
  };
  const deleteLayout = () => {
    const layoutObj = coreLayouts.find(l => l.id === layout);
    if (
      window.confirm(
        `Are you sure you want to delete the '${layoutObj.name}' layout?`
      )
    ) {
      setLayout("nothing");
      deleteCoreLayout({ variables: { id: layoutObj.id } });
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
    if (value === "export") {
      const href = `${window.location.protocol}//${
        window.location.hostname
      }:${parseInt(window.location.port, 10) + 1}/exportCoreLayout/${layout}`;
      window.open(href);
      return;
    }
    if (value === "import") {
      fileRef.current.click();
      return;
    }
    setLayout(value);
    onChange(JSON.parse(coreLayouts.find(l => l.id === value).config));
  };
  const handleImport = evt => {
    const data = new FormData();
    Array.from(evt.target.files).forEach((f, index) =>
      data.append(`files[${index}]`, f)
    );
    fetch(
      `${window.location.protocol}//${window.location.hostname}:${parseInt(
        window.location.port,
        10
      ) + 1}/importCoreLayout`,
      {
        method: "POST",
        body: data
      }
    ).then(() => {
      window.location.reload();
    });
  };

  return (
    <Fragment>
      <input
        hidden
        type="file"
        ref={fileRef}
        value=""
        onChange={handleImport}
      />
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
        <option value="export" disabled={layout === "nothing"}>
          Export Core Layout
        </option>
        <option value="import">Import Core Layout</option>
      </select>
      {modal && <MosaicConfig modal={modal} toggle={() => setModal(false)} />}
    </Fragment>
  );
};

export default DynamicPicker;
