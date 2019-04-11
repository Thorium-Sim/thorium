![Thorium](github-banner.png)
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg?style=flat-square)](#contributors)

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

## A note about support

Thorium is a "community support" project. While I encourage everyone to use it and continue to submit issues and bug reports, I won't be actively maintaining the project as I have in the past. Here's what I will continue to do:

* Review issues
* Review pull requests and provide feedback
* Merge pull requests
* Create new builds/releases
* Encourage and assist other developers

I will not:

* Actively build new features (usually -- some exceptions)
* Actively fix bugs (usually -- some exceptions)
* Guarantee a response or turnaround time
* Give support over phone or in person (except through service contract agreements)

Fortunately, you can get help from the excellent people on [Thorium's Discord Server](https://discord.gg/UvxTQZz).

If you need better support for your Thorium simulator, I more than happy to contract with you to do so. Fill out the [Thorium Service Request Form](https://thoriumsim.com/service/) to start that process. 

If you want to learn to contribute to Thorium, check out the [development video series](https://www.youtube.com/watch?v=iEU6NcOKhyE&list=PLvw0SNT6wHt9au1-6yCOh7QHj-p5ir0l6) for how to get started.

Hope this helps! ~Alex

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
<table><tr><td align="center"><a href="http://ralexanderson.com"><img src="https://avatars1.githubusercontent.com/u/6558157?v=4" width="100px;" alt="Alex"/><br /><sub><b>Alex</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993" title="Code">💻</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993" title="Documentation">📖</a> <a href="#design-alexanderson1993" title="Design">🎨</a></td><td align="center"><a href="https://github.com/Emrix"><img src="https://avatars0.githubusercontent.com/u/1387836?v=4" width="100px;" alt="Emrix"/><br /><sub><b>Emrix</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=Emrix" title="Code">💻</a> <a href="#review-Emrix" title="Reviewed Pull Requests">👀</a> <a href="#ideas-Emrix" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/ctolley6"><img src="https://avatars3.githubusercontent.com/u/30132958?v=4" width="100px;" alt="ctolley6"/><br /><sub><b>ctolley6</b></sub></a><br /><a href="#ideas-ctolley6" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tutorial-ctolley6" title="Tutorials">✅</a></td><td align="center"><a href="https://github.com/Rasbandit"><img src="https://avatars0.githubusercontent.com/u/22157796?v=4" width="100px;" alt="Todd Rasband"/><br /><sub><b>Todd Rasband</b></sub></a><br /><a href="#design-Rasbandit" title="Design">🎨</a></td><td align="center"><a href="http://www.brentjanderson.com"><img src="https://avatars0.githubusercontent.com/u/45031?v=4" width="100px;" alt="Brent Anderson"/><br /><sub><b>Brent Anderson</b></sub></a><br /><a href="#ideas-brentjanderson" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="http://www.farpointStation.org"><img src="https://avatars1.githubusercontent.com/u/4927395?v=4" width="100px;" alt="Farpoint"/><br /><sub><b>Farpoint</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Afarpoint" title="Bug reports">🐛</a></td><td align="center"><a href="https://github.com/isaacOstler"><img src="https://avatars1.githubusercontent.com/u/30113240?v=4" width="100px;" alt="Isaac Ostler"/><br /><sub><b>Isaac Ostler</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AisaacOstler" title="Bug reports">🐛</a></td></tr><tr><td align="center"><a href="https://j-f1.github.io"><img src="https://avatars2.githubusercontent.com/u/25517624?v=4" width="100px;" alt="Jed Fox"/><br /><sub><b>Jed Fox</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=j-f1" title="Code">💻</a></td><td align="center"><a href="https://github.com/G33kX"><img src="https://avatars2.githubusercontent.com/u/2187124?v=4" width="100px;" alt="Lilah"/><br /><sub><b>Lilah</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=G33kX" title="Code">💻</a></td><td align="center"><a href="https://github.com/kimballfrank"><img src="https://avatars3.githubusercontent.com/u/1413863?v=4" width="100px;" alt="kimballfrank"/><br /><sub><b>kimballfrank</b></sub></a><br /><a href="#design-kimballfrank" title="Design">🎨</a> <a href="#ideas-kimballfrank" title="Ideas, Planning, & Feedback">🤔</a></td><td align="center"><a href="https://github.com/aBlueShadow"><img src="https://avatars0.githubusercontent.com/u/25465934?v=4" width="100px;" alt="aBlueShadow"/><br /><sub><b>aBlueShadow</b></sub></a><br /><a href="#ideas-aBlueShadow" title="Ideas, Planning, & Feedback">🤔</a> <a href="#translation-aBlueShadow" title="Translation">🌍</a></td><td align="center"><a href="http://jrobe.me"><img src="https://avatars1.githubusercontent.com/u/1224343?v=4" width="100px;" alt="John Robe"/><br /><sub><b>John Robe</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Ajrobe" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=jrobe" title="Code">💻</a></td><td align="center"><a href="https://github.com/ksmithut"><img src="https://avatars0.githubusercontent.com/u/1906967?v=4" width="100px;" alt="Keith Smith"/><br /><sub><b>Keith Smith</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Aksmithut" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=ksmithut" title="Code">💻</a></td><td align="center"><a href="https://github.com/MaesonBusk"><img src="https://avatars3.githubusercontent.com/u/40648791?v=4" width="100px;" alt="MaesonBusk"/><br /><sub><b>MaesonBusk</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=MaesonBusk" title="Documentation">📖</a></td></tr><tr><td align="center"><a href="https://github.com/ericman314"><img src="https://avatars0.githubusercontent.com/u/6345617?v=4" width="100px;" alt="Eric Mansfield"/><br /><sub><b>Eric Mansfield</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=ericman314" title="Code">💻</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=ericman314" title="Tests">⚠️</a></td><td align="center"><a href="https://github.com/sassyspock"><img src="https://avatars2.githubusercontent.com/u/43680869?v=4" width="100px;" alt="sassyspock"/><br /><sub><b>sassyspock</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=sassyspock" title="Documentation">📖</a> <a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Asassyspock" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=sassyspock" title="Code">💻</a></td><td align="center"><a href="http://justinpaulhammond.com"><img src="https://avatars0.githubusercontent.com/u/39606064?v=4" width="100px;" alt="Justin"/><br /><sub><b>Justin</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=Justintime50" title="Documentation">📖</a> <a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AJustintime50" title="Bug reports">🐛</a> <a href="#blog-Justintime50" title="Blogposts">📝</a></td><td align="center"><a href="https://github.com/thoriumsim"><img src="https://avatars0.githubusercontent.com/u/48568289?v=4" width="100px;" alt="thoriumsim"/><br /><sub><b>thoriumsim</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=thoriumsim" title="Documentation">📖</a> <a href="#tutorial-thoriumsim" title="Tutorials">✅</a> <a href="#video-thoriumsim" title="Videos">📹</a></td><td align="center"><a href="https://github.com/JordanDeSmith"><img src="https://avatars2.githubusercontent.com/u/48338615?v=4" width="100px;" alt="JordanDeSmith"/><br /><sub><b>JordanDeSmith</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=JordanDeSmith" title="Code">💻</a></td><td align="center"><a href="https://github.com/Unit1229"><img src="https://avatars3.githubusercontent.com/u/35549562?v=4" width="100px;" alt="Mason Edmondson"/><br /><sub><b>Mason Edmondson</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AUnit1229" title="Bug reports">🐛</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!
