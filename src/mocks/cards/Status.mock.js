import {
  STATUS_DEST_QUERY,
  STATUS_DEST_SUB,
} from "components/views/Status/components/destination";
import {
  STATUS_ENGINE_QUERY,
  STATUS_ENGINE_SUB,
} from "components/views/Status/components/speed";
import {
  STATUS_POP_QUERY,
  STATUS_SIM_SUB,
  STATUS_POP_SUB,
} from "components/views/Status/components/population";
import systems from "../data/systems";
import simulators from "../data/simulators";
import {
  STATUS_COOLANT_QUERY,
  STATUS_COOLANT_SUB,
} from "components/views/Status/components/coolant";
import {STATUS_DILITHIUM_QUERY} from "components/views/Status/components/dilithiumStress";
import {
  STATUS_TARGETING_SUB,
  STATUS_TARGETING_QUERY,
} from "components/views/Status/components/targeted";
import {
  STATUS_BATTERY_QUERY,
  STATUS_BATTERY_SUB,
} from "components/views/Status/components/battery";
import {
  STATUS_DAMAGE_QUERY,
  STATUS_DAMAGE_SUB,
} from "components/views/Status/components/damaged";
import {
  STATUS_ALERT_QUERY,
  STATUS_ALERT_SUB,
} from "components/views/Status/components/alertCondition";
import {
  STATUS_STEALTH_QUERY,
  STATUS_STEALTH_SHIELD_SUB,
  STATUS_STEALTH_SUB,
} from "components/views/Status/components/stealth";
import {
  STATUS_RADIATION_QUERY,
  STATUS_RADIATION_SUB,
} from "components/views/Status/components/radiation";

export default [
  {
    request: {
      query: STATUS_DEST_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        navigation: systems.navigation,
      },
    },
  },
  {
    request: {
      query: STATUS_DEST_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        navigationUpdate: systems.navigation,
      },
    },
  },
  {
    request: {
      query: STATUS_ENGINE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        engines: systems.engines,
      },
    },
  },
  {
    request: {
      query: STATUS_ENGINE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        engineUpdate: systems.engines,
      },
    },
  },
  {
    request: {
      query: STATUS_POP_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crewCount: 321,
        simulators,
      },
    },
  },
  {
    request: {
      query: STATUS_SIM_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
  {
    request: {
      query: STATUS_POP_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        crewCountUpdate: 321,
      },
    },
  },
  {
    request: {
      query: STATUS_COOLANT_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        coolant: systems.coolant,
      },
    },
  },
  {
    request: {
      query: STATUS_COOLANT_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        coolantUpdate: systems.coolant,
      },
    },
  },
  {
    request: {
      query: STATUS_DILITHIUM_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        reactors: systems.reactors,
      },
    },
  },
  {
    request: {
      query: STATUS_COOLANT_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        reactorUpdate: systems.reactors,
      },
    },
  },
  {
    request: {
      query: STATUS_TARGETING_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        targeting: systems.targeting,
      },
    },
  },
  {
    request: {
      query: STATUS_TARGETING_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        targetingUpdate: systems.targeting,
      },
    },
  },
  {
    request: {
      query: STATUS_BATTERY_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        reactors: systems.reactors,
      },
    },
  },
  {
    request: {
      query: STATUS_BATTERY_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        reactorUpdate: systems.reactors,
      },
    },
  },
  {
    request: {
      query: STATUS_DAMAGE_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        systems: Object.values(systems).reduce((acc, next) => acc.concat(next)),
      },
    },
  },
  {
    request: {
      query: STATUS_DAMAGE_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        systemsUpdate: Object.values(systems).reduce((acc, next) =>
          acc.concat(next),
        ),
      },
    },
  },
  {
    request: {
      query: STATUS_ALERT_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: STATUS_ALERT_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
  {
    request: {
      query: STATUS_STEALTH_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthField: systems.stealthField,
        shields: systems.shields,
      },
    },
  },
  {
    request: {
      query: STATUS_STEALTH_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        stealthFieldUpdate: systems.stealthField,
      },
    },
  },
  {
    request: {
      query: STATUS_STEALTH_SHIELD_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        shieldsUpdate: systems.shields,
      },
    },
  },
  {
    request: {
      query: STATUS_RADIATION_QUERY,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulators,
      },
    },
  },
  {
    request: {
      query: STATUS_RADIATION_SUB,
      variables: {simulatorId: "test"},
    },
    result: {
      data: {
        simulatorsUpdate: simulators,
      },
    },
  },
];
