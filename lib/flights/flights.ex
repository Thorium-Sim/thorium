defmodule Flights do
	@moduledoc """
	Initialize a single flight object, store it's state in the Global State object. 
	"""	
	def start_link(init) do
		IO.inspect init
		State.create(Flights, init["id"], init)
		#GenServer.start_link(__MODULE__, nil)
	end

	#def init(nil) do
	#	{:ok, %{}}
	#end
end