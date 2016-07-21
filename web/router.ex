defmodule Thorium.Router do
  use Thorium.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
  end

  pipeline :csrf do
        plug :protect_from_forgery
  end
  
  pipeline :api do
    plug :accepts, ["json"]
  end
  
  scope "/graphql" do
    pipe_through :api
    forward "/", GraphQL.Plug, schema: {App.PublicSchema, :get}
  end


  scope "/", Thorium do
    pipe_through :browser
    post "/assets", PageController, :assets_upload
    get "/assets", PageController, :assets_get
    get "/reset", PageController, :reset_db
    get "/*path", PageController, :index
  end

end
