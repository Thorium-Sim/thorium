import {t} from "@server/newHelpers/liveQuery";
import {z} from "zod";
import {google} from "googleapis";
import {ServerDataModel} from "@server/newClasses/ServerDataModel";
import {pubsub} from "@server/newHelpers/pubsub";

function getOAuthClient(server: ServerDataModel) {
  // Authorize a client with credentials, then call the Google Sheets API.
  const credentials = {
    installed: {
      client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: process.env.GOOGLE_SHEETS_SECRET,
      redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"],
    },
  };
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );
  oAuth2Client.on("tokens", tokens => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      server.googleSheetsTokens.refresh_token = tokens.refresh_token;
    }
  });
  if (server.googleSheetsTokens?.access_token) {
    oAuth2Client.setCredentials(server.googleSheetsTokens);
  }
  return oAuth2Client;
}

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const googleSheets = t.router({
  googleSheets: t.procedure.request(async ({ctx}) => {
    if (ctx.server.googleSheetsTokens.access_token) {
      const client = getOAuthClient(ctx.server);
      const people = google.people({
        version: "v1",
        auth: client,
      });
      const res = await people.people.get({
        resourceName: "people/me",
        personFields: "emailAddresses",
      });
      return res.data.emailAddresses?.[0].value;
    }
    return null;
  }),
  spreadsheet: t.procedure
    .input(z.object({spreadsheetId: z.string()}))
    .request(async ({ctx, input: {spreadsheetId}}) => {
      const auth = getOAuthClient(ctx.server);
      const sheets = google.sheets({version: "v4", auth});
      const sheet = await sheets.spreadsheets.get({spreadsheetId});
      return sheet;
    }),
  authorize: t.procedure.send(({ctx}) => {
    const oAuth2Client = getOAuthClient(ctx.server);
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    pubsub.publish.googleSheets.googleSheets();
    return authUrl;
  }),
  completeAuthorize: t.procedure
    .input(z.object({token: z.string()}))
    .send(({ctx, input: {token}}) => {
      const oAuth2Client = getOAuthClient(ctx.server);
      oAuth2Client.getToken(token, (err, authToken) => {
        if (err) {
          console.error(err);
          throw new Error("Error while trying to retrieve access token");
        }
        if (!authToken) return;
        // Store the token to disk for later program executions
        ctx.server.googleSheetsTokens = authToken;
        oAuth2Client.setCredentials(authToken);
        pubsub.publish.googleSheets.googleSheets();
      });
    }),
  revoke: t.procedure.send(({ctx}) => {
    ctx.server.googleSheetsTokens = {};
    pubsub.publish.googleSheets.googleSheets();
  }),
  fileSearch: t.procedure
    .input(z.object({searchText: z.string()}))
    .request(async ({ctx, input: {searchText}}) => {
      const oAuth2Client = getOAuthClient(ctx.server);
      const drive = google.drive({
        version: "v3",
        auth: oAuth2Client,
      });
      const response = await drive.files
        .list({
          corpora: "user",
          q: `mimeType = 'application/vnd.google-apps.spreadsheet' and name contains '${searchText}'`,
        })
        .catch(err => console.error(err));
      return response?.data.files;
    }),
  appendData: t.procedure
    .input(
      z.object({
        spreadsheetId: z.string(),
        sheetId: z.string(),
        headers: z.any(),
        row: z.any(),
      }),
    )
    .send(async ({ctx, input: {spreadsheetId, sheetId, headers, row}}) => {
      const auth = getOAuthClient(ctx.server);
      const sheets = google.sheets({version: "v4", auth});
      const range = await sheets.spreadsheets.values
        .get({
          spreadsheetId,
          range: `${sheetId}!1:1`,
        })
        .catch(err => console.error(err));

      if (!range?.data.values && headers) {
        // There's nothing in the first line, which is enough
        // to tell us that the spreadsheet is empty.
        // Just add the header row and the next row

        const values = [headers, row];
        const resource = {values};
        // @ts-expect-error
        return sheets.spreadsheets.values
          .append({
            spreadsheetId,
            range: sheetId,
            resource,
            valueInputOption: "USER_ENTERED",
          })
          .catch(err => console.error(err));
      }

      // Don't worry about matching rows to headers. Just append
      const values = [row];
      const resource = {values};
      // @ts-expect-error
      return sheets.spreadsheets.values.append({
        spreadsheetId,
        range: sheetId,
        resource,
        valueInputOption: "USER_ENTERED",
      });
    }),
});
