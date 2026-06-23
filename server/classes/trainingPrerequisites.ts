/**
 * System-level prerequisites for advanced training chapters.
 *
 * Maps cardComponent names to the mutation/event names that must be observed
 * (by any client, including the FD) before that chapter becomes available to
 * navigate to during an active training session.
 *
 * Add entries here when a system only becomes relevant after a specific FD
 * action fires mid-flight. Example:
 *
 *   "NavigationAdvanced": ["activateAdvancedNavigation"],
 *
 * The server watches for these event names globally and marks them in each
 * active training session's globalObservedEvents when they fire.
 */
export const CARD_PREREQUISITES: Record<string, string[]> = {
  // Add entries as needed for your mission systems.
};
