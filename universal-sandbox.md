- Start Date: 2019-11-14
- Status: In Progress (don’t change this)

##

**Summary**

Tracking the persistent location and metadata of objects in space, including the
simulator. Has implications for sensors, navigation, weapons, communications,
“targeted” systems (such as tractor beam), simulated AI actors, viewscreen, and
timelines.

##

**Motivation**

This is a highly involved project, and as such is motivated in several ways:

1. **Realism & Immersion: **Tracking the location of ships in space and
   simulating their interactions would provide much more realism than the
   current model which is totally defined and dictated by the flight director.
   Interactions would be more consistent and based on predefined rules. Also, a
   viewscreen module showing what’s outside the ship would help make them feel
   like their actions are actually being carried out. In some cases, this would
   be limited to encourage teamwork and collaboration between crew members, such
   as sensors providing instructions to the flight control officer.
2. **Simplified Flight Director Experience: **Instead of manually moving sensor
   contacts, the flight director would provide general instructions to sensor
   contacts, and they would automatically execute those commands. The flight
   director can then focus on other aspects of the simulation.
3. **Easier Timeline & Dynamic Storytelling:** External visuals of planets,
   stars, and ships would not have to be pre-rendered, but could be dynamically
   shown via a 3d rendering of what is happening outside the ship. This makes
   story writing much easier and faster.
4. **More Crew Interactions:** There are opportunities for navigation to learn
   how to properly set a course, thrusters firing would impact weapons and other
   “targeted systems”, such as rotating the ship so a target is behind the ship.
   To communicate with a ship, you would have to move the simulator into
   communications range. Sensors could automatically scan for multiple aspects
   of a contact and get back pre-recorded information about the systems on that
   ship. All of this helps the crew learn, work together, and develop
   individually.

##

**Detailed design**

This will be broken into several sections that are all related to the overall
design.

### Starmap

The central piece of this feature is the starmap. The location and rotation of
every entity in space is tracked. This includes planets, stars, asteroids,
moons, nebulae, divers stellar objects, sovereign borders, ships, starbases,
phasers, torpedos, and other projectiles. Anything which can be seen and
interacted with in space is tracked.

A permanent starmap is created before any flights are started. This star map
contains the more permanent objects in the universe, such as stars, planets,
etc. When a flight is started, this starmap is duplicated so changes to the
starmap that occur during the flight aren’t persisted to other flights.

Since space is REALLY BIG and it’s difficult to model things at astronomical
sizes and distances, much of the starmap is going to be fudged. Fudging is
necessary to maintain speedy storytelling (since typically it takes a really
long time to travel in space), and not make distances and sizes obnoxiously
difficult to measure. Massively large objects (planets and stars) will appear to
be much smaller and distances between locations would be much shorter than they
would be in reality.

The starmap will have (at least) two stages, each with different levels of
precision. In the **solar stage**, 1 unit of distance will equal 1 centimeter.
The reason for this is that allows high fidelity 3d positioning at the same time
as being large enough to represent positions within a Sol-sized solar
system.[^1] In the **interstellar stage, **1 unit of distance will equal 1
lightsecond. This provides a sufficiently sized unit to model the entire galaxy
while still being small enough that we can properly show distance between
adjacent objects, such as Earth and Alpha Centauri (138,600,000 lightseconds).

The system should be designed such that an arbitrary number of stages can be
nested within each other, to enable further expansion of the starmap in the
future.[^2]

In order to properly travel between stars, speeds will be artificially inflated
at the Interstellar stage. In other words, while traveling through interstellar
space, Warp 6 will be faster than it is in solar space.

Only systems are shown on the interstellar stage, without any kind of detail
about the nature of celestial objects within the solar system. In other words,
the level of detail at the interstellar stage is very low.

