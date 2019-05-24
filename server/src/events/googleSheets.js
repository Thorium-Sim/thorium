import App from "../app";
import { google } from "googleapis";

import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";

const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.metadata.readonly"
];

function getOAuthClient() {
  // Authorize a client with credentials, then call the Google Sheets API.
  const credentials = {
    installed: {
      client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
      project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: process.env.GOOGLE_SHEETS_SECRET,
      redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
  };
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.on("tokens", tokens => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      App.googleSheetsTokens.refresh_token = tokens.refresh_token;
    }
  });
  if (App.googleSheetsTokens && App.googleSheetsTokens.access_token) {
    oAuth2Client.setCredentials(App.googleSheetsTokens);
  }
  return oAuth2Client;
}

App.on("googleSheetsAuthorize", ({ cb }) => {
  const oAuth2Client = getOAuthClient();
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  cb && cb(authUrl);
});
App.on("googleSheetsCompleteAuthorize", ({ token }) => {
  const oAuth2Client = getOAuthClient();
  console.log(token);
  oAuth2Client.getToken(token, (err, authToken) => {
    if (err) {
      console.log(err);
      throw new Error("Error while trying to retrieve access token");
    }
    // Store the token to disk for later program executions
    App.googleSheetsTokens = authToken;
    oAuth2Client.setCredentials(authToken);
  });
});

App.on("googleSheetsFileSearch", async ({ searchText, cb }) => {
  async function doIt() {
    const oAuth2Client = getOAuthClient();
    const drive = google.drive({
      version: "v3",
      auth: oAuth2Client
    });
    const response = await drive.files
      .list({
        corpora: "user",
        q: `mimeType = 'application/vnd.google-apps.spreadsheet' and name contains '${searchText}'`
      })
      .catch(err => console.log(err));
    return response.data.files;
  }
  cb && cb(doIt());
});

App.on("googleSheetsGetSpreadsheet", ({ cb, spreadsheetId }) => {
  async function doIt() {
    const auth = getOAuthClient();
    const sheets = google.sheets({ version: "v4", auth });
    const sheet = await sheets.spreadsheets.get({ spreadsheetId });
    return sheet;
  }
  cb && cb(doIt());
});

App.on(
  "googleSheetsAppendData",
  async ({
    spreadsheetId = "155poKeKfLeSbuYY4CpFPOccFOw41Z_J-a9YqFDU7bWI",
    sheetId = "Sheet1",
    data
  }) => {
    const auth = getOAuthClient();
    const sheets = google.sheets({ version: "v4", auth });
    const range = await sheets.spreadsheets.values
      .get({
        spreadsheetId,
        range: `${sheetId}!1:1`
      })
      .catch(err => console.error(err));

    const dataHeaders = Object.keys(data);
    const row = Object.values(data);

    if (!range.data.values) {
      // There's nothing in the first line, which is enough
      // to tell us that the spreadsheet is empty.
      // Just add the header row and the next row

      const values = [dataHeaders, row];
      const resource = { values };
      return sheets.spreadsheets.values
        .append({
          spreadsheetId,
          range: sheetId,
          resource,
          valueInputOption: "USER_ENTERED"
        })
        .catch(err => console.error(err));
    }

    // Don't worry about matching rows to headers. Just append
    const values = [row];
    const resource = { values };
    return sheets.spreadsheets.values.append({
      spreadsheetId,
      range: sheetId,
      resource,
      valueInputOption: "USER_ENTERED"
    });
  }
);
