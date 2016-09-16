defmodule Thorium.Context do
  @moduledoc """
  This module is just a regular plug that can look at the conn struct and build
  the appropriate absinthe context.
  """

  @behaviour Plug

  def init(opts), do: opts
  def call(conn, _) do
    conn
  end
end