Modifications to the star map can be made as part of timeline steps and macros.
This allows a timeline’s initialization step to set up the starmap in a
particular way for a mission, including adding the necessary NPC ships.
Destinations and landmarks that are part of a mission should be included in the
permanent starmap so they are visible to crews that are doing other missions
(for example, a crew doing Fallout should be able to see the system “Kalendis”
from Fatal Error). This provides continuity between flights. Timeline controls
should be nuanced enough to make it possible to change any aspect of the starmap
for instances where continuity isn’t a good thing. Multiple universes could also
be created and made the ‘current’ universe as part of a timeline step.

The Flight Director can see all things on the star map and interact with them.
They can add new objects, modify the properties of existing objects, move
objects instantly, and remove objects.

The starmap editor should be very flexible and easy to use. It should support
scroll gestures for zooming as well as gestures for panning. Clicking and
dragging objects should be smooth and performant. Objects should be
multi-selected using drag select and moved together. Solar stage objects will
primarily be placed on a single plane, with the option to change the up/down
position as necessary, but with large limits. Up/down position will only allow
objects to be placed within the visual frame of the ship. In other words, if I
am sitting somewhere in a solar system, I should be able to see objects ahead of
me regardless of how up or down they are. This is to make it easier to set
course to objects. If they are very up or down from the ship’s location, it
would be very hard to locate them in space. Large objects, like planets and
stars, will have the option to exist outside of the standard plane. On the
viewscreen, they will visually be shown very far below the ship so nothing can
collide with them but they are still visible. Interstellar stage object will
have a constant up/down position and will exist on a single plane.

It should be possible to click on objects to modify their properties and
appearance. All objects will have a place where preset scan requests can be
entered. One or more request texts can be matched with a response that will be
given when a crew member scans for that thing on the object. This provides
maximum flexibility for scanning different things based on the needs of the
flight.

Certain objects such as asteroid fields (which include oort clouds) and nebulas
will be easily generated using a creation wizard. They will allow you to
determine the density and size of the object. Asteroid fields will automatically
be created as a circle around the center of the stage. The individual rocks of
an asteroid field will not have to be placed by the Flight Director and will be
generated at flight time as the ship gets close to the asteroid field. For
obvious reasons, it isn’t allowed to travel above or below asteroid fields.
Their rocks exist in all allowed planes of up/down travel.

Objects will NOT exhibit any kind of stellar physics about rotation around
bodies or revolutions. Objects WILL have mass, which will determine certain
other physical simulations, such as collisions. The mass affects tractor beam
stress. However, in many cases, objects will just pass through one another, to
simplify the simulation. Objects, especially ships, might have the ability to
orbit larger celestial bodies, like planets and stars, instead of just moving
towards them. If this is implemented, it might be necessary to calculate the
trajectory necessary to enter orbit and have the crew rotate their ship in that
direction.

The crew has several “levels of detail” which they can see:

- Navigation map, which shows large celestial objects. They can choose to see
  the interstellar stage, or zoom in on a specific system’s solar stage. In some
  cases, these objects can be hidden until the crew gets to closer range, like
  fog of war. That can be configured by the Flight Director. Also, at the
  interstellar stage, the crew can see national borders between systems. Systems
  can be assigned a nationality which displays a circle around the system.
  Adjacent systems with the same nationality merge their colorful circles
  together, creating a unified border.
- Sensors, which shows any object within a certain distance to the ship.
- Scanning, which provides more details about objects after querying.
- Weapons, which shows objects within weapons range.
- The Viewscreen, which shows visuals of objects nearby.

#### Template Objects

To make it easier to add objects to the starmap, preset template objects can be
made available. These already have scan answers written in and have a fully
formed 3D model and sensor contact image. They would represent classes of ships
(a “Galaxy Class” contact, or a “Nebula Class” contact) and would automatically
be assigned a random name when placed on the starmap, unless the flight director
chooses to change some items of the ship before placing it. All of these options
can be configured mid-flight as well.

### Navigation

Navigation is split into three parts: Thrusters, course calculation, and
engines.

#### Thrusters

Thrusters would operate very similar to how they currently operate in Thorium.
The biggest difference is removing the absolute thruster orientation displays,
eg the Yaw, Pitch, and Roll values. This is because of the difficulty of
translating an arbitrary rotation in space to those three discrete values, since
there are many ways a certain rotation can be reached using those three values.
Instead, all rotations will be relative.

