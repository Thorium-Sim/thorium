import React from "react";
import {
  TemplateComponent,
  useEntitySetTemplateMutation,
} from "generated/graphql";
import {Label, Input} from "reactstrap";

interface TemplateProps {
  id: string;
  template: TemplateComponent;
}
const Template: React.FC<TemplateProps> = ({id, template}) => {
  const [setName] = useEntitySetTemplateMutation();

  return (
    <>
      <Label>
        Category
        <Input
          type="text"
          value={template.category || ""}
          onChange={e => {
            setName({
              variables: {id, category: e.target.value},
            });
          }}
        />
      </Label>
    </>
  );
};

export default Template;
