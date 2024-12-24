import gql from "graphql-tag.macro";


export const ADVANCED_NAV_AND_ASTROMETRICS_SUB = gql`
    subscription AdvancedNavAndAstrometricsUpdate($simulatorId: ID!) {
        advancedNavAndAstrometricsUpdate(simulatorId: $simulatorId) {
    id
    simulatorId
    type
    name
    displayName
    stealthFactor
    flightSets {
      id
      name
      backgroundImg
      startOptions {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOptions {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOptions {
        id
        name
        riskModifier
        imgUrl
      }
      pointsOfInterest {
        id
        name
        location {
          x
          y
        }
        isVisible
        isFogOfWar
        speedIndex
        riskIndex
        type {
          category
          imageUri
        }
        information {
          basicInformation
          hasBasicInformation
          detailedInformation
          hasDetailedInformation
          secretInformation
          hasSecretInformation
        }
        iconUrl
        fullImageUrl
        transitOptions {
          name
          timeModifier
          riskModifier
          iconUrl
        }
        showName
      }
      defaultStartingLocation {
        x
        y
      }
      borders {
        name
        id
        location {
          side
        }
        iconUrl
        riskIndex
      }
      imageMaxX
      imageMaxY
      pixelsPerSecond
      label
      probeLaunchRangeRadius
      addOnTraining
    }
    currentLocation {
      x
      y
    }
    coolantLevel
    heatLevel
    flightPaths {
      name
      id
      targetLocationId

      secondaryRouteOptions {
        targetLocationId
      }
      isBorder
      startOption {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOption {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOption {
        id
        name
        riskModifier
        imgUrl
      }
    }
    engineStatus
    hasEmergencyPower
    startingStartupTime
    remainingEta
    totalEta
    flightPathCoords {
      speed
      color
      x
      y
    }
    remainingStartupTime
    showEta
    showFlightSet
    currentFlightSet {
      id
      name
      backgroundImg
      startOptions {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOptions {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOptions {
        id
        name
        riskModifier
        imgUrl
      }
      pointsOfInterest {
        id
        name
        location {
          x
          y
        }
        isVisible
        isFogOfWar
        speedIndex
        riskIndex
        type {
          category
          imageUri
        }
        information {
          basicInformation
          hasBasicInformation
          detailedInformation
          hasDetailedInformation
          secretInformation
          hasSecretInformation
        }
        iconUrl
        fullImageUrl
        transitOptions {
          name
          timeModifier
          riskModifier
          iconUrl
        }
        showName
      }
      defaultStartingLocation {
        x
        y
      }
      borders {
        name
        id
        location {
          side
        }
        iconUrl
        riskIndex
      }
      imageMaxX
      imageMaxY
      pixelsPerSecond
      label
      probeLaunchRangeRadius
      addOnTraining
    }
    currentFlightPath {
      targetLocationId

      secondaryRouteOptions {
        targetLocationId
      }
      isBorder
      startOption {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOption {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOption {
        id
        name
        riskModifier
        imgUrl
      }
    }
    currentLocationName
    currentLocationUrl
    probes {
      id
      name
      type
      equipment {
        id
        count
      }
    }
    flightSetPathMap
    probeAssignments
  }
}
`

export const ADVANCED_NAV_AND_ASTROMETRICS_QUERY = gql`
query GetAdvancedNavAndAstrometrics($simulatorId: ID!) {
  advancedNavAndAstrometrics(simulatorId: $simulatorId) {
    id
    simulatorId
    type
    name
    displayName
    stealthFactor
    flightSets {
      id
      name
      backgroundImg
      startOptions {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOptions {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOptions {
        id
        name
        riskModifier
        imgUrl
      }
      pointsOfInterest {
        id
        name
        location {
          x
          y
        }
        isVisible
        isFogOfWar
        speedIndex
        riskIndex
        type {
          category
          imageUri
        }
        information {
          basicInformation
          hasBasicInformation
          detailedInformation
          hasDetailedInformation
          secretInformation
          hasSecretInformation
        }

        iconUrl
        fullImageUrl
        transitOptions {
          name
          timeModifier
          riskModifier
          iconUrl
        }
        showName
      }
      defaultStartingLocation {
        x
        y
      }
      borders {
        name
        id
        location {
          side
        }
        iconUrl
        riskIndex
      }
      imageMaxX
      imageMaxY
      pixelsPerSecond
      label
      probeLaunchRangeRadius
      addOnTraining
    }
    currentLocation {
      x
      y
    }
    coolantLevel
    heatLevel
    flightPaths {
      name
      id
      targetLocationId

      secondaryRouteOptions {
        targetLocationId
      }
      isBorder
      startOption {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOption {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOption {
        id
        name
        riskModifier
        imgUrl
      }
    }
    engineStatus
    hasEmergencyPower
    startingStartupTime
    remainingEta
    totalEta
    flightPathCoords {
      speed
      color
      x
      y
    }
    remainingStartupTime
    showEta
    showFlightSet
    currentFlightSet {
      id
      name
      backgroundImg
      startOptions {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOptions {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOptions {
        id
        name
        riskModifier
        imgUrl
      }
      pointsOfInterest {
        id
        name
        location {
          x
          y
        }
        isVisible
        isFogOfWar
        speedIndex
        riskIndex
        type {
          category
          imageUri
        }
        information {
          basicInformation
          hasBasicInformation
          detailedInformation
          hasDetailedInformation
          secretInformation
          hasSecretInformation
        }

        iconUrl
        fullImageUrl
        transitOptions {
          name
          timeModifier
          riskModifier
          iconUrl
        }
        showName
      }
      defaultStartingLocation {
        x
        y
      }
      borders {
        name
        id
        location {
          side
        }
        iconUrl
        riskIndex
      }
      imageMaxX
      imageMaxY
      pixelsPerSecond
      label
      probeLaunchRangeRadius
      addOnTraining
    }
    currentFlightPath {
      targetLocationId
      secondaryRouteOptions {
        targetLocationId
      }
      isBorder
      startOption {
        id
        name
        riskModifier
        imgUrl
        secondsForStartup
      }
      speedOption {
        id
        name
        speedModifier
        riskModifier
        requiresMaxEngines
        imgUrl
      }
      exitOption {
        id
        name
        riskModifier
        imgUrl
      }
    }
    currentLocationName
    currentLocationUrl
    probes {
      id
      name
      type
      equipment {
        id
        count
      }
    }
    flightSetPathMap
    probeAssignments
  }
}
`