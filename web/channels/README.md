## Channels

```
web
├─README.md
│
├─generic_channel.ex     ── Allows for generic database read connections. Automatically fetches the current data and initiates a changefeed watcher. The syntax is a little funky, but it allows for multiple generic channels connected to the same database with different filters. The channel name contains all of the data, including the table name and any filters. It uses the structure `generic:***tableName***` to get all records and `generic:***tableName***:***filterString***` to get records with a filter applied. The filterString is a stringified list in the format `key?value;key?value`. Refer to /web/static/js/actions for examples.
│
├─operations_channel.ex  ── Allows for generic database operations with insert, update, and delete. Params are passed in as an object like this example update: %{"table" => "tableName", "filter" => %{filterObj}}, "data" => %{dataObj}}
│
├─presence.ex            ── Unused stub for Phoenix Presences. Might finish someday.
│
└─user_socket.ex         ── Used to set up channels for use with Phoenix and for managing client tokens
```

