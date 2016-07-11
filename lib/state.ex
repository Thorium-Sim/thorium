defmodule State do
	import Kernel, except: [send: 2]

	use GenServer

	#No default name, to allow for creation of multiple state processes
	# Client API #
	def start_link(name, init) when is_map(init) do
		GenServer.start_link(__MODULE__, init, name: name)
	end

	def start_link(name) do
		GenServer.start_link(__MODULE__, nil, name: name)
	end

	# TODO: Add the api methods here for accessing data
	@doc "Create a key for a object and fill it with the init information"
	def create(name, id, init) do
		GenServer.cast(name, {:create, id, init})
	end

	@doc "Get the data for a given key"
	def get(name, id) do
		GenServer.call(name, {:get, id})
	end
	# Server API #
	def init(init) when is_map(init) do
		{:ok, init}	
	end

	# Initialize with an empty map
	def init(nil) do
		{:ok, %{}}
	end

	def handle_cast({:create, id, init}, state) do
		IO.inspect "Creating state for:"
		IO.inspect id
		if Map.has_key?(state, id) do
			{:noreply, state}
		else
			state = Map.put(state, id, init)
			{:noreply, state}
		end
	end

	def handle_call({:get, id}, _from, state) do
		{:reply, Map.fetch(state, id), state}
	end

	# TODO: Add the api methods for storing data.
end