import React, { useState, useEffect } from "react";
import { Button, Alert } from "helpers/reactstrap";
import gql from "graphql-tag.macro";
import { Mutation } from "react-apollo";
import semver from "semver";
import { FormattedMessage } from "react-intl";

const AutoUpdate = ({ autoUpdate }) => {
  const [outdated, setOutdated] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [major, setMajor] = useState(false);
  useEffect(() => {
    if (!process.env.CI) {
      fetch("https://api.github.com/repos/thorium-sim/thorium/releases")
        .then(res => res.json())
        .then(res => {
          if (
            semver.gt(
              res[0].tag_name,
              require("../../../../package.json").version
            ) &&
            semver(res[0].tag_name).prerelease.length === 0
          ) {
            setOutdated(res[0].tag_name);
          }
          if (
            semver.major(res[0].tag_name) >
            semver.major(require("../../../../package.json").version)
          ) {
            setMajor(true);
          }
        })
        .catch(() => {
          //Oh well.
        });
    }
  }, []);
  return (
    autoUpdate &&
    (outdated || upgrading) && (
      <Alert color={major ? "danger" : "warning"}>
        <FormattedMessage
          id="upgrade-warning"
          defaultMessage="Your version of Thorium is outdated. Current version is {newVersion}. Your version is {oldVersion}"
          values={{
            oldVersion: require("../../../../package.json").version,
            newVersion: outdated
          }}
        />{" "}
        {major && (
          <strong>
            <FormattedMessage
              id="major-upgrade-warning"
              defaultMessage="This is a major upgrade. Make sure you backup your Thorium data directory and program file before performing this upgrade."
            />
          </strong>
        )}
        <p>
          {!upgrading && (
            <Mutation
              mutation={gql`
                mutation TriggerAutoUpdate {
                  triggerAutoUpdate
                }
              `}
            >
              {action => (
                <Button
                  outline
                  color="secondary"
                  onClick={() => {
                    action();
                    setOutdated(false);
                    setUpgrading(true);
                  }}
                >
                  Download Update
                </Button>
              )}
            </Mutation>
          )}
          {upgrading && (
            <small>
              <FormattedMessage
                id="upgrade-instructions"
                defaultMessage="The update is downloading in the background. Wait until the Thorium Server command line window says 'Download Complete' before restarting Thorium Server"
              />
            </small>
          )}
        </p>
      </Alert>
    )
  );
};

export default AutoUpdate;
