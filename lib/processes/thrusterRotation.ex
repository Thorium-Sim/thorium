import RethinkDB.Query, only: [table: 1, filter: 2, update: 2]

defmodule Thorium.ThrusterRotation do
	use GenServer

	def start_link do
		GenServer.start_link(__MODULE__, %{})
	end

	def init(state) do
    	schedule_work() # Schedule work to be performed at some point
    	{:ok, state}
    end

    def handle_info(:work, state) do
    	# Do the work you desire here
    	results = table("systems") |> filter(%{name: "Thrusters"}) |> DB.run
    	rotateThrusters(results.data)
    	schedule_work() # Reschedule once more
    	{:noreply, state}
    end


    defp rotateThrusters([thruster | tail]) do
        if thruster["attitudeAdjust"]["yaw"] !== 0 || thruster["attitudeAdjust"]["pitch"] !== 0 || thruster["attitudeAdjust"]["roll"] !== 0 do
            thrusterUpdate = %{
                attitude: %{
                    yaw: rem(round((thruster["attitude"]["yaw"] + (thruster["attitudeAdjust"]["yaw"] * thruster["rotationRate"])) * 100), 36000) / 100,
                    pitch: rem(round((thruster["attitude"]["pitch"] + (thruster["attitudeAdjust"]["pitch"] * thruster["rotationRate"])) * 100), 36000) / 100,
                    roll: rem(round((thruster["attitude"]["roll"] + (thruster["attitudeAdjust"]["roll"] * thruster["rotationRate"])) * 100), 36000) / 100
                }
            }
            table("systems") |> 
            filter(%{id: thruster["id"]}) |> 
            update(thrusterUpdate) |>
            DB.run
        end
        rotateThrusters(tail)
    end

    defp rotateThrusters([]) do
    	:ok
    end

    defp rotateThrusters(nil) do
    	:ok
    end

    defp schedule_work() do
    	Process.send_after(self(), :work, 100) 
    end
end
