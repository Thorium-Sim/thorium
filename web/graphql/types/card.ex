defmodule App.Type.Card do
  @type_string %{type: %GraphQL.Type.String{}}
  @type_integer %{type: %GraphQL.Type.Int{}}
  def get do
    %GraphQL.Type.ObjectType{
      name: "Card",
      description: "A single card object attached to a station",
      fields: %{
        id: @type_string,
        name: @type_string,
        order: @type_integer,
        component: @type_string,
        stationId: @type_string,
        },
    }
  end
end
