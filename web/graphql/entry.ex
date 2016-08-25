# breakup query and mutations into separate modules this module
# will glue everything together and expose the endpoint
# TODO: update this to be named something appropriate.
defmodule App.PublicSchema do
  def get do
    %GraphQL.Schema{

      query: %GraphQL.Type.ObjectType{
        name: "PublicQueries",
        fields: %{
          users: App.Query.Users.get,
          roles: App.Query.Roles.get,
        }
      },

      mutation: %GraphQL.Type.ObjectType{
        name: "PublicMutations",
        fields: %{
         register_user: App.Mutation.Users.register,
         login_user: App.Mutation.Users.login,
         add_role: App.Mutation.Roles.add,
         revoke_role: App.Mutation.Roles.revoke,
         forgot: App.Mutation.Users.forgot,
         reset: App.Mutation.Users.reset
        }
      }

    }
  end
end
