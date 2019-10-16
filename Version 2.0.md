# Thorium 2.0

A refactor of Thorium is underway to bring it upt to date with some libraries
and coding practices while cleaning up the code and improving the user
experience.

Some goals for this refactor:

- Partial TypeScript definitions, especially for the server
- Add more tests, particularly on the client side
- Clean up the data flow for passing data down to the individual cards. Use
  context or MobX
- Clean up and improve the configuration process.
- Simplify so it's only running one flight at a time.
- Missions are no longer stored in the Snapshot, but are loaded in by the server
  from separate files.
- Simulator configs are no longer in the Snapshot, but are loaded in by the
  server from separate files.
- Redesign the GraphQL schema, especially so mutations are in
  {system}{Operation} format, like phasersFire
- Make sure subscriptions are atomic and scoped to just what the subscriber
  wants.
- Significantly simplify the Flight Director experience for inexperienced flight
  directors.
- Switch from using PKG to using Electron to bundle the server and client into a
  single

A few maybes?

- Experiment with switching from Apollo GraphQL to MST-GQL
- Use CSS-in-JS

## Contribution Guidelines
