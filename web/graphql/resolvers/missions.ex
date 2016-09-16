import RethinkDB.Query, only: [table: 1]
defmodule Thorium.MissionResolver do
	def get(_args, _info) do
		table("missions")
		|> DB.run
		|> DB.handle_graphql_resp
	end
end
