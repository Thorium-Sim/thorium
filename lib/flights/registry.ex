defmodule Flights.Registry do
	import Kernel, except: [send: 2]

	use GenServer

  # Client API #
  @doc """
  Starts the registry.
  """
  def start_link(name) do
    GenServer.start_link(__MODULE__, :ok, name: name)
  end

  @doc """
  Looks up the flight pid for `name` stored in `server`.

  Returns `{:ok, pid}` if the flight exists, `:error` otherwise.
  """
  def lookup(server, name) do
    GenServer.call(server, {:lookup, name})
  end

  @doc """
  Ensures there is a flight associated to the given `name` in `server`.
  """
  def create(server, name, init) do
    GenServer.cast(server, {:create, name, init})
  end


  @doc """
  Kill the given flight - probably due to being removed from the database
  """
  def delete(server, name) do
    GenServer.cast(server, {:delete, name})  
  end

  # Server API #
   def init(:ok) do
    names = %{}
    refs  = %{}
    {:ok, {names, refs}}
  end

  def handle_call({:lookup, name}, _from, {names, _} = state) do
    {:reply, Map.fetch(names, name), state}
  end

  def handle_cast({:create, name, init}, {names, refs}) do
    if Map.has_key?(names, name) do
      {:noreply, {names, refs}}
    else
      {:ok, pid} = Flights.start_link(init)
      ref = Process.monitor(pid)
      refs = Map.put(refs, ref, name)
      names = Map.put(names, name, pid)
      {:noreply, {names, refs}}
    end
  end

  @doc "Kill the process. The handle_info below should automatically remove the process from the registry"
  def handle_cast({:delete, name}) do
    Process.exit(Flights.Registry.lookup(Flights.Registry, name), :kill)
  end

  def handle_info({:DOWN, ref, :process, _pid, _reason}, {names, refs}) do
    {name, refs} = Map.pop(refs, ref)
    names = Map.delete(names, name)
    {:noreply, {names, refs}}
  end

  def handle_info(_msg, state) do
    {:noreply, state}
  end
end