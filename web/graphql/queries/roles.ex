alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get_all: 3]
defmodule App.Query.Roles do
	def get do
		%{
			type: %List{ofType: App.Type.Role.get},
			args: %{
			  userId: %{
			    type: %GraphQL.Type.String{},
				description: "Returns all roles for a given user"
			  },
			},
			resolve: {App.Query.Roles, :roles}
		}
	end

	def roles(_, %{userId: id}, _) do
		table("roles")
		|> get_all(id, %{"index" => "userId"})
		|> DB.run
		|> DB.handle_graphql_resp
	end
end
