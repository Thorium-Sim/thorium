export default `
type SurveyForm{
  id: ID
  simulatorId: ID
  title: String
  form: [FormFields]
  results: [FormResults]
}

type FormResults {
  client: String
  station: String
  name: String
  form: [FormFields]
}

type FormFields {
  id: ID
  type: String
  title: String
  description: String
  options: [FormOptions]
  value: String
}

type FormOptions {
  id: ID
  label: String
}

input FormResultsInput {
  client: String
  form: [FormFieldsInput]
}
input FormFieldsInput {
  id: ID
  type: String
  title: String
  description: String
  options: [FormOptionsInput]
  value: String
}
input FormOptionsInput {
  id: ID
  label: String
}
`;
