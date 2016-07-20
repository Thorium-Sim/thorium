import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

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
		Store.remove_flight(old_val)
	end
	@doc "Flight object created"
	def handle_changes(%{"new_val" => new_val,"old_val" => nil}) do
		#Create the simulator tree by pulling in all of the objects which
		#Reference the simulator id of each simulator.
		simulators = Enum.map(new_val["simulators"], fn simulator ->
			simResult = table("simulators") 
			|> filter(%{"id" => simulator["id"]})
			|> DB.run
			statResult = table("stations")
			|> filter(%{"simulatorId" => simulator["id"], "id" => simulator["stationSet"]})
			|> DB.run
			sysResult = table("systems")
			|> filter(%{"simulatorId" => simulator["id"]})
			|> DB.run
			[simData] = simResult.data
			[stationData] = statResult.data
			%{
				"id" => simData["id"],
				"name" => simData["name"],
				"layout" => simData["layout"],
				"alertLevel" => simData["alertLevel"],
				"stations" => stationData["stations"],
				"systems" => sysResult.data
			}
		end)
		output = %{
			"id" => new_val["id"],
			"name" => new_val["name"],
			"mission" => new_val["mission"],
			"simulators" => simulators,
			"timestamp" => new_val["timestamp"]
		}
		Store.add_flight(output)
	end
	@doc "Flight object changed"
	def handle_changes(%{"new_val" => new_val,"old_val" => old_val}) do
		Store.update_flight(old_val["id"], new_val)
	end

	# Server API for Supervisor
	def init(:ok) do
		children = [
			worker(Flights.Registry, [Flights.Registry]),
		]

		supervise(children, strategy: :one_for_one)
	end
end