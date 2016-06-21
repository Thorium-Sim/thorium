defmodule App.Type.Simulator do
  @type_string %{type: %GraphQL.Type.String{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Simulator",
      fields: %{
        id: @type_string,
        name: @type_string,
      }
    }
  end
end
