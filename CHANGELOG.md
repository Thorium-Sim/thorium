## [1.8.2](https://github.com/Thorium-Sim/thorium/compare/1.8.1...1.8.2) (2019-06-01)


### Bug Fixes

* **Sensors:** Hidden sensors segments now properly reset. Closes [#2250](https://github.com/Thorium-Sim/thorium/issues/2250) ([4618e10](https://github.com/Thorium-Sim/thorium/commit/4618e10))
* **Space EdVentures:** Add the Go to Space EdVentures Token screen action to the action core and to the 'Trigger Action' timeline action. Refs [#2248](https://github.com/Thorium-Sim/thorium/issues/2248) ([be645b8](https://github.com/Thorium-Sim/thorium/commit/be645b8))
* **Space EdVentures:** Adds a timeline action for adding extra crew members to Space EdVentures. Closes [#2248](https://github.com/Thorium-Sim/thorium/issues/2248) ([575bdca](https://github.com/Thorium-Sim/thorium/commit/575bdca))
* **Surveys:** Make it possible to reorder survey form items. Closes [#2247](https://github.com/Thorium-Sim/thorium/issues/2247) ([de655f9](https://github.com/Thorium-Sim/thorium/commit/de655f9))

## [1.8.1](https://github.com/Thorium-Sim/thorium/compare/1.8.0...1.8.1) (2019-05-31)


### Bug Fixes

* **Command Line:** Makes it possible for command line feedback modules to use delayed outputs as their approve or denied output. Closes [#2237](https://github.com/Thorium-Sim/thorium/issues/2237) ([a1af372](https://github.com/Thorium-Sim/thorium/commit/a1af372))
* **Library:** Fixes an issue that threw an error when trying to export library entries. Closes [#2240](https://github.com/Thorium-Sim/thorium/issues/2240) ([c5b506b](https://github.com/Thorium-Sim/thorium/commit/c5b506b))
* **Timeline:** Fixes an issue with loading the Timeline core without a mission selected. ([6be32b6](https://github.com/Thorium-Sim/thorium/commit/6be32b6))

# [1.8.0](https://github.com/Thorium-Sim/thorium/compare/1.7.1...1.8.0) (2019-05-31)


### Bug Fixes

* **Macro:** Fixes a scrolling issue on the macro config screen. Closes [#2238](https://github.com/Thorium-Sim/thorium/issues/2238) ([3935350](https://github.com/Thorium-Sim/thorium/commit/3935350))


### Features

* **Tasks:** Add a sensor scan task, with fuzzy-text maching for auto-verification. Closes [#2239](https://github.com/Thorium-Sim/thorium/issues/2239) ([b76ecd1](https://github.com/Thorium-Sim/thorium/commit/b76ecd1))
* **Timeline Actions:** Make it possible to assign specific stations to certain timeline actions based on simulator and station set. This is configured in the Simulator config and applys to missions, macros, interfaces, command lines, triggers, keyboards, and the macros core. Closes [#2165](https://github.com/Thorium-Sim/thorium/issues/2165) ([e8c2023](https://github.com/Thorium-Sim/thorium/commit/e8c2023))

## [1.7.1](https://github.com/Thorium-Sim/thorium/compare/1.7.0...1.7.1) (2019-05-30)


### Bug Fixes

* **Planetary Scan:** Make the image input for planetary scan a little bit nicer. Closes [#2231](https://github.com/Thorium-Sim/thorium/issues/2231) ([6c94694](https://github.com/Thorium-Sim/thorium/commit/6c94694))
* **Sensor Contacts:** Makes the click area for sensor contacts in the macro config a little bit nicer. Closes [#2232](https://github.com/Thorium-Sim/thorium/issues/2232). ([0bbafd5](https://github.com/Thorium-Sim/thorium/commit/0bbafd5))

# [1.7.0](https://github.com/Thorium-Sim/thorium/compare/1.6.2...1.7.0) (2019-05-29)


### Features

* **Timeline:** Adds simulator mission timeline args. This allows timelines to use data from the simulator in their config, like stations and clients. This also allows for more than two viewscreens to be configured in a single mission. Closes [#2111](https://github.com/Thorium-Sim/thorium/issues/2111). ([7faff7d](https://github.com/Thorium-Sim/thorium/commit/7faff7d))

## [1.6.2](https://github.com/Thorium-Sim/thorium/compare/1.6.1...1.6.2) (2019-05-28)


### Bug Fixes

* **Build:** Fixes the build process. ([d31e173](https://github.com/Thorium-Sim/thorium/commit/d31e173))

## [1.6.1](https://github.com/Thorium-Sim/thorium/compare/1.6.0...1.6.1) (2019-05-27)


### Bug Fixes

* **Build:** Fixes an issue with the build process that made the environment variables not usable. ([71669e7](https://github.com/Thorium-Sim/thorium/commit/71669e7))
* **Software Panels:** Fixes an issue that makes software panels inoperable. ([9bbfc8b](https://github.com/Thorium-Sim/thorium/commit/9bbfc8b))

# [1.6.0](https://github.com/Thorium-Sim/thorium/compare/1.5.0...1.6.0) (2019-05-25)

### Bug Fixes

- **CoreFeed:** Fixes a layout issue with the core feed and tractor beam core.
  Closes [#2119](https://github.com/Thorium-Sim/thorium/issues/2119)
  ([33ee6c8](https://github.com/Thorium-Sim/thorium/commit/33ee6c8))

### Features

- **Core Layouts:** Add the ability to export and import core layouts from the
  core. Closes [#2017](https://github.com/Thorium-Sim/thorium/issues/2017)
  ([419038e](https://github.com/Thorium-Sim/thorium/commit/419038e))
- **Engines:** Max engine speed is now shown on the systems core. Closes
  [#2166](https://github.com/Thorium-Sim/thorium/issues/2166)
  ([159b539](https://github.com/Thorium-Sim/thorium/commit/159b539))
- **Interfaces:** Add the ability to assign interfaces as cards to stations.
  Closes [#2162](https://github.com/Thorium-Sim/thorium/issues/2162)
  ([c59a604](https://github.com/Thorium-Sim/thorium/commit/c59a604))
- **Interfaces:** Adds interfaces as an option for set configs. Closes
  [#2163](https://github.com/Thorium-Sim/thorium/issues/2163)
  ([92ce479](https://github.com/Thorium-Sim/thorium/commit/92ce479))
- **Surveys:** Adds ability to export and import surveys.
  ([16fda93](https://github.com/Thorium-Sim/thorium/commit/16fda93))
- **Surveys:** Adds the ability to transmit survey data to Google Sheets. See
  the documentation page on https://thoriumsim.com/docs/forms_google_sheets for
  more information.
  ([772a0f0](https://github.com/Thorium-Sim/thorium/commit/772a0f0))

# [1.5.0](https://github.com/Thorium-Sim/thorium/compare/1.4.2...1.5.0) (2019-05-24)

### Bug Fixes

- **Client:** Cracks no longer persist between flights. Closes
  [#2204](https://github.com/Thorium-Sim/thorium/issues/2204)
  ([34ed08b](https://github.com/Thorium-Sim/thorium/commit/34ed08b))
- **Decoding:** Fixes the decoding output field not scrolling. Closes
  [#2183](https://github.com/Thorium-Sim/thorium/issues/2183)
  ([71e7a4a](https://github.com/Thorium-Sim/thorium/commit/71e7a4a))
- **Layout:** Fixes a layout issue with the checkboxes for setting optimal
  speed. Closes [#2206](https://github.com/Thorium-Sim/thorium/issues/2206)
  ([b61aa11](https://github.com/Thorium-Sim/thorium/commit/b61aa11))
- **Messaging:** Fixes scrolling on the old messaging core. Closes
  [#2177](https://github.com/Thorium-Sim/thorium/issues/2177)
  ([f2b3607](https://github.com/Thorium-Sim/thorium/commit/f2b3607))
- **Notifications:** Adds a proper notification type for Internal Comm. Closes
  [#2193](https://github.com/Thorium-Sim/thorium/issues/2193)
  ([812e9ad](https://github.com/Thorium-Sim/thorium/commit/812e9ad))
- **Shields:** Adds a limit to how often you can change the shield frequencies.
  Closes [#2172](https://github.com/Thorium-Sim/thorium/issues/2172)
  ([1be401f](https://github.com/Thorium-Sim/thorium/commit/1be401f))
- **Systems:** Fixes an issue where not having a proper reactor breaks the
  systems core. Closes
  [#2194](https://github.com/Thorium-Sim/thorium/issues/2194)
  ([a4f47a4](https://github.com/Thorium-Sim/thorium/commit/a4f47a4))
- **Timeline:** Fix scrolling for timeline actions. Closes
  [#2213](https://github.com/Thorium-Sim/thorium/issues/2213)
  ([a2e3706](https://github.com/Thorium-Sim/thorium/commit/a2e3706))
- **Triggers:** Fixes the 'sendLongRangeComm' trigger. Closes
  [#2184](https://github.com/Thorium-Sim/thorium/issues/2184)
  ([24f122a](https://github.com/Thorium-Sim/thorium/commit/24f122a))

### Features

- **Viewscreen:** Add a Picture viewscreen for full-screen images. Closes
  [#2207](https://github.com/Thorium-Sim/thorium/issues/2207)
  ([036517a](https://github.com/Thorium-Sim/thorium/commit/036517a))

## [1.4.2](https://github.com/Thorium-Sim/thorium/compare/1.4.1...1.4.2) (2019-05-22)

### Bug Fixes

- **Ambiance:** Cancelling looping sounds doesn't stop ambiance anymore. Closes
  [#2208](https://github.com/Thorium-Sim/thorium/issues/2208)
  ([dd3aea5](https://github.com/Thorium-Sim/thorium/commit/dd3aea5))
- **Probe Control:** The missing probe query response box is now back.
  ([2923550](https://github.com/Thorium-Sim/thorium/commit/2923550))
- **THX:** Makes it so certain ship images don't overlay on top of the THX
  activate button. Fixes
  [#2209](https://github.com/Thorium-Sim/thorium/issues/2209).
  ([f3b1be7](https://github.com/Thorium-Sim/thorium/commit/f3b1be7))

## [1.4.1](https://github.com/Thorium-Sim/thorium/compare/1.4.0...1.4.1) (2019-05-18)

### Bug Fixes

- **Build:** Fixes an issue with the automated build process.
  ([6902c0d](https://github.com/Thorium-Sim/thorium/commit/6902c0d))

# [1.4.0](https://github.com/Thorium-Sim/thorium/compare/1.3.0...1.4.0) (2019-05-18)

### Bug Fixes

- **Command Line:** Fixes an issue that prevented the release of 1.4.1.
  ([2323644](https://github.com/Thorium-Sim/thorium/commit/2323644))
- **Macros:** Corrected wording of removing a trigger macro
  ([0e76e8b](https://github.com/Thorium-Sim/thorium/commit/0e76e8b))
- **Probes:** Add training mode fixtures for the science probes.
  ([6b38cad](https://github.com/Thorium-Sim/thorium/commit/6b38cad)), closes
  [#2182](https://github.com/Thorium-Sim/thorium/issues/2182)
- **Reactor:** Fixes issues with changing the reactor efficiencies.
  ([3a17289](https://github.com/Thorium-Sim/thorium/commit/3a17289)), closes
  [#2187](https://github.com/Thorium-Sim/thorium/issues/2187)
- **Stars:** Improvements to the stars viewscreen.
  ([1a2df84](https://github.com/Thorium-Sim/thorium/commit/1a2df84))
- **Status:** Fixes dilithium stress subscription.
  ([8a531e6](https://github.com/Thorium-Sim/thorium/commit/8a531e6)), closes
  [#2186](https://github.com/Thorium-Sim/thorium/issues/2186)
- **Survey:** Improves the layout of the survey card and core.
  ([7a0e68e](https://github.com/Thorium-Sim/thorium/commit/7a0e68e))
- **Surveys:** Changes the surveyform core to start surveys with a 'Go' button.
  ([6ef166d](https://github.com/Thorium-Sim/thorium/commit/6ef166d))
- **Tactical Maps:** Fixes an error that crashed videos on tactical maps. Closes
  [#2197](https://github.com/Thorium-Sim/thorium/issues/2197)
  ([44b7547](https://github.com/Thorium-Sim/thorium/commit/44b7547))
- **Thrusters:** Fixes memory leak with the thrusters card.
  ([e2268c9](https://github.com/Thorium-Sim/thorium/commit/e2268c9))
- **translations:** Add additional French translations
  ([93d7e59](https://github.com/Thorium-Sim/thorium/commit/93d7e59))
- **Viewscreen:** Fixes the stealth monitoring viewscreen. Closes
  [#2195](https://github.com/Thorium-Sim/thorium/issues/2195)
  ([23a88ba](https://github.com/Thorium-Sim/thorium/commit/23a88ba))

### Features

- **AuxTimeline:** Add Auxiliary Timeline core
  ([db93011](https://github.com/Thorium-Sim/thorium/commit/db93011))
- **Command Line:** Add a Command Line core.
  ([bf99677](https://github.com/Thorium-Sim/thorium/commit/bf99677))
- **Command Line:** Add a delayed output command that prints each line of output
  one at a time,each after a short delay.
  ([a9bc02f](https://github.com/Thorium-Sim/thorium/commit/a9bc02f))
- **Command Line:** Add ability to view library entry slugs and connect them to
  the removeLibraryEntry action.
  ([0c582ca](https://github.com/Thorium-Sim/thorium/commit/0c582ca))
- **Command Line:** Add support for multiple command line arguments.
  ([8e679cb](https://github.com/Thorium-Sim/thorium/commit/8e679cb))
- **Command Line:** Command line sessions are now persisted between card
  changes. ([8a7e575](https://github.com/Thorium-Sim/thorium/commit/8a7e575))
- **Macro:** Add macros for hiding and un-hiding cards on the simulator.
  ([c76cf21](https://github.com/Thorium-Sim/thorium/commit/c76cf21))

# [1.4.0](https://github.com/Thorium-Sim/thorium/compare/1.3.0...1.4.0) (2019-05-18)

### Bug Fixes

- **Macros:** Corrected wording of removing a trigger macro
  ([0e76e8b](https://github.com/Thorium-Sim/thorium/commit/0e76e8b))
- **Probes:** Add training mode fixtures for the science probes.
  ([6b38cad](https://github.com/Thorium-Sim/thorium/commit/6b38cad)), closes
  [#2182](https://github.com/Thorium-Sim/thorium/issues/2182)
- **Reactor:** Fixes issues with changing the reactor efficiencies.
  ([3a17289](https://github.com/Thorium-Sim/thorium/commit/3a17289)), closes
  [#2187](https://github.com/Thorium-Sim/thorium/issues/2187)
- **Stars:** Improvements to the stars viewscreen.
  ([1a2df84](https://github.com/Thorium-Sim/thorium/commit/1a2df84))
- **Status:** Fixes dilithium stress subscription.
  ([8a531e6](https://github.com/Thorium-Sim/thorium/commit/8a531e6)), closes
  [#2186](https://github.com/Thorium-Sim/thorium/issues/2186)
- **Survey:** Improves the layout of the survey card and core.
  ([7a0e68e](https://github.com/Thorium-Sim/thorium/commit/7a0e68e))
- **Surveys:** Changes the surveyform core to start surveys with a 'Go' button.
  ([6ef166d](https://github.com/Thorium-Sim/thorium/commit/6ef166d))
- **Tactical Maps:** Fixes an error that crashed videos on tactical maps. Closes
  [#2197](https://github.com/Thorium-Sim/thorium/issues/2197)
  ([44b7547](https://github.com/Thorium-Sim/thorium/commit/44b7547))
- **Thrusters:** Fixes memory leak with the thrusters card.
  ([e2268c9](https://github.com/Thorium-Sim/thorium/commit/e2268c9))
- **translations:** Add additional French translations
  ([93d7e59](https://github.com/Thorium-Sim/thorium/commit/93d7e59))
- **Viewscreen:** Fixes the stealth monitoring viewscreen. Closes
  [#2195](https://github.com/Thorium-Sim/thorium/issues/2195)
  ([23a88ba](https://github.com/Thorium-Sim/thorium/commit/23a88ba))

### Features

- **AuxTimeline:** Add Auxiliary Timeline core
  ([db93011](https://github.com/Thorium-Sim/thorium/commit/db93011))
- **Command Line:** Add a Command Line core.
  ([bf99677](https://github.com/Thorium-Sim/thorium/commit/bf99677))
- **Command Line:** Add a delayed output command that prints each line of output
  one at a time,each after a short delay.
  ([a9bc02f](https://github.com/Thorium-Sim/thorium/commit/a9bc02f))
- **Command Line:** Add ability to view library entry slugs and connect them to
  the removeLibraryEntry action.
  ([0c582ca](https://github.com/Thorium-Sim/thorium/commit/0c582ca))
- **Command Line:** Add support for multiple command line arguments.
  ([8e679cb](https://github.com/Thorium-Sim/thorium/commit/8e679cb))
- **Command Line:** Command line sessions are now persisted between card
  changes. ([8a7e575](https://github.com/Thorium-Sim/thorium/commit/8a7e575))
- **Macro:** Add macros for hiding and un-hiding cards on the simulator.
  ([c76cf21](https://github.com/Thorium-Sim/thorium/commit/c76cf21))

# [1.4.0](https://github.com/Thorium-Sim/thorium/compare/1.3.0...1.4.0) (2019-05-18)

### Bug Fixes

- **Macros:** Corrected wording of removing a trigger macro
  ([0e76e8b](https://github.com/Thorium-Sim/thorium/commit/0e76e8b))
- **Probes:** Add training mode fixtures for the science probes.
  ([6b38cad](https://github.com/Thorium-Sim/thorium/commit/6b38cad)), closes
  [#2182](https://github.com/Thorium-Sim/thorium/issues/2182)
- **Reactor:** Fixes issues with changing the reactor efficiencies.
  ([3a17289](https://github.com/Thorium-Sim/thorium/commit/3a17289)), closes
  [#2187](https://github.com/Thorium-Sim/thorium/issues/2187)
- **Stars:** Improvements to the stars viewscreen.
  ([1a2df84](https://github.com/Thorium-Sim/thorium/commit/1a2df84))
- **Status:** Fixes dilithium stress subscription.
  ([8a531e6](https://github.com/Thorium-Sim/thorium/commit/8a531e6)), closes
  [#2186](https://github.com/Thorium-Sim/thorium/issues/2186)
- **Survey:** Improves the layout of the survey card and core.
  ([7a0e68e](https://github.com/Thorium-Sim/thorium/commit/7a0e68e))
- **Surveys:** Changes the surveyform core to start surveys with a 'Go' button.
  ([6ef166d](https://github.com/Thorium-Sim/thorium/commit/6ef166d))
- **Tactical Maps:** Fixes an error that crashed videos on tactical maps. Closes
  [#2197](https://github.com/Thorium-Sim/thorium/issues/2197)
  ([44b7547](https://github.com/Thorium-Sim/thorium/commit/44b7547))
- **Thrusters:** Fixes memory leak with the thrusters card.
  ([e2268c9](https://github.com/Thorium-Sim/thorium/commit/e2268c9))
- **translations:** Add additional French translations
  ([93d7e59](https://github.com/Thorium-Sim/thorium/commit/93d7e59))
- **Viewscreen:** Fixes the stealth monitoring viewscreen. Closes
  [#2195](https://github.com/Thorium-Sim/thorium/issues/2195)
  ([23a88ba](https://github.com/Thorium-Sim/thorium/commit/23a88ba))

### Features

- **AuxTimeline:** Add Auxiliary Timeline core
  ([db93011](https://github.com/Thorium-Sim/thorium/commit/db93011))
- **Command Line:** Add a Command Line core.
  ([bf99677](https://github.com/Thorium-Sim/thorium/commit/bf99677))
- **Command Line:** Add a delayed output command that prints each line of output
  one at a time,each after a short delay.
  ([a9bc02f](https://github.com/Thorium-Sim/thorium/commit/a9bc02f))
- **Command Line:** Add ability to view library entry slugs and connect them to
  the removeLibraryEntry action.
  ([0c582ca](https://github.com/Thorium-Sim/thorium/commit/0c582ca))
- **Command Line:** Add support for multiple command line arguments.
  ([8e679cb](https://github.com/Thorium-Sim/thorium/commit/8e679cb))
- **Command Line:** Command line sessions are now persisted between card
  changes. ([8a7e575](https://github.com/Thorium-Sim/thorium/commit/8a7e575))
- **Macro:** Add macros for hiding and un-hiding cards on the simulator.
  ([c76cf21](https://github.com/Thorium-Sim/thorium/commit/c76cf21))

# [1.3.0](https://github.com/Thorium-Sim/thorium/compare/1.2.18...1.3.0) (2019-05-14)

### Bug Fixes

- **LRComm:** Add ability to delete messages.
  ([2ef61a1](https://github.com/Thorium-Sim/thorium/commit/2ef61a1)), closes
  [#2159](https://github.com/Thorium-Sim/thorium/issues/2159)

### Features

- **build:** Improves the build and release process
  ([f1cdf6f](https://github.com/Thorium-Sim/thorium/commit/f1cdf6f))
- **Docking:** Added Landing Legs
  ([#2174](https://github.com/Thorium-Sim/thorium/issues/2174))
  ([e3f2ce9](https://github.com/Thorium-Sim/thorium/commit/e3f2ce9))
- **Macros:** Macro of macros
  ([077ff8b](https://github.com/Thorium-Sim/thorium/commit/077ff8b))

# [1.2.19](https://github.com/Thorium-Sim/thorium/compare/1.2.18...1.2.19)

### Bug Fixes

- Viewscreen targets an individual viewscreen instead of every viewscreen on a
  simulator.
- Fixed a minor weirdness with the clear layout.
- Cancelled loopings sounds no longer stops non-looping sounds.
- Improves visibility of the reactivation code when entered.
- Fixes scrolling issues on the Battle Core.
- Fixes an issue with incorrect passwords on generated damage report steps.
- Improves how engines handle sending notifications when broken or power is
  removed.
- Fixes issues with adjusting the reactor power levels.
- Fixes incorrect display of trigger macro.
- Improves the playSound macro.

# [1.2.18](https://github.com/Thorium-Sim/thorium/compare/1.2.17...1.2.18)

### Bug Fixes

- Fixes an issue where interface switches can't be connected.
- Making a client go online removes the hypercard on that client.
- Fixes an issue where the nudge doesn't work after changing the speed of the
  contacts.
- Notifications no longer appear on blacked out stations.
- Shows all of the probes in a scrolling list when there are many.
- Made the internal comm overlay show up on the proper layer.
- Fixes an issue with the handheld scanner core.
- Improvements to Space EdVentures.

### Features

- Adds the CRM-114. This is a fighter system where each client with the card has
  it's own fighter to destroy contacts around the ship. Use the 'CrmFighter'
  card on a single station or use the 'Crm' card to allow the crew to activate
  the fighter card as a hypercard on any station.

# [1.2.17](https://github.com/Thorium-Sim/thorium/compare/1.2.16...1.2.17)

### Bug Fixes

- Fixes a situation where auto-viewscreen can crash the server.
- Fixes issues with using auto-advancing features with the timeline thumbnail
  core. Note: The timeline thumbnail core will now highlight the current
  timeline step, but the standard timeline core will show the next timeline
  step.
- Fixes an issue where very tall images on the ship view viewscreen go out of
  bounds.
- Fixes an issue where adjusting the volume on the play sound macro causes jank.
- Fixes an issue where running the stop looping sound macro twice will stop all
  sounds.
- Fixes an issue with the reactor task definition.
- Fixes an issue where radiation doesn't properly update.
- Enable the return and delete keys for keyboard actions.
- The kiosk can now play sounds attached to command + q, command + w, and
  command + r.
- Fixes a graphical issue with software panels toggle switches.
- Fixes an issue where sparks never stop.
- Add more blocks in place to make sure the tractor beam doesn't go out of
  bounds.
- Fixes issues with engine buttons.
- Fixes an issue where inventory items cannot be added.

### Features

- Adds a 'Reject Task Verification' button to the tasks core.
- Particle Detector core now persists the types of each line.

# [1.2.16](https://github.com/Thorium-Sim/thorium/compare/1.2.15...1.2.16)

### Features

- Adds colors to the buttons on interfaces.
- Makes it so interface switches aren't required to have labels.

# [1.2.15](https://github.com/Thorium-Sim/thorium/compare/1.2.14...1.2.15)

### Features

- Add the ability to right click on Interface, Command Line, and Trigger
  canvases to pan the canvas.
- Add the ability to set the autoPlay and looping of Interface videos.
- Added a macro for toggling interface videos playing.
- Makes interfaces stick around after a simulator is reset.

# [1.2.14](https://github.com/Thorium-Sim/thorium/compare/1.2.13...1.2.14)

### Features

- Adds the Interfaces feature, which allows Flight Directors to use buttons,
  toggle switches, images, and videos to create their own interactive user
  interfaces for crew stations.

# [1.2.13](https://github.com/Thorium-Sim/thorium/compare/1.2.12...1.2.13)

### Bug Fixes

- Fixes an issue where the transporter speed cannot be changed.
- Fixes an issue where action commands cannot be sent to viewscreens.
- Sound effects now only play in the simulator they are supposed to play in.
- Send to sensors for the timer now properly pluralizes the unit of time.
- Fixes an issue where the tactical map video speed cannot be changed.
- Improves the text of some sensor scan preset answers.
- Improves the layout of the dilithium stress core.
- Improves the layout of the computer core core component.

### Features

- Adds support for each open window becoming its own client. This allows for
  multiple stations to be assigned on the same computer without opening
  incognito tabs or additional browsers. It keeps track of the clientIDs that
  you assign to windows in the order which they are opened. It also works really
  well with the new Thorium Kiosk, which appends the window number to the end of
  the client name.

# [1.2.12](https://github.com/Thorium-Sim/thorium/compare/1.2.11...1.2.12)

### Bug Fixes

- Removes weird Sound Player text on the viewscreen.
- Transwarp cannot be activated when damaged or there isn't enough power.
- Looping sounds are now cancelled when the flight is reset.

# [1.2.11](https://github.com/Thorium-Sim/thorium/compare/1.2.10...1.2.11)

### Bug Fixes

- Fixed setting secondary viewscreens to auto.
- Fixes issues with updating timeline steps.
- Fixes issues with adding inventory to rooms.
- Fixes the core feed messaging filter.
- Properly loads the correct step name when configuring mission timeline steps.
- Fixes a minor issue with the communications viewscreen.
- Fixes issues with the army contacts macro.

### Features

- Adds a collapse all button to the core feed.
- Add a brief note to the login training about the objectives widget.
- Allows auto thrusters to rotate the sensor grid with yaw.
- Makes it possible to turn keyboards and viewscreens into sound players, just
  like the sound player station.
- Adds a 'Course set' scan preset. Thanks @JordanDeSmith.

# [1.2.10](https://github.com/Thorium-Sim/thorium/compare/1.2.8...1.2.10)

### Bug Fixes

- You can now remove survey form fields.
- Fixes issues with dropdown and checkbox survey form fields.
- Fixes an issue where you cannot change sensor contact size.
- Fixes issues with setting sickbay bunks.
- Make it possible to update library types.
- Fixes issues with setting the crew count on station set configs.

# [1.2.8](https://github.com/Thorium-Sim/thorium/compare/1.2.6...1.2.8)

### Bug Fixes

- The count on the simulator inventory config now shows the total count of the
  inventory item.
- Fixes an issue where certain events that alter the viewscreen cause a server
  crash.
- Add crack and uncrack to the actions macro.
- Change the default for reactors to not be on external power, since clamps
  default to not docked and many missions start in space.
- Fixes changing the heat rate in the systems config.
- Fixes the wrapping on the timeline step display.

### Features

- Add a macro for sending notifications to core.
- If a system has more power in it than is necessary, it changes the system's
  color to yellow to indicate a problem.
- Makes it possible to print multi-page cypher messages and change the header.

# [1.2.6](https://github.com/Thorium-Sim/thorium/compare/1.2.5...1.2.6)

### Bug Fixes

- Fixes reactor efficiencies not updating on the config screen.
- Fixes issues around playing sounds through the actions core and actions macro.
- Fixes issues with the keypad core not allowing the required code to be
  changed.

### Features

- Add a task definition for changing the reactor efficiency.

# [1.2.5](https://github.com/Thorium-Sim/thorium/compare/1.2.4...1.2.5)

### Bug Fixes

- Fixes an issue where you couldn't change the viewscreen from the core.
- Fixes issues with ambiance not being removable.
- Fixes changing the reactor output in the simulator config.
- Fixes changing the delay when writing timeline steps.
- All currently playing sounds on the sound player are now removed when the
  flight is reset.
- Fixes the alert condition card.
- Remove the LayoutDefault.
- Fixes adding decks and rooms in the simulator config.
- Fixes tactical map toggles for flash, WASD, etc.
- Fixes the alert level selector in the simulator config.
- Removes a hover state on the station description field.
- Properly updates the name of the system in the list on the system config
  screen.
- Fixes the targeting coordinates buttons.
- If phaser charging exists on the same station, it will only show phaser firing
  on the targeting screen.
- Fixes hold to charge phasers on targeting.
- Fixes tactical maps not loading correctly.

# [1.2.4](https://github.com/Thorium-Sim/thorium/compare/1.2.3...1.2.4)

### Bug Fixes

- Removes an errant log that was showing up in the command line.
- Disables sending buttons on the message sending screen when the message is in
  transit.
- Fixes jumping to arbitrary timeline steps.
- Fixes the self destruct code on core.
- Fixes changing the dilithium stress rate.
- Fixes changing alert condition from core.
- Fixes adding cargo and items to the armory.
- Fixes resetting a flight with a macro.
- Fixes changing the speeds on thrusters.
- Fixes changing ship radiation.
- Fixes changing values for the reactor.
- Fixes setting the tractor beam stress.
- Fixes a crash when probe network probes are deleted.

### Features

- Makes it possible to change the opacity of planets, borders, and pings.
- Adds a label to to the contact info box on Sensors.

# [1.2.3](https://github.com/Thorium-Sim/thorium/compare/1.2.2...1.2.3)

### Bug Fixes

- Make it so Tactical Map items speed can change.
- Fixes the font size adjustment for tactical map items.
- Better illustration of how the engine buttons are temporarily disabled on the
  engine control screen right after a button is pushed.
- Fixes issues with the size and color of planets not being changable.
- Automatically generated damage reports no longer require more damage team
  members than are available on the ship.
- Widgets now hide when the station is offlined.
- Fixes an issue where looping sounds won't cancel.

### Features

- Adds a notification when power is taken out of the stealth field.

# [1.2.2](https://github.com/Thorium-Sim/thorium/compare/1.2.1...1.2.2)

### Bug Fixes

- Fixes issues with software panels

# [1.2.1](https://github.com/Thorium-Sim/thorium/compare/1.2.0...1.2.1)

### Bug Fixes

- Fixes an issue where keyboards cannot be assigned.

# [1.2.0](https://github.com/Thorium-Sim/thorium/compare/1.1.17...1.2.0)

### Bug Fixes

- Fixes an issue where command line commands don't work.
- Fixes an issue with scrolling on the tactical maps screen.
- Reactivation code buttons now match what is shown on the damage report screen.
- Makes selected buttons easier to see on ShipStation layout.
- Fixes issues with viewscreens not properly updating.
- The card switcher is now locked with thrusters are being adjusted.
- Fix a bunch of problems with triggers.
- Fixes the issue with damage report formatting.
- Fixes issues with the self destruct screen.
- Fixes an issue where the subspace field power isn't correct when Thorium first
  starts.
- Make it possible to edit the user list on the computer core.
- The stealth field will no longer be activated if the system is damaged.
- Fixes a couple of issues that pop up in timelines sometime.

### Features

- Updates external package dependencies to the latest version.
- Improves the back-end developer experience so new developers can work on
  Thorium better.
- Add all existing macros to command line and triggers.
- Add a notification explaining the alert condition cooldown.
- Make it possible to allow crew members to check off their own objectives.
- Make it possible to specify the position of docking ports on the ship image
  when configuring them. The docking port positions appear on the docking port
  screen.
- Make it possible to specify screens for mobile devices in set configurations.
- Make it possible to specify a viewscreen as secondary in a set config.
- Make it possible to configure task macros as part of a task template.
- Make it so long range comms can be partially decoded if the waves aren't
  totally lined up.
- Adds the ability to damage exocomps, including task report generation for
  exocomps.
- Adds a new core which shows thumbnails of the timeline items that change the
  viewscreen.
- Adds a command line widget.
- Make it so you can use the sensors history with the full-page sensors grid and
  scans card.
- Adds additional fields to the ship core to better illustrate the ship's
  population.
- Crew clicking on notifications will now properly open relevant widgets.
- Add a label to indicate what the green text on the timeline means.
- Add training for messaging.
- Add training for the medical roster.
- Add a notification for incoming internal calls.
- Adds notifications for security deck doors and evac.
- Makes it possible to connect multiple mobile devices of the same name.
- Add a crack action for overlaying a glass crack effect on any card. Use the
  Actions Core to enable it on individual stations.

# [1.1.17](https://github.com/Thorium-Sim/thorium/compare/1.1.16...1.1.17)

### Bug Fixes

- Fixes an issue where servers can crash when flights are deleted.
- Command line screen now takes up more available space.
- Fixes the sensors core scrolling when using history.

# [1.1.16](https://github.com/Thorium-Sim/thorium/compare/1.1.15...1.1.16)

### Bug Fixes

- Fixes an issue where the coolant screen doesn't appear correctly.

### Features

# [1.1.15](https://github.com/Thorium-Sim/thorium/compare/1.1.14...1.1.15)

### Bug Fixes

- Fix some scrolling issues on the viewscreen core layout.
- Fixes an issue where actions from the actions core sometimes don't work.
- Fixes an issue where the tractor beam bars go off the screen.
- Updates engines so they display their name more sensibly. This might require
  an update where the display name is corrected on the engines config.

### Features

- Add widgets for Engineering reports and R&D Reports.
- Adds the ability to trigger a warning if the power is left unbalanced.
  Configure it on the reactor system config.
- Adds a warning to the crew if their reactor overheats.
- Improves the color of the text on the reactor control screen when the power is
  imbalanced.

# [1.1.14](https://github.com/Thorium-Sim/thorium/compare/1.1.13...1.1.14)

### Bug Fixes

- Fixes weird scrolling on new messaging core.
- Makes it possible to scroll the torpedo control on the targeting screen when
  there are many torpedo launchers.
- Adds a fix where shuttles and docking ports are properly created when a flight
  is started.
- Attempts to fix an issue with new lines on the damage report card.

### Features

- Add notifications that the engines stopped when power is removed or the system
  is damaged.
- Add a '0 default power' button to the systems config screen so systems can be
  configured to start with no power.

# [1.1.13](https://github.com/Thorium-Sim/thorium/compare/1.1.12...1.1.13)

### Bug Fixes

- Improvement to widget and training layering.
- Fixes the squashed short range comm config.
- Fix layout issues with the sensors grid and the viewscreen core.

### Features

- Clicking on notifications now switches to the relevant card. Thanks Eric
  Mansfield!
- Add the ability to export and import flights.
- Add the ability to export and import trigger groups.

# [1.1.12](https://github.com/Thorium-Sim/thorium/compare/1.1.11...1.1.12)

### Bug Fixes

- Fixes an issue where transwarp quadrants mirror each other.
- Fixes an issue with adding inventory to the cargo task configuration.
- Fixes an issue where preset scan answers don't properly add themselves.
- Alert colors for incoming messages now appear again on the new messaging core.
- Fix some weird scrolling on the torpedos system config.

### Features

- Add delay to the macros core.

# [1.1.11](https://github.com/Thorium-Sim/thorium/compare/1.1.10...1.1.11)

### Features

- Added the subspace field system and card.
- Added the Transwarp system and card.
- Add the specialized docking card. This is similar to the USS Ranger docking
  card on the Magellan (2012) controls, and adds support for transferring cargo
  to docked ships.

# [1.1.10](https://github.com/Thorium-Sim/thorium/compare/1.1.9...1.1.10)

### Bug Fixes

- Made some adjustments that will hopefully improve speed for instances with
  large snapshots.
- Fix several issues with task instructions generation.
- Makes it so changes to the task template type checkboxes actually appear.
- Fix issue with has printer button on the simulator config not being sticky.
- Fix an issue where task templates can appear to replicate. Makes it more
  apparent what is a default value and what has been specified in the config.
- Fixes for the damage control screen with task reports.

### Features

- Thorium will now close if it detects another version of Thorium running on the
  same device.
- Add a sensors processed data action to the triggers.

# [1.1.9](https://github.com/Thorium-Sim/thorium/compare/1.1.8...1.1.9)

### Bug Fixes

- Fixes an issue with adding shuttlebays to a simulator.
- Makes it so raising shields isn't possible if there isn't sufficient power.
- Modify ShipStation layout so it uses the bank gothic font. Also improve button
  appearance.
- Importing missions now doesn't overwrite old versions of a mission.
- Fixes issues with shield triggers not working.
- Fixes an issue with auto thrusters on tactical maps.

### Features

- Adds the highly anticipated damage report refactor. Check out this doc page
  for more information: https://thoriumsim.com/docs/task-reports/
- Adds actions to triggers to make it so sound effects get cancelled.
- Make it possible to pause triggers on a simulator from the Ship Core.
- Automatically hides team conversations when the team is recalled or cleared.

# [1.1.8](https://github.com/Thorium-Sim/thorium/compare/1.1.7...1.1.8)

### Bug Fixes

- Fixes a critical error with teams.

# [1.1.7](https://github.com/Thorium-Sim/thorium/compare/1.1.6...1.1.7)

### Bug Fixes

- Fixes an issue where alerting stealth systems don't appear on the core.
- Fixes a few more errors that were discovered.

# [1.1.6](https://github.com/Thorium-Sim/thorium/compare/1.1.5...1.1.6)

### Bug Fixes

- Fixes a minor bug with starting training.
- Improves the new messaging core so it handles conversations with multiple
  people better
- Make it possible to check the secondary screen button when configuring with
  nodes.
- Fixes components reordering improperly in node config screens.
- Fixes an issue where triggers were keeping shields from functioning properly.
- Fixes some minor issues with assigning stations in tasks.

### Features

- Adds task macros, which allows you to execute macros (timeline actions) when a
  task is complete.

# [1.1.5](https://github.com/Thorium-Sim/thorium/compare/1.1.4...1.1.5)

### Bug Fixes

- Fix a minor issue with the long range comm task.

# [1.1.4](https://github.com/Thorium-Sim/thorium/compare/1.1.3...1.1.4)

### Bug Fixes

- Fixes some regressions.
- Makes dragging components on the node configs work better.

### Features

- Add a superficial damage report length for roughly 3 step reports.

# [1.1.3](https://github.com/Thorium-Sim/thorium/compare/1.1.2...1.1.3)

### Bug Fixes

- Resetting the flight will yield the correct bridge crew number for the station
  set.
- Fixes various errors which have been detected through error reporting.
- Fixes an issue where widgets can be overlapped by other elements.

### Features

- Add triggers for battle core projectiles.
- Make it so comm review cards have proper training messages.

# [1.1.2](https://github.com/Thorium-Sim/thorium/compare/1.1.1...1.1.2)

### Bug Fixes

- Fixes an issue with not having a reactor on the systems core.
- Add an internal change that will make it easier for me to proactively fix
  errors.

### Features

- Add additional triggers and actions for the trigger system.

# [1.1.1](https://github.com/Thorium-Sim/thorium/compare/1.1.0...1.1.1)

### Bug Fixes

- Ask for speed popover now appears on the correct layer when used with the
  hotkey cores.
- Adjustment to make the status screen properly update.
- Fixes an issue with the core input field.
- Once again makes it so #[1-10] entries in damage reports provide the correct
  number
- Damaging systems through a timeline action now makes it show up in the damage
  report screen properly.
- The reactor output at the bottom of the systems core can now properly update
  the reactor output.
- Make the current alert condition more apparent on core.
- Changes the labeling of the software panels damage reports to be more friendly
  towards hardware panels.

### Features

- Add a crew notification for probe query responses.
- Made it possible to set the default bridge crew count on the station set
  (since the crew count would vary from station set to station set).
- Added Stealth Field alignment to the core.
- Made it possible to specify which client a sound will play on in the macro
  config.

# [1.1.0](https://github.com/Thorium-Sim/thorium/compare/1.0.39...1.1.0)

### Bug Fixes

- Fixes an issue where the server can crash if you have crew on a simulator but
  not decks.
- Fixes the subscription for the comm review screen.

### Features

- Added the Triggers system. This allows for certain events that happen during
  the simulation to trigger certain timeline events. This can be used to set up
  automatic sound effects, or potentially perform any other action. File an
  issue if you have another event or action you want added.
- Changed the systems core so it shows the reactor power output. It shows both
  the actual output, and the effective output, which is the output multiplied by
  the efficiency.
- Add the ability to reorder core layouts.
- Make it possible to specify the order of widgets on the station.

# [1.0.39](https://github.com/Thorium-Sim/thorium/compare/1.0.38...1.0.39)

### Bug Fixes

- Scrunch up the power distribution bars so they fit better on smaller screens.
- Makes it so the sensors speed selector properly overlays on top of the
  controls.

### Features

- Note: This will hopefully be the last release of 2018. I'm going on vacation
  from December 22nd through January 5th. For part of that time, I won't be
  available over email or Discord. If you have any major issues, get in touch as
  soon as possible so those issues can be addressed. Thanks! Merry Christmas and
  Happy Holidays! ~Alex
- Adds the command line card. The command line card is configured in a similar
  way to software panels, where generic command line configurations are created,
  and then assigned to a simulator.
- Scan responses are now synced between cores when the scan response is sent.
- Add a macro for cancelling looping sounds.
- Add a macros core, which allows flight directors to queue up multiple timeline
  actions (macros) to run at the same time.
- Add the docking ports card. Must be configured on the simulator before use.

# [1.0.38](https://github.com/Thorium-Sim/thorium/compare/1.0.36...1.0.38)

### Bug Fixes

- Improvements to the code cyphers core and screen.
- Hopefully fixes issues with the engine control core. File an issue if it is
  still busted.

### Features

- Add the remote assets downloading - access with the Thorium Emporium button on
  the Assets Config screen.
- Makes it possible to remove the print button on sets/simulators that don't
  have printers configured.
- Add a room list search to the internal communications card.
- Add a timeline action for setting the signals for short range comm.
- Make it possible to update the probe count from the probe control core.
- Make it possible to change the speed at which dilithium stress levels change.

# [1.0.36](https://github.com/Thorium-Sim/thorium/compare/1.0.35...1.0.36)

### Bug Fixes

- Sensor contacts that are a bit out of bounds will no longer disappear.
- Improve how the 'Begin Training' button on the login screen works.
- Fixes issues with the tactical maps.
- Fix issues with navigation advanced screen.

# [1.0.35](https://github.com/Thorium-Sim/thorium/compare/1.0.34...1.0.35)

### Bug Fixes

- Fixes the direction of the Junior Thrusters.
- Remove the battery charging screen on Jr Engineering to hopefully improve
  performance.
- Sort the event picker options so it's easier to see what options there are.
- Updates and changes to improve the reliability and speed of the tactical maps.

### Features

- Allow for tactical map rotations to be specified as a number.
- Make it possible to 'hit' jump drive stress.
- Add some stats to the tasks core so the flight director can know who completes
  tasks on time.
- Add a room search core and added room search/select to the internal comm core.
- Add the ability to set preset long range messages though a timeline action.

# [1.0.34](https://github.com/Thorium-Sim/thorium/compare/1.0.33...1.0.34)

### Bug Fixes

- Improve the remote access core.
- Add a short delay to switching between cards so they don't get caught
  mid-transition.
- Fix a crash when a flight doesn't have any crew.
- Exocomps can now be properly assigned to minor systems.

### Features

- Make it possible to collapse core feed items that have been opened.
- Add the ability to use #SYSTEMNAME for the name of the system in damage
  reports.
- Change the color of the names of systems when power is removed from them.
- Add the ability to toggle the on-screen audio/video training on and off.

# [1.0.33](https://github.com/Thorium-Sim/thorium/compare/1.0.32...1.0.33)

### Bug Fixes

- Fixes planets, borders, and pings.
- Fixes the text color of the dropdown on the 'Add Users' dropdown.

### Features

- Add the ability to control the sidebars on any core.
- Add a simple black layout.
- Make it possible to selectively choose what layout each station has.

# [1.0.32](https://github.com/Thorium-Sim/thorium/compare/1.0.31...1.0.32)

### Bug Fixes

- Fixes a crucial error which causes Thorium Server to crash when serializing
  circular references.
- Fixes an issue where software panels aren't properly appearing on stations.
- Provides some fixes for tasks that crash the server.
- Properly handle destroying sensor contacts tied to targeting contacts.
- Properly handle dragging contacts onto the grid again.

# [1.0.31](https://github.com/Thorium-Sim/thorium/compare/1.0.30...1.0.31)

### Bug Fixes

- Automatically release the thrusters if the thrusters haven't been pressed for
  a while, in case thrusters disconnects while thrusting.
- Fix an error where setting an station training to not a video or audio file
  causes the player to appear.
- Makes #[1-10] entries in damage reports actually use the correct numbers.
- Railgun projectiles now appear correctly on regular sensors.
- Railgun projectiles now properly remove when they miss.

### Features

- Add exocomp history to the exocomp core.

# [1.0.30](https://github.com/Thorium-Sim/thorium/compare/1.0.29...1.0.30)

### Bug Fixes

- Fixes possible issues with exporting missions.
- Improves how printing mission scripts works.
- Fix an issue where batteries deplete a little bit faster because of extra
  power hanging out in systems.
- Improvements and fixes to the task system.
- The battery training steps will not appear on the power distribution and
  reactor control screens if the ship has no batteries.
- Fix an issue where reactor heat was not properly updating on Core.

### Features

- Added the probe science screen. This screen allows for probes to be configured
  with bursts or detectors and can be used as part of certain strategies. This
  screen uses the Alternative Sensors Core and the Probe Control Core.
- Added a color change to a message in the comm convo core when it has been
  decoded.
- Added the ability to flash and send probe processed data.

# [1.0.29](https://github.com/Thorium-Sim/thorium/compare/1.0.27...1.0.29)

### Bug Fixes

- Fixes an issue where sensors information and scan answers don't show up
  because of an out-of-bounds ping incrementer.
- Changes tactical map thrusters to reset the speed to a more reasonable speed
  if it is set to instant.
- Provide a fix for editing inventory that is assigned to a room that doesn't
  exist anymore.

### Features

- Add the error tracking framework Sentry to have a better idea of when and how
  errors happen.
- Improvements to how the sensors grid and targeting core component operate
  together.
- Improve the usability of the engine control screen.

# [1.0.27](https://github.com/Thorium-Sim/thorium/compare/1.0.26...1.0.27)

### Bug Fixes

- Improves how editing timeline steps during a mission works. Adds a 'Restore'
  button to bring back the timeline item's configuration.
- Timeline step editing now does not override steps that were not edited.
- Improved logic for when the sensors scans should be added to or removed from
  the sensors card.

### Features

- Adds the ability to define the direction the shuttles need to go along with
  more straightforward directions on the shuttlebay crew screen.

# [1.0.26](https://github.com/Thorium-Sim/thorium/compare/1.0.25...1.0.26)

### Bug Fixes

- Security decks now properly gets updates.
- Fixes an issue with the damage teams tasks core component.
- Conversations in the new messaging core now stay red when done transitioning.
- Contacts are now properly removed from the targeting core when a sensor
  contact is destroyed or cleared.
- Fix an issue with cargo logs being persisted between flights.
- Switch out the LRM cores on MainCore and AuxCore to be the comm convo core.
- Adjusted the delay of the widget tooltip so tooltips don't overlap.
- Fixes errors and crashes in the sickbay.

### Features

- Added an internal comm notification on the crew station.
- Add the ability to have icons on a tactical map controllable with the ship's
  thrusters.
- Add an additional scan preset for recommending the opposite (internal or
  external) sensors.
- Makes it possible to configure viewscreen hotkeys with data, such as assigning
  a video.
- Add tasks for security and medical teams.
- Security incidents (basically only security team tasks right now) appear on
  the Security Decks screen.

# [1.0.25](https://github.com/Thorium-Sim/thorium/compare/1.0.24...1.0.25)

### Bug Fixes

- Fix an issue with crashes creating ambiance tracks.
- Fixes an issue where too many task templates can't scroll.
- Made it so the 'Begin Training' button on the login screen starts the training
  player if there is an audio or video training.

### Features

- Add a sensors widget so it can be shown over other screens.
- Add ability to change heat rate in the systems config.
- Add an Add Task timeline macro
- Make it possible to edit timeline steps in the timeline core.
- Add the ability to provide station ambiance.

# [1.0.24](https://github.com/Thorium-Sim/thorium/compare/1.0.23...1.0.24)

### Features

- Make it possible to change the phasers to hold to charge.
- Add a send button to the new messaging core.
- Set up the cargo screen so it uses a ready cargo area.
- Provide a running log of cargo transfers in the cargo core.
- Add the ability to easily change which deck a room is on from the deck
  simulator config.
- Add a toggle to disable the jump drive without damaging it.
- Add analytics to Thorium. It sends data about your use of Thorium to me
  (Alex). It's opt-in, but much appreciated if you choose to share your data.
- Add a new layout that matches the popular Empty Epsilon bridge simulator.
  Thanks BlueShadow!

# [1.0.23](https://github.com/Thorium-Sim/thorium/compare/1.0.22...1.0.23)

### Features

- Improve tasks so they have notifications.
- Add notifications for comm review.
- Add a log to the cargo core for tracking where and when cargo transfers
  happen. Also add notifications.
- Improve the notifications around the new messaging core, including a sound
  effect and visual changes.
- Updated battle core to allow for missed projectiles. This can be done with a
  direct button press or with auto-fired enabled and a percentage chance of
  missing.
- Also updated battle core so projectiles only explode if they intersect with
  the center of the sensors grid. This means if the crew uses their thrusters to
  dodge, projectiles will not impact.

# [1.0.22](https://github.com/Thorium-Sim/thorium/compare/1.0.21...1.0.22)

### Bug Fixes

- Fixes an issue where you can't see where you are calling from on the internal
  comm core.

### Features

- Added the first iteration of crew task management! This is a huge release, so
  there will be several bullets below describing it.
- Added the task management core. Individual tasks which can be performed by the
  crew are programmatically specified, with the possible values that can be
  inputted, a textual instructions template, and automatic verification. Note:
  not all possible crew tasks are represented yet. More will be added as time
  goes on. To suggest additional task definitions, fill out this form:
  http://bit.ly/task-definitions
- Added the task management widget and card. This can be assigned to stations so
  crew members can see and complete tasks assigned to them. They can also
  request to verify tasks that can't be automatically verified.
- Added the task template creation system. This can be found in the sidebar
  menu. Task templates allow flight directors to create preset tasks that can
  quickly and easily be used during a mission.
- Tasks open up a lot of interesting possibilities, including tracking the time
  it takes crew members to complete tasks and creating badges and awards for
  completing certain tasks. Get in touch if you have interesting ideas for how
  tasks can be used.
- More features are planned surrounding tasks in the future. This includes a
  damage report overhaul, security incident reporting, automatic damage pings,
  and a command/XO screen allowing them to prioritize tasks.
- We now return to your normally scheduled feature lists.
- Added the ability to print crew officer's logs. Make sure you set up a printer
  for this feature to work correctly. Thanks @ericman314!
- Add the crew login name to the bridge map screen.
- Add lines to the sensors core movement circle to indicate the straight
  directions.

# [1.0.21](https://github.com/Thorium-Sim/thorium/compare/1.0.20...1.0.21)

### Bug Fixes

- Fixes a bug that made it impossible to change shuttle names from the core.
- Fixes a minor bug with transporters.
- Minor change that improves the status screen.

### Features

- Added the particle detector, Magellan 2012 style. It has a fixed set of icons
  and types, but those can be expanded through code if necessary.
- Added the 'Alertnate Sensors Core', for sensors grid-type things that aren't
  relevant to the main sensors grid. This includes the particle detector,
  science probes burst, and defense probes.
- Adds an option to make the controls uppercase text when configuring the
  simulator.
- Provide alternate labels for engineering report screen.
- Add ability to adjust rotation speed of the ship model viewscreen.

# [1.0.20](https://github.com/Thorium-Sim/thorium/compare/1.0.19...1.0.20)

### Bug Fixes

- Fixes an issue where messages are duplicated on the core.

### Features

- Add a 'New Messaging' Core. This hopefully will make intership messaging
  easier and more straightforward.
- Add flash option to the processed data macro.
- Phasers now properly support different names for the system.

# [1.0.19](https://github.com/Thorium-Sim/thorium/compare/1.0.18...1.0.19)

### Bug Fixes

- Fixed an issue with the targeting grid interference not showing up on the
  standalone targeting screen.
- The reset timeline event will no longer reset the timeline for the simulator.
- Add proper scrolling to the step list when making mission timelines.

### Features

- Add a low power viewscreen.
- Add a core for handheld scanners. To be used with the Thorium Mobile app.
- Add some visuals to the security decks screen.
- Crew deck location is now tracked. Crew will move to the appropriate deck when
  on a team and will evacuate a deck when it is evacuated. Crew will also obey
  if the bulkhead doors are closed.
- Add some long range message presets.
- Adjust probe construction to make it more friendly for touchscreens.
- Add setting the self destruct code back in. Self destruct now requires the
  code to turn it on and off. Better support for touchscreens too.

# [1.0.18](https://github.com/Thorium-Sim/thorium/compare/1.0.17...1.0.18)

### Bug Fixes

- Adds the bridge map asset item to the simulator config.
- Adds the ability to clear station-specfic training.
- Fix an issue with card switchers on certain layouts.
- Fixes the color of the hilite on the computer core screen for better contrast.
- Multiple lines now work for intership messages.
- Allow the tractor beam to be properly renamed on the tractor beam card.
- Make it possible to properly break the signal jammer.
- Signal jammer stealth factor is now dependant on whether the system is active
  or not.
- Fix an issue with exporting keyboards.

### Features

- Add interference to the targeting grid.
- Add training for the code cyphers screen.
- Add an assets core for dynamically changing simulator assets.
- Add colors to hilite the deck colors based on evac, doors, or tranzine status
  on the security decks screen.
- Add the ability to rename keyboards.
- Make it possible to damage shuttlebays.
- Add additional sensors scan answer presets.
- Add better notifications for the keypad core.

# [1.0.17](https://github.com/Thorium-Sim/thorium/compare/1.0.16...1.0.17)

### Bug Fixes

- Add phaser arc back to the phaser charging screen.
- Make it so thrusters don't show erronious numbers, like 360˚.
- Shield frequencies are now properly limited to below 350 MHz
- Tactical map objects will no longer shake when traveling at high speeds.
- Update the dilithium stress animation to be prettier.

### Features

- Add support for Thorium Mobile, a companion mobile app. Check
  https://thoriumsim.com/download for information about downloading the mobile
  apps.
- Add a keypad core for the keypad screen on the mobile application.

# [1.0.16](https://github.com/Thorium-Sim/thorium/compare/1.0.15...1.0.16)

### Bug Fixes

- Update dependency package versions.
- Improve the speed of messages from the server by replacing the caching
  package.
- Probes will now be completely overwritten with the default probe and equipment
  on a new flight.
- All button text on Layout Glass should be white, improving legibility.
- Improve the layout of the power routing screen for JR engineering.

### Features

- Added the ability to un-complete a mission objective from the core.
- Added the ability to mark a mission objective as cancelled.
- Add a compose button to the long range communications card so you don't need
  the widget.
- Add a preview for intership message timeline items.
- Team officers are now sorted by position, making it easier to find a specific
  position.
- Allow for selecting timeline item info from the preview.
- Add alerts for engines and reactor overheating.
- Add a 'Finish Decontamination' button to core.
- Add the ability to change how fast the transporters can be charged.
- Change the login screen to say 'Officer' instead of 'Agent'.

# [1.0.15](https://github.com/Thorium-Sim/thorium/compare/1.0.13...1.0.15)

### Bug Fixes

- Fix some issues with the short range comm core.
- Fixes issues with uploading assets on Firefox. Also fixes issues with multiple
  uploads.
- Makes probe queries easier to recognize on core by changing the text to red.
- Make damage report status more clear on the damage reports core. Reactivation
  code requests come through as purple.

### Features

- Add options to remove and destroy sensor contacts from the 'Ask for Speed'
  popover

# [1.0.13](https://github.com/Thorium-Sim/thorium/compare/1.0.12...1.0.13)

### Bug Fixes

- Fixes an issue with tactical map icons not being totally transparent when
  loaded.
- Fixes an issue where sending a course through mission presets doesn't send the
  course.
- Set's station names are now properly renamed when a station is renamed.
- Fixes saving inventory in certain circumstances.

# [1.0.12](https://github.com/Thorium-Sim/thorium/compare/1.0.11...1.0.12)

### Bug Fixes

- Add clock syncing between the server and the client. This will match sensors
  and the railgun up a bit more.
- Fixed the layout of the software panels.

### Features

- Add a thrusters adjustment viewscreen card.

# [1.0.11](https://github.com/Thorium-Sim/thorium/compare/1.0.10...1.0.11)

### Bug Fixes

- Add icons for all of the junior cards.

### Features

- Add a Thrusters Lite card that removes the 3d view from the center of the
  screen.
- Added the ability to assign training recordings to individual stations. These
  recordings will appear when training mode is on for the simulator. The
  recordings can be either videos or audio and will persist between card
  changes.

# [1.0.10](https://github.com/Thorium-Sim/thorium/compare/1.0.9...1.0.10)

### Bug Fixes

- Fixes an issue with inserting timeline events.
- If traveling at a speed, the stars viewscreen will now properly show the speed
  instead of ramping up from stopped every time.
- When configuring sensor contacts in mission configurations, the contact
  information will now update.
- Bridge officer messaging settings will now properly transfer from the template
  simulator.
- Fixes an issue where alert conditions don't reset with the flight.
- Fixes an issue with the initialization of reactors.
- Fixes an issue with saving velocities on engines.

### Features

- Add a bridge map card and core for running actions on specific clients. Note
  that this requires a specially configured SVG to work properly. Please see
  https://thoriumsim.com/docs/bridge-map/ for more information.

# [1.0.9](https://github.com/Thorium-Sim/thorium/compare/1.0.8...1.0.9)

### Bug Fixes

- Fixed an issue with sending action commands.
- Fixed an issue with adding locations to systems.
- Fluxing power to all systems will no longer adjust systems with no power
  levels.

### Features

- Added the ability to play random sounds from within a folder in the sound
  player macro.

# [1.0.8](https://github.com/Thorium-Sim/thorium/compare/1.0.7...1.0.8)

### Bug Fixes

- Fixed an issue with the layout of torpedo launchers on the Targeting screen.
- Fixed an issue where sound effects play again when the simulator changes.
- Fixed an issue where you can only type one character at a time when changing
  card names.

# [1.0.7](https://github.com/Thorium-Sim/thorium/compare/1.0.6...1.0.7)

### Bug Fixes

- Improved how timeline event names display.

### Features

- Added timeline events for adding and removing interception signals.
- Added timeline events for adding and removing targeting target classes.

# [1.0.6](https://github.com/Thorium-Sim/thorium/compare/1.0.5...1.0.6)

### Bug Fixes

- Fix an issue with the viewscreen not properly showing up, particularly with
  the timer viewscreen.
- Fix scrolling on the sets control. Also adds sound player and keyboards to the
  station options when configuring a set.
- Fixes for issues with configuring the software panels.
- Fixes for the stealth field animation.
- Fixes for damage report configurations not being editable.
- Fixes an issue where the library buttons for importing, exporting, and
  deleting were hidden.
- Fixes an issue where certain actions aren't working properly.
- Fixes an issue where changing the mosaic layout to a saved layout isn't
  persisted when navigating away from the core.

### Features

- Added a special sound picker which allows for nested folders. This allows you
  to add folders to your sounds folder and pick from any sound within any of
  those folders.
- Add the ability to export keyboards and tactical maps.

# [1.0.5](https://github.com/Thorium-Sim/thorium/compare/1.0.4...1.0.5)

### Bug Fixes

- Fixed the rotation of the jump drive colored circles.
- Fixes an issue where sound effect volume levels couldn't be adjusted.

# [1.0.4](https://github.com/Thorium-Sim/thorium/compare/1.0.3...1.0.4)

### Bug Fixes

- You can no longer request damage reports that have already been requested.
- Improved the actions macro to support more destinations and actions.
- Deleting cards on the station config should work now.
- Teams must now have a name, orders, location, priority, and officers assigned
  before being created.
- Refactored relative imports to make developer's lives easeier.
- Fixed an error when generating damage team damage report steps.
- Fixed an issue with communication images not rendering when they don't appear
  in the 'Comm Images' folder. WARNING: This might require you to redo your comm
  images in the short range comm system config of your simulator config.

### Features

- Added an 'Auto-Complete' toggle to the sickbay config for decontamination.
- Added notifications for the Jump Drive.

# [1.0.3](https://github.com/Thorium-Sim/thorium/compare/1.0.2...1.0.3)

### Bug Fixes

- Tactical map icons should start animating movement immediately and shouldn't
  snap to their end position so quickly.
- Fixed the broken Phoenix viewscreen layout.
- Fixed issues with the scaling of tactical maps on viewscreens.
- Long Range Messages now show as encrypted on the animation when sent through
  Long Range Messages

### Features

- Added additional German translations (Thanks aBlueShadow!)
- Added the Jump Drive, a supplement to regular engines.

# [1.0.2](https://github.com/Thorium-Sim/thorium/compare/1.0.1...1.0.2)

### Bug Fixes

- Fixes a major issue with sensor contacts not being draggable.

### Features

- Add Computer Core training

# [1.0.1](https://github.com/Thorium-Sim/thorium/compare/1.0.0...1.0.1)

### Bug Fixes

- A minor fix to chaging station and station set names.
- Improvements to the hotkey cores.
- Renamed the 'Client Core' to 'Login Name Core' for more clarity. Split it's
  functionality into the 'Hypercard Core'.
- Fixed an issue with styling on the navigation keypad.
- Fixed an issue where phasers would send notifications when they are fired but
  they aren't charged.
- Fixed how the probes are refered to on the torpedo loading and firing screen.
- Stealth Field screen now shows the name of the system, so you can name it
  'Cloaking Device', or whatever.
- The stealth field won't appear as activated on the status screen if it's
  always on.
- Fix the auto-movement on sensors.
- When systems are R&D or Engineering 'damaged', they don't appear in the status
  screen list
- Planets, borders, and pings won't appear as targeting contacts anymore.

### Features

- Add notifications for when railgun projectiles hit and when they are destroyed
  by the railgun.
- Added the ability to create extra system reports for R&D and Engineering

# [1.0.0](https://github.com/Thorium-Sim/thorium/compare/0.4.9...1.0.0)

### Bug Fixes

- Viewscreens are now filtered by whether they are connected or not.
- Target icon selection should now stay within the bounds of the component.

### Features

- First major release! Yay! 🎉
- Added the ShipStation layout.
- Add support for dynamic message groups. In addition to Security, Damage, and
  Medical teams, you can set up specific preset groups on specific stations.
- Refactored the sensors grid to support any configuration of rings, lines, and
  alignment.
- Added the ability to change targeting/weapons range.
- Added the ability to insert timeline items after the currently selected
  timeline item.

# [0.4.9](https://github.com/Thorium-Sim/thorium/compare/0.4.8...0.4.9)

### Bug Fixes

- Fixed an issue where the faces viewscreen didn't show any images.
- Fixed a minor issue with dilithium stress that caused the viewscreen to break.
- Fixed an issue with the ship view viewscreen component where you couldn't type
  in text.

### Features

- Added this release notes page!
- Added the ability to tag sensor contacts as hostile.
- Added the battle core. Hostile sensor contacts appear in this core, and can be
  instructed to fire on the simulator. When they fire, small projectiles appear
  on the sensor grid.
- Added a railgun, which can be used to destroy incoming projectiles.
- Added a 'Overlay' button to the viewscree core. This makes the layout overlay
  on top of viewscreen in all cases. This currently only applies to the Line
  layout.
- Added ability to control the viewscreen with the page up and page down
  buttons - useful for using clickers.
- Added sound back to the video viewscreen, but only on the actual viewscreen.

# 0.4.8

### Bug Fixes

- Fixed an issue with the line layout.
- Added scrolling to the simulator and mission lists.
- Fixed an issue that could happen when making new flights.
- Cleaned up places where checkboxes overlay.
- Fixed an issue with the curve frame card switcher.
- Fixed the Begin Training button on the login screen.

### Features

- Added the dilithium stress status to the status card.
