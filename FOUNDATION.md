# Foundational stuff to do for Universal Sandbox

- Build timeline creation into Core
  - Might as well complete all the work in this RFC first:
    https://docs.google.com/document/d/12v1sxLDZolmQn8E0ZOLO48RcUUZXPnA9F4RsodRy6_w/edit
- Determine what features require 'Sandbox Mode' (and which don't work in
  'Sandbox Mode') and which will work in 'Legacy Mode'

  - Cannot work in Sandbox
    - Engine Control
    - Thrusters
  - Continue to work in Sandbox
    - Targeting
  - Work in Legacy Mode
    - Navigation (Using the Star Map)

- Figure out how Thorium will differentiate between 'Sandbox Mode' and 'Legacy
  Mode'
  - At a simulator level?
  - At a station set level - some station sets are 'Legacy' while some are
    'Sandbox'
  - At a flight/card level - when flying in Sandbox mode, cards are replaced
    with their sandbox counterpart.
