# Macro Definintions

Thorium supports macros, which are carefully defined mutations. The mutations need to have descriptions on them which are prefixed by `Macro:`. This lets the system know that it is a macro.

```
#Macro: Creates a snapshot of the current data structure and saves it to file
snapshot: String
```

Arguments which can be configured also must have comments applied to them with JSON objects defining the different types of the argument. There are a few methods available for defining arguments:

#### Text Input

```
# {
#   "content":"Name",
#   "type":"text",
# }
```

#### Query Defined Options

```
# {
#   "content":"Simulator",
#   "type":"select",
#   "query": "simulators(template: false){id, name}",
#   "queryName": "simulators",
#   "key":"id",
#   "value":"name"
# }
```

* `content` : The label that will be used for the argument

* `type`: Defines the type of input that would be used. Only option is 'select'. Might add radio later

* `query`: The GraphQL query that will be run to get the available values for the argument

* `queryName`: A name for the query

* `key`: They id of the select input

* `value`: The value of select input

#### Enum Defined Options

```
# {
#   "content":"Alert Level",
#   "type":"select",
#   "enum":["5","4","3","2","1","p"]
# }
```

* `content` : The label that will be used for the argument

* `type`: Defines the type of input that would be used. Only option is 'select'

* `enum`: Defines the options. The key and value are the same.

#### Variable Defined Options

```
# {
#   "content":"Layout",
#   "type":"select",
#   "varName":"Layouts"
# }
```

* `content` : The label that will be used for the argument

* `type`: Defines the type of input that would be used. Only option is 'select'

* `varName`: A variable defined on the ArgItem class on the client code, eg: `this.Layout = require('./LayoutList.js')`. This is useful for information that is only available to the client, such as the layouts or card components that are available. Be sure to change the client code to match it.
