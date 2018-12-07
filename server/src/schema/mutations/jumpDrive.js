export default `
setJumpdriveActivated(id:ID!, activated:Boolean!):String
setJumpdriveEnvs(id:ID!, envs:Float!):String
setJumpdriveSectorLevel(id:ID!, sector:String!, level:Int!):String
setJumpdriveSectorOffset(id:ID!, sector:String!, offset:Float!):String
fluxJumpdriveSector(id:ID!, sector:String):String
setJumpDriveEnabled(id:ID!, enabled:Boolean):String
hitJumpDriveStress(id:ID!, sector:String!):String
`;
