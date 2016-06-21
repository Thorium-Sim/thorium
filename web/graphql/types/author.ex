defmodule App.Type.Author do
  @type_string %{type: %GraphQL.Type.String{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Author",
      fields: %{
        id: @type_string,
        name: @type_string,
      }
    }
  end
end
