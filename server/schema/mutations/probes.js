export default `
destroyProbe(id: ID!, probeId: ID!): String
launchProbe(id: ID!, probe: ProbeInput!): String
fireProbe(id: ID!, probeId: ID!): String
updateProbeType(id: ID!, probeType: ProbeTypeInput!): String
updateProbeEquipment(id: ID!, probeEquipment: ProbeEquipmentInput!): String
probeQuery(id: ID!, probeId: ID!, query: String): String
probeQueryResponse(id: ID!, probeId: ID!, response: String): String
probeProcessedData(id: ID!, data: String): String
`;
