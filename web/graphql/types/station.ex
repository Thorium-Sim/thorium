alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2]

defmodule App.Type.Station do
  @type_string %{type: %GraphQL.Type.String{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Station",
      description: "The station object. Specific to a simulator.",
      fields: %{
        id: @type_string,
        name: @type_string,
        simulatorId: @type_string,
      }
    }
  end
end
