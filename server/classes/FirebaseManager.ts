import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, FieldValue, Firestore } from 'firebase-admin/firestore';
import App from '../app';
export type FirebaseConnectorArgs = {
    firebaseServiceConfig: ServiceAccount;
}

export type FirebaseBaseSimulator = {
    id: string;
    Name: string;
    Roles: Record<string, boolean>;
}

export type FirebaseFullSimulator = {
    Missions: FirebaseMission[];
} & FirebaseBaseSimulator;

export type FirebaseAward = {
    id: string;
    Name: string;
    ClassHours: number;
    FlightHours: number;
    Description: string;
    ImageURL: string;
}

export type FirebaseAwayMission = {
    id: string;
    Name: string;
    BonfireId: string;
    ThumbnailLink: string;
}

export type FirebaseMission = {
    id: string;
    Name: string;
    FlightHours: number;
    ClassHours: number;
    Synopsis: string;
    Retired?: boolean
}

export type FirebaseNews = {
    id: string;
    Title: string;
    BodyText: string;
    ImageURL: string;
    IsVideo: boolean;
    LinkURL: string;
}

export type FirebaseRank = {
    id: string;
    ClassHours: number;
    FlightHours: number
    ImageURL: string;
    Name: string;
}

export type FirebaseUserEvent = {
    id: string;
    EventId: string;
    Date: Date;
    ClassHours: number;
    FlightHours: number;
    Name: string;
    Simulator: string;
    Mission: string;
    Awards?: FirebaseAward[];
    Position?: string;
    OfficerLogs?: string[];
}

export type FirebaseUser = {
    id: string;
    Email: string;
    Events: FirebaseUserEvent[];
    NextEvent?: {
        Date: Date;
        Name: string;
    }
}

export type FirebaseEvent = {
    id: string;
    EventId: string;
    Name: string
    Date: Date;
    FlightHours: number;
    ClassHours: number;
    Simulator: string;
    Mission: string;
    Awards?: FirebaseAward[];
    OfficerLogs?: Record<string, string[]>;
}

export type FirebaseConnectorAuth = {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain: string;
}

export type FirebasePageText = {
    "Awards": string;
    "Email Heading": string;
    "Email Not Found": string;
    "Heading": string;
    "Subheading": string;
}

export class FirebaseManager {
    constructor(args: FirebaseConnectorArgs) {
        this.connector = new FirebaseConnector(args);
    }
    connector: FirebaseConnector;
    stationEmailMap: Record<string, string> = {};
    awards: FirebaseAward[] = [];
    currentEventId: string = '';
    selectedSimulator?: FirebaseFullSimulator
    selectedMission?: FirebaseMission
    flightSubmissions: string[] = [];

    reset() {
        this.stationEmailMap = {};
        this.currentEventId = '';
        this.selectedSimulator = undefined;
        this.selectedMission = undefined;
        this.awards = [];
    }
    async getSimulators() {
        return await this.connector.getFullSimulators();
    }
    updateUserStation(email: string, station: string) {
        this.stationEmailMap[station] = email;
    }
    async createUserAccount(email: string) {
        await this.connector.updateUser(email, { Email: email, Events: [] })
    }
    async getAwards() {
        return await this.connector.getAwards();
    }

    async getEventId() {
        if (!this.currentEventId) {
            this.currentEventId = await this.getUsableEventId();
        }
        return this.currentEventId;
    }

    async getUsableEventId() {
        return await this.connector.getNewId();
    }

    async getLogoSrc() {
        return await this.connector.getLogoUrl();
    }

    async getWebsiteQRCode() {
        return await this.connector.getWebsiteQRCode();
    }

    async getPageText(): Promise<FirebasePageText> {
        return await this.connector.getPageText();
    }

    async checkIfUserExists(email: string) {
        if (await this.connector.getUser(email) === null) {
            return false;
        }
        else {
            return true;
        }
    }
    async setAwards(awards: FirebaseAward[]) {
        this.awards = awards;
    }

    async setSimulator(simulatorId: string) {
        const simulators = await this.getSimulators();
        this.selectedSimulator = simulators.find(sim => sim.id === simulatorId);
    }
    async setMission(missionId: string) {
        if (this.selectedSimulator) {
            this.selectedMission = this.selectedSimulator.Missions.find(mission => mission.id === missionId);
        }
    }

    async executePush(id: string, flightId: string) {
        const officerLogMap = {};
        const stations = Object.keys(this.selectedSimulator.Roles);
        for (let i = 0; i < stations.length; i++) {
            officerLogMap[stations[i]] = [];
        }
        for (let i = 0; i < App.officerLogs.length; i++) {
            const targetClient = App.clients.find(client => client.id === App.officerLogs[i].clientId);
            if (!officerLogMap[targetClient.station]) {
                officerLogMap[targetClient.station] = [];
            }
            officerLogMap[targetClient.station].push(App.officerLogs[i].log);
        }
        const event: FirebaseEvent = {
            id: id,
            EventId: id,
            Name: `${this.selectedMission.Name} on the ${this.selectedSimulator.Name}`,
            Date: new Date(),
            FlightHours: this.selectedMission.FlightHours,
            ClassHours: this.selectedMission.ClassHours,
            Simulator: this.selectedSimulator.id,
            Mission: this.selectedMission.Name,
            Awards: this.awards,
            OfficerLogs: officerLogMap
        };
        const userEventArray: FirebaseUserEvent[] = [];
        for (let i = 0; i < Object.keys(this.stationEmailMap).length; i++) {
            const station = Object.keys(this.stationEmailMap)[i];
            const email = this.stationEmailMap[station];
            if (email) {
                userEventArray.push({
                    id: id,
                    Date: new Date(),
                    EventId: id,
                    ClassHours: this.selectedMission.ClassHours,
                    FlightHours: this.selectedMission.FlightHours,
                    Name: `${this.selectedMission.Name} on the ${this.selectedSimulator.Name}`,
                    Simulator: this.selectedSimulator.id,
                    Mission: this.selectedMission.id,
                    Awards: this.awards,
                    Position: station,
                    OfficerLogs: officerLogMap[station] || []
                });
            }

        }
        for (let i = 0; i < userEventArray.length; i++) {
            await this.connector.addEventToUser(this.stationEmailMap[userEventArray[i].Position], userEventArray[i]);
        }
        await this.connector.createEvent(event);
        this.flightSubmissions.push(flightId);
        this.reset();
    }
}

