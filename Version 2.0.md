# Thorium 2.0

A refactor of Thorium is underway to bring it upt to date with some libraries
and coding practices while cleaning up the code and improving the user
experience.

Some of this stuff might be part of future refactors.

Some goals for this refactor:

- [ ] Add more tests, particularly on the client side
- [x] Add storybook pages for custom components and cards.
- [x] Provide more client data in the GraphQL context, like simulator ID,
      station, etc. This makes it so notifications can be selectively sent
      depending on whether the action was performed by a crew member or by a
      core.
- [x] Combine the GraphQL server and the client server into a single server,
      using a single port. Make that port easy to type in, like 4444 or make it
      configurable.
- [x] Switch from using PKG to using Electron to bundle the server and client
      into a single
- [x] Make the bundle size smaller by only including the packages and
      dependencies that are necessary.
- [x] Add DangerJS reviews to pull requests.
- [x] Make sure server errors are properly being logged to Sentry.
- [x] Fix all of the stylelint issues.

## Version 3.0

Once the 2.0 refactor is released, we'll start focusing on additional changes to
further improve developer and user experience. Since many of these changes could
be breaking changes, this release will be a version 3.0.

- [ ] Clean up the data flow for passing data down to the individual cards. Use
      context
- [ ] Improve the queries so they properly have singular and plural queries for
      things.
- [ ] Redesign the GraphQL schema, especially so mutations are in
      {system}{Operation} format, like phasersFire
- [ ] Add proper mutation responses to all requests, to make it easier to
      transition to MST-GQL
- [ ] Convert all `SYSTEMUpdate` subscriptions to instead be just `SYSTEM` and
      match the name of the query exactly. This makes it much easier to use
      useQuery and useSubscription together without having to use
      useSubscribeToMore (which is a messy API)
- [ ] Simplify so it's only running one flight at a time.
- [ ] Partial TypeScript definitions, especially for the server
- [ ] Upgrade all components to be React StrictMode compatible.
- [ ] Make it so systems are stored on the simulator object instead of being
      stored on the main App storage.
- [ ] Make sure subscriptions are atomic and scoped to just what the subscriber
      wants.
- [ ] Fix the weird mutation events system so it's not so weird.
- [ ] Add Axe-Core and Jest-Axe to do accessibility testing. Fix accessibility
      bug that it finds.
- [ ] Combine all process loops into a single loop which is based on delta
      times.
- [ ] Clean up and improve the configuration process.
- [ ] Missions are no longer stored in the Snapshot, but are loaded in by the
      server from separate files.
- [ ] Simulator configs are no longer in the Snapshot, but are loaded in by the
      server from separate files.
- [ ] Significantly simplify the Flight Director experience for inexperienced
      flight directors.
- [ ] Fix a bunch of Sentry errors.
- [ ] Remove references to Apollo's `graphql` HOC and the `<Query>` and
      `<Mutation>` components (especially if we switch to MST-GQL)
- [ ] Make it possible to have Reactour trainings auto-advance based on actions
      which the crew members perform. Maybe see if they can be integrated
      together, so training for one card moves into the next, or even has a
      configurable preamble which shows on the Login screen.
- [ ] Improve the timeline system so it's easier to create and compose missions.
      Provide a platform for hosting and sharing missions easily.
- [ ] Combine regular notifications with Core Feed. Core feed maintains all core
      notifications.

A few maybes?

- Experiment with switching from Apollo GraphQL to MST-GQL.
- If not MST-GQL (because Apollo GraphQL does a lot of great stuff for us), then
  use https://graphql-code-generator.com/, explore simplifying the subscription
  update process to remove boilerplate, and create a babel macro that generates
  GraphQL AST, like this: https://gqless.netlify.com
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

## Other Things to Improve

There are a number of things that are not good about the way Thorium is
developed that could be improved. When you come across these things, try to make
them better using the suggestions below. Some of these things include:

- Inline styles. Replace them with CSS-in-JS definitions using Emotion.
- Report any weird things, either directly to Alex, or by submitting an issue.
