import App from "../../app";

export default function exportSurvey(id, res) {
  const survey = App.surveyForms.find(s => s.id === id);
  if (!survey) {
    return res.end("No survey form");
  }
  const { id: surveyId, ...surveyData } = survey;

  res.set({
    "Content-Disposition": `attachment; filename=${survey.title}.survey`,
    "Content-Type": "application/octet-stream"
  });
  res.end(JSON.stringify(surveyData));
}
