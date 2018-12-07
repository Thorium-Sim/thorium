![Thorium](github-banner.png)
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.org/Thorium-Sim/thorium.svg?branch=master)](https://travis-ci.org/Thorium-Sim/thorium)
[![Discord](https://img.shields.io/discord/390968011605147648.svg)](https://discord.gg/UvxTQZz)

# Thorium

## A simulator controls platform

_New here? Check out the [contributing document](CONTRIBUTING.md)_

Want something to work on? Here's where
[we need help](https://github.com/Thorium-Sim/thorium/labels/help%20wanted). Not
sure what it is or how to work with Thorium? Guides are in the
[docs website](https://thoriumsim.com/docs/overview.html). Thorium accepts
[donations](https://thoriumsim.com/en/donate.html).

## What is Thorium

Thorium is a simulator controls platform which eventually hopes to encapsulate
the following features (and maybe more):

- Multiple simulators in the same framework

- Multiple stations and cards

- Arbitrary card assignments that can update in realtime

- Realtime data sharing across devices

- Federated architecture for supporting satellite devices (e.g. lighting
  control, Arduino panels, etc.)

- Lighting Control

- Sound Control

- Video Control

- 3D Rendering

- Physics Simulations

- Pre-recorded macros

- Timelines

And more. The above merely scratches the surface.

Thorium is flexible enough to provide a system for creating an integrated,
distributed, fault-tolerant show-control system that can power lights, sound,
video, and take input and provide output to a wide variety of devices.

Created with ❤ by [Alex Anderson](http://ralexanderson.com) and
[Fyreworks](https://fyreworks.us).

## Guiding Principles

Thorium is based on years of experience building starship simulator controls for
Space Edventures centers in Utah. This experience drives a number of guiding
principles which should underscore all feature development in the project:

- The Flight Director is the master of the simulation. Therefore, everything in
  Thorium should support the flight director. New features should not remove
  control or power from the flight director. Features should also strive to not
  distract the flight director from giving the crew the best experience
  possible. The best features both give the flight director more ability to help
  the crew while not detracting from the flight director's focus.
- Crew enjoyment is the primary reason for Thorium's use. Education, research,
  and training are all secondary objectives to the crew having a good time. Why?
  Because if the crew is not having a good time, they likely aren't learning or
  aren't providing good data for research. Features in Thorium should certainly
  foster good environments for education, but not understanding how a card works
  or a task being too difficult or too boring can quickly take away from
  students learning.
- While Thorium works hard to be the end-all-be-all of starship simulator
  controls, there is no reason every single feature has to be bundled with
  Thorium itself. The core of Thorium is a way to distribute and configure data
  between multiple clients. Using the same mechanisms which crew clients
  connect, external clients, like lighting controllers and hardware panels, can
  also connect.
- Thorium is a powerful platform. Regrettably, while its design allows for
  powerful interactions and screens, it isn't friendly for beginning developers
  like many previous simulator controls sets have been. This is one of the
  biggest downsides to Thorium. Something that could improve Thorium's
  experience for beginning developers would be ideal.

## Getting Started

```sh
npm install
npm run start
```

_Note: If you are on Windows, the dependencies are a little weird. You will have
to run a few more commands_

```sh
npm install
cd server
npm install
cd ../client
npm install
cd ..
npm run start
```

Then open [the app](http://localhost:3000) or
[GraphiQL](http://localhost:3001/graphiql)

## Building the App

```
npm run build
```

Builds the app for production and bundles it into a packaged terminal app.

## Deploying

If you have access to upload to the S3 bucket Thorium builds are stored in, you
can run the `npm run deploy` command, which builds, bundles, and upload Thorium
in one go. To use this command, you must have your AWS credentials configured in
the `~/.aws/credentials` file, like so:

```
[default]
aws_access_key_id = **Your key here**
aws_secret_access_key = **Your secret here**
```

Automatic release notes are currently being developed.

## Translations

Thorium is currently in the process of supporting i18n translations. Want to add
translated strings for your language? If the language doesn't exist, add it to
the `package.json` file. Also be sure to add the locale data to the
`/src/helpers/intl.js`.

Translations are done with `react-intl`. A good example of how this can be used
is the `/src/containers/FilghtDirector/Welcome.js` file.

## Open-source Assets

When Thorium is started for the first time, in either development or production
mode, it will automatically download assets from a remote server. These assets
are regularly updated with content from the community.

You can download open-source licensed assets to be used with Thorium
[here](https://drive.google.com/open?id=0B-UK2-Zf7K9ycUJScHJlWW92MjQ).

_Interested in contributing your own images, movies, sounds, and more to this
repository? [File an Issue](https://github.com/Thorium-Sim/thorium/issues/new)_
and we'll give you access.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/6558157?v=4" width="100px;"/><br /><sub><b>Alex</b></sub>](http://ralexanderson.com)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993 "Code") [📖](https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993 "Documentation") [🎨](#design-alexanderson1993 "Design") | [<img src="https://avatars0.githubusercontent.com/u/1387836?v=4" width="100px;"/><br /><sub><b>Emrix</b></sub>](https://github.com/Emrix)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=Emrix "Code") [👀](#review-Emrix "Reviewed Pull Requests") [🤔](#ideas-Emrix "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/30132958?v=4" width="100px;"/><br /><sub><b>ctolley6</b></sub>](https://github.com/ctolley6)<br />[🤔](#ideas-ctolley6 "Ideas, Planning, & Feedback") [✅](#tutorial-ctolley6 "Tutorials") | [<img src="https://avatars0.githubusercontent.com/u/22157796?v=4" width="100px;"/><br /><sub><b>Todd Rasband</b></sub>](https://github.com/Rasbandit)<br />[🎨](#design-Rasbandit "Design") | [<img src="https://avatars0.githubusercontent.com/u/45031?v=4" width="100px;"/><br /><sub><b>Brent Anderson</b></sub>](http://www.brentjanderson.com)<br />[🤔](#ideas-brentjanderson "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/4927395?v=4" width="100px;"/><br /><sub><b>Farpoint</b></sub>](http://www.farpointStation.org)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3Afarpoint "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/30113240?v=4" width="100px;"/><br /><sub><b>Isaac Ostler</b></sub>](https://github.com/isaacOstler)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3AisaacOstler "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/25517624?v=4" width="100px;"/><br /><sub><b>Jed Fox</b></sub>](https://j-f1.github.io)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=j-f1 "Code") | [<img src="https://avatars2.githubusercontent.com/u/2187124?v=4" width="100px;"/><br /><sub><b>Lilah</b></sub>](https://github.com/G33kX)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=G33kX "Code") | [<img src="https://avatars3.githubusercontent.com/u/1413863?v=4" width="100px;"/><br /><sub><b>kimballfrank</b></sub>](https://github.com/kimballfrank)<br />[🎨](#design-kimballfrank "Design") [🤔](#ideas-kimballfrank "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/25465934?v=4" width="100px;"/><br /><sub><b>aBlueShadow</b></sub>](https://github.com/aBlueShadow)<br />[🤔](#ideas-aBlueShadow "Ideas, Planning, & Feedback") [🌍](#translation-aBlueShadow "Translation") | [<img src="https://avatars1.githubusercontent.com/u/1224343?v=4" width="100px;"/><br /><sub><b>John Robe</b></sub>](http://jrobe.me)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3Ajrobe "Bug reports") [💻](https://github.com/thorium-sim/Thorium/commits?author=jrobe "Code") | [<img src="https://avatars0.githubusercontent.com/u/1906967?v=4" width="100px;"/><br /><sub><b>Keith Smith</b></sub>](https://github.com/ksmithut)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3Aksmithut "Bug reports") [💻](https://github.com/thorium-sim/Thorium/commits?author=ksmithut "Code") | [<img src="https://avatars3.githubusercontent.com/u/40648791?v=4" width="100px;"/><br /><sub><b>MaesonBusk</b></sub>](https://github.com/MaesonBusk)<br />[📖](https://github.com/thorium-sim/Thorium/commits?author=MaesonBusk "Documentation") |
| [<img src="https://avatars0.githubusercontent.com/u/6345617?v=4" width="100px;"/><br /><sub><b>Eric Mansfield</b></sub>](https://github.com/ericman314)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=ericman314 "Code") [⚠️](https://github.com/thorium-sim/Thorium/commits?author=ericman314 "Tests") |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!
