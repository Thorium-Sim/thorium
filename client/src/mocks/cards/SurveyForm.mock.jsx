import {SURVEY_FORM_QUERY, SURVEY_FORM_SUB} from "@client/cards/SurveyForm";
import surveyForms from "../data/surveyForms";
import {
  SURVEY_FORM_CORE_QUERY,
  SURVEY_FORM_CORE_SUB,
} from "@client/cards/SurveyForm/core";
export default [
  {
    request: {
      query: SURVEY_FORM_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        surveyform: surveyForms,
      },
    },
  },
  {
    request: {
      query: SURVEY_FORM_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        surveyformUpdate: surveyForms,
      },
    },
  },
  {
    request: {
      query: SURVEY_FORM_CORE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        allForms: surveyForms,
        surveyform: surveyForms,
      },
    },
  },
  {
    request: {
      query: SURVEY_FORM_CORE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        surveyformUpdate: surveyForms,
      },
    },
  },
];
