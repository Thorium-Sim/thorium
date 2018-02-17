import uuid from "uuid";

export default class SurveyForm {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "SurveyForm";
    this.simulatorId = params.simulatorId || null;
  }
}
