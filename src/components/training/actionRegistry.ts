/**
 * Action Registry for the Advanced Training System.
 *
 * Maps GraphQL mutation event names to human-readable labels, organized by
 * card component. Used in both the FD record-mode configuration and the
 * crew-side progress display.
 */

export interface ActionDefinition {
  eventName: string;
  label: string;
}

export interface CardActions {
  cardComponent: string;
  cardLabel: string;
  actions: ActionDefinition[];
}

const actionRegistry: CardActions[] = [
  {
    cardComponent: "ShieldControl",
    cardLabel: "Shield Control",
    actions: [
      {eventName: "shieldRaised", label: "Raise Shields"},
      {eventName: "shieldLowered", label: "Lower Shields"},
      {eventName: "shieldFrequencySet", label: "Adjust Shield Frequency"},
      {eventName: "shieldFrequencySetAll", label: "Set All Shield Frequencies"},
    ],
  },
  {
    cardComponent: "Navigation",
    cardLabel: "Navigation",
    actions: [
      {eventName: "navCalculateCourse", label: "Calculate Course"},
      {eventName: "navCancelCalculation", label: "Cancel Calculation"},
      {eventName: "navCourseEntry", label: "Enter Course Coordinates"},
    ],
  },
  {
    cardComponent: "NavigationAdvanced",
    cardLabel: "Advanced Navigation",
    actions: [
      {eventName: "rotationSet", label: "Adjust Rotation"},
      {eventName: "setEngineAcceleration", label: "Set Engine Acceleration"},
    ],
  },
  {
    cardComponent: "Sensors",
    cardLabel: "Sensors",
    actions: [
      {eventName: "pingSensors", label: "Ping Sensors"},
      {eventName: "setSensorPingMode", label: "Set Ping Mode"},
      {eventName: "sensorScanRequest", label: "Request Sensor Scan"},
      {eventName: "sensorScanCancel", label: "Cancel Sensor Scan"},
      {eventName: "removeProcessedData", label: "Clear Processed Data"},
      {
        eventName: "setTargetingCalculatedTarget",
        label: "Set Calculated Target",
      },
    ],
  },
  {
    cardComponent: "EngineControl",
    cardLabel: "Engine Control",
    actions: [{eventName: "setSpeed", label: "Change Engine Speed"}],
  },
  {
    cardComponent: "ReactorControl",
    cardLabel: "Reactor Control",
    actions: [
      {eventName: "reactorChangeEfficiency", label: "Set Reactor Efficiency"},
      {eventName: "engineCool", label: "Apply Coolant"},
      {eventName: "reactorSetWingPower", label: "Distribute Wing Power"},
    ],
  },
  {
    cardComponent: "Targeting",
    cardLabel: "Targeting",
    actions: [
      {eventName: "targetTargetingContact", label: "Lock Target"},
      {eventName: "untargetTargetingContact", label: "Release Target"},
      {eventName: "targetSystem", label: "Target System"},
      {
        eventName: "setTargetingEnteredTarget",
        label: "Enter Target Coordinates",
      },
      {eventName: "chargePhaserBeam", label: "Charge Phaser"},
      {eventName: "stopChargingPhasers", label: "Stop Charging"},
      {eventName: "dischargePhaserBeam", label: "Fire Phaser"},
    ],
  },
  {
    cardComponent: "TorpedoLoading",
    cardLabel: "Torpedo Loading",
    actions: [
      {eventName: "loadWarhead", label: "Load Torpedo"},
      {eventName: "unloadWarhead", label: "Unload Torpedo"},
      {eventName: "fireWarhead", label: "Fire Torpedo"},
    ],
  },
  {
    cardComponent: "CommShortRange",
    cardLabel: "Short Range Comm",
    actions: [
      {eventName: "commHail", label: "Initiate Hail"},
      {eventName: "cancelHail", label: "Cancel Hail"},
      {eventName: "commConnectArrow", label: "Connect to Hail"},
      {eventName: "commDisconnectArrow", label: "Disconnect"},
      {eventName: "muteShortRangeComm", label: "Toggle Mute"},
    ],
  },
  {
    cardComponent: "LongRangeComm",
    cardLabel: "Long Range Comm",
    actions: [
      {eventName: "longRangeMessageSend", label: "Send Message"},
      {eventName: "deleteLongRangeMessage", label: "Delete Message"},
    ],
  },
  {
    cardComponent: "Transporters",
    cardLabel: "Transporters",
    actions: [
      {eventName: "setTransportTarget", label: "Set Transport Target"},
      {eventName: "setTransportDestination", label: "Set Transport Destination"},
      {eventName: "setTransportCharge", label: "Charge Transporters"},
      {eventName: "beginTransportScan", label: "Begin Transport Scan"},
      {eventName: "cancelTransportScan", label: "Cancel Scan"},
    ],
  },
];

/**
 * Actions always available regardless of which card component is active.
 * These cover simulator-wide events like login that aren't tied to a specific card.
 */
const GLOBAL_ACTIONS: ActionDefinition[] = [
  {eventName: "clientLogin", label: "Log In to Station"},
];

export function getGlobalActions(): ActionDefinition[] {
  return GLOBAL_ACTIONS;
}

/**
 * Synthetic event fired by the media viewer when a video reaches the end.
 * Add this as a requiredAction on a subchapter to require the crew to watch
 * the training video before the subchapter counts as complete.
 */
export const VIDEO_COMPLETE_EVENT = "__videoComplete__";

/**
 * The GraphQL mutation event fired when a crew member logs in to their station.
 * Add this as a requiredAction on a login-chapter subchapter to gate completion
 * on the crew actually logging in.
 */
export const LOGIN_EVENT = "clientLogin";

/**
 * Check if an event name represents a click action (vs a GraphQL mutation).
 */
export function isClickAction(eventName: string): boolean {
  return eventName.startsWith("click:");
}

/**
 * Get the human-readable label for an event name, optionally scoped to a card.
 */
export function getActionLabel(
  eventName: string,
  cardComponent?: string,
): string {
  // Handle the video completion sentinel
  if (eventName === VIDEO_COMPLETE_EVENT) return "Media finishes";

  // Handle click-type actions
  if (isClickAction(eventName)) {
    const text = eventName.slice("click:".length);
    return `Click: ${text}`;
  }

  if (cardComponent) {
    const card = actionRegistry.find(c => c.cardComponent === cardComponent);
    const action = card?.actions.find(a => a.eventName === eventName);
    if (action) return action.label;
  }
  // Fall back to searching all cards
  for (const card of actionRegistry) {
    const action = card.actions.find(a => a.eventName === eventName);
    if (action) return action.label;
  }
  // Last resort: humanize the event name
  return eventName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, s => s.toUpperCase())
    .trim();
}

/**
 * Get all actions available for a specific card component.
 */
export function getActionsForCard(cardComponent: string): ActionDefinition[] {
  return (
    actionRegistry.find(c => c.cardComponent === cardComponent)?.actions || []
  );
}

/**
 * Get the card label for a component name.
 */
export function getCardLabel(cardComponent: string): string {
  return (
    actionRegistry.find(c => c.cardComponent === cardComponent)?.cardLabel ||
    cardComponent
  );
}

export default actionRegistry;
