alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2]

defmodule App.Type.Presence do
  @type_string %{type: %GraphQL.Type.String{}}
  #@type_List %List{ofType: %GraphQL.Type.Enum{}}

  def get do
    %GraphQL.Type.ObjectType{
      name: "Presence",
      description: "Presence of clients attached to the simulator",
      fields: %{
        id: @type_string,
        metas: %{
          type: %List{ofType: %GraphQL.Type.String{}},
        }
      }
    }
  end
end
