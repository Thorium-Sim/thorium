defmodule Thorium.UserSocket do
  use Phoenix.Socket

  ## Channels
  channel "generic:*", Thorium.GenericChannel
  channel "operations", Thorium.OperationsChannel
  channel "session", Thorium.SessionChannel
  channel "flights", Thorium.FlightsChannel
  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"client_id" => id, "otherClient" => other}, socket) do
    IO.inspect "Other"
    IO.inspect socket
    {:ok, assign(socket, :client_id, id)}
  end

  def connect(%{"client_id" => id}, socket) do
    IO.inspect socket
    {:ok, assign(socket, :client_id, id)}
  end

  def connect(_params, socket) do
    IO.inspect "Connected:"
    IO.inspect _params
    {:ok, socket}
  end

  

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Thorium.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