export class FirebaseConnector {
    constructor(args: FirebaseConnectorArgs) {
        initializeApp({
            credential: cert(args.firebaseServiceConfig)
        })
        this.db = getFirestore();
    }
    db: Firestore;

    /**
     * Private functions
     */
    /**
     * 
     * @param length length of the id (usually 6)
     * @returns A usable id for the event dictionary
     */
    private makeId(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    /**
     * 
     * @param id The Id to check if available
     * @param eventIdDictionary The dictionary of all event ids
     * @returns A usable id for the event dictionary
     */
    private recrusiveCheckId(id: string, eventIdDictionary: Record<string, boolean>) {
        if (eventIdDictionary[id]) {
            return this.recrusiveCheckId(this.makeId(6), eventIdDictionary);
        }
        else {
            return id;
        }
    }

    private async addEntryToArray(docPath: string, arrayField: string, entry: any) {
        const docRef = this.db.doc(docPath);

        try {
            await docRef.update({
                [arrayField]: FieldValue.arrayUnion(entry)
            });
        } catch (error) {
            console.error('Error adding entry to array: ', error);
        }
    }

    /*
    * Public GET functions
    */

    /**
     * 
     * @returns A new id for the event dictionary
     */
    async getNewId() {
        let firstId = this.makeId(6);
        const query = await this.db.collection('EventDictionary').get();
        const eventIdDictionary = query.docs.reduce((acc, doc) => {
            acc[doc.id] = true;
            return acc;
        }, {});
        return this.recrusiveCheckId(firstId, eventIdDictionary);
    }

    /**
     * 
     * @param userId The Id of the user to get (email)
     * @returns The user object or null if one doesn't exist
     */
    async getUser(userId: string) {
        const query = await this.db.collection('Users').doc(userId).get();
        if (query.exists === false) {
            return null;
        }
        else if (!query.data()) {
            return null;
        }
        else {
            return { ...query.data(), id: query.id } as FirebaseUser;
        }
    }

    /**
     * 
     * @returns An Array of all full simulator objects
     */
    async getFullSimulators() {
        const baseSimulators = await this.getBaseSimulators();
        let fullData = [];
        for (let i = 0; i < baseSimulators.length; i++) {
            const missions = await this.getMissions(baseSimulators[i].id);
            const fullSimData: FirebaseFullSimulator = {
                ...baseSimulators[i],
                Missions: missions
            }
            fullData.push(fullSimData);
        }
        return fullData;
    }

    /**
     * 
     * @returns An Array of all base simulator objects
     */
    async getBaseSimulators(): Promise<FirebaseBaseSimulator[]> {
        const query = await this.db.collection('Simulators').get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseBaseSimulator[];
    }

    /**
     * 
     * @param simulatorId The Id of the simulator to get the missions for
     * @returns All mission objects for the simulator
     */
    async getMissions(simulatorId) {
        const query = await this.db.collection(`Simulators/${simulatorId}/Missions`).get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseMission[];
    }

    /**
     * 
     * @returns An Array of all Award objects
     */
    async getAwards() {
        const query = await this.db.collection('Awards').get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseAward[];
    }

    /**
     * 
     * @returns An Array of all AwayMission objects
     */
    async getAwayMissions() {
        const query = await this.db.collection('AwayMissions').get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseAwayMission[];
    }

    /**
     * 
     * @returns An Array of all News objects
     */
    async getNews() {
        const query = await this.db.collection('News').get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseNews[];
    }

    /**
     * 
     * @returns An Array of all Rank objects
     */
    async getRanks() {
        const query = await this.db.collection('Ranks').get();
        return query.docs.map(d => { return { ...d.data(), id: d.id } }) as FirebaseRank[];
    }

    async getLogoUrl() {
        const query = await this.db.collection('Page').doc('Logo').get();
        return query.data().src;
    }

    async getPageText() {
        const txt = (await this.db.collection('Page').doc('Text').get()).data() as FirebasePageText;
        return txt;
    }

    async getWebsiteQRCode() {
        const query = await this.db.collection('Page').doc('WebsiteQRCode').get();
        return query.data().src;
    }

    /**
     * Public POST/PUT functions
     */
    async addEventToUser(userId: string, event: FirebaseUserEvent) {
        await this.addEntryToArray(`Users/${userId}`, 'Events', event);
    }

    async updateUser(userId: string, data: Partial<FirebaseUser>) {
        await this.db.collection('Users').doc(userId).set(data, { merge: true });
    }

    async createEvent(data: FirebaseEvent) {
        await this.db.collection('EventDictionary').doc(data.id).set(data);
    }

}