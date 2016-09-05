defmodule DefaultState do
  #This object should be removed after development is over
  @flight %{
    simulators: [
      %{
        id: "voyager",
        name: "Voyager",
        alertLevel: 5,
        layout: "LayoutCorners",
        stations: [
          %{
            id: 'voyager-admin',
            name: 'Admin',
            cards: [
              %{
                "component":  "AdminStations" ,
                "id":  "0f928128-5b26-42e1-9c62-01e6a8cdb7fd" ,
                "name":  "Station Admin" ,
              }, #
              %{
                "component":  "AdminAssets" ,
                "id":  "675e6a8b-0a57-458a-8c5d-3a2af5db0c08" ,
                "name":  "Assets",
              }, #
              %{
                "component":  "EngineControl" ,
                "id":  "1a3a9dac-6c30-433c-b5fa-aa5820751f4b" ,
                "name":  "Engine Control" ,
              }
            ]
          }
        ], #
        systems: [
          %{
            "coolant": 0,
            "heat": 93,
            "heatRate": 0.5,
            "id":  "09382bf7-e343-4c46-9955-b99b582cba28",
            "name":  "Warp",
            "simulatorId":  "voyager",
            "speed": -1,
            "type":  "Engine",
            "speeds": [
              %{
                "number":  "1" ,
                "text":  "Warp 1"
              }, #This keeps indentation properly with SublimeText
              %{
                "number":  "2" ,
                "text":  "Warp 2"
              }, #
              %{
                "number":  "3" ,
                "text":  "Warp 3"
              }, #
              %{
                "number":  "4" ,
                "text":  "Warp 4"
              }, #
              %{
                "number":  "5" ,
                "text":  "Warp 5"
              }, #
              %{
                "number":  "6" ,
                "text":  "Warp 6"
              }, #
              %{
                "number":  "7" ,
                "text":  "Warp 7"
              }, #
              %{
                "number":  "8" ,
                "text":  "Warp 8"
              }, #
              %{
                "number":  "9" ,
                "text":  "Warp 9"
              }, #
              %{
                "number":  "9.23" ,
                "text":  "Warp 9.23"
              } #
            ], #
          }, #
          %{
            "coolant": 0 ,
            "heat": 10 ,
            "heatRate": 0.5 ,
            "id":  "c88366a7-0942-41ef-a84d-721042e33b7b" ,
            "name":  "Impulse" ,
            "simulatorId":  "voyager" ,
            "speed": 5 ,
            "speeds": [
              %{
                "number":  "1/4" ,
                "text":  "1/4 Impulse"
              }, #
              %{
                "number":  "1/2" ,
                "text":  "1/2 Impulse"
              }, #
              %{
                "number":  "3/4" ,
                "text":  "3/4 Impulse"
              }, #
              %{
                "number":  "1" ,
                "text":  "Full Impulse"
              }, #
              %{
                "number":  "1.25" ,
                "text":  "Destructive Impulse"
              } #
            ], #
            "type":  "Engine"
          }
        ], #
      }
      ],
      universes: [],
      name: "Default Flight",
      id: "defaultflight",
      timestamp: :os.system_time(:milli_seconds)
    }

    def get do
      @flight
    end

end