import App from "../app";
import { gql } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";

const schema = gql`
    type FBFullSimulator {
        id: ID!
        Name: String!
        # Is JSON Record<string, boolean>
        Roles: String!
        Missions: [FBMission!]!
    }

    type FBMission {
        id: ID!
        Name: String!
        FlightHours: Float!
        ClassHours: Float!
        Synopsis: String!
        Retired: Boolean
    }

    type FBUser {
        id: ID!        
    }

    type FBAwards {
        id: ID!
        Name: String!
        ClassHours: Float!
        FlightHours: Float!
        Description: String!
        ImageURL: String
    }

    type FBPageText {
        Awards: String
        Heading: String
        Subheading: String
        EmailHeading: String
        EmailNotFound: String
    }

    type FBStationEmailLinks {
        station: String
        email: String
    }

    type FBCurrentSelections {
        Mission: ID
        Simulator: ID
        StationEmailLinks: [FBStationEmailLinks!]
        Awards: [FBAwards!]
        EventId: ID
        flightSubmissions: [String!]
    }

    input FBAwardInput {
        id: ID!
        Name: String!
        ClassHours: Float!
        FlightHours: Float!
        Description: String!
        ImageURL: String
    }


    extend type Query {
        hasFirebaseConnection: Boolean!
        getFirebaseSimulators: [FBFullSimulator!]
        getFirebaseUser(id: ID!): Boolean
        getFirebaseAwards: [FBAwards!]
        getFirebaseLogoSrc: String
        getFirebaseWebsiteQRCode: String
        getFirebaseEventId: ID
        getFirebasePageText: FBPageText
        getCurrentFirebaseSelections: FBCurrentSelections
    }

    extend type Mutation {
        updateFirebaseUserStation(email: String!, station: String!): Boolean!
        setFirebaseAwards(awards: [FBAwardInput!]!): Boolean
        setFirebaseSimulator(id: ID!): Boolean
        setFirebaseMission(id: ID!): Boolean
        createFirebaseUser(id: ID!): Boolean
        executeFirebasePush(eventId: ID!, flightId: ID!): Boolean
    }

    extend type Subscription {
        firebaseCurrentSelectionsUpdate: FBCurrentSelections
    }
`

const resolver = {
    Query: {
        hasFirebaseConnection() {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        },
        async getFirebaseEventId() {
            if (App.firebaseManager) {
                return await App.firebaseManager.getEventId();
            }
            else {
                return null
            }
        },
        async getFirebaseSimulators() {
            if (App.firebaseManager) {
                const sims = await App.firebaseManager.getSimulators();
                return sims.map((each) => {
                    return {
                        ...each,
                        Roles: JSON.stringify(each.Roles)
                    }
                })
            }
            else {
                return null
            }
        },
        async getFirebaseUser(_, { id }) {
            if (App.firebaseManager) {
                return await App.firebaseManager.checkIfUserExists(id);
            }
            else {
                return null
            }
        },
        async getFirebaseAwards() {
            if (App.firebaseManager) {
                return await App.firebaseManager.getAwards();
            }
            else {
                return null
            }
        },
        async getFirebaseLogoSrc() {
            if (App.firebaseManager) {
                return await App.firebaseManager.getLogoSrc();
            }
            else {
                return null
            }
        },
        async getFirebaseWebsiteQRCode() {
            if (App.firebaseManager) {
                return await App.firebaseManager.getWebsiteQRCode();
            }
            else {
                return null
            }
        },
        async getFirebasePageText() {
            if (App.firebaseManager) {
                let data = await App.firebaseManager.getPageText();
                return { ...data, EmailHeading: data["Email Heading"], EmailNotFound: data["Email Not Found"] }
            }
            else {
                return null
            }
        },
        async getCurrentFirebaseSelections() {
            if (App.firebaseManager) {
                return {
                    Mission: App.firebaseManager.selectedMission?.id,
                    Simulator: App.firebaseManager.selectedSimulator?.id,
                    StationEmailLinks: Object.keys(App.firebaseManager.stationEmailMap).map(key => {
                        return {
                            station: key,
                            email: App.firebaseManager.stationEmailMap[key]
                        }
                    }),
                    Awards: App.firebaseManager.awards,
                    EventId: await App.firebaseManager.getEventId(),
                    flightSubmissions: App.firebaseManager.flightSubmissions
                }
            }
            else {
                return null
            }
        }

    },
    // This will be done in the events section, so that we get the subscriptions to fire off successfully, any exceptions are noted below. 
    Mutation: {
        async updateFirebaseUserStation(_, { email, station }) {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        },
        // This doesn't affect the subscriptions, so we can do it here.
        async createFirebaseUser(_, { id }) {
            if (App.firebaseManager) {
                try {
                    await App.firebaseManager.connector.updateUser(id, { Email: id, Events: [] });
                    return true
                }
                catch (e) {
                    console.error(e);
                    return false
                }
            }
            else {
                return false
            }
        },
        async setFirebaseAwards(_, { awards }) {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        },
        async setFirebaseSimulator(_, { id }) {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        },
        async setFirebaseMission(_, { id }) {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        },
        async executeFirebasePush(_, { eventId, flightId }) {
            if (App.firebaseManager) {
                return true;
            }
            else {
                return false
            }
        }
    },
    Subscription: {
        firebaseCurrentSelectionsUpdate: {
            resolve: async (rootValue) => {
                return {
                    Mission: App.firebaseManager.selectedMission?.id,
                    Simulator: App.firebaseManager.selectedSimulator?.id,
                    StationEmailLinks: Object.keys(App.firebaseManager.stationEmailMap).map(key => {
                        return {
                            station: key,
                            email: App.firebaseManager.stationEmailMap[key]
                        }
                    }),
                    Awards: App.firebaseManager.awards,
                    EventId: await App.firebaseManager.getEventId(),
                    flightSubmissions: App.firebaseManager.flightSubmissions

                }
            },
            subscribe: () => pubsub.asyncIterator("firebaseCurrentSelectionsUpdate")
        }
    }
}

export default { schema, resolver }