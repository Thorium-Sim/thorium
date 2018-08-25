export default `
type TimelineStep {
  id: ID!
  name: String
  description: String
  order: Int
  timelineItems: [TimelineItem]
}

type TimelineItem {
  id: ID
  name: String
  type: String
  event: String
  args: String
  delay: Int
}

input TimelineitemInput {
  name: String
  type: String
  event: String
  args: String
  delay: Int
}`;