Depending on how the thrusters are implemented (on screen, with a joystick, with
keyboard controls), it might be possible to show how far the ship has rotated on
a single axis while the ship is rotating on that axis. For example, as the ship
is rotating yaw, the screen could show a number incrementing based on how far
the ship has yawed. This will help while doing precise course calculation.

To simplify things, there will be a ‘reorient to center’ button which will
rotate the ship to point in a neutral, default position. This will help the crew
not get confused by the way their ship has been rotated.

To know how to adjust their thrusters, they could use a diagram of their ship
showing their current orientation and the orientation which they need to match
to complete their maneuver. Alternately, the main viewscreen could show what is
in front of the ship and use arrows to direct which way the ship should be
pointed[^3].

Things might be further simplified by removing pitch and roll thrusters entirely
and only allowing the ship to yaw. This would allow for thruster values to be
displayed in an absolute format, at the expense of travel through 3D space.

Thruster rotation should be affected by the mass of the ship and the speed it is
going. In other words, if I am traveling at warp 6, I should be able to use the
thrusters to turn the ship, but depending on the mass of the ship, the thrusters
should respond much more slowly.

Directional (up down, forward reverse) thrusters would work exactly the same way
that they currently do.

As a matter of simplicity, thrusters will automatically fire to bring the ship
to a neutral velocity. In other words, if I am traveling at impulse speed and
press the ‘port’ directional thruster, the ship will move in a port-ward
direction and then coast to no longer moving in a port-ward direction, without
affecting the forward velocity. Reverse thrusters in that case would slightly
decrease the velocity, but that lost velocity would return when the thrusters
are no longer firing.

#### Course Calculation

There are two phases to course calculation: interstellar travel and solar
travel. Both operate entirely on a 2D plane. It is impossible to set course that
involves any change to up/down position. That said, objects that are up/down
should be visible to the pilot on the viewscreen (since objects aren’t allowed
to be very far up/down) and the pilot should be able to properly navigate into
range.

If a ship is in interstellar space, it can only set course to other locations in
interstellar space. If a ship is in solar space, it can set course to objects
within solar space, or (if the ship is outside the radius of the furthest object
in the stage), it can zoom out and set course to objects in interstellar space.

Course calculation is done by determining the thruster rotations necessary to
move the ship in a certain direction. Before locking the course and getting the
necessary thruster rotations, the ship must be reset to a neutral rotation
orientation. Rotations are relative to the current orientation of the ship. The
navigation screen shows the star map. The destination can be selected and locked
in by clicking on the object. Any location in space can be set as a waypoint.
The distance between waypoints could be limited to a certain distance. This
would allow distant objects to require multiple waypoints to reach.

Waypoint directions appear on the viewscreen, making it easy to see if the crew
is on course or not. The correct direction the ship needs to turn could also be
displayed on the thrusters screen.

Traditional, three-digit courses could still exist in this system as well. They
would be used for knowing where to place waypoints, but actually turning the
ship to point in the correct direction would still be handled by the thrusters.

Jump Travel might not require the use of thrusters, but would only require
selecting and locking in a destination.

#### Engines

There are two types of engines: linear travel and jump travel.

**I would love to get comments about how these engines should behave. For the
sake of completeness, I’m going to explain how I imagine them working, but I’m
happy to drastically adjust based on feedback.**

##### Linear Travel

Linear travel moves the ship from point A to point B by passing through all the
points between them. Examples include impulse engines, warp engines, ion drive,
fusion drives, etc.

Linear travel engines operate by applying an acceleration to the ship, which in
turn increases the forward velocity to a point. Every engine has a maximum
velocity associated with it. This will be modeled very similarly to how the
Advanced Navigation acceleration-based engines currently work. The desired power
is applied to the engines, which applies an acceleration based on the power
applied. That acceleration translates to a velocity, which in turn changes the
position of the ship in space.

