defmodule Thorium.Router do
  use Thorium.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Thorium do
    pipe_through :browser
    get "/", PageController, :index
    get "/reset", PageController, :reset_db
  end

  scope "/graphql" do
    pipe_through :api
    forward "/", GraphQL.Plug, schema: {App.PublicSchema, :get}
  end
end
