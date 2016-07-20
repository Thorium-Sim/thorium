defmodule Store do
	@moduledoc """
	Stores the state for all thorium flights. Flights are registered here when created and consist of a 
	massive object with all of the data necessary for the flight. The FSM can then very easily access
	the flight objects when necessary.
	"""
	@store GlobalStore
	@doc """
	Starts a new store.
	"""
	def start_link(init) when is_list(init) do
		{:ok, data} = to_map(init, %{})
		Agent.start_link(fn -> data end, name: @store)
	end

	def start_link(init) when is_map(init) do
		#I'm just going to assume that init is a flight and not a flight store
		key = init.id
		Agent.start_link(fn -> %{key => init} end, name: @store)
	end

	def start_link do
		Agent.start_link(fn -> %{} end, name: @store)
	end

	defp to_map([head | tail], state) do
		to_map(tail, Map.put(state, head.id, head))
	end

	defp to_map([], state) do
		{:ok, state}
	end

	def add_flight(flight) do
		key = flight["id"]
		Agent.update(@store, &Map.put(&1, key, flight))
		send_update
	end

	def remove_flight(flight) do
		key = flight["id"]
		Agent.update(@store, &Map.delete(&1, key))
		send_update
	end

	def update_flight(id, flight) do
		key = flight["id"]
		Agent.update(@store, &Map.put(&1, key, flight))
		send_update
	end
	@doc """
	Gets a value from the `store` by `key`.
	"""
	def get(key) do
		Agent.get(@store, &Map.get(&1, key))
	end

	def getAll do
		Agent.get(@store, fn state -> state end)
	end
	@doc """
	Puts the `value` for the given `key` in the `store`.
	"""
	def put(key, value) do
		Agent.update(@store, &Map.put(&1, key, value))
	end

	def send_update do
		IO.puts "Sending Flight Update"
		Thorium.Endpoint.broadcast("flights", "init:flights", Store.getAll)
	end
end