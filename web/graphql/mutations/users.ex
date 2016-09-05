import Comeonin.Bcrypt
import RethinkDB.Query, only: [table: 1, get: 2, get_all: 3, filter: 2, insert: 2, update: 2, delete: 1]

defmodule App.Mutation.Users do
	@type_string %{type: %GraphQL.Type.String{}}
	@type_int %{type: %GraphQL.Type.Int{}}
	@type_boolean %{type: %GraphQL.Type.Boolean{}}

	def register do
		%{
			type: App.Type.User.get,
			description: "Create a new user object.",
			args: %{
				email: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
				password: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
				},
				resolve: {App.Mutation.Users, :register_resolve},
			}
		end

		def register_resolve(_, args, _) do
			#Check to make sure there are no users with that email address
			%{data: response} = table("users")
			|> filter(%{"email" => args.email})
			|>DB.run
			case length response do
				0 ->
					create_user args
					_ ->
						GraphQL.Errors.new([%GraphQL.Error{message: "User exists with that email address"}])
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
					Map.put(obj, "id", List.first(response["generated_keys"]))
				end

				def login do
					%{
						type: App.Type.User.get,
						description: "Authenticates a user",
						args: %{
							email: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
							password: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
							},
							resolve: {App.Mutation.Users, :login_resolve},
						}
					end

					def login_resolve(_, args, _) do
					#Get the users password
					%{data: response} = table("users")
					|> get_all(args.email, %{"index" => "email"})
					|> DB.run
					case response do
						[] ->
							GraphQL.Errors.new([%GraphQL.Error{message: "Unknown email. Please register a new account"}])
							_ ->
								case Comeonin.Bcrypt.checkpw(args.password, List.first(response)["password"]) do
									true ->
								#update the hash
								updateObj = %{token: UUID.uuid1, tokenExpire: :os.system_time(:milli_seconds) + (1000 * 60 * 15)}
								table("users")
								|> filter(%{"email" => List.first(response)["email"]})
								|> update(updateObj)
								|> DB.run
								%{token: updateObj.token, tokenExpire: updateObj.tokenExpire, email: List.first(response)["email"], id: List.first(response)["id"]}
								false ->
									GraphQL.Errors.new([%GraphQL.Error{message: "Invalid password combination"}])
								end
							end							
						end
						def forgot do
							%{
								type: App.Type.User.get,
								description: "Requests a password reset",
								args: %{
									email: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
									},
									resolve: {App.Mutation.Users, :forgot_resolve},
								}
							end
							def forgot_resolve(_, args, _) do
								%{data: response} = table("users")
								|> get_all(args.email, %{"index" =>  "email"})
								|> DB.run
								updateObj = %{token: nil, resetLink: UUID.uuid1}
								table("users")
								|> filter(%{"email" => List.first(response)["email"]})
								|> update(updateObj)
								|> DB.run
								#Send the email
								arg = %{email: List.first(response)["email"], resetLink: updateObj.resetLink}
								Thorium.Mailer.forgot_password_email(arg) |> Thorium.Mailer.deliver_now
								%{email: args.email, id: List.first(response)["id"]}
							end
							def reset do
								%{
									type: App.Type.User.get,
									description: "Completes a password reset",
									args: %{
										resetLink: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}},
										password: %{type: %GraphQL.Type.NonNull{ofType: %GraphQL.Type.String{}}}
										},
										resolve: {App.Mutation.Users, :reset_resolve},
									}
								end
								def reset_resolve(_, %{resetLink: resetLink, password: password}, _) do
									updateObj = %{password: hashpwsalt(password),
									token: gen_salt,
									tokenExpire: :os.system_time(:milli_seconds) + (1000 * 60 * 15),
									resetLink: nil
								}
								%{data: response} = table("users")
								|> filter(%{"resetLink" => resetLink})
								|> update(updateObj)
								|> DB.run 
								updateObj
							end
						end