There are also velocity-based engines which automatically apply a velocity until
the ship is moving at the desired velocity. The desired velocity is just
selected and the ship moves at that velocity until a greater or lesser velocity
is selected. While the ship is traveling, it’s location is visible on the
starmap.

When the ship decreases speed or slows to a stop, it happens automatically. Like
with thrusters, the ship is effectively inertialess, meaning that it is not
necessary to apply a reverse velocity to the ship to slow it down. It will
automatically slow down. This is the current behavior exhibited by Flight
Directors who fly with Thorium.

    **_CMSC Intended Use_**


    I know for us we are considering just having 2 variances of what you describe as Linear Travel.  For our storytelling purposes we want to be able to battle or interact when traveling between systems as well as within the system.  Even though we know the mechanics of it would be impossible in the real world.


    So a “Warp” system for traversing long distances and then an “Impulse” for interior.  Our impulse would still be an FTL drive in principle because it would be having crews get between planets in minutes. \

    Based on efficiency the engines can go a bit slower or faster.  You would control your FTL in small increments where perhaps half or slower is sublight speed.  When you get into your long distance Warp FTL system you have one speed option and perhaps a choice to go to destructive speeds.  Your speed in relation to other ships is based on their engine capability and it is fairly set.
    Examples of variances with 1 being a standard unit to go from:

    Odyssey = 1.07
    Phoenix = 1.05
    Magellan = 1
    Galileo = 1.03


    Improving your speed - One idea that we are also considering is that if you want to increase your speed you can make adjustments to your course.  Slingshot around a blackwhole can give your overall speed a boost.  So the helmsman has the ability to make adjustments to the course that can improve or slow down their speed.  They could also “mask” their trails by going close to objects like pulsars perhaps.  Mostly this engages the engineer while teaching some principals that are used for actual ships and science probes. \

##### Jump Travel

Jump travel takes the ship out of normal space, may or may not have a transition
period, and then deposits the ship at or near the destination. Examples include
wormhole generators, transwarp, and the literal “jump drive” feature that
currently exists in Thorium.

The jump drive may or may not require charging or cooldown between uses. It may
or may not allow a bubble to surround it and nearby ships that jump with the
main ship. It may or may not require the ship to accelerate using Linear Travel
engines before activating the jump drive. While the ship is traveling with the
jump drive, its position will **not** be visible on the starmap. When leaving
the jump travel, the ship may or may not have a forward velocity. Most of these
things could be dictated by the Flight Director depending on preference and
circumstance.

#### Transitioning Between Stages

Moving between the interstellar stage and the solar stage is a crucial part of
navigating and moving the ship.

To move from the interstellar stage to the solar stage, the ship must have a
solar stage selected as the destination. As it approaches the destination and
reaches a certain proximity, it will be placed into the solar stage some
distance outside of the radius of furthest object in the stage. The location of
the ship around the outside edge of the stage when it enters the solar stage
will be determined by the angle at which the ship approaches the solar stage
from interstellar space. The ship will be pointed directly at the center of the
stage. Once the ship enters the solar stage, notifications will automatically be
sent to the crew to slow down the engines.

Jump travel engines will do the same thing, depositing the ship at the outskirts
of the solar system. Alternatively, the flight director could specify where the
jump travel engines deposit the crew. They could do this by manually placing the
crew ship while they are in ‘jump drive’ mode.

To move from the solar stage to the interstellar stage, the ship must be on the
outskirts of the system, outside of the radius of the furthest object in the
stage. An exception might be made for the Jump drive, however. Once the ship is
in the outskirts of the stage, an option will appear to set a course to an
interstellar location. The option to set a course to a solar location will still
be available.

If an interstellar location is selected, the option to set a course to a solar
location will no longer be available until a course is set to the solar stage
and the ship enters proximity of that solar stage again. The visual remnants of
the stage that can be seen on the viewscreen will slowly fade from view. The
ships orientation in interstellar space will be similar to the orientation of
the ship when it left the solar system, except it’s pitch and roll will
automatically be reset to neutral.

