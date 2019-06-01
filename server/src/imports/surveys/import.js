import fs from "fs";
import App from "../../app";
import * as Classes from "../../classes";

export default function ImportSurvey(filepath, cb) {
  console.log("Importing Survey");
  const file = fs.readFileSync(filepath, "utf8");
  try {
    const data = JSON.parse(file);
    if (data.class === "SurveyForm") {
      App.surveyForms.push(new Classes.SurveyForm(data));
    }
  } catch (err) {}
  cb(null);
}
