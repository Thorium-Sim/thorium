## js

```
web
├─README.md
│
├─app.js ── Redux entry point, and app renderer. The buck stops here.
│
├─socket.js ── Phoenix socket setup. 
│
├─actions ── Redux actions store. Currently organized by database, but could be organized for any atomic data set. Be sure to put any actions created into index.js so it can easily be accessed by the reducer. Also ensure that the action constants are unique.
│
├─components ── React components. Where the actual views live. See folder README.
│
├─containers ── React containers. Speciallized containers, such as App.js, the main router entry point, and Card.js which dynamically loads the cards.
│
├─helpers ── One-off global helper functions.
│
└─reducers ── Redux Reducers. Use the same names for the reducers as you use for the actions. Be sure to put any reducers into index.js so they can be combined.
```