### Factions

Ships, including the crew’s simulator, can be assigned to any number of
predetermined factions. Factions define the color which the contact appears on
Sensors with IFF as well as how the contact responds to other contacts. When
factions are defined, they can have relationships assigned to other factions:
friend and enemy. To make it easy to have factions that attack everyone, you can
assign a hostile trait to the faction.

### Sensors

Sensors is pretty involved, so I’m going to split it out into several sections.

#### Contacts & Grid

Sensor contacts are actually objects that are persistent on the starmap, just
scoped to a smaller view area. Contacts can be moved to new locations by the
Flight Director. They can also be assigned behaviors, such as “hold position”,
“travel to here”, or “attack”. One slightly more complicated option is drawing
patrol paths using a ‘pen’ tool of sorts to draw a vector path. They will use
simple AI algorithms to move and perform actions based on their behavior. See
the “Artificial Intelligence” for more information.

Sensor contacts will continue to be represented as small icons or images[^4].
Their position on the sensor grid will always be represented as a 2D plane, just
like current sensors, projected from a position directly above the simulator. It
might be possible to render the 3rd dimension of the contacts positions by
tilting the grid and showing lines up and down connecting the contacts to the
plane which the grid resides on.

One possibility for the sensors grid is to have it be logarithmic; the further
away contacts are, the closer together they appear on the sensor grid. Another
option is having a zooming feature, where you can zoom in to see objects very
close to you and zoom out to see objects further away. Perhaps the level of
detail decreases the further you zoom out.

One aspect that could be interesting is allowing ships with cloaking devices to
scan for the sensor radius of ships. This, combined with patrolling ships, makes
the crew manually sneak around hostile ships.

Sensors will have a limited range. Perhaps this will be determined by the fight
director based on the needs of the flight.

IFF (Identification; Friend or Foe) coloring would be really handy[^5], as
represented by the colors in the top left and right of the image above. These
will be based on the faction which the contact is in. Factions are defined a
little higher in this document. IFF might not apply immediately - it could be
necessary for the crew to scan contacts to determine their IFF.

As the ship turns or moves, the “window” of the sensor grid moves with the ship
automatically. No need for the flight director to update manually.

#### Scanning

Every sensor contact will have information that can easily be scanned by the
crew without Flight Director intervention. All of these items will have to be
pre-determined. There are two options for this: either the scan input field is
an autocomplete field which shows what possible things can be scanned on the
contact; or text processing can determine if a scan query was close to one of
the possible scan options and the computer returns the value which was
requested.

A final option allows for a ‘general scan’ of an object, which returns all, or
perhaps only certain items, of the contacts information.

The information stored on the contact could be used for a ‘ship view’ viewscreen
functionality that automatically shows all the information for the contact.

Also, the scanners could be used to calculate an ETA, which would be
automatically generated based on the speed of the ship and the distances to the
destination. This could automatically respond to ETA scan requests, or it could
be configured to only respond manually via Flight Director intervention.

