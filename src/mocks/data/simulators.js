/*query Ship($simulatorId: ID!) {
  simulators(id: $simulatorId) {
    id
    template
    name
    caps
    alertlevel
    alertLevelLock
    layout
    bridgeOfficerMessaging
    training
    hasPrinter
    hasLegs
    panels
    stepDamage
    verifyStep
    triggersPaused
     currentTimelineStep
    executedTimelineSteps
    missionConfigs
    stationSet {
      id
      __typename
    }
    mission {
      id
      name
      description
      timeline {
        id
        name
        order
        description
        timelineItems {
          id
          name
          type
          args
          event
          delay
          __typename
        }
        __typename
      }
      __typename
    }
    ship {
      legs
      ramps
      clamps
      airlock
      velocity
      radiation
      bridgeCrew
      extraPeople
      inventoryLogs {
        log
        timestamp
        __typename
      }
      selfDestructTime
      selfDestructCode
      selfDestructAuto
      remoteAccessCodes {
        id
        code
        state
        station
        timestamp
        __typename
      }
      __typename
    }
    
    stations {
      name
      cards {
        name
        hidden
        component
        __typename
      }
      __typename
    }
    __typename
  }
}
*/
export default [
  {
    id: "test",
    template: false,
    name: "Voyager",
    caps: false,
    alertlevel: "5",
    alertLevelLock: false,
    layout: "LayoutCorners",
    bridgeOfficerMessaging: true,
    training: false,
    hasPrinter: true,
    hasLegs: false,
    panels: [],
    stepDamage: true,
    verifyStep: false,
    triggersPaused: false,
    currentTimelineStep: 1,
    executedTimelineSteps: [],
    missionConfigs: {},
    flipped: false,
    stationSet: {
      id: "b0a875f6-0e01-4b51-a423-9241bc197f89",
      __typename: "StationSet",
    },
    mission: {
      id: "2560ac50-ea47-4590-9dfe-86aaa05d4954",
      name: "Fallout",
      description:
        "A simple weapons test in a system near the Orion Triangle. What could possibly go wrong?",
      timeline: [
        {
          id: "2f25b71b-294d-4a15-b98e-f6e6d9d277ac-initial",
          name: "Initialize",
          order: 0,
          description: "Initializes the mission",
          timelineItems: [
            {
              id: "cedfa45b-8ae6-42ba-b817-88f39abf728a",
              name: "Sensor Contacts",
              type: "event",
              args:
                '{"domain":"external","armyContacts":[{"id":"959e71c6-5000-448d-9f78-f5e7ee1621a8","name":"Nautilus Station","icon":"/Sensor Contacts/Icons/Satellite.svg","picture":"/Sensor Contacts/Pictures/Astra Starbase.png","size":"2.3","color":"#0f0","infrared":false,"cloaked":false,"destroyed":false},{"id":"2e9cd0b1-913b-4887-ab5a-27338388fdad","name":"USS Vanguard","icon":"/Sensor Contacts/Icons/Peacekeeper.svg","picture":"/Sensor Contacts/Pictures/Astra Battleship.png","size":1,"color":"#0f0","infrared":false,"cloaked":false,"destroyed":false},{"id":"efb75dd4-0b51-4ffc-983b-f30133b7b2a3","name":"USS Eclipse","icon":"/Sensor Contacts/Icons/Peacekeeper.svg","picture":"/Sensor Contacts/Pictures/Astra Light Cruiser.png","size":"0.7","color":"#0f0","infrared":false,"cloaked":false,"destroyed":false},{"id":"8adef37e-4ee0-4c7a-8600-553cdc91e015","name":"Orion Fighter","icon":"/Sensor Contacts/Icons/Stazi.svg","picture":"/Sensor Contacts/Pictures/Alotec Battleship.png","size":1,"color":"#0f0","infrared":false,"cloaked":false,"destroyed":false,"hostile":true},{"id":"9405f600-e178-4122-86a0-587aad407f02","name":"Orion Battleship","icon":"/Sensor Contacts/Icons/Stazi.svg","picture":"/Sensor Contacts/Pictures/Alotec Battleship.png","size":"2.7","color":"#0f0","infrared":false,"cloaked":false,"destroyed":false,"hostile":true}]}',
              event: "setArmyContacts",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "e48db989-097f-494f-a01e-2e945b83084d",
              name: "setPresetAnswers",
              type: "event",
              args:
                '{"domain":"external","presetAnswers":[{"label":"Bomb on Deck 2","value":" Warning: Explosive device detected in Deck 2. Explosive will detonate in 4 minutes."},{"label":"Eclipse Radiation","value":" Detecting abnormally high levels of radiation: 3 Rads"},{"label":"Eclipse Damage","value":" Heavy damage to engine systems and life support on Eclipse. Estimated time to complete oxygen deprivation: 8 minutes."},{"label":"Orion Course","value":" Orion fighters last detected heading towards the Crateris star system near the Klingon Boarder."},{"label":"Warp trails","value":" Recent warp signature detected leading into Crateris star system"},{"label":"Nebula Map - Probe Needed","value":" Unable to scan for map of nebula. A probe must be launched."},{"label":"Nebula Map","value":" Now generating map of nebula. Map will be displayed on the main viewscreen."},{"label":"Weapons on Battleship: Orion Battleship is equipped with 2 phaser banks and 6 torpedo tubes. Threat level: High"}]}',
              event: "setPresetAnswers",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "3ea67971-1f8c-45f6-b368-d15e2d2605e8",
          name: "Mission Begins",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "daacb3f4-cf91-4212-b3c5-d13b9ae7e69f",
              name: "Send Message",
              type: "event",
              args:
                '{"crew":true,"sender":"USS Vanguard","message":"To: #SIM\\nFrom: USS Vanguard\\n\\n#SIM, we seem to be having some slight problems with our engines. Go ahead and escort the eclipse. We will catch up in about 2 minutes.\\n\\nUSS Vanguard out"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "b544529e-efda-4bb0-ac3d-833425d92afb",
              name: "Processed Data",
              type: "event",
              args:
                '{"domain":"external","data":"This vessel is currently located within the docking bay of the USS Vanguard. External Sensors are offline."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "11028f72-aa8b-49b7-be61-605ebf25b430",
              name: "breakSystem",
              type: "event",
              args: '{"type":"StealthField"}',
              event: "breakSystem",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "84132563-e240-4e71-b1b7-4b90804a4aa9",
          name: "Undocking Instructions",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "31533602-a2ff-4eeb-967b-8de90bba8840",
              name: "Processed Data",
              type: "event",
              args:
                '{"domain":"external","data":"Undocking Instructions:\\n\\n1. Close the airlock doors\\n2. Retract the boarding ramps\\n3. Detach the docking clamps\\n4. Apply up thrusters for 2 seconds\\n5. Apply forward thrusters until clear of docking bay "}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "d64b00c1-9983-4a99-8a57-2b1be4b56c41",
          name: "Undock Thrusters",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "54fbb5bd-7f2b-40e2-9b1d-133cbf40a65c",
              name: "Video",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO1-Odyssey Launch.m4v\\",\\"autoplay\\":true,\\"overlay\\":true,\\"advance\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "52db895a-ae19-4930-a4bb-2eb20a48fa8f",
          name: "Undocked",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "ddca73dd-f6d6-402d-ac97-4fa0698eff4a",
              name: "Processed Data",
              type: "event",
              args:
                '{"domain":"external","data":"This vessel is moving clear of the USS Vanguard. External sensors are coming online."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "89cbc18b-7ea3-471e-8d20-fe6c043ce5b7",
              name: "Auto Viewscreen",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "0678a06a-0447-4c19-82d9-c51481c2d8a3",
          name: "Eclipse Course",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "a99403ae-6db0-4802-9ac2-b159c23cf406",
              name: "Processed Data",
              type: "event",
              args:
                '{"data":"Eclipse is entering a course for Beta Hyades.","domain":"external"}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "0f0a59f5-7d0b-4639-9529-73213012304c",
          name: "Eclipse Engines",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "a587fa68-25cc-46f9-b94e-793ae522fa55",
              name: "Processed Data",
              type: "event",
              args:
                '{"domain":"external","data":"Eclipse has activated warp engines: Warp Factor 5."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "c7589aa9-48d0-40b1-86c5-0d1a8839d874",
              name: "Video",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO2-Eclipse Warp Jump.m4v\\",\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "cb7d185f-9ab8-4188-8eb4-1b2c79359bca",
          name: "Course Set",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "d2251de8-59f0-47e7-ae82-fe3cb94ef5b6",
              name: "Processed Data",
              type: "event",
              args:
                '{"domain":"external","data":"This vessel is now on course to Beta Hyades."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "f1f1533c-40b3-4132-b4cc-835035d5cb44",
          name: "Warp Jump",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "a6c41b33-bf1a-4622-b49b-aa5c59adc598",
              name: "Video",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO3-Warp Jump.m4v\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "dbec6ce1-446f-4fdb-84f9-286090142224",
              name: "Auto Viewscreen",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 6000,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "f9acefff-ffc9-4601-b84d-46b33b9d745e",
          name: "Arrive at Beta Hyades",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "0e127949-8753-48de-bee3-ffe114af4991",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Now approaching destination. Recommend slowing to full stop."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "3871c68a-dab5-4569-a7b6-e54f32146e71",
          name: "Warp Stop",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "477d38c3-08f3-47ef-b336-bc6136fbf8d8",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO4-Warp Stop\\",\\"autoplay\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "b34d395e-8177-46b5-855e-7bdc0b8d5d3d",
          name: "Weapon Deploy/Bomb on Vanguard",
          order: 0,
          description:
            "After arriving at Beta Hyades, the Eclipse prepares the weapon to be deployed. During this time, the SIM gets a message the Vanguard has had some bomb troubles.",
          timelineItems: [
            {
              id: "3831baff-334b-45cc-b80a-2536ae8dd6d3",
              name: "Long Range Message",
              type: "event",
              args:
                '{"crew":true,"sender":"USS Vanguard","message":"TO: USS #SIM\\nFROM: USS Vanguard\\n\\n#SIM, an explosion has just taken out the engines on board the Vanguard! There is a spy on board. They must be trying to get our new weapon. We recommend you scan your own ship for bombs. If you find any you will have to get them off of your ship fast!\\n\\nUSS Vanguard out"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "764c401b-2c1c-4f10-8774-df93e4393a90",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO5-Weapon Prep\\",\\"autoplay\\":true,\\"loop\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "8db7dec6-d6e3-4a61-bade-049b58e8a627",
              name: "processedData",
              type: "event",
              args:
                '{"data":"Eclipse can be seen on the Main Viewscreen, preparing to deploy the weapon.","domain":"external"}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "917349da-014c-49f3-9a73-78643f88b95b",
          name: "Bomb on Sim",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "1134cf8f-017f-4b3b-969c-3829ef5fa5e1",
              name: "Bomb Viewscreen",
              type: "event",
              args:
                '{"component":"ShipView","data":"{\\"ship\\":\\"/Sensor Contacts/Pictures/Bomb\\",\\"name\\":\\"Bomb Detected\\",\\"text\\":\\"\\\\nAn armed bomb has been detected on Deck 2. Estimated time to detonation: 4 minutes.\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "60b835f2-9bac-4449-9b78-ca2692f51c3b",
          name: "Ships Approaching",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "dac391ed-26e7-4fe8-8794-f324abae848e",
              name: "updateViewscreenComponent",
              type: "event",
              args: '{"component":"RedAlert"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "dded6b20-6ee0-4b43-aa20-d217cbe66eb6",
              name: "processedData",
              type: "event",
              args:
                '{"data":"Warning! Three Orion Pirate fighters have entered the system, heading towards the Eclipse.","domain":"external"}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "5e1e6286-3b45-490d-8df6-9c52ecd072c2",
          name: "Fighter Video",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "98946f61-ee78-4be6-b23e-b4da8a2cad4b",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"overlay\\":true,\\"autoplay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO6-Fighter Attack\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "03d1dac7-eb81-4589-905a-0c67a5f61f73",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Fighters are engaging the Eclipse. Fighters are equipped with 1 phaser and 1 torpedo launcher."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "75d0a42a-09ca-48ea-9bfe-09982cf1c8b5",
              name: "processedData",
              type: "event",
              args:
                '{"data":"Two objects have been transported off of the Eclipse to one of the Orion fighters.","domain":"external"}',
              event: "processedData",
              delay: 10000,
              __typename: "TimelineItem",
            },
            {
              id: "a9686cf8-66b9-40c7-9a0f-06760d073f9f",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"sender":"USS Eclipse","message":"To: USS #SIM\\nFrom: USS Eclipse\\n\\n#SIM, we need your help! We are under attack! We have lost engines and all life support systems. We have 70 people on board. #SIM, we need your help! Can you transport us, or get the Vanguard out here to rescue us? We need your help!\\n\\nUSS Eclipse out"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "3823b396-f4a1-404e-b090-c606b70a780a",
              name: "breakSystem",
              type: "event",
              args: '{"type":"Shield"}',
              event: "breakSystem",
              delay: 9000,
              __typename: "TimelineItem",
            },
            {
              id: "99890a02-592e-4d33-9532-2750d8706abd",
              name: "breakSystem",
              type: "event",
              args: '{"type":"Thrusters"}',
              event: "breakSystem",
              delay: 16000,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "b09d7f2f-89e5-4367-bf64-260300f16c50",
          name: "Fighers Flee",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "f45718b4-e2fb-4dea-b6a2-a3d419a3a1b8",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO7-Fighter Flee\\",\\"autoplay\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "15a9c7aa-550b-4a3c-9cb6-a5c7f3436b07",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: Nautilus Station\\n\\n#SIM, we just received a distress call from the Eclipse. They need help! A spy has disabled the engines on the Vanguard. You have to help the Eclipse! Is there some way you could bring them back to Nautilus Station?\\n\\nNautilus Station out ","sender":"Nautilus Station"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "324facf2-9388-4731-a4d0-8ad0d5fa3b7c",
          name: "Eclipse Call",
          order: 0,
          description:
            "The Eclipse calls the SIM to ask them to scan for damage to their ship. The scan response is in the preset scan answers. Once they get the answer, they need to realize that the Eclipse has to be taken to the Nautilus Station with the Tractor Beam",
          timelineItems: [
            {
              id: "e7da59d1-11d3-40d1-8bac-0df45b8727cd",
              name: "setViewscreenToAuto",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO8-Eclipse Damage\\",\\"autoplay\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "401deeb5-b887-4a8c-90cf-53bb7919ec9d",
              name: "addShortRangeComm",
              type: "event",
              args: '{"signalName":"Starfleet"}',
              event: "addShortRangeComm",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "e8f83ab5-3a5a-417f-9ec0-b3de94a3dab4",
          name: "Tractor Beam Activated",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "57147dae-478a-494e-ad21-fd4517dcbe34",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO9-Tractor Beam\\",\\"overlay\\":true,\\"autoplay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "45680934-0052-43b3-a1c6-90eb0d7badcc",
          name: "Warp Jump",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "49b251f4-3115-4478-a72e-580b18c81e62",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO3-Warp Jump\\",\\"autoplay\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "9da1244d-858d-4d53-baeb-34df7985df8c",
          name: "Stars",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "7e2bc6eb-372a-4371-93bd-c3eee21003a1",
              name: "setViewscreenToAuto",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "6273e9d8-8e2d-41f5-a0f4-b6fdb9dea8c9",
          name: "Engines Overheating",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "ce1cc631-e4c7-440d-bf33-b9738c84e995",
              name: "updateViewscreenComponent",
              type: "event",
              args: '{"component":"Overheating"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "6575d99d-228c-44f2-8d7d-48fb01c6ac0d",
              name: "processedData",
              type: "event",
              args:
                '{"data":"Warning! Engines are overheating. Engines will explode in 4 minutes."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "5ab206c2-6d57-42ef-8c2f-84a2340aa38d",
          name: "Approaching Station",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "09d344a0-840f-4ef1-9052-d9ca27a1c99c",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Now approaching destination. Recommend slowing to full stop."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "12881b7d-20e5-49e7-a2c2-0e5d712b8b93",
          name: "Warp Stop",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "2c77766a-0b98-4421-b343-1b162a62fa7e",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO4-Warp Stop\\",\\"overlay\\":true,\\"autoplay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "d60c9e8b-c609-4038-88a1-ca4a9a3fc9d9",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO10-Approaching Nautilus Station\\",\\"overlay\\":true,\\"autoplay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 4000,
              __typename: "TimelineItem",
            },
            {
              id: "f306607e-eaa4-4b91-9d3b-9b06907d1b81",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Nautilus Station is transporting lifeforms off of the USS Eclipse."}',
              event: "processedData",
              delay: 10000,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "3fb4109a-fc52-4402-a33e-5ebe9d0dd2cf",
          name: "Call from Nautlius",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "1190e7fc-8be3-451b-8038-f84c0d4b1104",
              name: "setViewscreenToAuto",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "28477eb9-c024-4537-ab41-479f16e3a3b3",
              name: "addShortRangeComm",
              type: "event",
              args: '{"signalName":"Starfleet"}',
              event: "addShortRangeComm",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "77668715-5d70-45a1-937f-4bdb4ad60b90",
          name: "Gemini Torpedo Info",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "b2117174-16e7-4c99-b4a0-c29ab1302d3f",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"ShipView","data":"{\\"ship\\":\\"/Sensor Contacts/Pictures/Gemini Torpedo\\",\\"name\\":\\"Gemini Torpedo\\",\\"text\\":\\"\\\\n===CLASSIFIED===\\\\nClass: Type IV\\\\nPayload: Reverse-Naidon Discharge\\\\nYield: 10^45 Megatons\\\\n\\\\nIt is estimated to have sufficient firepower to obliterate a small planet.\\\\n===CLASSIFIED===\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "d7af6126-d666-45e4-a6fb-79d7918ebc3c",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: USS Vanguard\\n\\n#SIM, did the Eclipse lose the Gemini Torpedos? You must get them back quickly!\\n\\nUSS Vanguard out","sender":"USS Vanguard"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "3852deef-71ce-4da7-a197-560af6addbc1",
          name: "Call done",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "806f7259-c473-41e9-a324-0743b76c0656",
              name: "removeShortRangeComm",
              type: "event",
              args: '{"signalName":"Starfleet"}',
              event: "removeShortRangeComm",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "046113b3-89ab-4573-afd9-16112fa86366",
          name: "Course to Creteris",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "d7af93c5-9425-450d-9d8c-b5382bdd6a44",
              name: "processedData",
              type: "event",
              args:
                '{"data":"This vessel is now on course to the Creteris system.","domain":"external"}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "6cccd9af-3e62-4225-b509-f4ef3b645dda",
          name: "Warp Jump",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "ef407214-9187-4317-a6aa-809dc3c743f3",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO3-Warp Jump\\",\\"overlay\\":true,\\"autoplay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "3f69d60c-7dbd-4901-a9a2-f2e4c16266c7",
              name: "setViewscreenToAuto",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 8000,
              __typename: "TimelineItem",
            },
            {
              id: "d608edb7-35a0-48f7-9680-560f39235bac",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: USS Vanguard\\n\\nDon\'t forget, nobody should know about these torpedos. They are so top secret, you must destroy all Orion Pirates that know about them if you can. Even use the torpedos to destroy all evidence if you have to. Above all, the Klingons cannot find out about the torpedos.\\n\\nUSS Vanguard out","sender":"USS Vanguard"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "43cac110-ce2e-47b7-a9f2-f15d6b806d09",
          name: "Arrive in Creteris",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "712ddaae-656a-4926-8c0b-a62521ef4426",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Now approaching destination. Recommend slowing to full stop."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "b0d75aaf-eed5-40cc-be97-b2053942a6f4",
              name: "processedData",
              type: "event",
              args:
                '{"data":"Detecting a dense nebula. Unable to detect objects within nebula. No other objects detected in the area."}',
              event: "processedData",
              delay: 10000,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "df682d18-6ecf-4731-bb90-985f08db7ec7",
          name: "Probe Launch",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "65e09bdd-2b0f-4b74-9bad-b5cc9dfd01ce",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO11-Probe Launch\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "a6812732-94b6-4fd1-80eb-ee875412c8a6",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: USS Vanguard\\n\\nWhat is your status? Have you found the Orions yet? Where are you? We need to hear from you. If the Orion Pirates have the weapon, you may be able to sneak up on them with your stealth system and transport the weapon while their shields are down.\\n\\nUSS Vanguard out","sender":"USS Vanguard"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "9af20bf6-8727-40d1-8ec0-4fb07f6bd2b8",
          name: "Nebula Navigation",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "c0000910-7881-4172-8e65-b0bde029566a",
              name: "showViewscreenTactical",
              type: "event",
              args: '{"mapId":"43b68842-d7f6-41a9-b233-193735fedf70"}',
              event: "showViewscreenTactical",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "0b1142ed-97ac-4c2a-87f8-4f14f7e8ad31",
          name: "Orion Ships",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "c9919c36-5c2c-41d9-bc8d-005b1078d63e",
              name: "addShortRangeComm",
              type: "event",
              args: '{"signalName":"","frequency":".22"}',
              event: "addShortRangeComm",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "04d706fa-0506-46ce-aaf8-6d13b462f549",
              name: "addShortRangeComm",
              type: "event",
              args: '{"signalName":"","frequency":".3"}',
              event: "addShortRangeComm",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "7224216c-de00-4c00-9d2f-855a75ac1a73",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"Five Orion fighters and one Orion Battleship detected within nebula. Detecting communication signal between fighters and battleship. It may be possible to intercept. Please refer to the Short Range Communications screen."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "68a42851-e25d-4549-9d59-f61b32c9261a",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO12-Bad Guy Ships\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "e7163d2b-ef8a-4943-a199-ed66a377e2b8",
          name: "Comm Intercept",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "bfa31ef1-db8b-451b-a6e3-89b93f9ab821",
              name: "setViewscreenToAuto",
              type: "event",
              args: null,
              event: "setViewscreenToAuto",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "5fd51908-d6dc-43a8-8702-de028eea15db",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: USS Vanguard\\n\\nYou found the pirates? Where are they? How many of them are there? Tell us as soon as you get the torpedos back.\\n\\nUSS Vanguard out","sender":"USS Vanguard"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "38522da5-c451-438b-a639-1b4a5c41bb97",
          name: "Orions Attack!",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "064a6570-8f51-4413-8788-967094e24466",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO13-Bad Guys Attack\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "0a2ea496-fa5d-4724-8a37-bc9cedd9f69b",
              name: "processedData",
              type: "event",
              args:
                '{"domain":"external","data":"This vessel has been detected by Orion ships. This vessel is being targeted."}',
              event: "processedData",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "dd2ca8a9-f523-4f05-bf19-7486c68cea15",
          name: "Internal Damage Video",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "5e2543bb-8afd-4683-9153-0aa5fc3ca114",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO14-Internal Damage\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
            {
              id: "4c0f29ac-aa4a-4c11-a119-38f845f367ae",
              name: "sendLongRangeMessage",
              type: "event",
              args:
                '{"crew":true,"message":"To: USS #SIM\\nFrom: USS Vanguard\\n\\nThe Orions are going where? You need to stop them! You\'re our only hope of stopping the Orion Pirates. Do anything you need to. Just stop the Orions!\\n\\nUSS Vanguard out","sender":"USS Vanguard"}',
              event: "sendLongRangeMessage",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "8262ed14-5fe4-43f8-9ef0-2648675c25fe",
          name: "Battle Footage",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "b1a5f37c-559f-4591-b086-dec023bf83fa",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO15-Bad Guy Fires Guns\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "602cd400-f86e-4979-84cf-475f5b90dd73",
          name: "Battle Footage 2",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "8dc27f58-5fc5-46ce-b8c0-e8dbdcde3935",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"autoplay\\":true,\\"overlay\\":true,\\"asset\\":\\"/Viewscreen/Videos/FO16-Bad Guy Shooting\\"}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "9e957574-57a6-49d0-b68c-bbf610409c7d",
          name: "Big Boom!",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "ad49524f-6f40-4aa5-8710-161d7e96f1fc",
              name: "updateViewscreenComponent",
              type: "event",
              args:
                '{"component":"Video","data":"{\\"asset\\":\\"/Viewscreen/Videos/FO17-Fire Genesis\\",\\"autoplay\\":true,\\"overlay\\":true}"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
        {
          id: "507f1cb6-cf61-44d4-a87d-903f5e7725af",
          name: "Blackout",
          order: 0,
          description: "",
          timelineItems: [
            {
              id: "722238b1-ff39-48af-bf55-1ed2fb89509b",
              name: "updateViewscreenComponent",
              type: "event",
              args: '{"component":"Blackout"}',
              event: "updateViewscreenComponent",
              delay: 0,
              __typename: "TimelineItem",
            },
          ],
          __typename: "TimelineStep",
        },
      ],
      __typename: "Mission",
    },
    ship: {
      legs: false,
      ramps: false,
      clamps: false,
      airlock: false,
      velocity: null,
      radiation: 0.1,
      bridgeCrew: 14,
      extraPeople: 0,
      inventoryLogs: [],
      selfDestructTime: null,
      selfDestructCode: null,
      selfDestructAuto: false,
      remoteAccessCodes: [],
      __typename: "Ship",
    },
    stations: [
      {
        name: "Command",
        cards: [
          {
            name: "Status",
            hidden: false,
            component: "Status",
            __typename: "Card",
          },
          {
            name: "Self Destruct",
            hidden: false,
            component: "SelfDestruct",
            __typename: "Card",
          },
          {
            name: "ComputerCore",
            hidden: false,
            component: "ComputerCore",
            __typename: "Card",
          },
          {
            name: "Roster",
            hidden: false,
            component: "Roster",
            __typename: "Card",
          },
          {
            name: "CRM Fighter",
            hidden: false,
            component: "CrmFighter",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Flight Control",
        cards: [
          {
            name: "Engines",
            hidden: false,
            component: "EngineControl",
            __typename: "Card",
          },
          {
            name: "Thrusters",
            hidden: false,
            component: "Thrusters",
            __typename: "Card",
          },
          {
            name: "Navigation",
            hidden: false,
            component: "Navigation",
            __typename: "Card",
          },
          {
            name: "Docking",
            hidden: false,
            component: "Docking",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Engineering",
        cards: [
          {
            name: "Damage Report",
            hidden: false,
            component: "DamageControl",
            __typename: "Card",
          },
          {
            name: "Damage Teams",
            hidden: false,
            component: "DamageTeams",
            __typename: "Card",
          },
          {
            name: "Coolant",
            hidden: false,
            component: "CoolantControl",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Tactical",
        cards: [
          {
            name: "Targeting",
            hidden: false,
            component: "Targeting",
            __typename: "Card",
          },
          {
            name: "Shields",
            hidden: false,
            component: "ShieldControl",
            __typename: "Card",
          },
          {
            name: "Stealth Field",
            hidden: false,
            component: "StealthField",
            __typename: "Card",
          },
          {
            name: "Tractor Beam",
            hidden: false,
            component: "TractorBeam",
            __typename: "Card",
          },
          {
            name: "Torpedos",
            hidden: false,
            component: "TorpedoLoading",
            __typename: "Card",
          },
          {
            name: "Phasers",
            hidden: false,
            component: "PhaserCharging",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Operations",
        cards: [
          {
            name: "Power Distribution",
            hidden: false,
            component: "PowerDistribution",
            __typename: "Card",
          },
          {
            name: "Cargo Control",
            hidden: false,
            component: "CargoControl",
            __typename: "Card",
          },
          {
            name: "Reactor Control",
            hidden: false,
            component: "ReactorControl",
            __typename: "Card",
          },
          {
            name: "Transporters",
            hidden: false,
            component: "Transporters",
            __typename: "Card",
          },
          {
            name: "Shuttles",
            hidden: false,
            component: "Shuttles",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Sensors",
        cards: [
          {
            name: "Sensors",
            hidden: false,
            component: "Sensors",
            __typename: "Card",
          },
          {
            name: "Scanning",
            hidden: false,
            component: "SensorScans",
            __typename: "Card",
          },
          {
            name: "Probe Construction",
            hidden: false,
            component: "ProbeConstruction",
            __typename: "Card",
          },
          {
            name: "Probe Control",
            hidden: false,
            component: "ProbeControl",
            __typename: "Card",
          },
          {
            name: "Probe Network",
            hidden: false,
            component: "ProbeNetwork",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Comm",
        cards: [
          {
            name: "Short Range Comm",
            hidden: false,
            component: "CommShortRange",
            __typename: "Card",
          },
          {
            name: "Decoding",
            hidden: false,
            component: "CommDecoding",
            __typename: "Card",
          },
          {
            name: "Long Range Comm",
            hidden: false,
            component: "LongRangeComm",
            __typename: "Card",
          },
          {
            name: "Internal Comm",
            hidden: false,
            component: "CommInternal",
            __typename: "Card",
          },
          {
            name: "Signal Jammer",
            hidden: false,
            component: "SignalJammer",
            __typename: "Card",
          },
          {
            name: "Comm Review",
            hidden: false,
            component: "CommReview",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
      {
        name: "Security",
        cards: [
          {
            name: "Deck Control",
            hidden: false,
            component: "SecurityDecks",
            __typename: "Card",
          },
          {
            name: "Security Scans",
            hidden: false,
            component: "SecurityScans",
            __typename: "Card",
          },
          {
            name: "Security Teams",
            hidden: false,
            component: "SecurityTeams",
            __typename: "Card",
          },
          {
            name: "Security Armory",
            hidden: false,
            component: "SecurityArmory",
            __typename: "Card",
          },
          {
            name: "Security Library",
            hidden: false,
            component: "SecurityLibrary",
            __typename: "Card",
          },
        ],
        __typename: "Station",
      },
    ],
    __typename: "Simulator",
  },
];
