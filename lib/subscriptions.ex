defmodule Thorium.Subscriptions do
	def start_link do
		Agent.start_link fn -> [] end
	end

	def size(pid) do
		Agent.get pid, fn stack -> Enum.count(stack) end
	end

	def get(pid) do
		Agent.get pid, fn stack -> stack end	
	end

	def push(pid, item) do
		Agent.update pid, fn stack -> [item | stack] end
	end

	def pop(pid) do
		Agent.get_and_update pid, fn [item | last] ->
			{item, last}
		end
	end
end