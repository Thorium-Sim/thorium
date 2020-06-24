## [2.12.4](https://github.com/Thorium-Sim/thorium/compare/2.12.3...2.12.4) (2020-06-24)


### Bug Fixes

* **Timeline:** Fixes an issue where missions don't appear in the timeline selector. ([b429fe6](https://github.com/Thorium-Sim/thorium/commit/b429fe69748752a7f08d563268d56db1d7b1bd23))

## [2.12.3](https://github.com/Thorium-Sim/thorium/compare/2.12.2...2.12.3) (2020-06-23)


### Bug Fixes

* **Kiosk:** Fixes an issue that causes the kiosk to not load. Closes [#2985](https://github.com/Thorium-Sim/thorium/issues/2985) ([13274d0](https://github.com/Thorium-Sim/thorium/commit/13274d04a8930d5438a3b8a9e4c0317fe64bb32d))

## [2.12.2](https://github.com/Thorium-Sim/thorium/compare/2.12.1...2.12.2) (2020-06-19)


### Bug Fixes

* **Server:** Fixes an issue where the server couldn't start. Closes [#2983](https://github.com/Thorium-Sim/thorium/issues/2983) ([cf367d5](https://github.com/Thorium-Sim/thorium/commit/cf367d572796c61b02599978a4671e658ac8f2ae))

## [2.12.1](https://github.com/Thorium-Sim/thorium/compare/2.12.0...2.12.1) (2020-06-17)


### Bug Fixes

* **Keyboard:** Fixes an issue where random sounds don't properly export. Closes [#2965](https://github.com/Thorium-Sim/thorium/issues/2965) ([6fa74e0](https://github.com/Thorium-Sim/thorium/commit/6fa74e0d187fee666f173f7cb26178adb7281283))
* **Keyboard:** Fixes issues when choosing sound effects from the sound picker. Closes [#2965](https://github.com/Thorium-Sim/thorium/issues/2965) ([0f506f4](https://github.com/Thorium-Sim/thorium/commit/0f506f46cf2f48ba94a0ac521e6947db90b3ce6a))
* **Long Range:** Fixes an issue where typing in the Send LRM Macro sender field is unresponsive and janky. Closes [#2966](https://github.com/Thorium-Sim/thorium/issues/2966) ([562041e](https://github.com/Thorium-Sim/thorium/commit/562041e25263306c714659a41031f64992c7debc))
* **Remote Access:** Fixes illegible text. Closes [#2972](https://github.com/Thorium-Sim/thorium/issues/2972) ([d9046b8](https://github.com/Thorium-Sim/thorium/commit/d9046b8fc429082cda175cbf2f15268232648b45))
* **Sensors:** Makes it so the border around Sensors on core shows contacts properly. Closes [#2971](https://github.com/Thorium-Sim/thorium/issues/2971) ([5e3d8d7](https://github.com/Thorium-Sim/thorium/commit/5e3d8d73ff003ab3c8989dd732f81a31dfb4288b))
* **Simulator Config:** Fixes an issue where adjusting simulator config values, such as the layout, crashes the client. Closes [#2977](https://github.com/Thorium-Sim/thorium/issues/2977) ([8aa991e](https://github.com/Thorium-Sim/thorium/commit/8aa991e16ab9ab18217f87ffbd0af7de380102e1))
* **Sound Player:** Fixes an issue where looping sound effects abruptly end. Closes [#2970](https://github.com/Thorium-Sim/thorium/issues/2970) ([ce4ce4f](https://github.com/Thorium-Sim/thorium/commit/ce4ce4f2ee4093ea8e69eee4b8102cc3fd614cc8))
* **Station Config:** Fixes an issue where card names and components can't easily be changed. Fixes [#2976](https://github.com/Thorium-Sim/thorium/issues/2976) ([880e51f](https://github.com/Thorium-Sim/thorium/commit/880e51f159ef8ed8856e60062a2151e56c686f28))
* **Tactical Maps:** Fixes an issue where tactical maps don't appear correctly on the configuration screen. Closes [#2978](https://github.com/Thorium-Sim/thorium/issues/2978) ([5cafc0e](https://github.com/Thorium-Sim/thorium/commit/5cafc0eee4d414f4de8d5b1b1c647c4baa183adc))
* **Timeline:** Makes the Play & Stay timeline button not advance the timeline. Closes [#2969](https://github.com/Thorium-Sim/thorium/issues/2969) ([40ca10f](https://github.com/Thorium-Sim/thorium/commit/40ca10fc13e3e7ab2e824d032690215b7f274098))

# [2.12.0](https://github.com/Thorium-Sim/thorium/compare/2.11.1...2.12.0) (2020-06-01)


### Bug Fixes

* **Sensors:** Makes sensor pings always visible, even when using the sensor sonar. Closes [#2938](https://github.com/Thorium-Sim/thorium/issues/2938) ([a0bafca](https://github.com/Thorium-Sim/thorium/commit/a0bafcaa6bbf9a4e68486e954dc67cc57c821e6e))
* **Task Flows:** Fixes an issue where task flows appear to be completed when the last step hasn't been completed. Closes [#2960](https://github.com/Thorium-Sim/thorium/issues/2960) ([3298942](https://github.com/Thorium-Sim/thorium/commit/329894210ec27b4e839a44692dac6e35ec8d7991))
* **Viewscreen:** Fixes an issue where the ship model on the viewscreen can't change color. Closes  [#2963](https://github.com/Thorium-Sim/thorium/issues/2963) ([e7a9424](https://github.com/Thorium-Sim/thorium/commit/e7a942470142ab7faeea6ece2d66b42cb57b0820))


### Features

* **Stealth:** Adds a toggle to the stealth field configuration to make it so the sensors sonar is automatically activated and deactivated with the stealth field. Closes  [#2937](https://github.com/Thorium-Sim/thorium/issues/2937) ([1b36015](https://github.com/Thorium-Sim/thorium/commit/1b3601544d12dd86bd202b86c650c662237748cb))
* **Task Flows:** Adds ability to hide and show completed task flows on the core. Closes [#2961](https://github.com/Thorium-Sim/thorium/issues/2961) ([15a7b96](https://github.com/Thorium-Sim/thorium/commit/15a7b968a054face32d5c20a870a6b00ab32529b))
* **Tasks:** Adds support to the Computer Core Terminal Reset task for having the crew reset every terminal in the computer core. Closes [#2962](https://github.com/Thorium-Sim/thorium/issues/2962) ([2879388](https://github.com/Thorium-Sim/thorium/commit/2879388a6ebd94129a0c0607f7dffa991af01704))
* **Tasks:** Adds support to the shield frequency task for setting the frequency of all shields. Closes [#2959](https://github.com/Thorium-Sim/thorium/issues/2959) ([ca4ec7e](https://github.com/Thorium-Sim/thorium/commit/ca4ec7e7fed2474e51548f36e7d5ddea4cb86185))

## [2.11.1](https://github.com/Thorium-Sim/thorium/compare/2.11.0...2.11.1) (2020-05-25)


### Bug Fixes

* **Flight:** Fixes an issue where the 'Pause Flight' button doesn't update properly. Closes [#2956](https://github.com/Thorium-Sim/thorium/issues/2956) ([2d1f444](https://github.com/Thorium-Sim/thorium/commit/2d1f44457945f3ec9cfcd89bdf6fe951a84ce951))
* **Missions:** Fixes an issue where the delay field in the mission config shows the value from a previously selected timeline action. Closes [#2950](https://github.com/Thorium-Sim/thorium/issues/2950) ([a6bf456](https://github.com/Thorium-Sim/thorium/commit/a6bf456c122eb5e62dc8201f78253d802638679f))
* **Tags:** Allow for tags to have spaces in them; useful for using station names as tags. Closes [#2951](https://github.com/Thorium-Sim/thorium/issues/2951) ([0ea98cf](https://github.com/Thorium-Sim/thorium/commit/0ea98cf9c275336bb43df2d65e295cb9f8a8c0e7))
* **Task Flow:** Adds the option to have a delay between task flow steps. Closes [#2949](https://github.com/Thorium-Sim/thorium/issues/2949) ([ad8c01c](https://github.com/Thorium-Sim/thorium/commit/ad8c01cdd77011b9c36960abd95e864e2421dac0))
* **Tasks:** Fixes an issue with the shield frequency task. Closes [#2954](https://github.com/Thorium-Sim/thorium/issues/2954) ([23625a7](https://github.com/Thorium-Sim/thorium/commit/23625a7889ed3ca0943aae20c01109c48715fcd9))
* **Tasks:** Referencing decks and rooms in team tasks should properly assign the correct room or deck to the task when it is created. Closes [#2953](https://github.com/Thorium-Sim/thorium/issues/2953) ([353f85c](https://github.com/Thorium-Sim/thorium/commit/353f85c0cf4c4c026b8b91c735dce5827bd7be88))
* **Tasks:** Updates the shield frequency task to support ranges of shield frequencies instead of a specific value. Closes [#2952](https://github.com/Thorium-Sim/thorium/issues/2952) ([aebf82c](https://github.com/Thorium-Sim/thorium/commit/aebf82cc970898e89759cad54f2ab3a144c3fd45))

# [2.11.0](https://github.com/Thorium-Sim/thorium/compare/2.10.3...2.11.0) (2020-05-19)


### Features

* **Task Flows:** Add Task Flows, which is a new way to create reports for crew members out of tasks. Check out this documentation page for more information. https://thoriumsim.com/docs/task-flows/ Closes [#2931](https://github.com/Thorium-Sim/thorium/issues/2931) ([60f1f67](https://github.com/Thorium-Sim/thorium/commit/60f1f67ffb3e626f41df28ef1e9c0efce3a2c3e5))

## [2.10.3](https://github.com/Thorium-Sim/thorium/compare/2.10.2...2.10.3) (2020-05-16)


### Bug Fixes

* **Sound Player:** An errant reset function was being called to often, causing sounds to be chopped off. This fixes that problem. ([c03ea39](https://github.com/Thorium-Sim/thorium/commit/c03ea39e188789797a76350b124f87a143594f7c))

## [2.10.2](https://github.com/Thorium-Sim/thorium/compare/2.10.1...2.10.2) (2020-05-15)


### Bug Fixes

* **Space EdVentures:** Fixes a regression causing Space EdVentures connection to be broken. ([c847d71](https://github.com/Thorium-Sim/thorium/commit/c847d71a78bdab3900e61b7a7f7f085e80318215))

## [2.10.1](https://github.com/Thorium-Sim/thorium/compare/2.10.0...2.10.1) (2020-05-12)


### Bug Fixes

* **Core:** Fixes an issue where certain core inputs don't work or cause Thorium to crash. Closes [#2935](https://github.com/Thorium-Sim/thorium/issues/2935) ([69ebb5c](https://github.com/Thorium-Sim/thorium/commit/69ebb5ce2bc5a44a9d57d8b29ec9129b15b65747))

# [2.10.0](https://github.com/Thorium-Sim/thorium/compare/2.9.0...2.10.0) (2020-05-09)

### Bug Fixes

- **Tasks:** Fixes an issue where you can't add additional equipment to a probe
  task template. Closes
  [#2928](https://github.com/Thorium-Sim/thorium/issues/2928)
  ([8708a14](https://github.com/Thorium-Sim/thorium/commit/8708a14cd627dc1e3aaa6fd9147f5fd79ea15614))

### Features

- **DMX:** Adds DMX support directly to Thorium. It supports many DMX drivers,
  including ENTTEC Pro USB, ARTNET, and sACN (e1.31). Information on how to
  configure and use DMX in Thorium is available on the Thorium website
  https://thoriumsim.com/docs/dmx_config/ Closes
  [#2919](https://github.com/Thorium-Sim/thorium/issues/2919)
  ([9724ce8](https://github.com/Thorium-Sim/thorium/commit/9724ce8ca26242a32231b8fdb8f631cfb92b467c))
- **Keyboard:** Expands the keyboard config to support 10-key keyboard layouts.
  Closes [#2911](https://github.com/Thorium-Sim/thorium/issues/2911)
  ([7fa9f20](https://github.com/Thorium-Sim/thorium/commit/7fa9f202f8721d59ad78e74b98d4333676883668))
- **Reactor:** Add the ability to split the reactor into left and right wing
  power. This requires an adjustment on the Reactor System Config, as well as
  assigning the special power distribution cards for left and right wing to
  separate stations. Closes
  [#2906](https://github.com/Thorium-Sim/thorium/issues/2906)
  ([62a9a5f](https://github.com/Thorium-Sim/thorium/commit/62a9a5f3aaec72b0e0f36ed147fe93762881c1e0))
- **Sensors:** Adds a sonar ping feature to sensors, which hides contacts from
  view unless the crew sends a ping. Contacts disappear shortly after the ping
  uncovers them. It can be set up to automatically ping at a high or low
  interval, or ping by manually clicking a button. Pinging on sensors affects
  stealth. This will be enabled by default, but you can turn it off on the
  sensors system config or in the Extras tab of sensors core. Closes
  [#2913](https://github.com/Thorium-Sim/thorium/issues/2913)
  ([f7ce893](https://github.com/Thorium-Sim/thorium/commit/f7ce893923b5f90be723c9065ad4da7c85f6a80e))
- **Sensors:** Makes sensors processed data persistently stored and visible in a
  list on the sensors screen. This allows the sensors officer to see what past
  sensor information was sent to them, along with how long ago the information
  was sent. Also allows the flight director to remove items from the processed
  data history if they accidentally send something. Closes
  [#2907](https://github.com/Thorium-Sim/thorium/issues/2907)
  ([559acd0](https://github.com/Thorium-Sim/thorium/commit/559acd09aa4e65d5bee2cc567dee2156444f2cee))
- **Station Sets:** Adds a duplicate, export, and import button to station sets.
  Closes [#2908](https://github.com/Thorium-Sim/thorium/issues/2908)
  ([c75cbaf](https://github.com/Thorium-Sim/thorium/commit/c75cbaf0f629d802a5361c5b6348065776b83004))
- **Task Templates:** Adds export and import to task templates. Closes
  [#2921](https://github.com/Thorium-Sim/thorium/issues/2921)
  ([b58554c](https://github.com/Thorium-Sim/thorium/commit/b58554ce52dd5512c4b2db1657fbbbaf24f7b246))
- **Tasks:** Adds a button to the crew task screen allowing them to show and
  hide completed tasks. Closes
  [#2924](https://github.com/Thorium-Sim/thorium/issues/2924)
  ([1eae155](https://github.com/Thorium-Sim/thorium/commit/1eae1550fea76bf8e2c43a145dfe75cf95b77191))
- **Tasks:** Made it possible to specify delays on macros executed with tasks.
  Closes [#2922](https://github.com/Thorium-Sim/thorium/issues/2922)
  ([06195c8](https://github.com/Thorium-Sim/thorium/commit/06195c8d9f77255f77ef10439b291ecdd811d8e3))
- **Teams:** Adds a search bar to the teams assignment screen. Closes
  [#2891](https://github.com/Thorium-Sim/thorium/issues/2891)
  ([67c3217](https://github.com/Thorium-Sim/thorium/commit/67c32176893428824020553d1680542df41627b1))
- **Timeline:** Adds a new timeline step: Change Timeline Mission. This allows
  you to change what the current timeline is in the middle of a flight, or
  switch to a different step in the current mission. Activating this action
  happens by clicking on the button for the timeline you want to switch to in
  the timeline core. This feature can be used to create branching timelines,
  where based on the decisions of the crew you can jump to one timeline or to a
  different timeline. Closes
  [#2871](https://github.com/Thorium-Sim/thorium/issues/2871)
  ([4de8cf1](https://github.com/Thorium-Sim/thorium/commit/4de8cf14995a45228de8b6c463f40d6d0695b67b))
- **Tractor Beam:** Adds support for up to four tractor beams on one simulator.
  Configure it on the Tractor Beam systems config. Closes
  [#2929](https://github.com/Thorium-Sim/thorium/issues/2929)
  ([eb3776b](https://github.com/Thorium-Sim/thorium/commit/eb3776b719504ff58ede92c283efb2bc77cc0c93))

# [2.10.0](https://github.com/Thorium-Sim/thorium/compare/2.9.0...2.10.0) (2020-05-09)


### Bug Fixes

* **Tasks:** Fixes an issue where you can't add additional equipment to a probe task template. Closes [#2928](https://github.com/Thorium-Sim/thorium/issues/2928) ([8708a14](https://github.com/Thorium-Sim/thorium/commit/8708a14cd627dc1e3aaa6fd9147f5fd79ea15614))


### Features

* **DMX:** Adds DMX support directly to Thorium. It supports many DMX drivers, including ENTTEC Pro USB, ARTNET, and sACN (e1.31). Information on how to configure and use DMX in Thorium is available on the Thorium website https://thoriumsim.com/docs/dmx_config/ Closes [#2919](https://github.com/Thorium-Sim/thorium/issues/2919) ([9724ce8](https://github.com/Thorium-Sim/thorium/commit/9724ce8ca26242a32231b8fdb8f631cfb92b467c))
* **Keyboard:** Expands the keyboard config to support 10-key keyboard layouts. Closes [#2911](https://github.com/Thorium-Sim/thorium/issues/2911) ([7fa9f20](https://github.com/Thorium-Sim/thorium/commit/7fa9f202f8721d59ad78e74b98d4333676883668))
* **Reactor:** Add the ability to split the reactor into left and right wing power. This requires an adjustment on the Reactor System Config, as well as assigning the special power distribution cards for left and right wing to separate stations. Closes [#2906](https://github.com/Thorium-Sim/thorium/issues/2906) ([62a9a5f](https://github.com/Thorium-Sim/thorium/commit/62a9a5f3aaec72b0e0f36ed147fe93762881c1e0))
* **Sensors:** Adds a sonar ping feature to sensors, which hides contacts from view unless the crew sends a ping. Contacts disappear shortly after the ping uncovers them. It can be set up to automatically ping at a high or low interval, or ping by manually clicking a button. Pinging on sensors affects stealth. This will be enabled by default, but you can turn it off on the sensors system config or in the Extras tab of sensors core. Closes [#2913](https://github.com/Thorium-Sim/thorium/issues/2913) ([f7ce893](https://github.com/Thorium-Sim/thorium/commit/f7ce893923b5f90be723c9065ad4da7c85f6a80e))
* **Sensors:** Makes sensors processed data persistently stored and visible in a list on the sensors screen. This allows the sensors officer to see what past sensor information was sent to them, along with how long ago the information was sent. Also allows the flight director to remove items from the processed data history if they accidentally send something. Closes [#2907](https://github.com/Thorium-Sim/thorium/issues/2907) ([559acd0](https://github.com/Thorium-Sim/thorium/commit/559acd09aa4e65d5bee2cc567dee2156444f2cee))
* **Station Sets:** Adds a duplicate, export, and import button to station sets. Closes [#2908](https://github.com/Thorium-Sim/thorium/issues/2908) ([c75cbaf](https://github.com/Thorium-Sim/thorium/commit/c75cbaf0f629d802a5361c5b6348065776b83004))
* **Task Templates:** Adds export and import to task templates. Closes [#2921](https://github.com/Thorium-Sim/thorium/issues/2921) ([b58554c](https://github.com/Thorium-Sim/thorium/commit/b58554ce52dd5512c4b2db1657fbbbaf24f7b246))
* **Tasks:** Adds a button to the crew task screen allowing them to show and hide completed tasks. Closes  [#2924](https://github.com/Thorium-Sim/thorium/issues/2924) ([1eae155](https://github.com/Thorium-Sim/thorium/commit/1eae1550fea76bf8e2c43a145dfe75cf95b77191))
* **Tasks:** Made it possible to specify delays on macros executed with tasks. Closes [#2922](https://github.com/Thorium-Sim/thorium/issues/2922) ([06195c8](https://github.com/Thorium-Sim/thorium/commit/06195c8d9f77255f77ef10439b291ecdd811d8e3))
* **Teams:** Adds a search bar to the teams assignment screen. Closes [#2891](https://github.com/Thorium-Sim/thorium/issues/2891) ([67c3217](https://github.com/Thorium-Sim/thorium/commit/67c32176893428824020553d1680542df41627b1))
* **Timeline:** Adds a new timeline step: Change Timeline Mission. This allows you to change what the current timeline is in the middle of a flight, or switch to a different step in the current mission. Activating this action happens by clicking on the button for the timeline you want to switch to in the timeline core. This feature can be used to create branching timelines, where based on the decisions of the crew you can jump to one timeline or to a different timeline. Closes [#2871](https://github.com/Thorium-Sim/thorium/issues/2871) ([4de8cf1](https://github.com/Thorium-Sim/thorium/commit/4de8cf14995a45228de8b6c463f40d6d0695b67b))
* **Tractor Beam:** Adds support for up to four tractor beams on one simulator. Configure it on the Tractor Beam systems config. Closes [#2929](https://github.com/Thorium-Sim/thorium/issues/2929) ([eb3776b](https://github.com/Thorium-Sim/thorium/commit/eb3776b719504ff58ede92c283efb2bc77cc0c93))

# [2.9.0](https://github.com/Thorium-Sim/thorium/compare/2.8.0...2.9.0) (2020-04-09)

### Features

- **Missions:** Added simulator capability checking to make sure you don't run a
  mission on a simulator that doesn't have the necessary cards and systems.
  Closes [#2873](https://github.com/Thorium-Sim/thorium/issues/2873)
  ([13b0426](https://github.com/Thorium-Sim/thorium/commit/13b0426be1479c4c253cdc5002d799158a184b35))
- **Missions:** Make all mission lists sortable. Also add category option to
  missions.
  ([b6ba86c](https://github.com/Thorium-Sim/thorium/commit/b6ba86c9ab6da3a992bd01db8f3c1ec3080eeb94))
- **Timeline:** Add "Build" timeline mode which allows you to create timelines
  from the core. Also a 'Recording Button' (it looks like a banana) in the build
  mode that tracks actions you perform in the core and turns them into the
  corresponding timeline macros. Click the banana to start recording, click
  again to stop recording.
  ([3df3d55](https://github.com/Thorium-Sim/thorium/commit/3df3d558a1c332d334ae9bed3f3e10712075cc67))
- **Timeline:** Refactor the timeline core to support all three timeline modes -
  Standard, Classic, and Thumbnail.
  ([fcda057](https://github.com/Thorium-Sim/thorium/commit/fcda057e816bcc9942de1fc479935f149b6fd931))

# [2.8.0](https://github.com/Thorium-Sim/thorium/compare/2.7.0...2.8.0) (2020-03-21)

### Bug Fixes

- **Assets:** Fixes an issue where asset previews don't appear. Closes
  [#2855](https://github.com/Thorium-Sim/thorium/issues/2855)
  ([8d0a769](https://github.com/Thorium-Sim/thorium/commit/8d0a7693cbd7ae0b444e130daebff4559c16a3ff))
- **Kiosk:** Fixes an issue where the server doesn't properly start up when
  first using Thorium. Closes
  [#2837](https://github.com/Thorium-Sim/thorium/issues/2837)
  ([f1a86dc](https://github.com/Thorium-Sim/thorium/commit/f1a86dc53b503a8bd36181a7b1115a2aa81177f6))
- **Messaging:** Fixes an issue where messaging core doesn't allow new
  conversations to be started. Closes
  [#2838](https://github.com/Thorium-Sim/thorium/issues/2838)
  ([25feee4](https://github.com/Thorium-Sim/thorium/commit/25feee48bb6195be5bf2824c5c259fd918eb063a))
- **Messaging:** The new message alert for messaging shouldn't appear for the
  top item incorrectly. Closes
  [#2832](https://github.com/Thorium-Sim/thorium/issues/2832)
  ([1a0d2c5](https://github.com/Thorium-Sim/thorium/commit/1a0d2c5f7fddd178525acab647fdb99b81d9f6d2))
- **Probes:** Makes it possible to set the probe count to 0 from the probes
  core. Closes [#2840](https://github.com/Thorium-Sim/thorium/issues/2840)
  ([30c3fd7](https://github.com/Thorium-Sim/thorium/commit/30c3fd7b635a44c16243f367a59d578c7681ceb9))
- **Railgun:** Tune the click radius of the railgun to make it more accurate.
  ([63fb21d](https://github.com/Thorium-Sim/thorium/commit/63fb21dda636f98eb33be5558b7c29be90303131))
- **Sensors:** Improves the Update Sensor Grid macro, fixing a few problems with
  it. Closes [#2829](https://github.com/Thorium-Sim/thorium/issues/2829). Closes
  [#2834](https://github.com/Thorium-Sim/thorium/issues/2834). Closes
  [#2839](https://github.com/Thorium-Sim/thorium/issues/2839)
  ([5585f4d](https://github.com/Thorium-Sim/thorium/commit/5585f4d336f98f982a2364bffff55af93ad09b85))
- **Sensors:** Non-square sensor contacts should now appear correctly on the
  grid. Note that square images are still preferred and will behave more
  appropriately. Fixes
  [#2865](https://github.com/Thorium-Sim/thorium/issues/2865)
  ([696dd5e](https://github.com/Thorium-Sim/thorium/commit/696dd5e9a847d0582dbe56e15ea896ed19ee9054))

### Features

- **Alert Condition:** Adds trigger for changing the alert condition. Closes
  [#2843](https://github.com/Thorium-Sim/thorium/issues/2843)
  ([430f95c](https://github.com/Thorium-Sim/thorium/commit/430f95cfeb77ed8224f592ca99d88aca741663d1))
- **Computer Core:** Add a timeline action for creating new hackers. Closes
  [#2861](https://github.com/Thorium-Sim/thorium/issues/2861)
  ([2f6bc15](https://github.com/Thorium-Sim/thorium/commit/2f6bc155325f6ee83b0ad152b7bb81ba206e916e))
- **Docking:** Add a timeline action for updating the status of shuttles and
  docking ports. It must be added to missions/triggers/etc and then configured
  on each simulator config. Closes
  [#2862](https://github.com/Thorium-Sim/thorium/issues/2862)
  ([93f8fcc](https://github.com/Thorium-Sim/thorium/commit/93f8fcc18d785834e2d4916ec521d8767fc7cf3b))
- **Internal Comm:** Adds a trigger for internal comm, including a switch option
  for whether all decks are being called. Closes
  [#2846](https://github.com/Thorium-Sim/thorium/issues/2846)
  ([4729b11](https://github.com/Thorium-Sim/thorium/commit/4729b11b204f69bb43d5fd370b8c3b4f6a63189f))
- **Jump Drive:** Adds triggers for jump drive activation/deactivation and ring
  extension/retraction. Closes
  [#2844](https://github.com/Thorium-Sim/thorium/issues/2844)
  ([13fc356](https://github.com/Thorium-Sim/thorium/commit/13fc356142026a6c35631c6e296c072c60469328))
- **Macros:** Add buttons to duplicate macros and the actions in the macros.
  Closes [#2868](https://github.com/Thorium-Sim/thorium/issues/2868)
  ([4b8a526](https://github.com/Thorium-Sim/thorium/commit/4b8a5262fba81d766a13ea4d23f51a1c1db8351b))
- **Notifications:** Adds a 'Core Reminder' and 'AuxCore Reminder' notification
  type in the "Send Notification" macro which can be added to any timeline
  action to provide reminders to core or auxcore. Closes
  [#2831](https://github.com/Thorium-Sim/thorium/issues/2831)
  ([b75dd0d](https://github.com/Thorium-Sim/thorium/commit/b75dd0dd6c98709d16f62ba6b197f38b8740fe23))
- **Sensors:** Adds a timeline action for responding to sensor scans. You can
  use this with triggers to automatically respond to sensor requests based on
  what they requested using fuzzy matching. Closes
  [#2859](https://github.com/Thorium-Sim/thorium/issues/2859)
  ([13a3477](https://github.com/Thorium-Sim/thorium/commit/13a3477cc5b7b9cc85a2a2639baf1df548f7e24a))
- **Timeline:** Adds a "Duplicate Item" button to the mission timeline config.
  Closes [#2857](https://github.com/Thorium-Sim/thorium/issues/2857)
  ([7ea8941](https://github.com/Thorium-Sim/thorium/commit/7ea89418b1cc45270d10cedfe34849c85f0fef3e))
- **Timeline:** Adds a special new timeline action which allows you to print
  PDFs from your timeline. PDFs must be uploaded as assets to be usable. Note
  that the computer that runs the timeline action will see a print dialog and
  must be connected to a printer for it to work correctly. Don't use this
  timeline action on crew computers. It also must be initiated from the timeline
  or macros core; it won't do anything if you execute it from a trigger. Closes
  [#2852](https://github.com/Thorium-Sim/thorium/issues/2852)
  ([aaa8985](https://github.com/Thorium-Sim/thorium/commit/aaa8985d6601588d98e5c800863c17e2fa37f64e))
- **Triggers:** Adds fuzzy text matching to trigger switches. This gives greater
  flexibility when performing matches on your triggers that deal with text, like
  sensor scan answers. Refs
  [#2859](https://github.com/Thorium-Sim/thorium/issues/2859)
  ([5431033](https://github.com/Thorium-Sim/thorium/commit/54310337aa289cbf758b801e7ef99057ed3fe19c))
- **Viewscreen:** Add the Sensors Grid as a viewscreen card. Closes
  [#2864](https://github.com/Thorium-Sim/thorium/issues/2864)
  ([3d83765](https://github.com/Thorium-Sim/thorium/commit/3d83765236a77027efd35def831491bd7c0d02c4))

# [2.7.0](https://github.com/Thorium-Sim/thorium/compare/v2.6.1...2.7.0) (2020-03-07)

### Bug Fixes

- **Countermeasures:** A number of fixes to countermeasures. Adds ability to
  activate countermeasures before they are launched. Sorts available module
  list. Built modules can be removed and the resources are recycled for half of
  their original value. Add a field for flight directors to add notes to
  countermeasures so they know how they responded to them. Countermeasures that
  have not been built are now visible to the flight director. Fixes
  [#2817](https://github.com/Thorium-Sim/thorium/issues/2817)
  ([5de3de5](https://github.com/Thorium-Sim/thorium/commit/5de3de534a7cf5107b44325806f930d70d70693a))
- **Damage Report Config:** Fixes an issue where Long Range Message damage
  report configurations don't accept destination values. Closes
  [#2826](https://github.com/Thorium-Sim/thorium/issues/2826)
  ([fdc8964](https://github.com/Thorium-Sim/thorium/commit/fdc8964a313e198237a08e1f249af08af881e42a))
- **Library:** Fixes an issue where new library entries cannot be added. Closes
  [#2795](https://github.com/Thorium-Sim/thorium/issues/2795)
  ([58e5569](https://github.com/Thorium-Sim/thorium/commit/58e5569636587fe3d0c49dcb006c0040aab36f3c))
- **Sensors:** Fixes an issue where sensors core doesn't load at all. Closes
  [#2813](https://github.com/Thorium-Sim/thorium/issues/2813)
  ([ab918bd](https://github.com/Thorium-Sim/thorium/commit/ab918bd88ba87a6de535d47e151fdf1c666b4949))
- **Viewscreen:** Fixes an issue where having the viewscreen core layout open
  causes videos to auto-next multiple times.
  ([230d302](https://github.com/Thorium-Sim/thorium/commit/230d302cd648fcedfe246bdd55a26c0c88c538fa))

### Features

- **Targeting:** Add an extra option to make it possible to target contacts that
  are moving by clicking on them. Closes
  [#2822](https://github.com/Thorium-Sim/thorium/issues/2822)
  ([3a74c51](https://github.com/Thorium-Sim/thorium/commit/3a74c51af6f3ece1732d728a22cd25d1a65b27d8))

## [2.6.1](https://github.com/Thorium-Sim/thorium/compare/2.6.0...2.6.1) (2020-03-02)

### Bug Fixes

- **CRM:** CRM Core now properly shows attacking status. Closes
  [#2804](https://github.com/Thorium-Sim/thorium/issues/2804)
  ([1704e11](https://github.com/Thorium-Sim/thorium/commit/1704e1141e3b5eaee725efad03010d71df0e1592))
- **Damage Reports:** Fixes an issue where damage reports can be requested after
  they have been fixed. Fixes
  [#2783](https://github.com/Thorium-Sim/thorium/issues/2783)
  ([8093cec](https://github.com/Thorium-Sim/thorium/commit/8093cecf807e7ef532307e0e592e65ec5a237355))
- **Messaging Core:** Fixes an issue where messaging core gets frozen. Closes
  [#2782](https://github.com/Thorium-Sim/thorium/issues/2782). Fixes
  [#2787](https://github.com/Thorium-Sim/thorium/issues/2787). Fixes
  [#2788](https://github.com/Thorium-Sim/thorium/issues/2788).
  ([c100fc5](https://github.com/Thorium-Sim/thorium/commit/c100fc509648a4f1ff2ccd74bd8a64934ab6beba))
- **Sensors:** Makes it so sensor contacts move based on the initial click
  location, making a more pleasant sensor contact movement experience. Closes
  [#2785](https://github.com/Thorium-Sim/thorium/issues/2785)
  ([f8cba4d](https://github.com/Thorium-Sim/thorium/commit/f8cba4d6f3351e86a8949d9c72cd605638d2ec92))
- **Targeting:** Fixes the styling of the targeting macro. Closes
  [#2781](https://github.com/Thorium-Sim/thorium/issues/2781)
  ([4ed4381](https://github.com/Thorium-Sim/thorium/commit/4ed43814a76a19f354bca68e44c2dcea1412015a))
- **Thrusters:** Improves the thrusters timeout. Closes
  [#2784](https://github.com/Thorium-Sim/thorium/issues/2784)
  ([47e3167](https://github.com/Thorium-Sim/thorium/commit/47e31670fbf139c1e1edbdefe6180c900d2fbe6c))
- **THX:** Makes it so clients that are not connected don't appear on the THX
  screen. Closes [#2802](https://github.com/Thorium-Sim/thorium/issues/2802)
  ([9d4671e](https://github.com/Thorium-Sim/thorium/commit/9d4671ecfb929e9acd84bb8dd273a13650b32c3f))
- **Tractor Beam:** Fixes an issue where the tractor beam power whacks out.
  ([874ced1](https://github.com/Thorium-Sim/thorium/commit/874ced1f2a03d4eb3c4bcb56c92b33836808dc35))
- **Transwarp:** Add a damage/insufficient power overlay to Transwarp. Closes
  [#2792](https://github.com/Thorium-Sim/thorium/issues/2792)
  ([a803fd6](https://github.com/Thorium-Sim/thorium/commit/a803fd644501734823ec0a512a091842c3c66ec0))
- **Transwarp:** Imrpoves the layout of the transwarp card on small screen
  sizes. Fixes [#2790](https://github.com/Thorium-Sim/thorium/issues/2790)
  ([53e696f](https://github.com/Thorium-Sim/thorium/commit/53e696f3cf47feec37a7898985e551ab6bc1ef85))

## [2.6.1](https://github.com/Thorium-Sim/thorium/compare/2.6.0...2.6.1) (2020-03-01)

### Bug Fixes

- **CRM:** CRM Core now properly shows attacking status. Closes
  [#2804](https://github.com/Thorium-Sim/thorium/issues/2804)
  ([1704e11](https://github.com/Thorium-Sim/thorium/commit/1704e1141e3b5eaee725efad03010d71df0e1592))
- **Damage Reports:** Fixes an issue where damage reports can be requested after
  they have been fixed. Fixes
  [#2783](https://github.com/Thorium-Sim/thorium/issues/2783)
  ([8093cec](https://github.com/Thorium-Sim/thorium/commit/8093cecf807e7ef532307e0e592e65ec5a237355))
- **Messaging Core:** Fixes an issue where messaging core gets frozen. Closes
  [#2782](https://github.com/Thorium-Sim/thorium/issues/2782). Fixes
  [#2787](https://github.com/Thorium-Sim/thorium/issues/2787). Fixes
  [#2788](https://github.com/Thorium-Sim/thorium/issues/2788).
  ([c100fc5](https://github.com/Thorium-Sim/thorium/commit/c100fc509648a4f1ff2ccd74bd8a64934ab6beba))
- **Sensors:** Makes it so sensor contacts move based on the initial click
  location, making a more pleasant sensor contact movement experience. Closes
  [#2785](https://github.com/Thorium-Sim/thorium/issues/2785)
  ([f8cba4d](https://github.com/Thorium-Sim/thorium/commit/f8cba4d6f3351e86a8949d9c72cd605638d2ec92))
- **Targeting:** Fixes the styling of the targeting macro. Closes
  [#2781](https://github.com/Thorium-Sim/thorium/issues/2781)
  ([4ed4381](https://github.com/Thorium-Sim/thorium/commit/4ed43814a76a19f354bca68e44c2dcea1412015a))
- **Thrusters:** Improves the thrusters timeout. Closes
  [#2784](https://github.com/Thorium-Sim/thorium/issues/2784)
  ([47e3167](https://github.com/Thorium-Sim/thorium/commit/47e31670fbf139c1e1edbdefe6180c900d2fbe6c))
- **THX:** Makes it so clients that are not connected don't appear on the THX
  screen. Closes [#2802](https://github.com/Thorium-Sim/thorium/issues/2802)
  ([9d4671e](https://github.com/Thorium-Sim/thorium/commit/9d4671ecfb929e9acd84bb8dd273a13650b32c3f))
- **Tractor Beam:** Fixes an issue where the tractor beam power whacks out.
  ([874ced1](https://github.com/Thorium-Sim/thorium/commit/874ced1f2a03d4eb3c4bcb56c92b33836808dc35))
- **Transwarp:** Add a damage/insufficient power overlay to Transwarp. Closes
  [#2792](https://github.com/Thorium-Sim/thorium/issues/2792)
  ([a803fd6](https://github.com/Thorium-Sim/thorium/commit/a803fd644501734823ec0a512a091842c3c66ec0))
- **Transwarp:** Imrpoves the layout of the transwarp card on small screen
  sizes. Fixes [#2790](https://github.com/Thorium-Sim/thorium/issues/2790)
  ([53e696f](https://github.com/Thorium-Sim/thorium/commit/53e696f3cf47feec37a7898985e551ab6bc1ef85))

# [2.6.0](https://github.com/Thorium-Sim/thorium/compare/2.5.2...2.6.0) (2020-02-20)

### Bug Fixes

- **Blackout:** Blackout now properly hides everything, including training
  windows. Closes [#2762](https://github.com/Thorium-Sim/thorium/issues/2762)
  ([8cc4364](https://github.com/Thorium-Sim/thorium/commit/8cc4364d395dfe2060e0a756e363e38a877d63d6))
- **Build:** Another fix to the build process.
  ([877d6d2](https://github.com/Thorium-Sim/thorium/commit/877d6d2cb9b8d7db224f3a566420c1fd59a21f94))
- **Damage Reports:** Removes the "Request Report" button when the report is
  provided. Closes [#2771](https://github.com/Thorium-Sim/thorium/issues/2771)
  ([b5b9724](https://github.com/Thorium-Sim/thorium/commit/b5b9724542fb1818fa82b3ec0f8625fb47a0fb85))
- **Flash:** Fixes issues with flash not working when sending processed sensor
  data or through the timeline. Closes
  [#2772](https://github.com/Thorium-Sim/thorium/issues/2772). Closes
  [#2765](https://github.com/Thorium-Sim/thorium/issues/2765).
  ([10b0049](https://github.com/Thorium-Sim/thorium/commit/10b0049290fa1eabf0a8399f8a78dbfc0f634470))
- **Messaging:** Makes messages scroll to bottom properly on core. Closes
  [#2760](https://github.com/Thorium-Sim/thorium/issues/2760)
  ([b7644d1](https://github.com/Thorium-Sim/thorium/commit/b7644d16b565496c9f9414a63e20fd795f2ed9b8))
- **Reactivation Codes:** Adds a small message to make it clear that the system
  is reactivating. Closes
  [#2763](https://github.com/Thorium-Sim/thorium/issues/2763)
  ([358814d](https://github.com/Thorium-Sim/thorium/commit/358814dab283b608d11e608518bcafa9e143065a))
- **Sensor Grid:** Fixes an issue where random contacts appear in the center of
  the sensor grid, making it impossible for regular contacts to be placed.
  Closes [#2773](https://github.com/Thorium-Sim/thorium/issues/2773). Closes
  [#2755](https://github.com/Thorium-Sim/thorium/issues/2755).
  ([a8a868b](https://github.com/Thorium-Sim/thorium/commit/a8a868ba3682e62e5b225df00b14103f613041e5))
- **Sensors:** Makes dragged sensor contacts follow the mouse better. Closes
  [#2214](https://github.com/Thorium-Sim/thorium/issues/2214). Closes
  [#2407](https://github.com/Thorium-Sim/thorium/issues/2407).
  ([997422b](https://github.com/Thorium-Sim/thorium/commit/997422b313c44fa55d645ffdbb4b236be52bc4cd))
- **Server:** Fixes an issue where the server crashes regularly. Closes
  [#2735](https://github.com/Thorium-Sim/thorium/issues/2735)
  ([d79c4fc](https://github.com/Thorium-Sim/thorium/commit/d79c4fc02f5f97798cf4378caff52fae79724033))
- **Spark:** Fixes an issue where Sparking a station never stops sparking.
  Closes [#2769](https://github.com/Thorium-Sim/thorium/issues/2769)
  ([f3863f0](https://github.com/Thorium-Sim/thorium/commit/f3863f0a72f311f35c4031beb2089bd3bcca7f32))

### Features

- **Auto-Updater:** Thorium now auto-updates in place at the push of a button,
  making it far easier to perform upgrades quickly.
  ([72255de](https://github.com/Thorium-Sim/thorium/commit/72255de24aa45813d4e9366c7f6db5afd4e161c7))
- **Countermeasures:** Adds a new system and card called Countermeasures.
  Designed to be prepared beforehand with configured modules to decoy, serve as
  a mine, or provide a proximity alert. Currently, the actions which the
  countermeasures perform is not automated - the flight director will have to
  pay attention to the countermeasures and make sure to give them the
  appropriate behavior. Closes
  [#139](https://github.com/Thorium-Sim/thorium/issues/139)
  ([831389d](https://github.com/Thorium-Sim/thorium/commit/831389db2e379f6c536fca3ba6a6411aa51edae2))

## [2.5.2](https://github.com/Thorium-Sim/thorium/compare/2.5.1...2.5.2) (2020-02-12)

### Bug Fixes

- **Build:** Another fix to the build process.
  ([259f6ed](https://github.com/Thorium-Sim/thorium/commit/259f6ed78cceb1e97e242f7a50d66b0ce16e5ca6))

## [2.5.1](https://github.com/Thorium-Sim/thorium/compare/2.5.0...2.5.1) (2020-02-12)

### Bug Fixes

- **Build Process:** Improves Thorium's automated build process.
  ([be177c8](https://github.com/Thorium-Sim/thorium/commit/be177c895d9794f43d1031020232129ef789e2f4))

# [2.5.0](https://github.com/Thorium-Sim/thorium/compare/2.4.3...2.5.0) (2020-02-12)

### Bug Fixes

- **Mission Library:** Makes the mission library work again. Closes
  [#2746](https://github.com/Thorium-Sim/thorium/issues/2746)
  ([1ae47c0](https://github.com/Thorium-Sim/thorium/commit/1ae47c075b3af64db87b2bea6c01beaefbcc7b8e))
- **Missions:** Fixes an issue where missions don't properly transfer to the
  simulator when starting a flight. Closes
  [#2744](https://github.com/Thorium-Sim/thorium/issues/2744)
  ([1f9ecd4](https://github.com/Thorium-Sim/thorium/commit/1f9ecd451f3a1c7686dcd14ddb7e5917b86565f9))
- **Power Flux:** Fixes the power flux buttons on the Systems core. Closes
  [#2741](https://github.com/Thorium-Sim/thorium/issues/2741)
  ([912cf0c](https://github.com/Thorium-Sim/thorium/commit/912cf0c38fd3ed1d4cb696cc4a58d4169d75719b))
- **QOTD:** Adds more quotes of the day. Also improves the deploy pipeline.
  ([44a62e1](https://github.com/Thorium-Sim/thorium/commit/44a62e1cfb45f76c5d79c510afec943992f38437))
- **Systems:** Fixes the order of the systems on systems core. Closes
  [#2747](https://github.com/Thorium-Sim/thorium/issues/2747)
  ([baec4b6](https://github.com/Thorium-Sim/thorium/commit/baec4b635d3e03281f89e167afdb8a3beb05171b))
- **Torpedos:** Fixes an issue where the torpedos component crashes the
  targeting screen. Closes
  [#2739](https://github.com/Thorium-Sim/thorium/issues/2739)
  ([fab0bd0](https://github.com/Thorium-Sim/thorium/commit/fab0bd05426d84fa319ac620ac99d97168ffabc7))
- **Various:** Fixes a number of issues. Closes
  [#2740](https://github.com/Thorium-Sim/thorium/issues/2740)
  ([8118584](https://github.com/Thorium-Sim/thorium/commit/8118584e5601dbc6dcad5f757058062398487083))
- **Viewscreen:** Properly centers items in the viewscreen. Closes
  [#2742](https://github.com/Thorium-Sim/thorium/issues/2742)
  ([42856a9](https://github.com/Thorium-Sim/thorium/commit/42856a9ec6d9713441dd4d7d26006757cc53ba89))

### Features

- **Advanced:** Makes it possible to change the Thorium data directory with the
  THORIUM_PATH environment variable. Intended for advanced users. Closes
  [#2757](https://github.com/Thorium-Sim/thorium/issues/2757)
  ([3842f72](https://github.com/Thorium-Sim/thorium/commit/3842f7299b448f41d72c19715ecfe65a4ae23cb7))

## [2.4.3](https://github.com/Thorium-Sim/thorium/compare/v2.4.2...2.4.3) (2020-02-05)

### Bug Fixes

- **Power Distribution:** Fixes an issue where power distribution crashes.
  ([a9677dc](https://github.com/Thorium-Sim/thorium/commit/a9677dce0d285a201610412a5ee1dcc07ee8c442))

## [2.4.2](https://github.com/Thorium-Sim/thorium/compare/v2.4.1...2.4.2) (2020-02-04)

### Bug Fixes

- **Server:** Fixes an issue where the server crashes regularly. Closes
  [#2735](https://github.com/Thorium-Sim/thorium/issues/2735)
  ([0d3a6e6](https://github.com/Thorium-Sim/thorium/commit/0d3a6e6d570374b46d3348a8953795452ef79aae))

## [2.4.1](https://github.com/Thorium-Sim/thorium/compare/v2.4.0...2.4.1) (2020-02-01)

### Bug Fixes

- **Cargo:** Makes it so clicking the room in the "Find Cargo" list selects that
  room for transferring cargo. Closes
  [#2733](https://github.com/Thorium-Sim/thorium/issues/2733)
  ([0f87c56](https://github.com/Thorium-Sim/thorium/commit/0f87c563992db35597b189eef767b971986c4bc1))
- **Hotkeys:** Fixes issues with hotkeys crashing the core. Closes
  [#2729](https://github.com/Thorium-Sim/thorium/issues/2729)
  ([1f81d2b](https://github.com/Thorium-Sim/thorium/commit/1f81d2b32d443c1f8ab3c617bc33007b069abcef))
- **Kiosk:** Fix an error when trying to enter the kiosk. Closes
  [#2727](https://github.com/Thorium-Sim/thorium/issues/2727)
  ([34ac1be](https://github.com/Thorium-Sim/thorium/commit/34ac1be2aec243ee02684aa2261ee8f6b02d620d))
- **Kiosk:** Makes it possible to start a Kiosk after the server has been
  started. Closes [#2728](https://github.com/Thorium-Sim/thorium/issues/2728)
  ([b8af5f0](https://github.com/Thorium-Sim/thorium/commit/b8af5f0d94a7aa452414b823a9c780f4102d7ba7))
- **Sidebar:** Fixes the login name core not showing up on the sidebar. You
  might have to reconfigure your sidebar so it is properly using the "Hypercard
  And Login Name Core". Closes
  [#2732](https://github.com/Thorium-Sim/thorium/issues/2732)
  ([dea1794](https://github.com/Thorium-Sim/thorium/commit/dea1794becb426e95bc569afe03f5c21ebcb25f2))

# [2.4.0](https://github.com/Thorium-Sim/thorium/compare/v2.3.0...2.4.0) (2020-01-25)

### Bug Fixes

- **Client:** Fixes an issue where the client ID shows up as "undefined" when
  using the kiosk. Closes
  [#2720](https://github.com/Thorium-Sim/thorium/issues/2720). Closes
  [#2719](https://github.com/Thorium-Sim/thorium/issues/2719)
  ([2953a4f](https://github.com/Thorium-Sim/thorium/commit/2953a4f7d943cc1e719b3ba53bac77f36fd3e9e8))
- **Code Cyphers:** Fixes issues with the Borg font formatting. Closes
  [#2722](https://github.com/Thorium-Sim/thorium/issues/2722)
  ([d7335b5](https://github.com/Thorium-Sim/thorium/commit/d7335b5d93aebfb8c15c8add87fe36e5d69da2ab))
- **Kiosk:** Fixes an issue where starting the server on httpOnly didn't behave
  correctly. Fixes [#2723](https://github.com/Thorium-Sim/thorium/issues/2723)
  ([5104cbb](https://github.com/Thorium-Sim/thorium/commit/5104cbbbb96616b7dfd1858a5fd3021881678662))
- **Planetary Scan Viewscreen:** Adds a button to remove the clouds texture from
  the planetary scan. Closes
  [#2721](https://github.com/Thorium-Sim/thorium/issues/2721)
  ([f640caf](https://github.com/Thorium-Sim/thorium/commit/f640caf6c0b168e94f9c3332eae629dd8db2c9d9))

### Features

- **Signal Jammer:** Adds an option to the signal jammer system to have it add
  interference to the Sensors grid when the signal jammer is active. The more
  power is in the signal jammer, the deeper the interference. Closes
  [#2718](https://github.com/Thorium-Sim/thorium/issues/2718).
  ([a909bc8](https://github.com/Thorium-Sim/thorium/commit/a909bc857cf315b221dd9b5912490339a0a55cfd))

# [2.3.0](https://github.com/Thorium-Sim/thorium/compare/v2.2.0...2.3.0) (2020-01-18)

### Bug Fixes

- **Card Change:** Fixes an issue where resetting a flight or creating a new
  flight would cause clients to remain on the same card, which might not be the
  first one. Now they will always reset to the first card on flight creation or
  reset. Closes [#2713](https://github.com/Thorium-Sim/thorium/issues/2713)
  ([e06c700](https://github.com/Thorium-Sim/thorium/commit/e06c7003b3cda99e63fa5b5cf7b98922208da8a9))
- **Cargo:** Transferring cargo no longer results in logs with 0 of a certain
  item being sent. Closes
  [#2705](https://github.com/Thorium-Sim/thorium/issues/2705)
  ([6582aa8](https://github.com/Thorium-Sim/thorium/commit/6582aa8093892268979250d2a45e9617d8d1d2f8))
- **Comm Viewscreen:** Improvements to the communications viewscreen, including
  limiting the number of connected calls displayed on it to five so the
  viewscreen doesn't crash. Closes
  [#2704](https://github.com/Thorium-Sim/thorium/issues/2704)
  ([46e0c7e](https://github.com/Thorium-Sim/thorium/commit/46e0c7ec7cb600ec4bad19287f2f40d24eef2cf8))
- **Command Line Core:** Fixes broken layout on Command Line Core. Closes
  [#2712](https://github.com/Thorium-Sim/thorium/issues/2712)
  ([41c2e46](https://github.com/Thorium-Sim/thorium/commit/41c2e46b645b0a3136e6a7ee85696fcc4b5d6e07))
- **Core:** Cancelling an input when clicking on a yellow box now does no
  action. Closes [#2687](https://github.com/Thorium-Sim/thorium/issues/2687)
  ([ac9bd2d](https://github.com/Thorium-Sim/thorium/commit/ac9bd2d5e0e038ce654b47b5483f03f182917648))
- **Hotkeys:** Core no longer blacks out when opening Function Key (F1, etc)
  overlays. Closes [#2700](https://github.com/Thorium-Sim/thorium/issues/2700)
  ([445b3ba](https://github.com/Thorium-Sim/thorium/commit/445b3baf6a98e95fcee451011400688032029f30))
- **Login Name Core:** Renamed Login Name core to be "Hypercard and Login Name
  Core". You might have to reconfigure your core layout if you have that core on
  there. Closes [#2690](https://github.com/Thorium-Sim/thorium/issues/2690)
  ([027ba75](https://github.com/Thorium-Sim/thorium/commit/027ba755246cc55f8b7ddd5047b2ae0cea120010))
- **Navigation:** Add a limit to the number of characters that can be typed in
  navigation fields, so it doesn't break the screen layout. Closes
  [#2701](https://github.com/Thorium-Sim/thorium/issues/2701)
  ([dc2b977](https://github.com/Thorium-Sim/thorium/commit/dc2b9770956ee446d0020271ce6eb65c0dfe5bb6))
- **Probes:** When manually launching probes on a torpedo-launch configured
  simulator, the probe count in the torpedo tube will decrease. Closes
  [#2684](https://github.com/Thorium-Sim/thorium/issues/2684)
  ([295689b](https://github.com/Thorium-Sim/thorium/commit/295689b8b51c87dfdf95751c65a2197f4a683022))
- **Science Detector:** The science probe detectors now properly work. Closes
  [#2693](https://github.com/Thorium-Sim/thorium/issues/2693)
  ([09f9fda](https://github.com/Thorium-Sim/thorium/commit/09f9fda261a8597e924ad1fb189b872a612cdc83))
- **Sensor Scans:** Disables the "Begin Scan" button until something is put in
  the sensor scan box. Closes
  [#2708](https://github.com/Thorium-Sim/thorium/issues/2708)
  ([f080df8](https://github.com/Thorium-Sim/thorium/commit/f080df89e7ed8e1127dfd2ee05146c4501cd6c31))
- **Sensors:** Selected sensor contacts on the crew screens now appear on the
  core. Closes [#2699](https://github.com/Thorium-Sim/thorium/issues/2699)
  ([92c5f57](https://github.com/Thorium-Sim/thorium/commit/92c5f575f47da9c4a41b05c61c3420bde654eab4))
- **Server:** The 'Start Server Automatically' checkbox now works. Closes
  [#2709](https://github.com/Thorium-Sim/thorium/issues/2709)
  ([39a48c7](https://github.com/Thorium-Sim/thorium/commit/39a48c793498808857b34df8e7c82504d565a5fd))
- **Viewscreen:** Adds the course calculation image back to the course
  calculation viewscreen. Closes
  [#2706](https://github.com/Thorium-Sim/thorium/issues/2706)
  ([bed78a2](https://github.com/Thorium-Sim/thorium/commit/bed78a2e3bcfacc42e934fb32facb9c5c3f40a8d))

### Features

- **Auto Update:** Adds auto-update back to Thorium. Available updates are
  displayed in the initial Thorium app (before launching the server and client)
  and updates are downloaded to the user's downloads folder.
  ([7dd7c82](https://github.com/Thorium-Sim/thorium/commit/7dd7c82d31c5095c37833e8c5b68b5988d70a1d8))
- **HTTPS:** Implements HTTPS for Thorium Server, along with the ability to
  specify your own port and SSL certificates. As of this release, you must use
  the kiosk bundled with Thorium 2.3 to have proper kiosk access. If that's not
  possible or convenient, you can check the 'HTTP Only' checkbox when starting
  Thorium Server to disable HTTPS and allow Thorium to work as it did before.
  HTTPS enables advanced features in future versions of Thorium that aren't
  possible without a secure connection.
  ([90d2c1f](https://github.com/Thorium-Sim/thorium/commit/90d2c1f35576b34843fae6c53d0377f6e213c7d4))

# [2.2.0](https://github.com/Thorium-Sim/thorium/compare/v2.1.0...2.2.0) (2020-01-03)

### Bug Fixes

- **Dilithium Stress:** Properly synchronizes the core and station stress
  levels. Closes [#2674](https://github.com/Thorium-Sim/thorium/issues/2674)
  ([0ff5f0e](https://github.com/Thorium-Sim/thorium/commit/0ff5f0e3064bb0861219b00dc7808b119289e324))
- **Electron:** Fixes an issue where an indecipherable error appears when the
  server is shut down. Closes
  [#2672](https://github.com/Thorium-Sim/thorium/issues/2672)
  ([84259ea](https://github.com/Thorium-Sim/thorium/commit/84259eac48c6470acec7bca4143820c905cb8b0a))
- **Sensors:** Fixes the creation of duplicate sensor contacts when dragging one
  to the screen. Closes
  [#2675](https://github.com/Thorium-Sim/thorium/issues/2675)
  ([dd78047](https://github.com/Thorium-Sim/thorium/commit/dd7804765a0c9fa6be3f94252936b99088b54539))
- **Space EdVentures:** Properly restores the connection to Space EdVentures.
  This might require re-inputting the Space EdVentures API token into your
  Thorium settings. Closes
  [#2676](https://github.com/Thorium-Sim/thorium/issues/2676)
  ([2e9f18d](https://github.com/Thorium-Sim/thorium/commit/2e9f18dde9536e45f69b9ab89d10e710d67edce3))

### Features

- **Records:** Adds additional capabilities to records. Adds the ability to
  create auto-generated external records snippets. This can be used for records
  logs, or inspecting the logs of other ships. Also adds macros for adding
  snippets to the ship or to existing snippets. Refs
  [#2663](https://github.com/Thorium-Sim/thorium/issues/2663)
  ([6400f9b](https://github.com/Thorium-Sim/thorium/commit/6400f9b26e24bd233109b9bb628f538958f0aa4b))

# [2.1.0](https://github.com/Thorium-Sim/thorium/compare/v2.0.0...2.1.0) (2019-12-23)

### Bug Fixes

- **Cargo:** Improves the cargo core so specialized docking ports appear in the
  list when the ship is present and disappear when the ship is gone. Closes
  [#2667](https://github.com/Thorium-Sim/thorium/issues/2667)
  ([b8d4f43](https://github.com/Thorium-Sim/thorium/commit/b8d4f43a3eeb09bb501b3af572fec2af3913921d))
- **Crew Inventory:** Fixes an issue where inventory can be duplicated. Closes
  [#2668](https://github.com/Thorium-Sim/thorium/issues/2668)
  ([948eb13](https://github.com/Thorium-Sim/thorium/commit/948eb13aba9ecc7c6ddc442ffa0353d5c51a2936))
- **Macros:** Fixes an issue where setting long range message presets without
  any presets causes the server to crash. Closes
  [#2641](https://github.com/Thorium-Sim/thorium/issues/2641)
  ([077dd63](https://github.com/Thorium-Sim/thorium/commit/077dd636cc06f45cbc0ede477a29b2e34b8f6417))
- **Probes:** Removes extra text from the probe control core. Closes
  [#2652](https://github.com/Thorium-Sim/thorium/issues/2652)
  ([ed476bd](https://github.com/Thorium-Sim/thorium/commit/ed476bd4226aebee753b46f5614a387ffda4cf1f))
- **Reactor:** Warn of Unbalanced Power checkbox should now stay unchecked.
  Fixes [#2651](https://github.com/Thorium-Sim/thorium/issues/2651)
  ([f5413dd](https://github.com/Thorium-Sim/thorium/commit/f5413ddec9185c3c08619a8cc4f514fd3ebb7997))
- **Reports:** Fixes an issue where adding an R&D or Engineering report for an
  exsiting system actually breaks that system. Closes
  [#2594](https://github.com/Thorium-Sim/thorium/issues/2594)
  ([e8dbb23](https://github.com/Thorium-Sim/thorium/commit/e8dbb23a5485508f3f85d8d181c7d5e09b9ff672))
- **Roster:** Makes the search bars for the roster more visible. Closes
  [#2665](https://github.com/Thorium-Sim/thorium/issues/2665)
  ([db2e7fc](https://github.com/Thorium-Sim/thorium/commit/db2e7fc04a1bfc56ebb1a3a4c2aa0b8cee5c3c04))
- **Sensors:** Fixes an issue where you can't put two planets down at once.
  Closes [#2659](https://github.com/Thorium-Sim/thorium/issues/2659)
  ([9c835b2](https://github.com/Thorium-Sim/thorium/commit/9c835b2384e60812844cdc9aa4db3db2c760d100))
- **Sidebar:** Fixes an issue on the core sidebar where it sometimes reverts.
  Closes [#2576](https://github.com/Thorium-Sim/thorium/issues/2576)
  ([8de9817](https://github.com/Thorium-Sim/thorium/commit/8de981788decc8d781833574b690e73a1e56035f))
- **Sounds:** Fixes an issue where playing a random sound from a folder doesn't
  work for triggers, interfaces, command lines, etc. Closes
  [#2647](https://github.com/Thorium-Sim/thorium/issues/2647)
  ([2e24827](https://github.com/Thorium-Sim/thorium/commit/2e24827bd131cfc15c29cb314af265c4db06d453))
- **Tasks:** Fixes an issue with the "Add Task" macro. Closes
  [#2650](https://github.com/Thorium-Sim/thorium/issues/2650)
  ([f198dbb](https://github.com/Thorium-Sim/thorium/commit/f198dbbd1b28d39d184a7090e7a6039bcce31834))
- **Timeline:** Makes it more obvious that timeline items need to have the Edit
  button pushed before you can edit them. Closes
  [#2658](https://github.com/Thorium-Sim/thorium/issues/2658)
  ([2b44c89](https://github.com/Thorium-Sim/thorium/commit/2b44c89d87d58593ec48a388d1dd16b802a6a0ba))
- **Torpedos:** Changing torpedo counts on the torpedo core can now be cancelled
  without zeroing out. Closes
  [#2643](https://github.com/Thorium-Sim/thorium/issues/2643)
  ([bd76ed6](https://github.com/Thorium-Sim/thorium/commit/bd76ed68b7ba5d0fd48af334fd70b5e89d075bed))
- **Training:** If there is audio or video training assigned, it no longer shows
  the on-screen text training. Closes
  [#2660](https://github.com/Thorium-Sim/thorium/issues/2660)
  ([013a197](https://github.com/Thorium-Sim/thorium/commit/013a1977612d459c957775f2e13bc3921134df3d))
- **Training:** Widgets now are a layer below the training player so they don't
  show up when the training player is over them. Closes
  [#2666](https://github.com/Thorium-Sim/thorium/issues/2666)
  ([669b4ac](https://github.com/Thorium-Sim/thorium/commit/669b4acbfd01f59cd8fcb454e0ca89e2a47f3ac4))
- **Training Mode:** Automatic Training mode responding now persists if the
  server is restarted or shut down for some reason. Closes
  [#2645](https://github.com/Thorium-Sim/thorium/issues/2645)
  ([f9182ad](https://github.com/Thorium-Sim/thorium/commit/f9182ade42f4abe4d410b08bde5f1476bbbb70e4))

### Features

- **Station Control:** Adds a new card with the ability to transfer control of a
  card from one station to another. This can allow other crew members to help
  another crew member occupied on one of their screens. Adds a column to the
  "Clients" core to show what card each client is currently on. Closes
  [#2662](https://github.com/Thorium-Sim/thorium/issues/2662)
  ([6c23f61](https://github.com/Thorium-Sim/thorium/commit/6c23f61ba6ad2b85b5de4cfd3fb866a9cd462623))

# [2.0.0](https://github.com/Thorium-Sim/thorium/compare/1.22.0...2.0.0) (2019-12-14)

### Bug Fixes

- **CardCore:** Fixes an issue where card core doesn't hide or show cards when
  you check the checkbox.
  ([da2ad5d](https://github.com/Thorium-Sim/thorium/commit/da2ad5d89657be31e3e82541d2835eebd6355df2))
- **Cards:** Fixes an issue where hiding a card causes a server crash. Closes
  [#2639](https://github.com/Thorium-Sim/thorium/issues/2639)
  ([f35a8a0](https://github.com/Thorium-Sim/thorium/commit/f35a8a0cb3f207b42435b5c99b637f811b3742f7))
- **Dynamic Core:** Fixes a bug with reordering Dynamic Core layouts. Closes
  [#2597](https://github.com/Thorium-Sim/thorium/issues/2597)
  ([eb12b5e](https://github.com/Thorium-Sim/thorium/commit/eb12b5e3a49b17a7b0ac25f1d9c6daa449d74f24))
- **EpsilonLayout:** Fixes strange card hiliting in the card switcher. Closes
  [#2596](https://github.com/Thorium-Sim/thorium/issues/2596)
  ([deab98a](https://github.com/Thorium-Sim/thorium/commit/deab98a721d21f69afde52dbcab5f415d5fa33db))
- **Icons:** Makes the icons for widgets and elsewhere smaller and more
  performant.
  ([7e9a53f](https://github.com/Thorium-Sim/thorium/commit/7e9a53fed8e013e4a5e8ad2cea675c7127532acb))
- **Issue Tracker:** Improvements to the issue submitter.
  ([8acca8d](https://github.com/Thorium-Sim/thorium/commit/8acca8d40c9a351e196c005a347ef41eb2035a86))
- **Lighting:** Improves the layout and format of the Lighting core and Next
  core in general. Closes
  [#2582](https://github.com/Thorium-Sim/thorium/issues/2582)
  ([cda389c](https://github.com/Thorium-Sim/thorium/commit/cda389ce622a44fd76909ffb1355d45de41824aa))
- **Power Distribution:** If a system is damaged and the power is removed, it
  will show as red instead of black.
  ([a7f08fe](https://github.com/Thorium-Sim/thorium/commit/a7f08fe193cbbc8fc4e958d612f849977c6f3a62))
- **Probes:** When adding equipment to a probe, it now shows the correct space
  used total. Closes [#2630](https://github.com/Thorium-Sim/thorium/issues/2630)
  ([5678c34](https://github.com/Thorium-Sim/thorium/commit/5678c34f1b130ab512aeae9a003119c1a04e5399))
- **Records:** Fixes scrollbars on the records core and card. Closes
  [#2598](https://github.com/Thorium-Sim/thorium/issues/2598)
  ([341eb32](https://github.com/Thorium-Sim/thorium/commit/341eb32a68eafff09fb0f5935b49504ea57620d4))
- **Scanning:** It's now not possible to change the scan type while a scan is in
  progress. Closes [#2633](https://github.com/Thorium-Sim/thorium/issues/2633)
  ([a62c2e8](https://github.com/Thorium-Sim/thorium/commit/a62c2e8968dd59dbb69c58dfb0f1d91381218142))
- **Shields:** Short clicking on the shield frequency buttons now makes them go
  down or up. Closes [#2629](https://github.com/Thorium-Sim/thorium/issues/2629)
  ([ee72960](https://github.com/Thorium-Sim/thorium/commit/ee7296053559dfaf10797ca13802fee8c8838861))
- **Sound Player:** Fixes an issue where UI sound effects not being present
  causes lag in the UI.
  ([a3daa85](https://github.com/Thorium-Sim/thorium/commit/a3daa853abf542814e955bbfdaffdfcb416fb8cc))
- **Targeting:** FIxes a minor issue where very large targets overflow out of
  the targeting grid.
  ([b28657f](https://github.com/Thorium-Sim/thorium/commit/b28657f5fa94be18a26b18eee00ba53f69941ae9))
- **Updater:** Disables auto-update in anticipation of Thorium 2.0. No other
  functional changes.
  ([6248a57](https://github.com/Thorium-Sim/thorium/commit/6248a57a290450f0567c4216f6f35c066261ccd4))
- **Viewscreen Core:** Makes the viewscreen core scroll better.
  ([9430215](https://github.com/Thorium-Sim/thorium/commit/9430215e16cf5271bad8c6b6820eceb8427e0ec9))
- **Widgets:** All widgets now close when the flight is reset. Closes
  [#2635](https://github.com/Thorium-Sim/thorium/issues/2635)
  ([fb961c4](https://github.com/Thorium-Sim/thorium/commit/fb961c48e0b021c02e958e487d3759b5c7c14e1b))
- **Widgets:** Puts the training and logout widgets back. Closes
  [#2634](https://github.com/Thorium-Sim/thorium/issues/2634)
  ([508d35a](https://github.com/Thorium-Sim/thorium/commit/508d35adef749a650c50a0914e4010b007fcd760))

### Features

- **Decoding:** Changes the background color of Long Range messages that have
  been decoded. Also reverses the order of messages as they come in so newer
  messages are on top. Closes
  [#2613](https://github.com/Thorium-Sim/thorium/issues/2613)
  ([eae24d8](https://github.com/Thorium-Sim/thorium/commit/eae24d863a9a4966f08469ad7da9e2c06418c2da))
- **Electron:** Updates the electron packaging.
  ([992d1cf](https://github.com/Thorium-Sim/thorium/commit/992d1cf2ea9ac897bbfe72b367f6e03cf2cd2911))
- **Messaging:** Adds persistent fields to the messaging and composer widgets.
  The text entered in will be persisted if the widget is closed and opened
  again. Closes [#2612](https://github.com/Thorium-Sim/thorium/issues/2612)
  ([2df756c](https://github.com/Thorium-Sim/thorium/commit/2df756c695dc06932660bbd6f8f646a34312c1c6))
- **MIDI:** Add MIDI board capabilities to Thorium. Currently, you can use the
  MIDI board to trigger macros when buttons are pressed, while sliders and
  rotors can be used to change radiation. More capabilities for buttons,
  sliders, and rotors will be added in the future. This implements this RFC:
  https://docs.google.com/document/d/1lxpsKVEGDl-Ft9VEFJXrBXDHxTzf0pvufXkH9I2Qw8A/edit
  ([5875941](https://github.com/Thorium-Sim/thorium/commit/58759412c1e6fa5909517c23ec488e5761fc635c))
- **MOTU:** Add support for MOTU digital audio mixers. Thorium is able to update
  mixer faders (volume) and mute and unmute individual input and output
  channels, as well as toggle which inputs are connected to which outputs. This
  is all done thorugh Macros, and must be manually configured. In other words,
  unless your Space Center has a MOTU device, you can ignore this.
  ([4200835](https://github.com/Thorium-Sim/thorium/commit/420083557b055fa296a2fa627a05ab9780171393))
- **Probes:** Add a training mode message to probe queries. Closes
  [#2614](https://github.com/Thorium-Sim/thorium/issues/2614)
  ([992fdbe](https://github.com/Thorium-Sim/thorium/commit/992fdbe9dce508b0f9ceb63fada236053aada195))
- **Probes:** Adds a button to core that can manually launch probes in a
  torpedo-launched probe simulator. Also adds a button that destroys all
  launched probes. Closes
  [#2587](https://github.com/Thorium-Sim/thorium/issues/2587)
  ([67c72aa](https://github.com/Thorium-Sim/thorium/commit/67c72aa2098f95a150922ab0161ea1a07a1a3e5d))
- **Training:** Improvements to the training player, including adding the
  ability to change the play rate. Apologies for younger crew members who erupt
  into giggles when they hear your voice speaking at half speed. Closes
  [#2640](https://github.com/Thorium-Sim/thorium/issues/2640)
  ([4fd4254](https://github.com/Thorium-Sim/thorium/commit/4fd4254ef77a75b934d2009c146e50621ad1eaa2))
- **Widgets:** Improves the sizing of some widgets, including messaging. Closes
  [#2611](https://github.com/Thorium-Sim/thorium/issues/2611)
  ([7d352fc](https://github.com/Thorium-Sim/thorium/commit/7d352fc4ba9d46f7d4f385d875b9bdbb56bac6db))

### BREAKING CHANGES

- **Electron:** Electron

# [1.22.0](https://github.com/Thorium-Sim/thorium/compare/1.21.0...1.22.0) (2019-10-14)

### Bug Fixes

- **Battle Core:** Makes it possible to update the default hitpoints again.
  Closes [#2550](https://github.com/Thorium-Sim/thorium/issues/2550)
  ([31e414f](https://github.com/Thorium-Sim/thorium/commit/31e414f))
- **Cargo:** The find overlay on cargo core is no longer obscured by the Add
  Inventory button. Closes
  [#2571](https://github.com/Thorium-Sim/thorium/issues/2571)
  ([9dd6210](https://github.com/Thorium-Sim/thorium/commit/9dd6210))
- **Lighting:** Changes lighting core blackout button to change the light colors
  to black instead of taking down the intensity. Closes
  [#2570](https://github.com/Thorium-Sim/thorium/issues/2570)
  ([c7529d9](https://github.com/Thorium-Sim/thorium/commit/c7529d9))
- **Probes:** Fixes a typo on the hydrogen burst scientific probe. Closes
  [#2564](https://github.com/Thorium-Sim/thorium/issues/2564)
  ([9e93b21](https://github.com/Thorium-Sim/thorium/commit/9e93b21))
- **Railgun:** Railgun projectiles no longer go outside the sensor ring. Closes
  [#2573](https://github.com/Thorium-Sim/thorium/issues/2573)
  ([cb168f3](https://github.com/Thorium-Sim/thorium/commit/cb168f3))
- **Sensor Scans:** Makes it so the scan request box wraps and scrolls for
  exceptionally long sensor scans. Closes
  [#2552](https://github.com/Thorium-Sim/thorium/issues/2552)
  ([afb1447](https://github.com/Thorium-Sim/thorium/commit/afb1447))
- **Sensors:** Adds a bit of vertical and horizontal snapping to the sensors
  movement circle. Closes
  [#2559](https://github.com/Thorium-Sim/thorium/issues/2559)
  ([08576d8](https://github.com/Thorium-Sim/thorium/commit/08576d8))
- **Sensors:** Made it so sensor contacts can be obnoxiously large. Closes
  [#2568](https://github.com/Thorium-Sim/thorium/issues/2568)
  ([795972d](https://github.com/Thorium-Sim/thorium/commit/795972d))
- **Sounds:** Fixes cancelling all sounds on sound player viewscreens and
  keyboards. Closes [#2560](https://github.com/Thorium-Sim/thorium/issues/2560).
  Closes [#2567](https://github.com/Thorium-Sim/thorium/issues/2567)
  ([e51b291](https://github.com/Thorium-Sim/thorium/commit/e51b291))

### Features

- **Engines:** Adds a trigger for engine speed changes. You can use a trigger
  switch to determine the name of the engine that was activated, or use "Full
  Stop" for when the engines are deactivated.
  ([06b5096](https://github.com/Thorium-Sim/thorium/commit/06b5096))

# [1.21.0](https://github.com/Thorium-Sim/thorium/compare/1.20.1...1.21.0) (2019-10-01)

### Bug Fixes

- **CRM:** Makes the CRM throttle joystick and phaser charging work on
  touchscreens. Closes
  [#2498](https://github.com/Thorium-Sim/thorium/issues/2498)
  ([f2a6bf5](https://github.com/Thorium-Sim/thorium/commit/f2a6bf5))
- **Damage Control:** Denying reactivation codes no longer repairs the system.
  Closes [#2538](https://github.com/Thorium-Sim/thorium/issues/2538). Closes
  [#2537](https://github.com/Thorium-Sim/thorium/issues/2537).
  ([3e207be](https://github.com/Thorium-Sim/thorium/commit/3e207be))
- **Targeting:** Fixes an issue where clicking the minus button on targeting
  removes the incorrect targeting contacts. Closes
  [#2539](https://github.com/Thorium-Sim/thorium/issues/2539)
  ([a79e09e](https://github.com/Thorium-Sim/thorium/commit/a79e09e))
- **Thrusters:** Fixes an issue where the up and down and yaw thruster bars
  disappear. ([227e1a6](https://github.com/Thorium-Sim/thorium/commit/227e1a6))
- **Torpedo Firing:** Torpedo launching scrolls when there are too many torpedo
  launchers. Closes [#2490](https://github.com/Thorium-Sim/thorium/issues/2490)
  ([cb9c7c1](https://github.com/Thorium-Sim/thorium/commit/cb9c7c1))
- **Transwarp:** The charging section that used to be called "Transwarp Core" is
  now labeled with the display name of the Transwarp system. Closes
  [#2491](https://github.com/Thorium-Sim/thorium/issues/2491)
  ([4285873](https://github.com/Thorium-Sim/thorium/commit/4285873))

### Features

- **General:** Adds copy/paste ability to damage report field and chat messages.
  Closes [#2544](https://github.com/Thorium-Sim/thorium/issues/2544).
  ([4b85d89](https://github.com/Thorium-Sim/thorium/commit/4b85d89))
- **Reactor:** Reactor control now displays the currently selected reactor
  efficiency setting. Closes
  [#2466](https://github.com/Thorium-Sim/thorium/issues/2466)
  ([7ec0696](https://github.com/Thorium-Sim/thorium/commit/7ec0696))
- **Records:** Add a records screen. This automatically generates records based
  on user actions in the simulator. Records can be compiled into snippets or
  composed into a draft Long Range Message. The Records Core allows the flight
  director to delete records or create arbitarary records. If you want to
  include automatically generated records for more systems, file an issue.
  ([18146c5](https://github.com/Thorium-Sim/thorium/commit/18146c5))
- **Tasks:** makes it possible to add pre-macros to tasks in the "Add Task"
  action definition. Closes
  [#2499](https://github.com/Thorium-Sim/thorium/issues/2499)
  ([4e87aa7](https://github.com/Thorium-Sim/thorium/commit/4e87aa7))

## [1.20.1](https://github.com/Thorium-Sim/thorium/compare/1.20.0...1.20.1) (2019-09-09)

### Bug Fixes

- **Damage Reports:** Repairing systems with a reactivation code now properly
  triggers any repair triggers. Closes
  [#2521](https://github.com/Thorium-Sim/thorium/issues/2521)
  ([dbeb660](https://github.com/Thorium-Sim/thorium/commit/dbeb660))
- **Engines:** Single engine screens now properly show a disabled message when
  there is not enough power or the system is damaged.
  ([a7b6052](https://github.com/Thorium-Sim/thorium/commit/a7b6052))
- **Exocomps:** Fixes a crash when trying to recall an exocomp while upgrading.
  Closes [#2523](https://github.com/Thorium-Sim/thorium/issues/2523)
  ([9eecc1b](https://github.com/Thorium-Sim/thorium/commit/9eecc1b))
- **Systems:** Properly relabels systems on the power distribution card when the
  name changes. Closes
  [#2531](https://github.com/Thorium-Sim/thorium/issues/2531)
  ([00b824f](https://github.com/Thorium-Sim/thorium/commit/00b824f))
- **Task Reports:** Provides ability to create custom systems from the task
  reports field. Closes
  [#2116](https://github.com/Thorium-Sim/thorium/issues/2116). Closes
  [#2115](https://github.com/Thorium-Sim/thorium/issues/2115). Closes
  [#2502](https://github.com/Thorium-Sim/thorium/issues/2502). Closes
  [#2503](https://github.com/Thorium-Sim/thorium/issues/2503).
  ([59bd0af](https://github.com/Thorium-Sim/thorium/commit/59bd0af))
- **Task Reports:** Task reports are now better integrated with damaged systems.
  Repair task reports for systems show up as damage reports and disable the
  related system until the report is cleared. Clicking on the damaged system on
  the systems core will automatically clear the report. Closes
  [#2502](https://github.com/Thorium-Sim/thorium/issues/2502)
  ([8eea8ef](https://github.com/Thorium-Sim/thorium/commit/8eea8ef))

# [1.20.0](https://github.com/Thorium-Sim/thorium/compare/1.19.2...1.20.0) (2019-08-31)

### Bug Fixes

- **Computer Core:** Fixes computer core history scrollbar. Closes
  [#2510](https://github.com/Thorium-Sim/thorium/issues/2510)
  ([b2f6cae](https://github.com/Thorium-Sim/thorium/commit/b2f6cae))
- **Heat:** Heat and coolant are now properly imported and exported from
  flights. Closes [#2519](https://github.com/Thorium-Sim/thorium/issues/2519)
  ([4b659a9](https://github.com/Thorium-Sim/thorium/commit/4b659a9))
- **Shields:** When using the "HIt All" button on shields, it won't override the
  existing damage report. Closes
  [#2408](https://github.com/Thorium-Sim/thorium/issues/2408)
  ([a621cb6](https://github.com/Thorium-Sim/thorium/commit/a621cb6))
- **Timer:** Fixes an issue that caused the timer core to crash. Closes
  [#2513](https://github.com/Thorium-Sim/thorium/issues/2513)
  ([36c0bef](https://github.com/Thorium-Sim/thorium/commit/36c0bef))
- **Tractor Beam:** Fixes an issue where the tractor beam strength arrow
  disappears. Closes [#2518](https://github.com/Thorium-Sim/thorium/issues/2518)
  ([9554940](https://github.com/Thorium-Sim/thorium/commit/9554940))

### Features

- **Exocomps:** Adds upgrades to exocomps. Configure the game board (either
  Robozzle or Lumen) in the simulator's system config. Also specify the name of
  the system when it is upgraded and any macros you want to run when the system
  is upgraded. Upgrades can be triggered manually by checking the upgrade
  checkbox on the systems core. Closes
  [#365](https://github.com/Thorium-Sim/thorium/issues/365)
  ([abaec19](https://github.com/Thorium-Sim/thorium/commit/abaec19))

## [1.19.2](https://github.com/Thorium-Sim/thorium/compare/1.19.1...1.19.2) (2019-08-19)

### Bug Fixes

- **CRM:** Fixes an issue with training crashing on the CRM screen. Closes
  [#2497](https://github.com/Thorium-Sim/thorium/issues/2497)
  ([841b7f9](https://github.com/Thorium-Sim/thorium/commit/841b7f9))
- **Macro Buttons:** Makes it possible to remove macro buttons. Closes
  [#2507](https://github.com/Thorium-Sim/thorium/issues/2507)
  ([58cf673](https://github.com/Thorium-Sim/thorium/commit/58cf673))
- **Sensors:** Sensor contact list now properly scrolls. Closes
  [#2509](https://github.com/Thorium-Sim/thorium/issues/2509)
  ([106deb7](https://github.com/Thorium-Sim/thorium/commit/106deb7))
- **Sets:** Fixes an issue where the set config crashes. Closes
  [#2488](https://github.com/Thorium-Sim/thorium/issues/2488)
  ([3b94242](https://github.com/Thorium-Sim/thorium/commit/3b94242))
- **Sound Effects:** Fixes interface sound effects. Closes
  [#2495](https://github.com/Thorium-Sim/thorium/issues/2495)
  ([11abc39](https://github.com/Thorium-Sim/thorium/commit/11abc39))

## [1.19.1](https://github.com/Thorium-Sim/thorium/compare/1.19.0...1.19.1) (2019-08-03)

### Bug Fixes

- **Power Distribution:** Setting power levels to 0 in core show properly on the
  station. Closes [#2477](https://github.com/Thorium-Sim/thorium/issues/2477)
  ([945215e](https://github.com/Thorium-Sim/thorium/commit/945215e))
- **Task Reports:** Fixes an issue with task report reactivation codes. Closes
  [#2481](https://github.com/Thorium-Sim/thorium/issues/2481).
  ([e78abaf](https://github.com/Thorium-Sim/thorium/commit/e78abaf))
- **Task Reports:** Task reports properly disappear when a flight is reset.
  Closes [#2482](https://github.com/Thorium-Sim/thorium/issues/2482)
  ([46df570](https://github.com/Thorium-Sim/thorium/commit/46df570))
- **Tasks:** Fixes issues with tasks that can cause server crashes. Closes
  [#2483](https://github.com/Thorium-Sim/thorium/issues/2483)
  ([4fca4eb](https://github.com/Thorium-Sim/thorium/commit/4fca4eb))
- **Tasks:** Internal call task now properly handles custom locations. Closes
  [#2468](https://github.com/Thorium-Sim/thorium/issues/2468)
  ([860616c](https://github.com/Thorium-Sim/thorium/commit/860616c))

# [1.19.0](https://github.com/Thorium-Sim/thorium/compare/1.18.0...1.19.0) (2019-07-26)

### Bug Fixes

- **Tasks:** Completed tasks are now sorted to the bottom of the list. Closes
  [#2469](https://github.com/Thorium-Sim/thorium/issues/2469)
  ([7d5946b](https://github.com/Thorium-Sim/thorium/commit/7d5946b))
- **Tasks:** Fix a minor UI error. Closes
  [#2467](https://github.com/Thorium-Sim/thorium/issues/2467)
  ([074abf0](https://github.com/Thorium-Sim/thorium/commit/074abf0))
- **Tasks:** Shield frequency tasks won't crash the server when executed from a
  task template. Closes
  [#2471](https://github.com/Thorium-Sim/thorium/issues/2471)
  ([c38e2e0](https://github.com/Thorium-Sim/thorium/commit/c38e2e0))

### Features

- **Task:** Adds the ability to assign macros to tasks which trigger when the
  task is created. This applies to the task core and task templates. Closes
  [#1917](https://github.com/Thorium-Sim/thorium/issues/1917)
  ([9714648](https://github.com/Thorium-Sim/thorium/commit/9714648))

# [1.18.0](https://github.com/Thorium-Sim/thorium/compare/1.17.4...1.18.0) (2019-07-21)

### Bug Fixes

- **Interfaces:** Fixes a minor UI inconsistency. Closes
  [#2455](https://github.com/Thorium-Sim/thorium/issues/2455)
  ([425dd4c](https://github.com/Thorium-Sim/thorium/commit/425dd4c))
- **Interfaces:** Fixes the UI of the Add Task macro when using it for
  interfaces and other node-based configs. Closes
  [#2451](https://github.com/Thorium-Sim/thorium/issues/2451)
  ([a16fa9f](https://github.com/Thorium-Sim/thorium/commit/a16fa9f))
- **Sound Effects:** Login sound effect no longer plays if the login is
  unsuccessful. Closes
  [#2460](https://github.com/Thorium-Sim/thorium/issues/2460)
  ([e1b57e6](https://github.com/Thorium-Sim/thorium/commit/e1b57e6))

### Features

- **Damage Reports:** Makes it possible to specify the number of steps in a
  damage report or task report. Closes
  [#2423](https://github.com/Thorium-Sim/thorium/issues/2423)
  ([3e13bf1](https://github.com/Thorium-Sim/thorium/commit/3e13bf1))
- **Macros:** Add the ability to control whether a delayed macro will still run
  after a flight reset. Default is to cancel macros after flight reset. Closes
  [#2456](https://github.com/Thorium-Sim/thorium/issues/2456)
  ([31befdf](https://github.com/Thorium-Sim/thorium/commit/31befdf))
- **Reactor:** Adds a macro for changing the reactor efficiency. This can be
  used to set a ship's reactor to external power at the beginning of a flight.
  Closes [#2440](https://github.com/Thorium-Sim/thorium/issues/2440)
  ([f41c5a1](https://github.com/Thorium-Sim/thorium/commit/f41c5a1))
- **Sensors:** Adds a checkbox to the extras tab of sensors core allowing you to
  see labels for all of the sensor contacts. Closes
  [#2437](https://github.com/Thorium-Sim/thorium/issues/2437)
  ([1b921d2](https://github.com/Thorium-Sim/thorium/commit/1b921d2))
- **Shields:** Adds a macro for changing the shield frequencies. Closes
  [#2442](https://github.com/Thorium-Sim/thorium/issues/2442)
  ([c4bcf66](https://github.com/Thorium-Sim/thorium/commit/c4bcf66))
- **Sound Effects:** Makes it possible to change the volume of interface sound
  effects. Closes [#2444](https://github.com/Thorium-Sim/thorium/issues/2444)
  ([e43cbda](https://github.com/Thorium-Sim/thorium/commit/e43cbda))

## [1.17.4](https://github.com/Thorium-Sim/thorium/compare/1.17.3...1.17.4) (2019-07-17)

### Bug Fixes

- **Damage Reports:** Fixes an issue with configuring legacy Damage Reports
  where the damage team type cannot be selected. Closes
  [#2448](https://github.com/Thorium-Sim/thorium/issues/2448)
  ([2ca5c7d](https://github.com/Thorium-Sim/thorium/commit/2ca5c7d))
- **Damage Reports:** Fixes the internal call Legacy Damage Report
  configuration. Closes
  [#2447](https://github.com/Thorium-Sim/thorium/issues/2447)
  ([f74c536](https://github.com/Thorium-Sim/thorium/commit/f74c536))
- **Damage Reports:** Legacy damage reports no longer assign damage teams that
  don't have crew. Closes
  [#2418](https://github.com/Thorium-Sim/thorium/issues/2418)
  ([1f87ca1](https://github.com/Thorium-Sim/thorium/commit/1f87ca1))
- **Sets:** When removing stations, all sets also remove the station. Closes
  [#2449](https://github.com/Thorium-Sim/thorium/issues/2449)
  ([a09ac2b](https://github.com/Thorium-Sim/thorium/commit/a09ac2b))

## [1.17.3](https://github.com/Thorium-Sim/thorium/compare/1.17.2...1.17.3) (2019-07-15)

### Bug Fixes

- **Computer Core:** Adds scrollbars to the hacker and virus list on the
  computer core core. Closes
  [#2445](https://github.com/Thorium-Sim/thorium/issues/2445)
  ([a10d3c7](https://github.com/Thorium-Sim/thorium/commit/a10d3c7))
- **Core:** Add a pause button to the core menubar. Closes
  [#2427](https://github.com/Thorium-Sim/thorium/issues/2427)
  ([1a2b32e](https://github.com/Thorium-Sim/thorium/commit/1a2b32e))
- **Issue Tracker:** The issue tracker will now not allow you to submit issues
  until all uploads are complete.
  ([4880fe3](https://github.com/Thorium-Sim/thorium/commit/4880fe3))
- **Probes:** Probe equipment configurations now persist between card changes.
  Closes [#2433](https://github.com/Thorium-Sim/thorium/issues/2433). Closes
  [#2431](https://github.com/Thorium-Sim/thorium/issues/2431)
  ([d75400f](https://github.com/Thorium-Sim/thorium/commit/d75400f))
- **Sensors:** Persistent changes to planet, border, and ping controls are now
  scoped to the flight.
  ([5dca7c7](https://github.com/Thorium-Sim/thorium/commit/5dca7c7))
- **Space EdVentures:** Fixes an error on the space edventures core. Closes
  [#2434](https://github.com/Thorium-Sim/thorium/issues/2434).
  ([392a2dc](https://github.com/Thorium-Sim/thorium/commit/392a2dc))
- **Tactical Maps:** Switching tactical maps should properly switch every time.
  Closes [#2432](https://github.com/Thorium-Sim/thorium/issues/2432)
  ([ab3d33e](https://github.com/Thorium-Sim/thorium/commit/ab3d33e))

## [1.17.2](https://github.com/Thorium-Sim/thorium/compare/1.17.1...1.17.2) (2019-07-12)

### Bug Fixes

- **Macros:** Fixes an issue where you can't scroll to configure macros. Closes
  [#2428](https://github.com/Thorium-Sim/thorium/issues/2428)
  ([02c0fdd](https://github.com/Thorium-Sim/thorium/commit/02c0fdd))
- **Sensor Scans:** Fixes the alt-key scan preset hotkey. Closes
  [#2426](https://github.com/Thorium-Sim/thorium/issues/2426)
  ([b9f7fca](https://github.com/Thorium-Sim/thorium/commit/b9f7fca))
- **Shields:** Standardizes the way that single shields are labelled. Closes
  [#2403](https://github.com/Thorium-Sim/thorium/issues/2403)
  ([c0164e0](https://github.com/Thorium-Sim/thorium/commit/c0164e0))

## [1.17.1](https://github.com/Thorium-Sim/thorium/compare/1.17.0...1.17.1) (2019-07-10)

### Bug Fixes

- **Hide Card:** Fixes some possible problems with hiding cards. Closes
  [#2409](https://github.com/Thorium-Sim/thorium/issues/2409)
  ([e246a12](https://github.com/Thorium-Sim/thorium/commit/e246a12))
- **Macros:** Fixes an issue where updating viewscreen macros crashes. Closes
  [#2419](https://github.com/Thorium-Sim/thorium/issues/2419). Closes
  [#2412](https://github.com/Thorium-Sim/thorium/issues/2412)
  ([e648f95](https://github.com/Thorium-Sim/thorium/commit/e648f95))
- **Tactical Map:** Improves the animation of the tactical map. Closes
  [#2415](https://github.com/Thorium-Sim/thorium/issues/2415). Closes
  [#2416](https://github.com/Thorium-Sim/thorium/issues/2416).
  ([7876d82](https://github.com/Thorium-Sim/thorium/commit/7876d82))

# [1.17.0](https://github.com/Thorium-Sim/thorium/compare/1.16.0...1.17.0) (2019-07-06)

### Bug Fixes

- **Sensors:** Clearing sensors no longer clears the particle detector. Closes
  [#2404](https://github.com/Thorium-Sim/thorium/issues/2404)
  ([e7866e1](https://github.com/Thorium-Sim/thorium/commit/e7866e1))

### Features

- **Flight:** Add macros for pausing and resuming flights. Closes
  [#2406](https://github.com/Thorium-Sim/thorium/issues/2406)
  ([21f91a7](https://github.com/Thorium-Sim/thorium/commit/21f91a7))
- **Probes:** Adds the basic preset scan answers to the probe query response
  core. Closes [#2361](https://github.com/Thorium-Sim/thorium/issues/2361)
  ([968bb21](https://github.com/Thorium-Sim/thorium/commit/968bb21))
- **Sensors:** Planet, border, and ping settings are now saved and retained.
  ([b5ccda9](https://github.com/Thorium-Sim/thorium/commit/b5ccda9))
- **Tactical Maps:** Adds a new "Add Tactical Maps to Flight" macro which allows
  you to pre-add maps to your flight. This also allows support for selecting a
  tactical map from the 'Change Viewscreen Card' macro. Try to avoid using the
  "Viewscreen: Show Tactical Map" macro from now on. Closes
  [#2387](https://github.com/Thorium-Sim/thorium/issues/2387)
  ([1b77e66](https://github.com/Thorium-Sim/thorium/commit/1b77e66))
- **Tactical Maps:** Objects on the tactical map must now be explicitly removed
  by selecting them and clicking the 'Remove Item' button.
  ([e5a7da9](https://github.com/Thorium-Sim/thorium/commit/e5a7da9))
- **Tactical Maps:** Tactical map animation is now much smoother and more
  consistent. ([255ba0e](https://github.com/Thorium-Sim/thorium/commit/255ba0e))
- **Triggers:** Add a trigger for probe processed data. Closes
  [#2358](https://github.com/Thorium-Sim/thorium/issues/2358)
  ([c971012](https://github.com/Thorium-Sim/thorium/commit/c971012))

# [1.16.0](https://github.com/Thorium-Sim/thorium/compare/1.15.0...1.16.0) (2019-07-04)

### Bug Fixes

- **Actions:** Makes it so setting a movie on a station properly works from the
  actions macro. Closes
  [#2397](https://github.com/Thorium-Sim/thorium/issues/2397)
  ([230d11c](https://github.com/Thorium-Sim/thorium/commit/230d11c))
- **Cargo:** Fixes an issue where cargo logs linger between flights. Closes
  [#2379](https://github.com/Thorium-Sim/thorium/issues/2379)
  ([7d61bbe](https://github.com/Thorium-Sim/thorium/commit/7d61bbe))
- **Cargo:** Fixes major layout issues with the cargo control screen.
  ([b14f7f2](https://github.com/Thorium-Sim/thorium/commit/b14f7f2))
- **Command Line:** Output for delayed command line actions are now shown on
  core when completed. Closes
  [#2369](https://github.com/Thorium-Sim/thorium/issues/2369)
  ([c1e443a](https://github.com/Thorium-Sim/thorium/commit/c1e443a))
- **Errors:** Decreases the number of errors being reported, which keeps me in
  the limit for my error tracker. Closes
  [#2400](https://github.com/Thorium-Sim/thorium/issues/2400)
  ([fecad55](https://github.com/Thorium-Sim/thorium/commit/fecad55))
- **Macros:** Fixes the display of macro options on the trigger macros macro.
  Closes [#2396](https://github.com/Thorium-Sim/thorium/issues/2396)
  ([6240aff](https://github.com/Thorium-Sim/thorium/commit/6240aff))
- **Notifications:** Add an option to disable command line notifications and
  core feed items. Closes
  [#2365](https://github.com/Thorium-Sim/thorium/issues/2365)
  ([c9354ee](https://github.com/Thorium-Sim/thorium/commit/c9354ee))
- **Thrusters:** Thrusters now automatically stop after a longer timeout. Closes
  [#2399](https://github.com/Thorium-Sim/thorium/issues/2399)
  ([ea90d53](https://github.com/Thorium-Sim/thorium/commit/ea90d53))

### Features

- **Command Line:** Add the ability to ignore command line feedback requests.
  Closes [#2391](https://github.com/Thorium-Sim/thorium/issues/2391)
  ([45dbdd4](https://github.com/Thorium-Sim/thorium/commit/45dbdd4))
- **Command Line:** Allows command line commands to take any kind of arguments.
  This is activated by clicking on the command and choosing the 'Allow Any Args'
  options. Closes [#2389](https://github.com/Thorium-Sim/thorium/issues/2389)
  ([7e74c74](https://github.com/Thorium-Sim/thorium/commit/7e74c74))
- **Sensors:** Adds a weakness sensor preset. Closes
  [#2390](https://github.com/Thorium-Sim/thorium/issues/2390)
  ([607e34a](https://github.com/Thorium-Sim/thorium/commit/607e34a))
- **Tasks:** Add additional tasks for sensors and probes. Closes
  [#2377](https://github.com/Thorium-Sim/thorium/issues/2377)
  ([f9117f3](https://github.com/Thorium-Sim/thorium/commit/f9117f3))
- **Tasks:** Adds a task for interception. Closes
  [#2394](https://github.com/Thorium-Sim/thorium/issues/2394)
  ([e497158](https://github.com/Thorium-Sim/thorium/commit/e497158))

# [1.15.0](https://github.com/Thorium-Sim/thorium/compare/1.14.0...1.15.0) (2019-07-02)

### Bug Fixes

- **Cargo:** Adjusts the layout of the cargo transfer screen so it has a better
  flow. Closes [#2371](https://github.com/Thorium-Sim/thorium/issues/2371)
  ([965e4d3](https://github.com/Thorium-Sim/thorium/commit/965e4d3))
- **Issue Tracker:** Fixes uploads for the issue tracker.
  ([de028de](https://github.com/Thorium-Sim/thorium/commit/de028de))
- **Macros:** Fixes an issue where the selected macro name doesn't show up
  properly when configuring it in mission timelines. Closes
  [#2363](https://github.com/Thorium-Sim/thorium/issues/2363). Closes
  [#2354](https://github.com/Thorium-Sim/thorium/issues/2354)
  ([36ae716](https://github.com/Thorium-Sim/thorium/commit/36ae716))
- **Offline:** Removes the Chief Engineer part of the power loss offline screen.
  Closes [#2372](https://github.com/Thorium-Sim/thorium/issues/2372)
  ([7c348bd](https://github.com/Thorium-Sim/thorium/commit/7c348bd))
- **Software Panels:** Makes it easier to adjust colors when configuring
  software panels. Closes
  [#2348](https://github.com/Thorium-Sim/thorium/issues/2348).
  ([e35b31f](https://github.com/Thorium-Sim/thorium/commit/e35b31f))
- **Space EdVentures:** Space EdVentures dropdown on the core now shows the
  correct flight type. Closes
  [#2382](https://github.com/Thorium-Sim/thorium/issues/2382)
  ([929ad0c](https://github.com/Thorium-Sim/thorium/commit/929ad0c))
- **Subscriptions:** Fixes some poorly configured subscriptions which should
  help with server-side memory leaks.
  ([ccc64fb](https://github.com/Thorium-Sim/thorium/commit/ccc64fb))
- **Tactical Maps:** Thrusters won't affect the tactical map if the map isn't
  showing. Closes [#2376](https://github.com/Thorium-Sim/thorium/issues/2376)
  ([07cb8c0](https://github.com/Thorium-Sim/thorium/commit/07cb8c0))
- **Thrusters:** Thrusters now properly stop thrusting when the card changes.
  Closes [#2375](https://github.com/Thorium-Sim/thorium/issues/2375)
  ([b00ace1](https://github.com/Thorium-Sim/thorium/commit/b00ace1))
- **Viewscreen:** Adjusts the ship model viewscreen to properly fit the model
  and text. Closes [#2360](https://github.com/Thorium-Sim/thorium/issues/2360)
  ([c852c14](https://github.com/Thorium-Sim/thorium/commit/c852c14))

### Features

- **Sensor Grid:** Add a timeline action to add, remove, and change the position
  of sensor contacts on the sensor grid. It supports updating the sensor grid
  based on what the grid looked like in previous sensor grid timeline actions.
  Closes [#1987](https://github.com/Thorium-Sim/thorium/issues/1987). Closes
  [#484](https://github.com/Thorium-Sim/thorium/issues/484)
  ([78cf6c5](https://github.com/Thorium-Sim/thorium/commit/78cf6c5))
- **Shields:** Has a button which sets all of the shield frequencies to one of
  the other shield frequencies. Closes
  [#2345](https://github.com/Thorium-Sim/thorium/issues/2345)
  ([ac06a1f](https://github.com/Thorium-Sim/thorium/commit/ac06a1f))
- **Viewscreen:** Add a mission objective viewscreen. Closes
  [#2331](https://github.com/Thorium-Sim/thorium/issues/2331)
  ([f212c8f](https://github.com/Thorium-Sim/thorium/commit/f212c8f))

# [1.14.0](https://github.com/Thorium-Sim/thorium/compare/1.13.0...1.14.0) (2019-06-22)

### Bug Fixes

- **Command Line:** Command line output now shows args for the command. Closes
  [#2353](https://github.com/Thorium-Sim/thorium/issues/2353)
  ([a76262a](https://github.com/Thorium-Sim/thorium/commit/a76262a))
- **Docking:** Resolves issues with erratic docking. Closes
  [#2338](https://github.com/Thorium-Sim/thorium/issues/2338)
  ([5c755cf](https://github.com/Thorium-Sim/thorium/commit/5c755cf))
- **Engines:** Fixes an issue where clicking the coolant button too many times
  can cause lag. Closes
  [#2309](https://github.com/Thorium-Sim/thorium/issues/2309)
  ([2646709](https://github.com/Thorium-Sim/thorium/commit/2646709))
- **Engines:** Fixes an issue where engine speed levels cannot be configured
  properly. Closes [#2347](https://github.com/Thorium-Sim/thorium/issues/2347)
  ([973a989](https://github.com/Thorium-Sim/thorium/commit/973a989))
- **Space EdVentures:** Makes it possible to change the flight type of a Space
  EdVentures flight.
  ([f7493e7](https://github.com/Thorium-Sim/thorium/commit/f7493e7))
- **Stealth Field:** When stealth field is set to be always activated, the
  Activate/Deactivate button no longer appears. Closes
  [#2342](https://github.com/Thorium-Sim/thorium/issues/2342). Closes
  [#2352](https://github.com/Thorium-Sim/thorium/issues/2352).
  ([587ceb4](https://github.com/Thorium-Sim/thorium/commit/587ceb4))

### Features

- **Clear Layout:** Makes the clear layout overlay on top of the viewscreen
  contents. Closes [#2349](https://github.com/Thorium-Sim/thorium/issues/2349)
  ([a7bdbd7](https://github.com/Thorium-Sim/thorium/commit/a7bdbd7))
- **Command Line:** Add command line feedback requests to the core feed. Closes
  [#2297](https://github.com/Thorium-Sim/thorium/issues/2297)
  ([abbac19](https://github.com/Thorium-Sim/thorium/commit/abbac19))
- **Command Line:** Adds options for changing the alert level from the command
  line. Closes [#2234](https://github.com/Thorium-Sim/thorium/issues/2234)
  ([7487f91](https://github.com/Thorium-Sim/thorium/commit/7487f91))
- **CRM-114:** Makes it possible to set the image defaults when configuring the
  CRM-114 system. Closes
  [#2210](https://github.com/Thorium-Sim/thorium/issues/2210)
  ([bbf5ce7](https://github.com/Thorium-Sim/thorium/commit/bbf5ce7))
- **Library:** Add the ability to set the visible font of library entries.
  Closes [#2350](https://github.com/Thorium-Sim/thorium/issues/2350)
  ([e94c62c](https://github.com/Thorium-Sim/thorium/commit/e94c62c))
- **Officers Log:** Add an officers log core for viewing officer log entries.
  Closes [#1903](https://github.com/Thorium-Sim/thorium/issues/1903)
  ([944adc8](https://github.com/Thorium-Sim/thorium/commit/944adc8))
- **Space EdVentures:** Makes it possible to remove stations from the Space
  EdVentures transmission. Closes
  [#2295](https://github.com/Thorium-Sim/thorium/issues/2295)
  ([3d73685](https://github.com/Thorium-Sim/thorium/commit/3d73685))
- **Viewscreen:** Add "Undocking" viewscreen.
  ([6dff211](https://github.com/Thorium-Sim/thorium/commit/6dff211))
- **Viewscreen:** Add the ability to change all viewscreens at the same time,
  including differentiating between primary and secondary viewscreens. Closes
  [#2351](https://github.com/Thorium-Sim/thorium/issues/2351)
  ([9fb03ef](https://github.com/Thorium-Sim/thorium/commit/9fb03ef))

# [1.13.0](https://github.com/Thorium-Sim/thorium/compare/1.12.0...1.13.0) (2019-06-20)

### Bug Fixes

- **Navigation Advanced:** Fixes an issue when speeds are set to a value over 1.
  Closes [#2268](https://github.com/Thorium-Sim/thorium/issues/2268)
  ([9309eb5](https://github.com/Thorium-Sim/thorium/commit/9309eb5))
- **Navigation Advanced:** Fixes the formatting when going a speed that is
  longer than the available space in the box. Closes
  [#2269](https://github.com/Thorium-Sim/thorium/issues/2269)
  ([b95ff26](https://github.com/Thorium-Sim/thorium/commit/b95ff26))
- **Navigation Advanced:** Makes it so one engine cannot be changed unless the
  other is deactivated. Closes
  [#2267](https://github.com/Thorium-Sim/thorium/issues/2267)
  ([34b923b](https://github.com/Thorium-Sim/thorium/commit/34b923b))
- **Quote of the Day:** Add more quotes.
  ([8a89b8e](https://github.com/Thorium-Sim/thorium/commit/8a89b8e))
- **Sound Picker:** Properly fixes the sound picker. Closes
  [#2308](https://github.com/Thorium-Sim/thorium/issues/2308)
  ([316747d](https://github.com/Thorium-Sim/thorium/commit/316747d))

### Features

- **File Explorer:** Adds audio preview to the file explorer.
  ([3167ffe](https://github.com/Thorium-Sim/thorium/commit/3167ffe))
- **Interface Sound Effects:** Adds interface sound effects to Thorium for
  things like clicking buttons, changing cards, and logging in. These are opt-in
  and must be configured for each simulator with the Sound Effects config. You
  can use your own sounds, or use sounds from this
  [bonus sound pack](https://s3.amazonaws.com/thoriumsim/Bonus%20Sounds.zip)
  that can be imported into Thorium. Every sound effect can have multiple sounds
  associated, and it will pick a random one whenever the sound is played. Closes
  [#2223](https://github.com/Thorium-Sim/thorium/issues/2223)
  ([bc52316](https://github.com/Thorium-Sim/thorium/commit/bc52316))
- **Issue Tracker:** Makes it possible to upload an image through the issue
  tracker. Closes [#2340](https://github.com/Thorium-Sim/thorium/issues/2340)
  ([7e970af](https://github.com/Thorium-Sim/thorium/commit/7e970af))
- **Status:** Adds an extra field for tracking the number of people on the ship.
  Closes [#2315](https://github.com/Thorium-Sim/thorium/issues/2315)
  ([21fda91](https://github.com/Thorium-Sim/thorium/commit/21fda91))
- **Viewscreen:** Adds a picture-in-picture feature to the viewscreen. Configure
  it with the Viewscreen core or in your timeline with macros. Refs
  [#2316](https://github.com/Thorium-Sim/thorium/issues/2316)
  ([ad7e02b](https://github.com/Thorium-Sim/thorium/commit/ad7e02b))

# [1.12.0](https://github.com/Thorium-Sim/thorium/compare/1.11.0...1.12.0) (2019-06-14)

### Bug Fixes

- **Command Line:** Makes the command line list properly scroll. Closes
  [#2336](https://github.com/Thorium-Sim/thorium/issues/2336). Closes
  [#2335](https://github.com/Thorium-Sim/thorium/issues/2335)
  ([e36197f](https://github.com/Thorium-Sim/thorium/commit/e36197f))
- **Layout ShipStation:** Properly overlays the shipstation layout. Closes
  [#2330](https://github.com/Thorium-Sim/thorium/issues/2330)
  ([0577f40](https://github.com/Thorium-Sim/thorium/commit/0577f40))

### Features

- **Interception:** Add a difficulty option to the interception core to make
  interception a little easier. Closes
  [#2337](https://github.com/Thorium-Sim/thorium/issues/2337)
  ([fdf41b5](https://github.com/Thorium-Sim/thorium/commit/fdf41b5))
- **Space EdVentures:** Adds a timeline action for turning a regular flight into
  a Space EdVentures flight.
  ([91b5017](https://github.com/Thorium-Sim/thorium/commit/91b5017))
- **Viewscreen:** Add a 'random video' toggle for the viewscreen video screen
  which allows you to choose several videos. When the viewscreen is changed, it
  will pick one of those videos to display. Refs
  [#2316](https://github.com/Thorium-Sim/thorium/issues/2316)
  ([f820875](https://github.com/Thorium-Sim/thorium/commit/f820875))

# [1.11.0](https://github.com/Thorium-Sim/thorium/compare/1.10.0...1.11.0) (2019-06-13)

### Bug Fixes

- **Analytics:** Updates analytics.
  ([07b1f06](https://github.com/Thorium-Sim/thorium/commit/07b1f06))
- **Timeline:** Adds notes to the aux timelines.
  ([41abf61](https://github.com/Thorium-Sim/thorium/commit/41abf61))

### Features

- **Button Macros:** Add the button macro core and button macro config. This
  allows for pre-defined macros to be executed at the push of a button.
  ([dbaaef7](https://github.com/Thorium-Sim/thorium/commit/dbaaef7))

# [1.10.0](https://github.com/Thorium-Sim/thorium/compare/1.9.3...1.10.0) (2019-06-12)

### Bug Fixes

- **Computer Core:** Improves the rendering of tables to make the text more
  visible. Closes [#2307](https://github.com/Thorium-Sim/thorium/issues/2307)
  ([504148b](https://github.com/Thorium-Sim/thorium/commit/504148b))
- **Dynamic Core:** Fixes an issue where no core components causes a crash.
  Closes [#2326](https://github.com/Thorium-Sim/thorium/issues/2326)
  ([2982873](https://github.com/Thorium-Sim/thorium/commit/2982873))
- **Probe Launching:** Gives each probe it's own option when choosing what to
  launch out of the torpedo launcher. Closes
  [#2322](https://github.com/Thorium-Sim/thorium/issues/2322)
  ([4ecea48](https://github.com/Thorium-Sim/thorium/commit/4ecea48))
- **Sound PIcker:** Updates the sound picker so it doesn't hide under other
  cores anymore. Closes
  [#2308](https://github.com/Thorium-Sim/thorium/issues/2308)
  ([a1a9341](https://github.com/Thorium-Sim/thorium/commit/a1a9341))
- **Space EdVentures:** Added a better caching mechanism so Space EdVentures
  data loads faster.
  ([38f3101](https://github.com/Thorium-Sim/thorium/commit/38f3101))

### Features

- **Docking:** Adds a macro for changing the docked state of the ship. Closes
  [#2323](https://github.com/Thorium-Sim/thorium/issues/2323)
  ([2d0d9ea](https://github.com/Thorium-Sim/thorium/commit/2d0d9ea))
- **Jump Drive:** Adds an extend jump rings button to the jump drive. Closes
  [#2317](https://github.com/Thorium-Sim/thorium/issues/2317)
  ([7ef3163](https://github.com/Thorium-Sim/thorium/commit/7ef3163))
- **Lighting:** Makes it possible to set the lighting control in the set config.
  Closes [#2325](https://github.com/Thorium-Sim/thorium/issues/2325)
  ([94792c0](https://github.com/Thorium-Sim/thorium/commit/94792c0))
- **Timeline:** Adds a 'Classic' Timeline that shows the timeline steps in a
  list rather than as individual steps. Closes
  [#2318](https://github.com/Thorium-Sim/thorium/issues/2318)
  ([ca4a032](https://github.com/Thorium-Sim/thorium/commit/ca4a032))
- **Triggers:** Adds a generic trigger macro. Closes
  [#2313](https://github.com/Thorium-Sim/thorium/issues/2313)
  ([772bd96](https://github.com/Thorium-Sim/thorium/commit/772bd96))

## [1.9.3](https://github.com/Thorium-Sim/thorium/compare/1.9.2...1.9.3) (2019-06-09)

### Bug Fixes

- **Alert Level:** Changes alert level indicator to say "S" instead of "P".
  ([21c5608](https://github.com/Thorium-Sim/thorium/commit/21c5608))
- **Command Line:** Core only shows active command lines. Closes
  [#2294](https://github.com/Thorium-Sim/thorium/issues/2294)
  ([83b9720](https://github.com/Thorium-Sim/thorium/commit/83b9720))
- **Interfaces:** Toggle components now work properly. Closes
  [#2296](https://github.com/Thorium-Sim/thorium/issues/2296)
  ([8c8a362](https://github.com/Thorium-Sim/thorium/commit/8c8a362))
- **Lighting:** Fixes and improvements to the lighting core.
  ([020b80f](https://github.com/Thorium-Sim/thorium/commit/020b80f))
- **Planetary Scan:** Fixes a funky text input box for the planetary scan.
  Closes [#2289](https://github.com/Thorium-Sim/thorium/issues/2289)
  ([c89fc3a](https://github.com/Thorium-Sim/thorium/commit/c89fc3a))
- **Sensors:** Fixes an issue where sensors cannot be added to a new simulator
  config. Closes [#2291](https://github.com/Thorium-Sim/thorium/issues/2291).
  Closes [#2304](https://github.com/Thorium-Sim/thorium/issues/2304)
  ([2141a61](https://github.com/Thorium-Sim/thorium/commit/2141a61))

## [1.9.2](https://github.com/Thorium-Sim/thorium/compare/1.9.1...1.9.2) (2019-06-07)

### Bug Fixes

- **Aux Timeline:** Fixes an issue where the aux timeline can crash. Closes
  [#2270](https://github.com/Thorium-Sim/thorium/issues/2270)
  ([0379974](https://github.com/Thorium-Sim/thorium/commit/0379974))
- **Core:** Adjust the categories for the F-key core overlay.
  ([5f6911d](https://github.com/Thorium-Sim/thorium/commit/5f6911d))
- **Particle Detector:** Hides contacts that are outside of the particle
  detector grid. Closes
  [#2261](https://github.com/Thorium-Sim/thorium/issues/2261)
  ([04e045d](https://github.com/Thorium-Sim/thorium/commit/04e045d))
- **Surveys:** Add a timeline action for starting surveys.
  ([a65d1a6](https://github.com/Thorium-Sim/thorium/commit/a65d1a6))

## [1.9.1](https://github.com/Thorium-Sim/thorium/compare/1.9.0...1.9.1) (2019-06-06)

### Bug Fixes

- **Actions:** Adds an action to reload the Thorium browser to the action macro.
  Closes [#2283](https://github.com/Thorium-Sim/thorium/issues/2283)
  ([7756f86](https://github.com/Thorium-Sim/thorium/commit/7756f86))
- **Probes:** Adds tractor beams as probe type options. Closes
  [#2259](https://github.com/Thorium-Sim/thorium/issues/2259)
  ([abfd97f](https://github.com/Thorium-Sim/thorium/commit/abfd97f))
- **Sets:** Fixes an issue where a misconfigured set can cause a client crash.
  Closes [#2284](https://github.com/Thorium-Sim/thorium/issues/2284)
  ([6dbc7fe](https://github.com/Thorium-Sim/thorium/commit/6dbc7fe))
- **Sickbay:** Fixes an issue where admiting patients breaks. Closes
  [#2271](https://github.com/Thorium-Sim/thorium/issues/2271)
  ([2229c38](https://github.com/Thorium-Sim/thorium/commit/2229c38))
- **Space EdVentures:** Add simulator and login name to the Space EdVentures
  crew flyer. Closes [#2281](https://github.com/Thorium-Sim/thorium/issues/2281)
  ([c2857f6](https://github.com/Thorium-Sim/thorium/commit/c2857f6))
- **Surveys:** Requires all inputs to be filled out on the survey forms, which
  helps when submitting to Google Sheets. Closes
  [#2282](https://github.com/Thorium-Sim/thorium/issues/2282). Closes
  [#2275](https://github.com/Thorium-Sim/thorium/issues/2275).
  ([ea55632](https://github.com/Thorium-Sim/thorium/commit/ea55632))
- **Timeline:** Fixes an issue where the timeline can crash with uninitialized
  arguments. Closes [#2279](https://github.com/Thorium-Sim/thorium/issues/2279)
  ([cf90595](https://github.com/Thorium-Sim/thorium/commit/cf90595))
- **Timeline:** Fixes an issue where timeline details don't show up on the
  timeline core. Closes
  [#2273](https://github.com/Thorium-Sim/thorium/issues/2273)
  ([bf532f0](https://github.com/Thorium-Sim/thorium/commit/bf532f0))

# [1.9.0](https://github.com/Thorium-Sim/thorium/compare/1.8.3...1.9.0) (2019-06-05)

### Bug Fixes

- **Code Cyphers:** Cypher text appears correctly when using the all caps
  option. Closes [#2257](https://github.com/Thorium-Sim/thorium/issues/2257)
  ([36a0f7f](https://github.com/Thorium-Sim/thorium/commit/36a0f7f))
- **Issue Tracker:** The issue tracker now works just a little bit better.
  ([0fd23d9](https://github.com/Thorium-Sim/thorium/commit/0fd23d9))
- **Sensors:** Made it possible to place sensor contacts well outside of sensors
  range into the prep area. Closes
  [#2255](https://github.com/Thorium-Sim/thorium/issues/2255).
  ([5dfecd4](https://github.com/Thorium-Sim/thorium/commit/5dfecd4))
- **Sensors:** Made it so contacts outside of sensors range don't show up when
  hovered. ([564843a](https://github.com/Thorium-Sim/thorium/commit/564843a))
- **Simulator:** Add macros to change simulator layout and name. Closes
  [#2222](https://github.com/Thorium-Sim/thorium/issues/2222)
  ([40211f6](https://github.com/Thorium-Sim/thorium/commit/40211f6))
- **Sound Action:** Makes it easier to tell what the volume of the sound in the
  sound macro is. Closes
  [#2254](https://github.com/Thorium-Sim/thorium/issues/2254)
  ([82182cd](https://github.com/Thorium-Sim/thorium/commit/82182cd))
- **Station:** Fixes an issue that makes it impossible to hide and show
  simulator cards. Closes
  [#2225](https://github.com/Thorium-Sim/thorium/issues/2225)
  ([7033674](https://github.com/Thorium-Sim/thorium/commit/7033674))

### Features

- **Asset Explorer:** Adds a search field to the asset explorer. Closes
  [#2256](https://github.com/Thorium-Sim/thorium/issues/2256)
  ([25e75f6](https://github.com/Thorium-Sim/thorium/commit/25e75f6))
- **Sounds:** Add a search to the sound picker.
  ([f513dcb](https://github.com/Thorium-Sim/thorium/commit/f513dcb))

## [1.8.3](https://github.com/Thorium-Sim/thorium/compare/1.8.2...1.8.3) (2019-06-03)

### Bug Fixes

- **Stability:** Refactors a lot of data fetching code to helpfully solve some
  memory leak issues on both the client and server. _Please get in touch on
  Discord or via email or the issue reporter if you run into any problems._
  ([1bf0518](https://github.com/Thorium-Sim/thorium/commit/1bf0518))

## [1.8.2](https://github.com/Thorium-Sim/thorium/compare/1.8.1...1.8.2) (2019-06-01)

### Bug Fixes

- **Sensors:** Hidden sensors segments now properly reset. Closes
  [#2250](https://github.com/Thorium-Sim/thorium/issues/2250)
  ([4618e10](https://github.com/Thorium-Sim/thorium/commit/4618e10))
- **Space EdVentures:** Add the Go to Space EdVentures Token screen action to
  the action core and to the 'Trigger Action' timeline action. Refs
  [#2248](https://github.com/Thorium-Sim/thorium/issues/2248)
  ([be645b8](https://github.com/Thorium-Sim/thorium/commit/be645b8))
- **Space EdVentures:** Adds a timeline action for adding extra crew members to
  Space EdVentures. Closes
  [#2248](https://github.com/Thorium-Sim/thorium/issues/2248)
  ([575bdca](https://github.com/Thorium-Sim/thorium/commit/575bdca))
- **Surveys:** Make it possible to reorder survey form items. Closes
  [#2247](https://github.com/Thorium-Sim/thorium/issues/2247)
  ([de655f9](https://github.com/Thorium-Sim/thorium/commit/de655f9))

## [1.8.1](https://github.com/Thorium-Sim/thorium/compare/1.8.0...1.8.1) (2019-05-31)

### Bug Fixes

- **Command Line:** Makes it possible for command line feedback modules to use
  delayed outputs as their approve or denied output. Closes
  [#2237](https://github.com/Thorium-Sim/thorium/issues/2237)
  ([a1af372](https://github.com/Thorium-Sim/thorium/commit/a1af372))
- **Library:** Fixes an issue that threw an error when trying to export library
  entries. Closes [#2240](https://github.com/Thorium-Sim/thorium/issues/2240)
  ([c5b506b](https://github.com/Thorium-Sim/thorium/commit/c5b506b))
- **Timeline:** Fixes an issue with loading the Timeline core without a mission
  selected. ([6be32b6](https://github.com/Thorium-Sim/thorium/commit/6be32b6))

# [1.8.0](https://github.com/Thorium-Sim/thorium/compare/1.7.1...1.8.0) (2019-05-31)

### Bug Fixes

- **Macro:** Fixes a scrolling issue on the macro config screen. Closes
  [#2238](https://github.com/Thorium-Sim/thorium/issues/2238)
  ([3935350](https://github.com/Thorium-Sim/thorium/commit/3935350))

### Features

- **Tasks:** Add a sensor scan task, with fuzzy-text maching for
  auto-verification. Closes
  [#2239](https://github.com/Thorium-Sim/thorium/issues/2239)
  ([b76ecd1](https://github.com/Thorium-Sim/thorium/commit/b76ecd1))
- **Timeline Actions:** Make it possible to assign specific stations to certain
  timeline actions based on simulator and station set. This is configured in the
  Simulator config and applys to missions, macros, interfaces, command lines,
  triggers, keyboards, and the macros core. Closes
  [#2165](https://github.com/Thorium-Sim/thorium/issues/2165)
  ([e8c2023](https://github.com/Thorium-Sim/thorium/commit/e8c2023))

## [1.7.1](https://github.com/Thorium-Sim/thorium/compare/1.7.0...1.7.1) (2019-05-30)

### Bug Fixes

- **Planetary Scan:** Make the image input for planetary scan a little bit
  nicer. Closes [#2231](https://github.com/Thorium-Sim/thorium/issues/2231)
  ([6c94694](https://github.com/Thorium-Sim/thorium/commit/6c94694))
- **Sensor Contacts:** Makes the click area for sensor contacts in the macro
  config a little bit nicer. Closes
  [#2232](https://github.com/Thorium-Sim/thorium/issues/2232).
  ([0bbafd5](https://github.com/Thorium-Sim/thorium/commit/0bbafd5))

# [1.7.0](https://github.com/Thorium-Sim/thorium/compare/1.6.2...1.7.0) (2019-05-29)

### Features

- **Timeline:** Adds simulator mission timeline args. This allows timelines to
  use data from the simulator in their config, like stations and clients. This
  also allows for more than two viewscreens to be configured in a single
  mission. Closes [#2111](https://github.com/Thorium-Sim/thorium/issues/2111).
  ([7faff7d](https://github.com/Thorium-Sim/thorium/commit/7faff7d))

## [1.6.2](https://github.com/Thorium-Sim/thorium/compare/1.6.1...1.6.2) (2019-05-28)

### Bug Fixes

- **Build:** Fixes the build process.
  ([d31e173](https://github.com/Thorium-Sim/thorium/commit/d31e173))

## [1.6.1](https://github.com/Thorium-Sim/thorium/compare/1.6.0...1.6.1) (2019-05-27)

### Bug Fixes

- **Build:** Fixes an issue with the build process that made the environment
  variables not usable.
  ([71669e7](https://github.com/Thorium-Sim/thorium/commit/71669e7))
- **Software Panels:** Fixes an issue that makes software panels inoperable.
  ([9bbfc8b](https://github.com/Thorium-Sim/thorium/commit/9bbfc8b))

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
