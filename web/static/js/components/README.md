## components

```
web
├─README.md
│
├─generic ── Generic components for regular use. Ex. Button, Col, Row, Card, etc. Be sure to add any generic components created to index.js to be easily accessible. 
│
├─layouts ── Simulator layouts. Frame for the card. Should include any elements on every screen of the station, including a card switcher, messages, indicators, etc. Individual folders for each layout. This hasn't been fully fleshed out yet, but expect this README to be updated once I figure out how this is going to work. Be sure to update index.js with any newly created layouts.
│
├─themes ── Simulator themes. Used to change the style of generic components? I don't know about that yet. Individual folders for each theme. This hasn't been fully fleshed out yet, but expect this README to be updated once I figure out how this is going to work. Be sure to update index.js with any newly created themes.
│
└─views ── Simulator cards. The actual controls themselves. Each screen on a station is a component from this folder. Each component should have it's own folder and be as atomic as possible, with no dependency on other views. Be sure to add any new views to index.js AND list.js so views can be appropriately added.
```

