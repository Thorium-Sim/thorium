import RethinkDB.Query, only: [table: 1, get: 2, filter: 2, insert: 2, update: 2, delete: 1]

defmodule App.Mutation.Roles do
	@type_string %{type: %GraphQL.Type.String{}}

	def add do
		%{
			type: App.Type.Role.get,
			description: "Assign a new role.",
			args: %{
				userId: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
				name: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
				},
				resolve: {App.Mutation.Roles, :add_resolve},
			}
		end

		def add_resolve(_, args, _) do
			%{data: response} = table("roles")
			|> insert(args)
			|> DB.run
			Map.put(args, "id", List.first(response["generated_keys"]))
		end

		def revoke do
			%{
				type: App.Type.Role.get,
				description: "Revoke a role, given the user ID and the role itself",
				args: %{
					userId: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
					name: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
					},
					resolve: {App.Mutation.Roles, :revoke_resolve}
				}
			end
			def revoke_resolve(_, args, _) do
				%{data: response} = table("roles")
				|> filter(args)
				|> delete
				|> DB.run
				args
			end
		end