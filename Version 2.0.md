# Thorium 2.0

A refactor of Thorium is underway to bring it upt to date with some libraries
and coding practices while cleaning up the code and improving the user
experience.

Some goals for this refactor, in order of importance:

- Partial TypeScript definitions, especially for the server
- Add more tests, particularly on the client side
- Add storybook pages for custom components and cards.
- Upgrade all components to be React StrictMode compatible.
- Clean up the data flow for passing data down to the individual cards. Use
  context or MobX
- Redesign the GraphQL schema, especially so mutations are in
  {system}{Operation} format, like phasersFire
- Make sure subscriptions are atomic and scoped to just what the subscriber
  wants.
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
- Remove references to Apollo's `graphql` HOC and the `<Query>` and `<Mutation>`
  components (especially if we switch to MST-GQL)

A few maybes?

- Experiment with switching from Apollo GraphQL to MST-GQL.
- Use CSS-in-JS

## Contribution Guidelines

Here are the steps which contributors should do when helping out with most of
these items:

1. If working on React components, make sure there is a storybook for any
   component that is being changed, especially cards and core components.
2. Write tests that verify the thing that is being changed. Now is a good time
   to add TypeScript definitions, if they don't exist.
3. Submit a pull request so maintainers can check to make sure the tests cover
   the necessary use cases.
4. Once the tests have been merged, make the change.
5. Run the tests; make sure that everything is still working correctly.
6. Submit a pull request.
7. Bask in the satisfaction that you've made an important contribution to a
   great open-source project.

TypeScript conversions don't require writing additional tests, unless adding the
type definitions requires refactoring the core functionality.
