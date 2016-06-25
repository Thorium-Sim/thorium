import RethinkDB.Query, only: [table: 1, filter: 2, changes: 1]

defmodule Thorium.PresenceChannel do
	use Thorium.Web, :channel
	alias Thorium.Presence


	def join("presence:topic", _, socket) do
		# Start up my subscriptions Deal if it isn't already
		#if nil == Process.whereis(:subscriptions) do
		#	Supervisor.start_child(Thorium.Subscriptions, [:subscriptions])
		#end
		send self(), :after_join
		{:ok, socket}
	end

	def handle_info(:after_join, socket) do
		Presence.track(socket, socket.assigns.client_id, %{
			device: "browser",
			online_at: inspect(:os.timestamp())
			})
		push socket, "presence_state", Presence.list(socket)
		{:noreply, socket}
	end

	def handle_in("subscribe:" <> tableName, filter, socket) do
		#Thorium.Subscriptions.push(subscriptions,[tableName,filter,socket])
		{:noreply, socket}
	end
end