defmodule ClientStore do
	def start_link do
		Agent.start_link(fn -> %{} end, name: Clients)
	end

	def add_client(key, client) do
		Agent.update(Clients, &Map.put(&1, key, client))
		send_update
	end

	def get_clients do
		Agent.get(Clients, fn state -> state end)
	end

	def update_client(key, client) do
		Agent.update(Clients, &Map.put(&1, key, client))
		send_update
	end

	def send_update do
		Thorium.Endpoint.broadcast("session", "clients", ClientStore.get_clients)
	end

end