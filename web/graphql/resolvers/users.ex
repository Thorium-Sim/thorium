import RethinkDB.Query, only: [table: 1, filter: 2, get_all: 3, insert: 2, update: 2, delete: 2]
import Comeonin.Bcrypt

defmodule Thorium.UserResolver do
	def get(%{id: id}, _info) do
		table("users")
		|> get_all(id, %{"index" => "id"})
		|> DB.run
		|> DB.handle_graphql_resp
	end
	def get(%{token: token}, _info) do
		table("users")
		|> get_all(token, %{"index" => "token"})
		|> DB.run
		|> DB.handle_graphql_resp
	end
	def get(%{email: email}, _info) do
		
	end
	def get(_args, _info) do
		res = table("users")
		|> DB.run
		|> DB.handle_graphql_resp
		IO.inspect res
		res
	end
	def register(args, _info) do
		%{data: response} = table("users")
		|> filter(%{"email" => args.email})
		|>DB.run
		case length response do
			0 ->
				create_user args
			_ ->
		end
	end
	def create_user args do
		obj = %{
			email: args.email,
			password: hashpwsalt(args.password),
			token: gen_salt,
			tokenExpire: :os.system_time(:milli_seconds) + (1000 * 60 * 15)
		}
		%{data: response} = table("users")
		|> insert(obj)
		|> DB.run
		{:ok, Map.put(obj, "id", List.first(response["generated_keys"]))}
	end
	def login(args, _info) do
		IO.inspect args
	end

	def forgot(args, _info) do
		IO.inspect args
	end

	def reset(args, _info) do
		IO.inspect args
	end
end
