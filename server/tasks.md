# Tasks

Tasks are actions that should be performed at certain times during the
simulation. Task templates are defined on the classes themselves. Task templates
are static properties that are arrays of objects with the following properties
and methods:

- `name`: The name of the task. Should be unique.
- `active`: A method to check and see if the task can be performed by the crew.
  Should check the station for the cards and widgets that can perform the task
  and for if the task is even relevant. For example, raising shields when the
  shields are raised is redundant.
- `station`: A method that gives a list of stations which this task can be
  assigned to.
- `instructions`: A method that composes the values together into a message. It
  should take into account both tasks assigned to individual crew members and
  tasks that are included in a damage report which are destined for other
  stations. For example, damage report tasks should include verbage that says
  "Ask the **officer name** to do this thing"
- `values`: An object of three keys: input, hint, and value. The object's key is
  the name of the value.
  - The results of the "value" function is the random value that must be set.
    For example, the required shield frequency. However, these can be
    pre-configured, such as through the core component or through a timeline
    step.
  - In that case, the input for that control is defined by the input function's
    output. An array will produce a <select> control, the string "text" will
    produce a text input, etc. Note that, in some cases, mission timelines will
    have to manually input a value to be interpolated, such as the name or type
    of a system.
  - Hint is an optional string description of the value which is placed next to
    the input
- `verify`: A method to check and see if the task was performed correctly. This
  method includes a named `requiredValues` argument which is the values that
  were defined in the `values` object functions. For example, this will contain
  required shield frequency which must have been set as part of the task.

All methods take a single argument which is an object of the following:

```
{
  stations
  simulator
  requiredValues - only on verify, active, and instructions
  task - the task instance which the methods are called against. Only on verify
}
```

Possible inputs for the `values` function:

- An array of objects with the shape: {value:"", label:""} -> Select menu;
  returns the value option
- The string "text" -> Text input
- The string "textarea" -> Textarea input
- An object, which maps to input props: { type: "number", min: 100, max: 350 }
- The string "roomPicker" -> A deck and room picker for the simulator

A background process will continuously check to see if a task has been verified
by performing the verify check on any task instances that are currently
unverified. Tasks can be manually verified by the flight director.

The text of tasks is defined by the values provided and the instructions
function.

Tasks can have multiple steps. This is done by simply adding a parentId to a
step that must be completed before the step in question can be done. This
creates a chain of steps which must be completed one at a time.

The data structure for this is an array of arrays of tasks, like so:

[[First Task], [Second Task 1, Second Task 2], [Third Task]]
