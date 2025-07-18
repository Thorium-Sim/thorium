![Thorium](github-banner.png)

[![Test](https://github.com/Thorium-Sim/thorium/actions/workflows/test.yml/badge.svg)](https://github.com/Thorium-Sim/thorium/actions/workflows/test.yml)
[![Discord](https://img.shields.io/discord/390968011605147648.svg)](https://discord.gg/UvxTQZz)
[![All Contributors](https://img.shields.io/badge/all_contributors-20-orange.svg)](#contributors)
![Version](https://img.shields.io/github/package-json/v/thorium-sim/thorium)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/thorium-sim/thorium/develop)

> [!NOTE]
> Be sure to check out [Thorium Nova](https://nova.thoriumsim.com), the next generation of Spaceship Simulator controls

# Thorium

A simulator controls platform

New here? Check out the [contributing document](CONTRIBUTING.md).

Want something to work on? Here's where
[we need help](https://github.com/Thorium-Sim/thorium/labels/help%20wanted). Not
sure what it is or how to work with Thorium? Guides are in the
[docs website](https://classic.thoriumsim.com/docs/overview/).

## Table of Contents

* [What is Thorium?](#what-is-thorium)
* [Guiding Principles](#guiding-principles)
* [Getting Started](#getting-started)
* [Building the App](#building-the-app)
* [Deploying](#deploying)
* [Migrating](#migrating)
* [Translations](#translations)
* [Contributors](#contributors)

## What is Thorium?

Thorium is a guided narrative multiplayer cooperative real-time spaceship bridge
simulator. Let's unpack all that vocabulary

- **Narrative**: Thorium prioritizes storytelling and narrative over action and
  spectacle.
- **Guided**: The narrative is lead by a Flight Director, who works to help
  players feel connected to the story.
- **Multiplayer**: Thorium is intended to be played by multiple players.
- **Cooperative**: Players are intended to work together to win the game.
- **Spaceship**: The gameplay of Thorium takes place in space.
- **Bridge Simulator**: Players each run an individual station that runs a small
  part of the entire ship.
- **Real-time**: The action in Thorium is immediate and non-stop.

Thorium is flexible enough to provide a system for creating an integrated,
distributed, fault-tolerant show-control system that can power lights, sound,
video, and take input and provide output to a wide variety of devices.

Created with ❤ by [Alex Anderson]() and [Fyreworks](https://fyreworks.us).

## A note about support

Thorium is a self-organized "community support" project. We encourage everyone
to use it and continue to submit issues and bug reports. Alex is the primary maintainer,
and will continue to:

- Review issues
- Review pull requests and provide feedback
- Merge pull requests
- Create new builds/releases
- Encourage and assist other developers
- Focus his efforts on long-term projects and keeping the codebase modern.

Fortunately, you can get help from the excellent people on
[Thorium's Discord Server](https://discord.gg/UvxTQZz).

If you need better support for your Thorium simulator,
[Alex](https://github.com/alexanderson1993) is happy to contract with you to do
so. Reach out via Discord to start the process.

If you want to learn to contribute to Thorium, check out the
[development video series](https://www.youtube.com/watch?v=iEU6NcOKhyE&list=PLvw0SNT6wHt9au1-6yCOh7QHj-p5ir0l6)
for some ideas for how to get started.

Hope this helps!

## Guiding Principles

Thorium is based on years of experience building spaceship simulator controls for
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
- While Thorium works hard to be the end-all-be-all of spaceship simulator
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

Make sure you have **[Node.js v22](https://nodejs.org/)** installed.

> **Note:** You must have [`node-gyp`](https://github.com/nodejs/node-gyp) installed and properly configured.  
> This requires Python, `make`, and a C++ compiler.

Install dependencies with:

```sh
npm install --force
```

Start the development server:

```sh
npm start
```

Then open the app in your browser:

* [http://localhost:3000](http://localhost:3000)
* [GraphiQL](http://localhost:3001/graphiql)


## Building the App

To build the app for production and bundle it into a packaged terminal app:

```sh
npm run build
```

## Deploying

Thorium releases are automatically deployed when changes are merged into Master.

## Migrating

Thorium does not use a traditional database; instead, it stores information in a
json file. To migrate your Thorium instance to another computer, simply copy the
`snapshot.json` and `snapshot-restore.json` files along with any `assets` you
may be using and drop them in the new thorium directory. Startup the Thorium app
and you'll be on your way.

## Translations

Thorium is currently in the process of supporting i18n translations. Want to add
translated strings for your language? If the language doesn't exist, add it to
the `package.json` file. Also be sure to add the locale data to the
`/src/helpers/intl.js`.

Translations are done with `react-intl`. A good example of how this can be used
is the `/src/containers/FlightDirector/Welcome.js` file.

## Contributors

Thanks goes to these wonderful people
([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://ralexanderson.com"><img src="https://avatars1.githubusercontent.com/u/6558157?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Alex</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993" title="Code">💻</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993" title="Documentation">📖</a> <a href="#design-alexanderson1993" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/Emrix"><img src="https://avatars0.githubusercontent.com/u/1387836?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Emrix</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=Emrix" title="Code">💻</a> <a href="https://github.com/thorium-sim/Thorium/pulls?q=is%3Apr+reviewed-by%3AEmrix" title="Reviewed Pull Requests">👀</a> <a href="#ideas-Emrix" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/ctolley6"><img src="https://avatars3.githubusercontent.com/u/30132958?v=4?s=100" width="100px;" alt=""/><br /><sub><b>ctolley6</b></sub></a><br /><a href="#ideas-ctolley6" title="Ideas, Planning, & Feedback">🤔</a> <a href="#tutorial-ctolley6" title="Tutorials">✅</a></td>
    <td align="center"><a href="https://github.com/Rasbandit"><img src="https://avatars0.githubusercontent.com/u/22157796?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Todd Rasband</b></sub></a><br /><a href="#design-Rasbandit" title="Design">🎨</a></td>
    <td align="center"><a href="http://www.brentjanderson.com"><img src="https://avatars0.githubusercontent.com/u/45031?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brent Anderson</b></sub></a><br /><a href="#ideas-brentjanderson" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://www.farpointStation.org"><img src="https://avatars1.githubusercontent.com/u/4927395?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Farpoint</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Afarpoint" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/isaacOstler"><img src="https://avatars1.githubusercontent.com/u/30113240?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isaac Ostler</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AisaacOstler" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://j-f1.github.io"><img src="https://avatars2.githubusercontent.com/u/25517624?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jed Fox</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=j-f1" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/G33kX"><img src="https://avatars2.githubusercontent.com/u/2187124?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lilah</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=G33kX" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kimballfrank"><img src="https://avatars3.githubusercontent.com/u/1413863?v=4?s=100" width="100px;" alt=""/><br /><sub><b>kimballfrank</b></sub></a><br /><a href="#design-kimballfrank" title="Design">🎨</a> <a href="#ideas-kimballfrank" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/aBlueShadow"><img src="https://avatars0.githubusercontent.com/u/25465934?v=4?s=100" width="100px;" alt=""/><br /><sub><b>aBlueShadow</b></sub></a><br /><a href="#ideas-aBlueShadow" title="Ideas, Planning, & Feedback">🤔</a> <a href="#translation-aBlueShadow" title="Translation">🌍</a></td>
    <td align="center"><a href="http://jrobe.me"><img src="https://avatars1.githubusercontent.com/u/1224343?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Robe</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Ajrobe" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=jrobe" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ksmithut"><img src="https://avatars0.githubusercontent.com/u/1906967?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Keith Smith</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Aksmithut" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=ksmithut" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MaesonBusk"><img src="https://avatars3.githubusercontent.com/u/40648791?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MaesonBusk</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=MaesonBusk" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/ericman314"><img src="https://avatars0.githubusercontent.com/u/6345617?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Eric Mansfield</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=ericman314" title="Code">💻</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=ericman314" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/sassyspock"><img src="https://avatars2.githubusercontent.com/u/43680869?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sassyspock</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=sassyspock" title="Documentation">📖</a> <a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Asassyspock" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=sassyspock" title="Code">💻</a></td>
    <td align="center"><a href="http://justinpaulhammond.com"><img src="https://avatars0.githubusercontent.com/u/39606064?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Justin</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=Justintime50" title="Documentation">📖</a> <a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AJustintime50" title="Bug reports">🐛</a> <a href="#blog-Justintime50" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/thoriumsim"><img src="https://avatars0.githubusercontent.com/u/48568289?v=4?s=100" width="100px;" alt=""/><br /><sub><b>thoriumsim</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=thoriumsim" title="Documentation">📖</a> <a href="#tutorial-thoriumsim" title="Tutorials">✅</a> <a href="#video-thoriumsim" title="Videos">📹</a></td>
    <td align="center"><a href="https://github.com/JordanDeSmith"><img src="https://avatars2.githubusercontent.com/u/48338615?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JordanDeSmith</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=JordanDeSmith" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Unit1229"><img src="https://avatars3.githubusercontent.com/u/35549562?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Mason Edmondson</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3AUnit1229" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/isaaccubeman"><img src="https://avatars2.githubusercontent.com/u/65324647?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Isaac Evans</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/issues?q=author%3Aisaaccubeman" title="Bug reports">🐛</a> <a href="https://github.com/thorium-sim/Thorium/commits?author=isaaccubeman" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/SoshJam"><img src="https://avatars.githubusercontent.com/u/21060092?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SoshJam</b></sub></a><br /><a href="https://github.com/thorium-sim/Thorium/commits?author=SoshJam" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/kentcdodds/all-contributors)
specification. Contributions of any kind welcome!