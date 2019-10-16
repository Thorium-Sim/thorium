# Thorium 2.0

A refactor of Thorium is underway to bring it upt to date with some libraries
and coding practices while cleaning up the code and improving the user
experience.

Some of this stuff might be part of future refactors.

Some goals for this refactor:

- Partial TypeScript definitions, especially for the server
- Add more tests, particularly on the client side
- Add storybook pages for custom components and cards.
- Upgrade all components to be React StrictMode compatible.
- Clean up the data flow for passing data down to the individual cards. Use
  context or MobX
- Improve the queries so they properly have singular and plural queries for
  things.
- Make it so systems are stored on the simulator object instead of being stored
  on the main App storage.
- Redesign the GraphQL schema, especially so mutations are in
  {system}{Operation} format, like phasersFire
- Make sure subscriptions are atomic and scoped to just what the subscriber
  wants.
- Add proper mutation responses to all requests, to make it easier to transition
  to MST-GQL
- Fix the weird mutation events system so it's not so weird.
- Provide more client data in the GraphQL context, like simulator ID, station,
  etc. This makes it so not every query and subscription has to pass a simulator
  ID as an argument and notifications can be selectively sent depending on
  whether the action was performed by a crew member or by a core.
- Add Axe-Core and Jest-Axe to do accessibility testing. Fix accessibility bug
  that it finds.
- Combine the GraphQL server and the client server into a single server, using a
  single port. Make that port easy to type in, like 4444 or make it
  configurable.
- Combine all process loops into a single loop which is based on delta times.
- Clean up and improve the configuration process.
- Simplify so it's only running one flight at a time.
- Missions are no longer stored in the Snapshot, but are loaded in by the server
  from separate files.
- Simulator configs are no longer in the Snapshot, but are loaded in by the
  server from separate files.
- Significantly simplify the Flight Director experience for inexperienced flight
  directors.
- Switch from using PKG to using Electron to bundle the server and client into a
  single
- Make the bundle size smaller by only including the packages and dependencies
  that are necessary.
- Add DangerJS reviews to pull requests.
- Make sure server errors are properly being logged to Sentry.
- Fix a bunch of Sentry errors.
- Remove references to Apollo's `graphql` HOC and the `<Query>` and `<Mutation>`
  components (especially if we switch to MST-GQL)
- Make it possible to have Reactour trainings auto-advance based on actions
  which the crew members perform. Maybe see if they can be integrated together,
  so training for one card moves into the next, or even has a configurable
  preamble which shows on the Login screen.

A few maybes?

- Experiment with switching from Apollo GraphQL to MST-GQL.
- Use CSS-in-JS

## Contribution Guidelines

Here are the steps which contributors should do when helping out with most of
these items:

1. When you find a piece of code that needs refactoring, make sure it has an
   issue. You can check in the Version 2.0 project on Github. Request to be
   assigned to that issue. You can start working on it before formally being
   assigned.
2. If working on React components, make sure there is a storybook for any
   component that is being changed, especially cards and core components.
3. Write tests that verify the thing that is being changed. Now is a good time
   to add TypeScript definitions, if they don't exist.
4. Submit a pull request to the 2.0 branch so maintainers can check to make sure
   the tests cover the necessary use cases.
5. Once the tests have been merged, make the change.
6. Run the tests; make sure that everything is still working correctly.
7. Submit a pull request to the 2.0 branch.
8. Bask in the satisfaction that you've made an important contribution to a
   great open-source project.

TypeScript conversions don't require writing additional tests, unless adding the
type definitions requires refactoring the core functionality.
