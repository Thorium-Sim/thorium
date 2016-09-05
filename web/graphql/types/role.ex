alias GraphQL.Type.List

defmodule App.Type.Role do
	@type_string %{type: %GraphQL.Type.String{}}
	@type_int %{type: %GraphQL.Type.Int{}}
	def get do
		%GraphQL.Type.ObjectType{
			name: "Role",
			description: "Permissions assigned to a user",
			fields: %{
				id: @type_string,
				userId: @type_string,
				name: @type_string,
			}
		}
	end
end