export interface TimelineItem {
  id: string;
  needsConfig: boolean;
  event: string;
  args: string;
  delay: number | undefined;
  noCancelOnReset: boolean;
}
export interface TimelineStep {
  id: string;
  name: string;
  description: string;
  timelineItems: TimelineItem[];
}
