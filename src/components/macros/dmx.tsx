import React from "react";
import {MacroConfigProps} from "helpers/genericTypes";
import styled from "@emotion/styled/macro";
import {TagInput} from "containers/FlightDirector/DMX/fixtures";
import {Input} from "reactstrap";
import {ChannelConfig} from "helpers/generateDMXUniverse";
import {DMXPropertiesEditor} from "containers/FlightDirector/DMX/configs";

const FormWrapper = styled.div`
  label {
    display: block;
  }
  small {
    display: block;
  }
`;

const DmxFixtureSetActive: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
}) => {
  const {tags = []}: {tags: string[]} = args;
  return (
    <FormWrapper>
      <label>
        Tags
        <TagInput
          tags={tags}
          onAdd={t =>
            updateArgs(
              "tags",
              tags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "tags",
              tags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>Leave this blank to target fixtures that have no tags.</small>
    </FormWrapper>
  );
};
const DmxFixtureSetTags: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
  simulatorId,
}) => {
  const {tags = [], newTags = []}: {tags: string[]; newTags: string[]} = args;

  return (
    <FormWrapper>
      <label>
        Tags
        <TagInput
          tags={tags}
          onAdd={t =>
            updateArgs(
              "tags",
              tags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "tags",
              tags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>Leave this blank to target fixtures that have no tags.</small>

      <label>
        New Tags
        <TagInput
          tags={newTags}
          onAdd={t =>
            updateArgs(
              "newTags",
              newTags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "newTags",
              newTags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>All tags on this fixture will be overwritten.</small>
    </FormWrapper>
  );
};
const DmxFixtureAddTag: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
  simulatorId,
}) => {
  const {tags = [], newTag = ""}: {tags: string[]; newTag: string} = args;
  return (
    <FormWrapper>
      <label>
        Tags
        <TagInput
          tags={tags}
          onAdd={t =>
            updateArgs(
              "tags",
              tags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "tags",
              tags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>Leave this blank to target fixtures that have no tags.</small>
      <label>
        New Tag
        <Input
          type="text"
          value={newTag}
          onChange={e => updateArgs("newTag", e.target.value)}
        />
      </label>
    </FormWrapper>
  );
};
const DmxFixtureRemoveTag: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
  simulatorId,
}) => {
  const {tags = [], removeTag = ""}: {tags: string[]; removeTag: string} = args;
  return (
    <FormWrapper>
      <label>
        Tags
        <TagInput
          tags={tags}
          onAdd={t =>
            updateArgs(
              "tags",
              tags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "tags",
              tags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>Leave this blank to target fixtures that have no tags.</small>
      <label>
        Tag To Remove
        <Input
          type="text"
          value={removeTag}
          onChange={e => updateArgs("removeTag", e.target.value)}
        />
      </label>
    </FormWrapper>
  );
};
const DmxFixtureSetPassiveChannels: React.FC<MacroConfigProps> = ({
  updateArgs,
  args,
  simulatorId,
}) => {
  const {
    tags = [],
    passiveChannels = {},
  }: {tags: string[]; passiveChannels: ChannelConfig} = args;
  return (
    <FormWrapper>
      <label>
        Tags
        <TagInput
          tags={tags}
          onAdd={t =>
            updateArgs(
              "tags",
              tags.concat(t).filter((a, i, arr) => arr.indexOf(a) === i),
            )
          }
          onRemove={t =>
            updateArgs(
              "tags",
              tags.filter(tag => tag !== t),
            )
          }
        />
      </label>
      <small>Leave this blank to target fixtures that have no tags.</small>
      <small>
        This will change the fixture from active mode to passive mode.
      </small>
      <DMXPropertiesEditor
        channels={passiveChannels}
        updateValue={(prop, value) =>
          updateArgs("passiveChannels", {...passiveChannels, [prop]: value})
        }
      />
    </FormWrapper>
  );
};

export const dmxFixtureSetActive = DmxFixtureSetActive;
export const dmxFixtureSetTags = DmxFixtureSetTags;
export const dmxFixtureAddTag = DmxFixtureAddTag;
export const dmxFixtureRemoveTag = DmxFixtureRemoveTag;
export const dmxFixtureSetPassiveChannels = DmxFixtureSetPassiveChannels;
