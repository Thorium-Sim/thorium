alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, get_all: 3]

defmodule App.Type.User do
	@type_string %{type: %GraphQL.Type.String{}}
	@type_int %{type: %GraphQL.Type.Int{}}
	def get do
		%GraphQL.Type.ObjectType{
			name: "User",
			description: "An account which has access to this website",
			fields: %{
				id: @type_string,
				email: @type_string,
				token: @type_string,
				tokenExpire: @type_int,
				roles: %{
					type: %List{ofType: App.Type.Role.get},
					resolve: {App.Type.User, :get_roles}
				}
			}
		}
	end
	def get_roles(doc, _args, _) do
		table("roles")
		|> get_all(doc.id, %{"index" => "userId"})
		|> DB.run
		|> DB.handle_graphql_resp
	end
end