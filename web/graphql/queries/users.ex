alias GraphQL.Type.List
import RethinkDB.Query, only: [table: 1, filter: 2, get_all: 3]
defmodule App.Query.Users do
	def get do
		%{
			type: %List{ofType: App.Type.User.get},
			args: %{
			  id: %{
			    type: %GraphQL.Type.String{},
				description: "Returns a single user by id"
			  },
			  token: %{
			  	type: %GraphQL.Type.String{},
			  	description: "Returns a user by current token"
			  }
			},
			resolve: {App.Query.Users, :users}
		}
	end

	def users(_, %{id: id}, _) do
		table("users")
		|> get_all(id, %{"index" => "id"})
		|> DB.run
		|> DB.handle_graphql_resp
	end

	def users(_, %{token: token}, _) do
		table("users")
		|> get_all(token, %{"index" => "token"})
		|> DB.run
		|> DB.handle_graphql_resp
	end

	def users(_, _args, _) do
		table("users")
		|> DB.run
		|> DB.handle_graphql_resp
	end
end