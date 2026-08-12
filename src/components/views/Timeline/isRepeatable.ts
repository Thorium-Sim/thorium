import allowedMacros from "./allowedMacros";

interface RepeatableAction {
  event?: string | null;
  repeatable?: boolean | null;
}

/**
 * Actions which should re-run every time their step is triggered, instead of
 * being unchecked and greyed out once they land in executedTimelineSteps.
 *
 * Two things qualify: the viewscreen macros, which have always behaved this way,
 * and any timeline item the flight director marked "Repeatable" in Mission Config.
 *
 * Note this is deliberately separate from `allowedMacros` itself — classic and
 * thumbnail modes use that list to mean "viewscreen-only actions", which is a
 * different question and must not pick up repeatable items.
 */
export default function isRepeatableAction({
  event,
  repeatable,
}: RepeatableAction) {
  if (repeatable) return true;
  return Boolean(event) && allowedMacros.indexOf(event as string) > -1;
}

/**
 * Which of a step's actions start out checked, and so will actually be sent when
 * the flight director runs the step.
 *
 * An action that has already fired this flight is left unchecked so it doesn't
 * repeat by accident — unless it is repeatable, which is the whole point of the
 * flag: the same step can be run as many times as the mission needs.
 */
export function getArmedActions<T extends RepeatableAction & {id: string}>(
  timelineItems: T[] | undefined,
  executedTimelineSteps: string[],
): {[key: string]: boolean} {
  if (!timelineItems) return {};
  return timelineItems.reduce<{[key: string]: boolean}>((prev, next) => {
    if (
      executedTimelineSteps.indexOf(next.id) > -1 &&
      !isRepeatableAction(next)
    ) {
      return prev;
    }
    prev[next.id] = true;
    return prev;
  }, {});
}
