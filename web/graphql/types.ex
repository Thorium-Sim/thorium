import RethinkDB.Query, only: [table: 1, filter: 2, get_all: 3, get: 2]
defmodule Thorium.Schema.Types do
	use Absinthe.Schema.Notation
	@desc "Permissions assigned to a user"
	object :role do
		field :id, :id
		field :userId, :string
		field :name, :string	
	end

	@desc "An account which has access to this website"
	object :user do
		field :id, :id
		field :email, :string
		field :token, :string
		field :tokenExpire, :integer
		field :roles, list_of(:role)
	end

	@desc "An individual client session attached to this server"
	object :session do
		field :id, :id
		field :flight, :string
		field :simulator, :string
		field :station, :string
	end

	@desc "The actual asset. It can be assigned to a specific simulator or it can be generic (no simulator id)"
	object :assetObject do
		field :id, :id
		field :folderPath, :string
		field :containerId, :string
		field :containerPath, :string
		field :fullPath, :string
		field :url, :string
		field :simulatorId, :string
	end

	@desc "An asset container references a specific type of asset. For example, the main logo (different logo for different simulators)"
	object :assetContainer do
		field :id, :id
		field :folderPath, :string
		field :folderId, :string
		field :name, :string
		field :fullPath, :string
	end

	@desc "An asset folder"
	object :assetFolder do
		field :id, :id
		field :folderPath, :string
		field :fullPath, :string
		field :name, :string
	end

	@desc "A mission is pre-configured simulators with timelines"
	object :mission do
		field :id, :id
		field :name, :string
		field :simulators, list_of(:simulator)
	end

	@desc "A flight is a single instance of a currently-running mission."
	object :flight do
		field :id, :id
		field :name, :string
		field :date, :float
		field :simulators, list_of(:simulator) do
			resolve &Thorium.SimulatorResolver.get/2
    end
  end

  @desc "A simulator is a single entity in the flight universe. It could be comprised of a single set, multiple sets, or even several remote computers."  
  object :simulator do
    field :id, :id
    field :flightId, :string
    field :name, :string
    field :alertLevel, :string
    field :layout, :string
    field :template, :boolean
    field :stationSet, :stationSet do
      resolve &Thorium.StationResolver.getStation/2
    end
  end

  @desc "A set of stations."
  object :stationSet do
    field :id, :id
    field :name, :string
    field :stations, list_of(:station) do
      resolve fn _, %{source: source} -> 
        {:ok, Enum.map(source.stations, fn(val) -> for {key, val} <- val, into: %{}, do: {String.to_atom(key), val} end)} 
      end
    end
  end

  input_object :stationsetinput do
    field :name, :string
    field :stations, list_of(:stationinput)
  end

  @desc "The station input object. Allows you to input an array of stations"
  input_object :stationinput do
    field :name, :string
    field :cards, list_of(:cardinput)
  end

  @desc "The card input object. Allows you to input an array of cards"
  input_object :cardinput do
    field :name, :string
    field :component, :string
    field :icon, :string
  end

  @desc "The station object. Specific to a simulator."
  object :station do
    field :name, :string
    field :cards, list_of(:card) do
      resolve fn _, %{source: source} ->
        {:ok, Enum.map(source.cards, fn(val) -> for {key, val} <- val, into: %{}, do: {String.to_atom(key), val} end)} 
      end
    end
  end

  @desc "A card object. Has the component and the icon which the card uses."
  object :card do
    field :name, :string
    field :component, :string
    field :icon, :string
  end

end
