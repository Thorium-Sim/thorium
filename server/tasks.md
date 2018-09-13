# Tasks

Tasks are actions that should be performed at certain times during the
simulation. Task templates are defined on the classes themselves. Task templates
can have the following properties and methods:

- `name`: The name of the task. Should be unique.
- `active`: A method to check and see if the task can be performed by the crew.
  Should check the station for the cards and widgets that can perform the task
  and for if the task is even relevant. For example, raising shields when the
  shields are raised is redundant.
- `values`: An object of two keys: input and value. The object's key is the name
  of the value. The results of the "value" function is the random value that
  must be set. For example, the required shield frequency. However, these can be
  pre-configured, such as through the core component or through a timeline step.
  In that case, the input for that control is defined by the input function's
  output. An array will produce a <select> control, the string "text" will
  produce a text input, etc. Note that, in some cases, missions will have to
  manually input a value to be interpolated, such as the name or type of a
  system.
- `verify`: A method to check and see if the task was performed correctly. This
  method includes a named `requiredValues` argument which is the values that
  were defined in the `values` object functions. For example, this will contain
  required shield frequency which must have been set as part of the task.

All methods take a single argument which is an object of the following:

```
{
  stations
  simulator
}
```
