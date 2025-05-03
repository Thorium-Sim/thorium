/*
  query SurveyForms($simulatorId: ID!) {
    surveyform(simulatorId: $simulatorId, active: true) {
      id
      form {
        id
        type
        title
        value
        options {
          id
          label
          __typename
        }
        description
        min
        max
        __typename
      }
      title
      results {
        name
        client
        station
        form {
          id
          value
          __typename
        }
        __typename
      }
      __typename
    }
  }
  */
export default [
  {
    id: "5db305d4-cc61-4c91-818e-95113fc1e769",
    form: [
      {
        id: "63af4992-0156-4b29-a7fe-ca264b98957e",
        type: "Short",
        title: "What is this survey about?",
        value: null,
        options: [
          {
            id: "34a4fe8f-cf9d-4d7f-9923-84a5796d5ba3",
            label: "Option 1",
            __typename: "FormOptions",
          },
        ],
        description: "",
        min: 1,
        max: 5,
        __typename: "FormFields",
      },
      {
        id: "05cd83d1-5a24-4b0b-8204-8316797fbb99",
        type: "Long",
        title: "HOw do you know",
        value: null,
        options: [
          {
            id: "2de27239-c099-46ba-ab03-68376c0f3abb",
            label: "Option 1",
            __typename: "FormOptions",
          },
        ],
        description: "Write stuff here.",
        min: 1,
        max: 5,
        __typename: "FormFields",
      },
      {
        id: "83c124f6-ec7e-43a2-8da9-aa3280dffc37",
        type: "Multi",
        title: "Choose an option",
        value: null,
        options: [
          {
            id: "17a885e1-631f-4e26-847e-9db1ad6cfbb9",
            label: "Pick me",
            __typename: "FormOptions",
          },
          {
            id: "3b865e96-860a-4c08-abb7-5704415234f5",
            label: "No, pick me!",
            __typename: "FormOptions",
          },
        ],
        description: "",
        min: 1,
        max: 5,
        __typename: "FormFields",
      },
      {
        id: "92651c88-b402-460c-8bda-04faf68b2c7e",
        type: "Checkbox",
        title: "Pick one or many",
        value: null,
        options: [
          {
            id: "eef3f52e-4816-4405-8da0-7ee44e3f6196",
            label: "Option 1",
            __typename: "FormOptions",
          },
          {
            id: "f5acfdde-90fa-4685-8818-50ffa84a027f",
            label: "Option 2",
            __typename: "FormOptions",
          },
        ],
        description: "",
        min: 1,
        max: 5,
        __typename: "FormFields",
      },
      {
        id: "cb8629fd-30d1-4853-a072-6e247ff5193c",
        type: "Range",
        title: "Choose a range",
        value: null,
        options: [
          {
            id: "44dddc51-8df0-4043-bb28-3659c0a9dc3a",
            label: "Option 1",
            __typename: "FormOptions",
          },
        ],
        description: "",
        min: 1,
        max: 5,
        __typename: "FormFields",
      },
    ],
    title: "Test Survey",
    results: [],
    __typename: "SurveyForm",
  },
];
