"""
import RethinkDB.Query, only: [table: 1, get: 2, filter: 2, insert: 2, update: 2, delete: 1]

defmodule App.Mutation.Simulators do
	@type_string %{type: %GraphQL.Type.String{}}
	@type_boolean %{type: %GraphQL.Type.Boolean{}}
	def create do
		%{
			type: App.Type.Simulator.get,
			description: "Create a new simulator object.",
			args: %{
				name: @type_string,
				alertLevel: @type_string,
				layout: @type_string,
				template: @type_boolean,
				flightId: @type_string
				},
				resolve: {App.Mutation.Simulators, :create_resolve},
			}
		end

		def create_resolve(_, args, _) do
			%{data: response} = table("simulators")
			|> insert(args)
			|> DB.run
			Map.put(args, "id", List.first(response["generated_keys"]))
		end

		def update do
			%{
				type: App.Type.Simulator.get,
				description: "Update the properties of a simulator",
				args: %{
					id: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
					name: @type_string,
					alertLevel: @type_string,
					layout: @type_string,
					template: @type_boolean,
					#flightId: @type_string //Make it so it's not allowed to update the flight ID.
					},
					resolve: {App.Mutation.Simulators, :update_resolve}
				}
			end

			def update_resolve(_, args, _) do
				IO.inspect args
				%{data: response} = table("simulators")
				|> get(args.id)
				|> update(Map.delete(args, :id))
				|> DB.run
				%{data: output} = table("simulators")
				|> get(args.id)
				|> DB.run

				output
			end

			def delete do
				%{
					type: App.Type.Simulator.get,
					description: "Remove a simulator based on ID",
					args: %{
						id: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
						},
						resolve: {App.Mutation.Simulators, :delete_resolve}
					}
				end
				def delete_resolve(_, args, _) do
					%{data: response} = table("simulators")
					|> get(args.id)
					|> delete
					|> DB.run
					%{id: args.id}
				end
			end

			"""