## components

```
components
├─README.md
│
├─core ── Core layouts.
│
├─macros & macrosPrint ── Configuration views for timeline macros
│
├─generic ── Generic components for regular use. Ex. Button, Col, Row, Card, etc. Be sure to add any generic components created to index.js to be easily accessible.
│
├─layouts ── Simulator layouts. Frame for the card. Should include any elements on every screen of the station, including a card switcher, messages, indicators, etc. Individual folders for each layout. This hasn't been fully fleshed out yet, but expect this README to be updated once I figure out how this is going to work. Be sure to update index.js with any newly created layouts.
│
├─views ── Simulator cards. The actual controls themselves. Each screen on a station is a component from  this folder. Each component should have it's own folder and be as atomic as possible, with no dependency on other views. Be sure to add any new views to index.js so views can be appropriately added.
│
└─viewscreens ── Components for the viewscreen, including the configuration components.
```
