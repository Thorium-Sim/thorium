ExUnit.start

defmodule Simulators.Test do
	use ExUnit.Case, async: true
	@name TestSimulator
	test "Updates a specific simulator" do
		{:ok, simulator} = Simulators.start_link(@name)
    	#The simulator object is named.
    	assert Simulators.get(@name, "alert_condition") == 5

    	Simulators.put(@name, "alert_condition", 1)
    	assert Simulators.get(@name, "alert_condition") == 1
    end
end