---

    **CMSC concept**:


      This considers how they can setup scans to be running and they get alerted if their scans find something.  It also considers a way of storing the information.  Hopefully this teaches some principles of how to setup queries rather than just typing on demand.  [https://docs.google.com/document/d/1LcYlfMim6w-oWorJsS7nuYbEEEV3GSoZ3sm4t8gcQ4w/edit](https://docs.google.com/document/d/1LcYlfMim6w-oWorJsS7nuYbEEEV3GSoZ3sm4t8gcQ4w/edit)


    Something we were focused on with these designs is how the sensor information would impact other stations.  It is probably a deeper layer to consider after the initial development, but I think it is important to see the potential impacts beyond sensors.


    Another idea for sensors relates to how we can represent information without text.  So a simple blink might indicate that something has changed.

**Speed indicators & Tracking** - Perhaps the icon on the sensors array could
blink when a speed change is pending so that he can do more of the announcing
and less of it coming from the main computer. Perhaps icons on the array can be
tracked and then fields around the screen can fill with appropriate information
such as the status of their weapons, shield, speed (engines getting charged),
and so on.

#### Probes

Probes would be even more powerful in this system. Equipped with the correct
equipment, a probe could provide a remote sensor grid in a location far away
from the simulator. Ships and objects that move around the probe could be seen
by the probe officer; scans could be performed on those objects; probes equipped
with engines could move freely through the system, independent of the simulator.

Probe networks would also play an important role. They would literally extend
the sensor range of the ship as it travels through space, allowing the crew to
see much further than normal. This would either happen on the probe network
screen or could extend the sensor grid directly.

The probe network could also be used to show visual images of the simulator on
the viewscreen from a third-party perspective.

### Weapons

Weapons which are fired by enemy ships or by the crew will appear both on
sensors and on the viewscreen. To begin with, the only weapons which will be
supported are existing Torpedo and Phaser systems. More could be added over
time.

When weapons impact anything, they will create explosions on the viewscreen. The
speed at which projectiles move will have to be determined somehow. Thrusters
will still be able to dodge incoming weapons fire.

Enemy ships will automatically fire if they have a hostile behavior, with a kill
switch on the core which allows the flight director to make all contacts cease
fire for important story moments. NPC ships will automatically take damage and
be destroyed when impacted by weapons as well. The amount of damage which enemy
weapons and the simulator’s weapons deal can be tuned by the Flight Director,
similar to how the CRM currently works.

Battles will be simulated based on the attributes of the contacts in the battle.
Actions will be queued to happen with a delay or timer of some kind. The action
will have a default outcome (like hit or miss with weapons) with flight director
overrides through the core feed.

### Targeting

To start, targeting will be very similar to how it currently works in Thorium,
with the exception that targets will be acquired on an actual sensor grid. The
grid will only show contacts in weapons range. Clicking on a contact will target
it; firing weapons will spawn those weapons on the sensor grid and viewscreen.
Phasers deal damage immediately for as long as they are firing; phaser arc could
factor into how much damage is dealt and whether the phasers hit. Torpedos will
travel straight to their target. Perhaps the flight director could set a
probability that the crew’s weapons hit their target.

Multiple weapons assigned to a simulator could be limited to only firing in
certain directions. Forward torpedos, vs, aft torpedos; phasers that extend
partially behind the front of the ship, but not all the way to the aft. If the
ship is not pointing in a direction which would allow the weapons to hit their
target, the weapons firing buttons would be disabled. The Tactical officer would
have to work with the Pilot to point the ship in a direction allowing the
weapons to properly target the ship. An option should be available to maintain
the current simple weapons systems for novice crews.

### Shields

If the ship has multiple shields, those shields will automatically be hit by
weapons that hit in the area of the ship that the shield protects. This provides
an opportunity for Tactical and the Pilot to work together to turn the ship so
weapons fire is evenly spread around all of the shields.

Systems on the ship could also be assigned to certain directions of the ship;
the main reactor is towards the aft; life support is on starboard. Then ship
systems could be automatically damaged based on incoming weapons fire in that
specific area of the ship.

Since destroying up the simulator is a serious action, that must be done
manually by the flight director.

### Communications

Short Range Communications could be extended by making it so they not only have
to tune their antenna to a specific frequency, but also have to point their
antenna in a specific direction - the direction of the object which they wish to
communicate with. The communication officer could see a representation of the
sensor grid, either with or without sensor contacts. If there are no sensor
contacts, the Sensors officer would have to tell them where to point the arc.
The arc of the antenna signal could be extended at the expense of signal
strength - make it wider to communicate with more ships at the same time; extend
it to 360 degrees to do a broadcast. Power could play a role in this to make the
signal more powerful, allowing further broadcast or stronger signals.

### “Targeted” Systems

Targeted systems would also be affected. The Tractor Beam, for example, could
show a quarter of the sensors array directly behind the ship. In order to attach
the tractor beam to a target, the ship would have to be in range, behind the
simulator. Then the crew could select their target and activate the tractor beam
properly. Once the tractor beam is activated, the ship being towed would follow
the movement of the ship which has tractor-beamed it. The mass of both ships
would affect the tractor beam stress.

### Viewscreen

The contents of the starmap immediately surrounding the ship will be visible to
the crew via the viewscreen. They’ll be able to see 3D models of the ships and
objects outside of the simulator based on the direction which their ship is
pointing.

The viewscreen will be developed with browser technologies, so a separate
program will not be necessary for displaying the objects on the viewscreen.

A separate card can be assigned to stations which would give the crew the
ability to select which view outside the ship they want to see. They can choose
to look forward, reverse, port, starboard, etc. If a probe network is
established with the correct equipment, the probes in the network can serve as
remote cameras to display third-person views of simulator. Perhaps they can view
their ship from any probe that has a video camera on it that is within a certain
range. When viewing from a probe, they can have a joystick which allows them to
rotate the probe to look in different directions.

There will be an additional screen which can be assigned to the Command station
or perhaps even built into the Thorium Mobile App to allow the crew to change
what their view on the viewscreen is. They’ll be able to choose a forward, side,
or reverse view in the first-person perspective, or a third-person view from
their probes. The view would, of course, change based on the rotation of their
ship in space.

Somehow, the background visuals of where the ship is in space needs to be
determined. Maybe each system on the interstellar stage has its own
predetermined background? Maybe the flight director can choose to change the
background on a whim. Regardless, as the crew moves through space, this
background may or may not change.

Objects like nebulas and asteroids are dynamically generated as the crew gets
closer to the objects in question.

The viewscreen is the centerpiece of this feature, so much so that it might
necessitate a complete overhaul of how the viewscreen is currently used. Since
so much of piloting and navigation is based on what is seen outside of the ship
on the viewscreen, the 3D sandbox will likely be displayed all the time, with
other viewscreen cards showing up as overlays or Picture-in-Picture.

### Artificial Intelligence

Many objects in the starmap[^6] can be assigned behaviors which dictate what
they do. These behaviors include wandering, holding position, following an
object, attacking an object, or changing their “demeanor” to friendly or
hostile. Objects can also be assigned a target, which can be any other object
including the simulator. This is used for the “following” or “attacking”
behavior.

### Macros

To better facilitate timeline control, objects in the Starmap can be assigned
tags, which are unique identifiers that can be used to change properties of the
objects through a macro. Objects can be assigned multiple tags, and the same tag
can be used on multiple objects, allowing for coordinated actions to be
performed on multiple objects at the same time.

Actions which can be performed via macro include moving the object to a
location, destroying the object, spawning a new object, or changing the behavior
of the object.

### Multi-simulator Flights

With a universal sandbox tracking the persistent location of objects in space,
the possibilities for multi-simulator flights extend significantly. The ships
will actually be able to see and interact with one another in space, just the
same as NPC objects in space. For example, if the USS Odyssey were to attach a
tractor beam to the USS Phoenix, the Phoenix would start being pulled by the
Odyssey, without any interaction on the part of the crew of the USS Phoenix.
Docking nearby ships should be possible. Communications should automatically
pick up ships that are hailing.

Epic space battles between simulators would also be possible, with the
simulation keeping the score. Anything that can happen in a simulation with an
NPC ship could happen with a real simulator too.

### Background Processing

To decrease the amount of background processing which the Thorium server has to
perform, only objects within the same stage as the simulator will be modeled in
the simulation. All other objects will remain in their same position, doing
nothing until an active simulator enters the stage. NPCs will need to have the
ability to transition stages, though, so objects on the interstellar stage would
always be processed, as well as objects that are on stages within a certain
vicinity to the current location of the simulator while the simulator is on the
interstellar stage.

### More?

There are likely many more ways this feature can impact existing and future
controls. Comments are welcome on what those ways are.

##

**Drawbacks**

This would be a significant change for existing Thorium users, and would
probably be an entirely new “mode” of using Thorium, allowing the existing
“legacy mode” to continue to operate.

This will be incredibly expensive to create, not only because of the coding
requirements and the performance testing and implications (sending lots of data
over the network very rapidly, processing a lot of information behind the
scenes), but also the content creation: generating 3D models that work in the
browser-based 3D environment[^7]; creating special effects for weapons,
explosions, traveling at warp speed, jump drive effects, asteroid, and nebulas;
and stage backgrounds[^8].

This will also be a large adjustment for existing flight directors and staff who
might not be used to giving up so much control. Transitioning to this feature
will also be difficult, since not all of the aspects of this feature will be
ready at the same time. Some of the parts are so integrated that none of it is
useful without them, such as the thruster and navigation controls, which depend
on the viewscreen, which depends on the starmap editor.

It might also fail spectacularly. It’s possible that the demands of this feature
are so great that the architecture that Thorium is built on isn’t capable of
meeting them.

##

**Alternatives**

Some space centers have already tried integrating Thorium with Empty Epsilon,
where EE stations are on separate computers. Another effort is underway to
integrate Thorium with Dreamflight Adventures, which has a rich 3D universe
built in. Finally, there is an effort to build a Unity component that connects
to Thorium.

These alternatives all suffer from a similar problem: What is the source of
truth? Without the ability to have one source of where things are located and
what their properties are, it’s difficult to create the rich integrations and
interactions which this document describes.

##

**Unresolved questions**

Should these features be released all at once when all of them are completed, or
one at a time as each is completed?

Anywhere that you see “may or may not” and other language that hedges what the
possibilities are are areas which are worth exploration and comment.

Other questions and comments about any aspect of this document are welcome.

##

**Prior Art and Inspiration**

Inspiration for many of these features comes from

- Dreamflight Adventures
- Empty Epsilon
- Elite: Dangerous

<!-- Footnotes themselves at the bottom. -->

## Notes

[^1]:
  In JavaScript, we can store numbers up to ±9x10^15 without experiencing
  rounding errors. That means our solar systems can have a radius of that many
  centimeters, with the star at the center. For comparison, the distance from
  the sun to Earth is 1.48×10^13 centimeters. Of course, the entire solar system
  should be fit inside much less than that, see the paragraph on fudging sizes
  and distances.

[^2]: Some story modes enabled with arbitrary, nested stages:

  1. They get flung across the universe and want to see their way home
  2. They're flung to a different universe and can't see their way home, which
     is super unnerving
  3. They land on the planet, and we can show them things on the surface or in
     near-focus orbit or something.
  4. Your ship gets shrunk and put inside an organ, inside a person, on a
     planet, in a solar system....etc.

[^3]:
  We could also implement a manual navigation system, as described here
  [https://github.com/Thorium-Sim/thorium/issues/1783](https://github.com/Thorium-Sim/thorium/issues/1783)

[^4]:
  Even though I personally really don’t like using detailed raster graphics for
  sensor contacts, but I know I won’t win this battle.

[^5]:
  This is part of why I prefer low-detail vectors for sensor contacts. Way
  easier to do IFF than with raster graphics.

[^6]: This doesn’t include celestial objects, like planets and stars.
[^7]:
  GLTF is a good option.
  [https://github.com/react-spring/gltfjsx](https://github.com/react-spring/gltfjsx).
  Also Empty Epsilon uses a simple system. Compatibility with EE would be a good
  feature.

[^8]:
  - Torpedos will be a sphere mesh with a billboard particle emitter attached
  - Phasers will be several very long planes rotated to different angles at the
    enter with a bloom filter applied.
  - Explosions will probably be flip book billboards at first.
  - Warp speed will be the existing stars effect. Other effects for wormhole
    travel, jump drive, whatever can be created as well, but I don't know what
    that looks like yet.
  - Not sure what nebulas will look like.
  - Asteroids will be based on existing meshes and will populate generated
    asteroid fields.
  - Stage background will be cube maps. I'll make it so they are extensible, so
    flight directors can add their own stage backgrounds.

<!-- Docs to Markdown version 1.0β17 -->
