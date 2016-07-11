import RethinkDB.Query, only: [table: 1, changes: 1]

defmodule Thorium.FlightsInit do
	use Supervisor
	@moduledoc """
	This modules purpose is to initialize all flight objects and ensure that their processes get created, updated
	and destroyed. This is speciically to modify the processes themselves, not necessarily to update information on the flight itself.
	"""	
	def start_link do
		#Start the flight registry process
		#Get the flight objects from the database, initialize the 'Change' function
		q = table("flights")
		result = DB.run(q)
		Enum.each(result.data, fn flight -> 
			change = %{"new_val" => flight, "old_val" => nil}
			handle_changes(change)
		 end)
		changes = changes(q)
		|> DB.run
		Task.async fn ->
			Enum.each(changes, fn change ->
				handle_changes(change)
			end)
		end
		Supervisor.start_link(__MODULE__, :ok)
	end

	@doc "Flight Object Removed"
	def handle_changes(%{"new_val" => nil,"old_val" => old_val}) do
		#Flights.Registry.delete(Flights.Registry, old_val['id'])
	end
	@doc "Flight object created"
	def handle_changes(%{"new_val" => new_val,"old_val" => nil}) do
		Flights.start_link(new_val)
		#Flights.Registry.create(Flights.Registry, new_val['id'], new_val)
	end
	@doc "Flight object changed"
	def handle_changes(%{"new_val" => _new_val,"old_val" => _old_val}) do
		#I don't know if this will ever actually happen.
	end

	# Server API for Supervisor
	def init(:ok) do
		children = [
			worker(Flights.Registry, [Flights.Registry]),
		]

		supervise(children, strategy: :one_for_one)
	end
end