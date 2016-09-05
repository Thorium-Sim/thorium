## Web

```
web
├─README.md
├─router.ex     ── Define's Phoenix's routing. Only has routes for
│                  /reset which resets the database. All other routing is handled
│                  on the client
│	
├─web.ex        ── Define's Phoenix's basic model, view, controller, channel, etc.
│                  setup.
├─gettext.ex    ── Can be used for localization. Since all routes are
│                  clientside, this module isn't very useful
│
├───channels    ── Phoenix websocket channels for communication with client. See folder README. 
│   
├───controllers ── Phoenix controllers. One renders the HTML page, one resets the database.
│   
├───graphql     ── GraphQL Schema and endpoint data.
│
├───static      ── Houses all clientside code. See folder README.
│   
├───templates
│   │
│   └───layout
│       │
│       └───app.html.eex ── Renders HTML. Has <head> tag. Only useful for editing that.
│
└───views ── Has various Phoenix helper views. Not useful for this project.
```