"""
alias GraphQL.Type.List

defmodule App.Query.Session do
  def get do
    %{
      type: %List{ofType: App.Type.Presence.get},
      args: %{
        id: %{
          type: %GraphQL.Type.String{},
          description: "Return a single session by ID."
        }
        },
        resolve: {App.Query.Session, :session}
      }
    end

    def session(_, %{id: sessionId}, _) do
      Enum.filter_map(Thorium.Presence.list("session"), fn{id, %{metas: metas}} -> id == sessionId end, fn{id, %{metas: metas}} -> %{id: id, metas: metas}  end)
    end

    def session(_, _args, _) do
      Enum.map(Thorium.Presence.list("session"), fn{id, %{metas: metas}} -> %{id: id, metas: metas}  end)
    end
  end
"""