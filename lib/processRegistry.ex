defmodule Thorium.ProcessRegistry do
	import Kernel, except: [send: 2]

	use GenServer

  # Client API #
  def start_link do
  	GenServer.start_link(__MODULE__, nil, name: :registry)
  end

  def register_name(key, pid) when is_pid(pid) do
  	GenServer.call(:registry, {:register_name, key, pid})
  end

  def unregister_name(key) do
  	GenServer.call(:registry, {:unregister_name, key})
  end

  def whereis_name(key) do
  	GenServer.call(:registry, {:whereis_name, key})
  end

  def send(key, msg) do
  	case whereis_name(key) do
  		pid when is_pid(pid) ->
  			Kernel.send(pid, msg)
  			pid

  			:undefined -> {:badarg, {key, msg}}
  		end
  	end

  # Server API #
  def init(nil) do
  	{:ok, %{}}
  end

  def handle_call({:unregister_name, key}, _from, registry) do
  	{:reply, key, deregister(registry, key)}
  end

  def handle_call({:register_name, key, pid}, _from, registry) do
  	case Map.get(registry, key, nil) do
  		nil ->
  			Process.monitor(pid)
  			registry = Map.put(registry, key, pid)
  			{:reply, :yes, registry}

  			_ -> {:reply, :no, registry}
  		end
  	end

  	def handle_call({:whereis_name, key}, _from, registry) do
  		{:reply, Map.get(registry, key, :undefined), registry}
  	end

  	def handle_info({:DOWN, _ref, :process, pid, _reason}, registry) do
  		{:noreply, deregister(registry, pid)}
  	end

  	def handle_info(_info, registry), do: {:noreply, registry}

  # Helper Functions #
  defp deregister(registry, pid) when is_pid(pid) do
  	case Enum.find(registry, nil, fn({_key, cur_pid}) -> cur_pid == pid end) do
  		nil -> registry
  		{key, _pid} -> deregister(registry, key)
  	end
  end

  defp deregister(registry, key) do
  	Map.delete(registry, key)
  end
end