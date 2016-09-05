defmodule Thorium.Flights do
  use GenServer

  # API

  def start_link(flight_id) do
    IO.inspect "This should be running."
    GenServer.start_link(__MODULE__, [], name: via_tuple(flight_id))
  end

  defp via_tuple(flight_id) do
    {:via, Thorium.ProcessRegistry, {:flight, flight_id}}
  end

  def add_message(flight_id, message) do
    GenServer.cast(via_tuple(flight_id), {:add_message, message})
  end

  def get_messages(flight_id) do
    GenServer.call(via_tuple(flight_id), :get_messages)
  end

  # SERVER

  def init(messages) do
    {:ok, messages}
  end

  def handle_cast({:add_message, new_message}, messages) do
    {:noreply, [new_message | messages]}
  end

  def handle_call(:get_messages, _from, messages) do
    {:reply, messages, messages}
  end
end