import RethinkDB.Query, only: [table: 1, filter: 2]

defmodule Thorium.Schema do
  use Absinthe.Schema
  import_types Thorium.Schema.Types

  query do
    field :users, list_of(:user) do
      arg :id, :string
      arg :token, :string
      arg :email, :string

      resolve &Thorium.UserResolver.get/2
    end
    field :sessions, list_of(:session) do
      resolve &Thorium.SessionResolver.get/2
    end
    field :flights, list_of(:flight) do
      resolve &Thorium.FlightResolver.get/2
    end
    field :simulators, list_of(:simulator) do
      arg :template, :boolean
      resolve &Thorium.SimulatorResolver.get/2
    end
    field :stations, list_of(:stationSet) do
      resolve &Thorium.StationResolver.getStation/2
    end
    field :missions, list_of(:mission) do
      resolve &Thorium.MissionResolver.get/2
    end
  end

  mutation do
    @desc "Apply a role to a user"
    field :addrole, type: :role do
      arg :userId, non_null(:string)
      arg :name, non_null(:string)
      resolve &Thorium.RoleResolver.add/2
    end
    @desc "Register as a new user"
    field :registeruser, type: :user do
      arg :email, non_null(:string)
      arg :password, non_null(:string)
      resolve &Thorium.UserResolver.register/2
    end

    @desc "A super simple mutation"
    field :simplemutate, type: :string do
      arg :return, non_null(:string)
      resolve fn args, _info ->
        IO.inspect args
        {:ok, args.return} 
      end 
    end
    @desc "Create a station set"
    field :addstationset, type: :stationSet do
      arg :name, non_null(:string)
      arg :stations, list_of(:stationsetinput)
      resolve &Thorium.StationResolver.addStationSet/2
    end
    @desc "Remove a station set"
    field :removestationset, type: :stationSet do
      arg :id, non_null(:string)
      resolve &Thorium.StationResolver.removeStationSet/2
    end
    @desc "Add a station to a station set"
    field :addstation, type: :stationSet do
      @desc "The id of the station set"
      arg :id, non_null(:string)
      arg :station, non_null(:stationinput)
      resolve &Thorium.StationResolver.addStation/2
    end
    @desc "Remove a statin from a station set"
    field :removestation, type: :stationSet do
      @desc "The id of the station set"
      arg :id, non_null(:string)
      arg :station, non_null(:string)
      resolve &Thorium.StationResolver.removeStation/2
    end
    @desc "Edit a station set"
    field :editstation, type: list_of(:stationSet) do
      arg :name, non_null(:string)
      arg :stations, list_of(:stationsetinput)
      resolve &Thorium.StationResolver.editStation/2
    end
  end

end

# breakup query and mutations into separate modules this module
# will glue everything together and expose the endpoint
# TODO: update this to be named something appropriate.
"""
defmodule App.PublicSchema do
  def get do
    %GraphQL.Schema{

      query: %GraphQL.Type.ObjectType{
        name: "PublicQueries",
        fields: %{
          simulators: App.Query.Simulators.get,
          stations: App.Query.Stations.get,
          sessions: App.Query.Session.get,
          flights: App.Query.Flights.get,
          users: App.Query.Users.get,
          roles: App.Query.Roles.get,
          #assets: App.query.assets.get
        }
        },

        mutation: %GraphQL.Type.ObjectType{
          name: "PublicMutations",
          fields: %{
            simulator_create: App.Mutation.Simulators.create,
            simulator_update: App.Mutation.Simulators.update,
            simulator_delete: App.Mutation.Simulators.delete,
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
  """
