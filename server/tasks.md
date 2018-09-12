# Tasks

Tasks are actions that should be performed at certain times during the
simulation. Task templates are defined on the classes themselves. Task templates
can have the following properties and methods:

- `name`: The name of the task. Should be unique.
- `active`: A method to check and see if the task can be performed by the crew.
  Should check the station for the cards and widgets that can perform the task
  and for if the task is even relevant. For example, raising shields when the
  shields are raised is redundant.
- `values`: An object of functions. The key is the name of the value and the
  results of the function is the value that must be set. For example, the
  required shield frequency.
- `verify`: A method to check and see if the task was performed correctly. This
  method includes a named `requiredValues` argument which is the values that
  were defined in the `values` object functions. For example, this will contain
  required shield frequency which must have been set as part of the task.

All methods take a single argument which is an object of the following:

```
{
  system - the system or object in question (in the case of docking ports and crew)
  stations
  simulator
}
```
