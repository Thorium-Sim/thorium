defmodule App.Type.AssetObject do
  @type_string %{type: %GraphQL.Type.String{}}
  def get do
    %GraphQL.Type.ObjectType{
      name: "AssetObject",
      description: "A single card object attached to a station.",
      fields: %{
        id: @type_string,
        folderPath: @type_string,
        containerId: @type_string,
        containerPath: @type_string,
        fullPath: @type_string,
        simulatorId: @type_string
        },
    }
  end
end

defmodule App.Type.AssetContainer do
  @type_string %{type: %GraphQL.Type.String{}}
  def get do
    %GraphQL.Type.ObjectType{
      name: "AssetContainer",
      description: "Container for asset object",
      fields: %{
        id: @type_string,
        name: @type_string,
        folderId: @type_string,
        folderPath: @type_string,
        fullPath: @type_string
      }
    }
  end
end

defmodule App.Type.AssetFolder do
  @type_string %{type: %GraphQL.Type.String{}}
  def get do
    %GraphQL.Type.ObjectType{
      name: "AssetFolder",
      description: "A container for asset containers",
      fields: %{
        id: @type_string,
        name: @type_string,
        fullPath: @type_string,
        folderPath: @type_string
      },
    }
  end
end
