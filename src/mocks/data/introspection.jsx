/*
query IntrospectionQuery {
  __schema {
    mutationType {
      name
      description
      fields {
        name
        description
        __typename
      }
      __typename
    }
    __typename
  }
}

*/

export default {
  __schema: {
    mutationType: {
      name: "Mutation",
      description: "",
      fields: [
        {
          name: "_empty",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerAction",
          description:
            "Macro: Actions: Trigger Action (eg. Flash, Blackout, etc.)",
          __typename: "__Field",
        },
        {
          name: "addSimulatorAmbiance",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorAmbiance",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSimulatorAmbiance",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationAmbiance",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addAssetFolder",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeAssetFolder",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeAssetObject",
          description: "",
          __typename: "__Field",
        },
        {
          name: "downloadRemoteAssets",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientConnect",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientDisconnect",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientPing",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetFlight",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetStation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientLogin",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetEmail",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientLogout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientDiagnostic",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientReset",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientLockScreen",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientUnlockScreen",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientOfflineState",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientMovieState",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetTraining",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientSetSoundPlayer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientAddCache",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientRemoveCache",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setClientHypercard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "playSound",
          description: "Macro: Sounds: Play a sound",
          __typename: "__Field",
        },
        {
          name: "stopAllSounds",
          description: "Macro: Sounds: Cancel All Sounds",
          __typename: "__Field",
        },
        {
          name: "cancelLoopingSounds",
          description: "Macro: Sounds: Stop Looping All Sounds",
          __typename: "__Field",
        },
        {
          name: "applyClientSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setClientOverlay",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clientCrack",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setKeypadCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setKeypadEnteredCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setKeypadHint",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setKeypadLocked",
          description: "",
          __typename: "__Field",
        },
        {
          name: "resetKeypad",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setCodeLength",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setKeypadAllowedAttempts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "handheldScannerScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "handheldScannerCancel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "handheldScannerResponse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCommandLine",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameCommandLine",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCommandLine",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateCommandLine",
          description: "",
          __typename: "__Field",
        },
        {
          name: "executeCommandLine",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCommandLineToSimulator",
          description: "Macro: Command Line: Add command line",
          __typename: "__Field",
        },
        {
          name: "removeCommandLineFromSimulator",
          description: "Macro: Command Line: Remove command line",
          __typename: "__Field",
        },
        {
          name: "addCommandLineOutput",
          description: "",
          __typename: "__Field",
        },
        {
          name: "handleCommandLineFeedback",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addComputerCoreUser",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateComputerCoreUser",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeComputerCoreUser",
          description: "",
          __typename: "__Field",
        },
        {
          name: "restoreComputerCoreFile",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deleteComputerCoreVirus",
          description: "",
          __typename: "__Field",
        },
        {
          name: "restartComputerCoreTerminal",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addViriiToComputerCore",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setCoolantTank",
          description: "",
          __typename: "__Field",
        },
        {
          name: "transferCoolant",
          description: "",
          __typename: "__Field",
        },
        {
          name: "ignoreCoreFeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "syncTimer",
          description:
            "Macro: Core: Set a timer on core (requires sync time enabled)",
          __typename: "__Field",
        },
        {
          name: "updateCoreLayout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCoreLayout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCoreLayout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reorderCoreLayouts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCrewmember",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCrewmember",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateCrewmember",
          description: "",
          __typename: "__Field",
        },
        {
          name: "newRandomCrewmember",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeAllCrew",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crewImport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetActivated",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetPassword",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmAddEnemy",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetAcceleration",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetPhaserCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetShieldState",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmLoadTorpedo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmFireTorpedo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmFirePhaser",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmStopPhaser",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetFighterDocked",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmRestockTorpedos",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetAttacking",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetFighterImage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetFighterIcon",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetEnemyIcon",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetEnemyCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmRestoreFighter",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmDestroyUndockedFighters",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmRestoreFighters",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetFighterStrength",
          description: "",
          __typename: "__Field",
        },
        {
          name: "crmSetEnemyStrength",
          description: "",
          __typename: "__Field",
        },
        {
          name: "damageSystem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "damageReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateCurrentDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "repairSystem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "requestDamageReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "systemReactivationCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "systemReactivationCodeResponse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSystemDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSystemDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "generateDamageReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSystemDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSystemDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "breakSystem",
          description: "Macro: Damage Control: Break system",
          __typename: "__Field",
        },
        {
          name: "fixSystem",
          description: "Macro: Damage Control: Fix system",
          __typename: "__Field",
        },
        {
          name: "setDamageStepValidation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "validateDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSimulatorDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSimulatorDamageStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSimulatorDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSimulatorDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorDamageTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addDeck",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeDeck",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addDecksBulk",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateDeckSvg",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deckDoors",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deckEvac",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateHallwaySvg",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createDockingPort",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateDockingPort",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeDockingPort",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setEngineSpeeds",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addHeat",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCoolant",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setHeatRate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "engineCool",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setEngineAcceleration",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setEngineUseAcceleration",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setEngineSpeedFactor",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateEnvironment",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorExocomps",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deployExocomp",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recallExocomp",
          description: "",
          __typename: "__Field",
        },
        {
          name: "exocompCompleteUpgrade",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateExocompDifficulty",
          description: "",
          __typename: "__Field",
        },
        {
          name: "importSimulatorFromUrl",
          description: "",
          __typename: "__Field",
        },
        {
          name: "importMissionFromUrl",
          description: "",
          __typename: "__Field",
        },
        {
          name: "startFlight",
          description: "",
          __typename: "__Field",
        },
        {
          name: "resetFlight",
          description: "Macro: Flight: Reset Flight",
          __typename: "__Field",
        },
        {
          name: "deleteFlight",
          description: "",
          __typename: "__Field",
        },
        {
          name: "pauseFlight",
          description: "Macro: Flight: Pause Flight",
          __typename: "__Field",
        },
        {
          name: "resumeFlight",
          description: "Macro: Flight: Resume Flight",
          __typename: "__Field",
        },
        {
          name: "clientAddExtra",
          description: "Macro: Space EdVentures: Add Extra Crew Member",
          __typename: "__Field",
        },
        {
          name: "googleSheetsAuthorize",
          description: "",
          __typename: "__Field",
        },
        {
          name: "googleSheetsCompleteAuthorize",
          description: "",
          __typename: "__Field",
        },
        {
          name: "googleSheetsRevoke",
          description: "",
          __typename: "__Field",
        },
        {
          name: "googleSheetsFileSearch",
          description: "",
          __typename: "__Field",
        },
        {
          name: "googleSheetsAppendData",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addInterface",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameInterface",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeInterface",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateInterface",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addInterfaceToSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeInterfaceFromSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addInterfaceDevice",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameInterfaceDevice",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeInterfaceDevice",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateInterfaceDevice",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerInterfaceObject",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleInterfaceObjectHidden",
          description: "Macro: Interfaces: Set Object Hidden",
          __typename: "__Field",
        },
        {
          name: "toggleInterfaceObjectPlaying",
          description: "Macro: Interfaces: Toggle Video playing",
          __typename: "__Field",
        },
        {
          name: "internalCommConnectOutgoing",
          description: "",
          __typename: "__Field",
        },
        {
          name: "internalCommConnectIncoming",
          description: "",
          __typename: "__Field",
        },
        {
          name: "internalCommCancelIncoming",
          description: "",
          __typename: "__Field",
        },
        {
          name: "internalCommCancelOutgoing",
          description: "",
          __typename: "__Field",
        },
        {
          name: "internalCommCallIncoming",
          description: "",
          __typename: "__Field",
        },
        {
          name: "internalCommCallOutgoing",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addInventory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeInventory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "moveInventory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateInventoryCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateInventoryMetadata",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateCrewInventory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCrewInventory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "transferCargo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "insertIsochip",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateIsochip",
          description: "",
          __typename: "__Field",
        },
        {
          name: "batchIsochipUpdate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpdriveActivated",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpdriveEnvs",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpdriveSectorLevel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpdriveSectorOffset",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxJumpdriveSector",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpDriveEnabled",
          description: "",
          __typename: "__Field",
        },
        {
          name: "hitJumpDriveStress",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setJumpDriveRingsExtended",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addKeyboard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeKeyboard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameKeyboard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateKeyboardKey",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerKeyboardAction",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addLibraryEntry",
          description: "Macro: Library: Add Entry",
          __typename: "__Field",
        },
        {
          name: "updateLibraryEntry",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeLibraryEntry",
          description: "Macro: Library: Remove Entry",
          __typename: "__Field",
        },
        {
          name: "importLibraryEntry",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sendLongRangeMessage",
          description: "Macro: Long Range: Send Long Range Message",
          __typename: "__Field",
        },
        {
          name: "longRangeMessageSend",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deleteLongRangeMessage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateLongRangeDecodedMessage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateLongRangeComm",
          description: "",
          __typename: "__Field",
        },
        {
          name: "approveLongRangeMessage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "encryptLongRangeMessage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setLongRangeSatellites",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addInterceptionSignal",
          description: "Macro: Interception: Add Interception Signal",
          __typename: "__Field",
        },
        {
          name: "removeInterceptionSignal",
          description: "Macro: Interception: Remove Interception Signal",
          __typename: "__Field",
        },
        {
          name: "setInterceptionDifficulty",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setLongRangePresetMessages",
          description: "Macro: Long Range: Set preset messages",
          __typename: "__Field",
        },
        {
          name: "addMacro",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeMacro",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameMacro",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateMacroActions",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerMacroAction",
          description: "Macro: Macros: Trigger Macro",
          __typename: "__Field",
        },
        {
          name: "addMacroButtonConfig",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeMacroButtonConfig",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameMacroButtonConfig",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addMacroButton",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeMacroButton",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameMacroButton",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setMacroButtonCategory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setMacroButtonColor",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateMacroButtonActions",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerMacroButton",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleStationMessageGroup",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sendMessage",
          description: "Macro: Messaging: Send an inter-ship message",
          __typename: "__Field",
        },
        {
          name: "createMission",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeMission",
          description: "",
          __typename: "__Field",
        },
        {
          name: "editMission",
          description: "",
          __typename: "__Field",
        },
        {
          name: "importMission",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reorderTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTimelineItemToTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTimelineStepItem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTimelineStepItem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "duplicateTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "startAuxTimeline",
          description: "Macro: Timelines: Start Aux Timeline",
          __typename: "__Field",
        },
        {
          name: "setAuxTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navCalculateCourse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navCancelCalculation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navCourseResponse",
          description: "Macro: Navigation: Send Course",
          __typename: "__Field",
        },
        {
          name: "navCourseEntry",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navToggleCalculate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navSetDestinations",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navSetDestination",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navSetScanning",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navSetThrusters",
          description: "",
          __typename: "__Field",
        },
        {
          name: "navSetPresets",
          description: "Macro: Navigation: Course Preset",
          __typename: "__Field",
        },
        {
          name: "addObjective",
          description: "Macro: Objective: Add Objective",
          __typename: "__Field",
        },
        {
          name: "completeObjective",
          description: "Macro: Objective: Complete Objective",
          __typename: "__Field",
        },
        {
          name: "objectiveSetCrewComplete",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addLog",
          description: "",
          __typename: "__Field",
        },
        {
          name: "chargePhaserBeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "dischargePhaserBeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "firePhaserBeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "stopPhaserBeams",
          description: "",
          __typename: "__Field",
        },
        {
          name: "coolPhaserBeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "phaserArc",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPhaserBeamCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPhaserBeamHeat",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPhaserBeamCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPhaserHoldToCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPhaserChargeSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "stopChargingPhasers",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changePower",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSystemPowerLevels",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSystemDefaultPowerLevel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxSystemPower",
          description: "Macro: Systems: Flux Power",
          __typename: "__Field",
        },
        {
          name: "destroyProbe",
          description: "",
          __typename: "__Field",
        },
        {
          name: "launchProbe",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fireProbe",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateProbeType",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateProbeEquipment",
          description: "",
          __typename: "__Field",
        },
        {
          name: "probeQuery",
          description: "",
          __typename: "__Field",
        },
        {
          name: "probeQueryResponse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "probeProcessedData",
          description: "Macro: Probes: Probe Processed Data",
          __typename: "__Field",
        },
        {
          name: "setProbeTorpedo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setProbeCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "activateProbeEmitter",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setRailgunAmmo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setRailgunMaxAmmo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setRailgunAvailableAmmo",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fireRailgun",
          description: "",
          __typename: "__Field",
        },
        {
          name: "loadRailgun",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorEject",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorChangeModel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorChangeOutput",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorChangeEfficiency",
          description: "Macro: Reactor: Change Reactor Efficiency",
          __typename: "__Field",
        },
        {
          name: "reactorBatteryChargeLevel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorBatteryChargeRate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateDilithiumStress",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxDilithiumStress",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setReactorEffciciencies",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setDilithiumStressRate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reactorRequireBalance",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recordsCreate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recordsCreateSnippet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recordsAddToSnippet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recordsRemoveFromSnippet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "recordsDeleteRecord",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addRoom",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeRoom",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addRoomsBulk",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameRoom",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateRoomRoles",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateRoomSvg",
          description: "",
          __typename: "__Field",
        },
        {
          name: "roomGas",
          description: "",
          __typename: "__Field",
        },
        {
          name: "importRooms",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeRoomDeck",
          description: "",
          __typename: "__Field",
        },
        {
          name: "snapshot",
          description: "",
          __typename: "__Field",
        },
        {
          name: "test",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sensorScanRequest",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sensorScanResult",
          description: "",
          __typename: "__Field",
        },
        {
          name: "processedData",
          description: "Macro: Sensors: Processed Data",
          __typename: "__Field",
        },
        {
          name: "sensorScanCancel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setPresetAnswers",
          description: "Macro: Sensors: Scan Answers",
          __typename: "__Field",
        },
        {
          name: "createSensorContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createSensorContacts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "moveSensorContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSensorContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeAllSensorContacts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "stopAllSensorContacts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSensorContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setArmyContacts",
          description: "Macro: Sensors: Set Army Sensor Contacts",
          __typename: "__Field",
        },
        {
          name: "createSensorArmyContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSensorArmyContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSensorArmyContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "nudgeSensorContacts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorPingMode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "pingSensors",
          description: "",
          __typename: "__Field",
        },
        {
          name: "animateSensorContacact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsHistory",
          description: "",
          __typename: "__Field",
        },
        {
          name: "newSensorScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSensorScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "cancelSensorScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleSensorsAutoTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleSensorsAutoThrusters",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsInterference",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsSegment",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setAutoMovement",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSensorContacts",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSensorGrid",
          description: "Macro: Sensors: Update Sensor Grid",
          __typename: "__Field",
        },
        {
          name: "destroySensorContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sensorsFireProjectile",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsDefaultHitpoints",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsDefaultSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSensorsMissPercent",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addClientToSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeClientFromSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSetClient",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shieldRaised",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shieldLowered",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shieldIntegritySet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shieldFrequencySet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shieldFrequencySetAll",
          description: "Macro: Shields: Set all shield frequencies",
          __typename: "__Field",
        },
        {
          name: "hitShields",
          description: "Macro: Shields: Hit all shields",
          __typename: "__Field",
        },
        {
          name: "restoreShields",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shipDockingChange",
          description: "",
          __typename: "__Field",
        },
        {
          name: "shipSetDocking",
          description: "Macro: Docking: Set docking state",
          __typename: "__Field",
        },
        {
          name: "remoteAccessSendCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "remoteAccessUpdateCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSelfDestructTime",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSelfDestructCode",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSelfDestructAuto",
          description: "",
          __typename: "__Field",
        },
        {
          name: "notify",
          description: "Macro: Actions: Send Notification",
          __typename: "__Field",
        },
        {
          name: "commAddSignal",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commUpdateSignal",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commUpdateSignals",
          description: "Macro: Short Range: Set Signals",
          __typename: "__Field",
        },
        {
          name: "commRemoveSignal",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commAddArrow",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commRemoveArrow",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commConnectArrow",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commDisconnectArrow",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commUpdate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "commHail",
          description: "",
          __typename: "__Field",
        },
        {
          name: "cancelHail",
          description: "",
          __typename: "__Field",
        },
        {
          name: "connectHail",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addShortRangeComm",
          description: "Macro: Short Range: Add Signal",
          __typename: "__Field",
        },
        {
          name: "removeShortRangeComm",
          description: "Macro: Short Range: Remove Signal",
          __typename: "__Field",
        },
        {
          name: "muteShortRangeComm",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSickbayBunks",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSickbayCrew",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSickbayCrew",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSickbayCrew",
          description: "",
          __typename: "__Field",
        },
        {
          name: "scanSickbayBunk",
          description: "",
          __typename: "__Field",
        },
        {
          name: "cancelSickbayBunkScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "sickbayBunkScanResponse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "assignPatient",
          description: "",
          __typename: "__Field",
        },
        {
          name: "dischargePatient",
          description: "",
          __typename: "__Field",
        },
        {
          name: "startDeconProgram",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateDeconOffset",
          description: "",
          __typename: "__Field",
        },
        {
          name: "cancelDeconProgram",
          description: "",
          __typename: "__Field",
        },
        {
          name: "completeDeconProgram",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setDeconAutoFinish",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updatePatientChart",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSignalJammer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "signalJammerSignals",
          description: "Macro: Signal Jammer: Set Signal",
          __typename: "__Field",
        },
        {
          name: "fluxSignalJammer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerMacros",
          description: "",
          __typename: "__Field",
        },
        {
          name: "autoAdvance",
          description:
            "Macro: Timeline: Auto-Advance Timeline Step (Use with Delay)",
          __typename: "__Field",
        },
        {
          name: "trainingMode",
          description: "Macro: Flight: Start Training Mode",
          __typename: "__Field",
        },
        {
          name: "setAlertConditionLock",
          description: "Macro: Simulator: Set Alert Condition Lock",
          __typename: "__Field",
        },
        {
          name: "renameSimulator",
          description: "Macro: Simulator: Rename Simulator",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorLayout",
          description: "Macro: Simulator: Change Simulator Layout",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorCaps",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorAlertLevel",
          description: "Macro: Simulator: Change Alert Level",
          __typename: "__Field",
        },
        {
          name: "hideSimulatorCard",
          description: "Macro: Station: Hide Card",
          __typename: "__Field",
        },
        {
          name: "unhideSimulatorCard",
          description: "Macro: Station: Unhide Card",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorExocomps",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorBridgeCrew",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorExtraPeople",
          description: "",
          __typename: "__Field",
        },
        {
          name: "changeSimulatorRadiation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorTimelineStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorMission",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorMissionConfig",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorPanels",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorCommandLines",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorTriggers",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorTriggersPaused",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorInterfaces",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStepDamage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setVerifyDamage",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setBridgeMessaging",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorAssets",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorSoundEffects",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSimulatorLighting",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorHasPrinter",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorHasLegs",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorSpaceEdventuresId",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSimulatorStationCard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSimulatorStationCard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "editSimulatorStationCard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorStationMessageGroup",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorStationLogin",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorStationLayout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorStationExecutive",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSimulatorStationWidget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createSoftwarePanel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSoftwarePanel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSoftwarePanel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationSetCrewCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addStationToStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeStationFromStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "editStationInStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCardToStation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCardFromStation",
          description: "",
          __typename: "__Field",
        },
        {
          name: "editCardInStationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationLogin",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationLayout",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationExecutive",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleStationWidgets",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationDescription",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStationTraining",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reorderStationWidgets",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStealthActivated",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStealthCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "activateStealth",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deactivateStealth",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setStealthQuadrant",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxStealthQuadrants",
          description: "",
          __typename: "__Field",
        },
        {
          name: "stealthChangeAlert",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxSubspaceField",
          description: "",
          __typename: "__Field",
        },
        {
          name: "normalSubspaceField",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSubspaceFieldSectorValue",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createSurveyForm",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSurveyForm",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSurveyFormGoogleSheet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSurveyForm",
          description: "",
          __typename: "__Field",
        },
        {
          name: "triggerSurvey",
          description: "Macro: Surveys: Trigger Survey",
          __typename: "__Field",
        },
        {
          name: "surveyFormResponse",
          description: "",
          __typename: "__Field",
        },
        {
          name: "endSurvey",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addSystemToSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSystemFromSimulator",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemName",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemUpgradeMacros",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemUpgradeBoard",
          description: "",
          __typename: "__Field",
        },
        {
          name: "upgradeSystem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateSystemRooms",
          description: "",
          __typename: "__Field",
        },
        {
          name: "newTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "freezeTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "duplicateTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "loadTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTacticalMap",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTacticalMapLayer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTacticalMapLayer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "reorderTacticalMapLayer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTacticalMapLayer",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTacticalMapItem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTacticalMapItem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTacticalMapItem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTacticalMapPath",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTacticalMapPath",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTacticalMapPath",
          description: "",
          __typename: "__Field",
        },
        {
          name: "showViewscreenTactical",
          description: "Macro: Viewscreen: Show Tactical Map",
          __typename: "__Field",
        },
        {
          name: "addTacticalMapsToFlight",
          description: "Macro: Tactical Map: Add Tactical Maps to Flight",
          __typename: "__Field",
        },
        {
          name: "createTargetingContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "targetTargetingContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "untargetTargetingContact",
          description: "",
          __typename: "__Field",
        },
        {
          name: "targetSystem",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTargetClass",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTargetClass",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTargetClass",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTargetClassCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setCoordinateTargeting",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTargetingCalculatedTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTargetingEnteredTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clearAllTargetingContacts",
          description: "Macro: Targeting: Clear Targeting Classes",
          __typename: "__Field",
        },
        {
          name: "setTargetingRange",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTargetingClasses",
          description: "Macro: Targeting: Set Targeting Classes",
          __typename: "__Field",
        },
        {
          name: "generateTaskReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clearTaskReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "completeTaskReport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "verifyTaskReportStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "assignTaskReportStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "requestVerifyTaskReportStep",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTask",
          description: "Macro: Tasks: Add Task",
          __typename: "__Field",
        },
        {
          name: "verifyTask",
          description: "",
          __typename: "__Field",
        },
        {
          name: "requestTaskVerify",
          description: "",
          __typename: "__Field",
        },
        {
          name: "denyTaskVerify",
          description: "",
          __typename: "__Field",
        },
        {
          name: "dismissVerifiedTasks",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTaskTemplate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTaskTemplate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameTaskTemplate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTaskTemplateValues",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTaskTemplateReportTypes",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTaskTemplateMacros",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTaskTemplatePreMacros",
          description: "",
          __typename: "__Field",
        },
        {
          name: "createTeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addCrewToTeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeCrewFromTeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTeam",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTrackingPreference",
          description: "",
          __typename: "__Field",
        },
        {
          name: "importTaskTemplates",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setSpaceEdventuresToken",
          description: "",
          __typename: "__Field",
        },
        {
          name: "assignSpaceEdventuresBadge",
          description: "Macro: Space EdVentures: Assign Space EdVentures Badge",
          __typename: "__Field",
        },
        {
          name: "assignSpaceEdventuresMission",
          description:
            "Macro: Space EdVentures: Assign Space EdVentures Mission",
          __typename: "__Field",
        },
        {
          name: "assignSpaceEdventuresFlightType",
          description: "Macro: Space EdVentures: Change Flight Type",
          __typename: "__Field",
        },
        {
          name: "assignSpaceEdventuresFlightRecord",
          description: "Macro: Space EdVentures: Transmit to Space EdVentures",
          __typename: "__Field",
        },
        {
          name: "getSpaceEdventuresLogin",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeSpaceEdventuresClient",
          description: "",
          __typename: "__Field",
        },
        {
          name: "generic",
          description: "Macro: Generic: Do a generic thing. Use for triggers.",
          __typename: "__Field",
        },
        {
          name: "addIssue",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addIssueUpload",
          description: "",
          __typename: "__Field",
        },
        {
          name: "rotationUpdate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "rotationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "requiredRotationSet",
          description: "",
          __typename: "__Field",
        },
        {
          name: "directionUpdate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "positionUpdate",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setThrusterRotationSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setThrusterMovementSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "chargeThx",
          description: "",
          __typename: "__Field",
        },
        {
          name: "lockThx",
          description: "",
          __typename: "__Field",
        },
        {
          name: "activateThx",
          description: "",
          __typename: "__Field",
        },
        {
          name: "deactivateThx",
          description: "",
          __typename: "__Field",
        },
        {
          name: "resetThx",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoAddWarhead",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoRemoveWarhead",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoLoadWarhead",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoSetWarheadCount",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoUnload",
          description: "",
          __typename: "__Field",
        },
        {
          name: "torpedoFire",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamState",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamStrength",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamStress",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamScanning",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTractorBeamTargetLabel",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTractorTarget",
          description: "Macro: Tractor Beam: Add Target",
          __typename: "__Field",
        },
        {
          name: "removeTractorTarget",
          description: "Macro: Tractor Beam: Remove Target",
          __typename: "__Field",
        },
        {
          name: "setTransportDestination",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTransportTarget",
          description: "",
          __typename: "__Field",
        },
        {
          name: "beginTransportScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "cancelTransportScan",
          description: "",
          __typename: "__Field",
        },
        {
          name: "clearTransportTargets",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTransportCharge",
          description: "",
          __typename: "__Field",
        },
        {
          name: "completeTransport",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTransporterTargets",
          description: "Macro: Transporters: Set Target Count",
          __typename: "__Field",
        },
        {
          name: "setTransporterChargeSpeed",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTranswarpActive",
          description: "",
          __typename: "__Field",
        },
        {
          name: "fluxTranswarp",
          description: "",
          __typename: "__Field",
        },
        {
          name: "normalTranswarp",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setTranswarpSectorValue",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTrigger",
          description: "",
          __typename: "__Field",
        },
        {
          name: "renameTrigger",
          description: "",
          __typename: "__Field",
        },
        {
          name: "removeTrigger",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateTrigger",
          description: "",
          __typename: "__Field",
        },
        {
          name: "addTriggerToSimulator",
          description: "Macro: Triggers: Add trigger to simulator",
          __typename: "__Field",
        },
        {
          name: "removeTriggerFromSimulator",
          description: "Macro: Triggers: Remove trigger from simulator",
          __typename: "__Field",
        },
        {
          name: "updateViewscreenName",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateViewscreenSecondary",
          description: "",
          __typename: "__Field",
        },
        {
          name: "updateViewscreenComponent",
          description: "Macro: Viewscreen: Change Viewscreen Card",
          __typename: "__Field",
        },
        {
          name: "updateViewscreenData",
          description: "",
          __typename: "__Field",
        },
        {
          name: "setViewscreenToAuto",
          description: "Macro: Viewscreen: Set Viewscreen to Auto",
          __typename: "__Field",
        },
        {
          name: "setViewscreenPictureInPicture",
          description: "Macro: Viewscreen: Set Viewscreen Picture-in-Picture",
          __typename: "__Field",
        },
        {
          name: "removeViewscreenPictureInPicture",
          description:
            "Macro: Viewscreen: Remove Viewscreen Picture-in-Picture",
          __typename: "__Field",
        },
        {
          name: "updateViewscreenAuto",
          description: "",
          __typename: "__Field",
        },
        {
          name: "toggleViewscreenVideo",
          description: "",
          __typename: "__Field",
        },
      ],
      __typename: "__Type",
    },
    __typename: "__Schema",
  },
};
