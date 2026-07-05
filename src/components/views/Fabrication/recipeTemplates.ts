import {Fabrication_Category} from "generated/graphql";

// Starter packs for the Fabrication system. Applying a pack adds its recipes
// to the simulator and seeds the component cargo into a room the configurer
// chooses, so a ship can be fabrication-ready in one click.

export interface TemplateCargo {
  name: string;
  count: number;
  metadata?: {
    type?: string;
    description?: string;
    science?: boolean;
    defense?: boolean;
    warheadType?: string;
  };
}

export interface TemplateRecipe {
  name: string;
  description: string;
  category: Fabrication_Category;
  inputs: {name: string; count: number; consumed?: boolean}[];
  output: {
    name: string;
    count: number;
    metadata?: {
      type?: string;
      description?: string;
      science?: boolean;
      defense?: boolean;
      warheadType?: string;
    };
  };
  duration: number;
  secret?: boolean;
  hint?: string;
  nearMiss?: boolean;
}

export interface RecipeTemplatePack {
  id: string;
  name: string;
  description: string;
  cargo: TemplateCargo[];
  recipes: TemplateRecipe[];
}

export const recipeTemplatePacks: RecipeTemplatePack[] = [
  {
    id: "repair-essentials",
    name: "Repair Essentials",
    description:
      "Hull patches, couplings, shield boosters, and circuit boards for damage control. Includes secret shield-surge and forcefield schematics.",
    cargo: [
      {name: "Duranium Plate", count: 12},
      {name: "Optical Cable", count: 12},
      {name: "Plasma Conduit", count: 12},
      {name: "Isolinear Chip", count: 10},
      {name: "Coolant Cell", count: 8},
      {
        name: "Micro-Welder",
        count: 2,
        metadata: {description: "A precision fusion tool. Not consumed by fabrication."},
      },
    ],
    recipes: [
      {
        name: "Hull Patch Kit",
        description: "A pre-formed duranium patch for sealing hull breaches.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Duranium Plate", count: 2},
          {name: "Micro-Welder", count: 1, consumed: false},
        ],
        output: {
          name: "Hull Patch Kit",
          count: 1,
          metadata: {type: "repair", description: "Seals small hull breaches."},
        },
        duration: 45,
      },
      {
        name: "EPS Coupling",
        description: "Replacement coupling for the electro-plasma system.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Plasma Conduit", count: 1},
          {name: "Optical Cable", count: 1},
        ],
        output: {
          name: "EPS Coupling",
          count: 1,
          metadata: {type: "repair", description: "Restores plasma flow to damaged systems."},
        },
        duration: 30,
      },
      {
        name: "Circuit Board",
        description: "General-purpose isolinear circuit board.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Isolinear Chip", count: 2},
          {name: "Optical Cable", count: 1},
        ],
        output: {
          name: "Circuit Board",
          count: 1,
          metadata: {type: "repair", description: "Replaces burned-out control circuitry."},
        },
        duration: 30,
      },
      {
        name: "Coolant Flush Canister",
        description:
          "Pressurized canister that refills the ship's coolant tank by 10%.",
        category: Fabrication_Category.Repair,
        inputs: [{name: "Coolant Cell", count: 2}],
        output: {
          name: "Coolant Flush Canister",
          count: 1,
          metadata: {type: "coolant", description: "Refills the coolant tank."},
        },
        duration: 20,
      },
      {
        name: "Shield Booster Cell",
        description:
          "A charged cell that restores the weakest shield by 10%.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Plasma Conduit", count: 1},
          {name: "Isolinear Chip", count: 1},
        ],
        output: {
          name: "Shield Booster Cell",
          count: 1,
          metadata: {
            type: "shieldBoost",
            description: "Restores shield integrity.",
          },
        },
        duration: 30,
      },
      {
        name: "Shield Surge Matrix",
        description:
          "An overcharged booster array that restores 30% shield integrity in one cycle.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Plasma Conduit", count: 2},
          {name: "Isolinear Chip", count: 1},
          {name: "Coolant Cell", count: 1},
        ],
        output: {
          name: "Shield Booster Cell",
          count: 3,
          metadata: {
            type: "shieldBoost",
            description: "Restores shield integrity.",
          },
        },
        duration: 75,
        secret: true,
        hint: "Overcharge a booster cell with an extra conduit — and keep it cool.",
        nearMiss: true,
      },
      {
        name: "Emergency Forcefield Emitter",
        description:
          "A portable emitter that can seal a corridor with a level-3 forcefield.",
        category: Fabrication_Category.Repair,
        inputs: [
          {name: "Circuit Board", count: 1},
          {name: "EPS Coupling", count: 1},
          {name: "Duranium Plate", count: 1},
        ],
        output: {
          name: "Emergency Forcefield Emitter",
          count: 1,
          metadata: {description: "Projects a temporary structural forcefield."},
        },
        duration: 90,
        secret: true,
        hint: "Two fabricated components, reinforced with raw plating.",
        nearMiss: true,
      },
    ],
  },
  {
    id: "weapons-lab",
    name: "Weapons Lab",
    description:
      "Torpedo assembly and security ordnance — photon and quantum torpedos plus secret EMP and tricobalt variants.",
    cargo: [
      {name: "Torpedo Casing", count: 10},
      {name: "Photon Warhead", count: 8},
      {name: "Quantum Charge", count: 6},
      {name: "Guidance Module", count: 10},
      {name: "Explosive Compound", count: 16},
      {name: "Steel Casing", count: 10},
      {name: "Power Cell", count: 10},
    ],
    recipes: [
      {
        name: "Photon Torpedo",
        description: "Standard ship-to-ship photon torpedo.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Torpedo Casing", count: 1},
          {name: "Photon Warhead", count: 1},
          {name: "Guidance Module", count: 1},
        ],
        output: {
          name: "Photon Torpedo",
          count: 1,
          metadata: {
            type: "torpedo",
            warheadType: "photon",
            description: "Standard photon torpedo. Loads into the launcher.",
          },
        },
        duration: 60,
      },
      {
        name: "Quantum Torpedo",
        description:
          "A zero-point energy torpedo with a heavier punch than a photon.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Torpedo Casing", count: 1},
          {name: "Quantum Charge", count: 1},
          {name: "Guidance Module", count: 1},
        ],
        output: {
          name: "Quantum Torpedo",
          count: 1,
          metadata: {
            type: "torpedo",
            warheadType: "quantum",
            description: "Quantum torpedo. Loads into the launcher.",
          },
        },
        duration: 75,
      },
      {
        name: "Stun Grenade",
        description: "Non-lethal crowd control for security teams.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Steel Casing", count: 1},
          {name: "Power Cell", count: 1},
        ],
        output: {
          name: "Stun Grenade",
          count: 2,
          metadata: {description: "Non-lethal stun device."},
        },
        duration: 30,
      },
      {
        name: "Breaching Charge",
        description: "Shaped charge for cutting through bulkheads.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Explosive Compound", count: 2},
          {name: "Steel Casing", count: 1},
        ],
        output: {
          name: "Breaching Charge",
          count: 1,
          metadata: {description: "Cuts through sealed bulkheads and doors."},
        },
        duration: 45,
      },
      {
        name: "EMP Torpedo",
        description:
          "Disables enemy systems without structural damage. Ideal for capture operations.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Torpedo Casing", count: 1},
          {name: "Power Cell", count: 2},
          {name: "Guidance Module", count: 1},
        ],
        output: {
          name: "EMP Torpedo",
          count: 1,
          metadata: {
            type: "torpedo",
            warheadType: "other",
            description:
              "Disables systems without destroying them. Loads into the launcher.",
          },
        },
        duration: 75,
        secret: true,
        hint: "A torpedo that disables rather than destroys — replace the warhead with raw energy.",
        nearMiss: true,
      },
      {
        name: "Tricobalt Torpedo",
        description:
          "A subspace-shockwave device packing triple the standard explosive yield. Not exactly regulation.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Torpedo Casing", count: 1},
          {name: "Explosive Compound", count: 3},
          {name: "Guidance Module", count: 1},
        ],
        output: {
          name: "Tricobalt Torpedo",
          count: 1,
          metadata: {
            type: "torpedo",
            warheadType: "other",
            description:
              "High-yield tricobalt device. Loads into the launcher.",
          },
        },
        duration: 90,
        secret: true,
        hint: "Pack a casing with far more explosive than regulations allow — and give it somewhere to go.",
        nearMiss: true,
      },
    ],
  },
  {
    id: "salvage-reclamation",
    name: "Salvage Reclamation",
    description:
      "Refine salvage into countermeasure materials and railgun ammunition — both feed directly into their systems. Includes a secret mass-production process.",
    cargo: [
      {name: "Scrap Metal", count: 20},
      {name: "Raw Ore", count: 16},
      {name: "Salvaged Electronics", count: 12},
      {name: "Chemical Sludge", count: 12},
      {
        name: "Refinery Catalyst",
        count: 1,
        metadata: {
          description: "Accelerates ore refinement. Not consumed by fabrication.",
        },
      },
    ],
    recipes: [
      {
        name: "Refine Copper",
        description: "Smelts salvaged ore into countermeasure-grade copper.",
        category: Fabrication_Category.Science,
        inputs: [
          {name: "Raw Ore", count: 2},
          {name: "Refinery Catalyst", count: 1, consumed: false},
        ],
        output: {
          name: "Copper",
          count: 2,
          metadata: {type: "countermeasureMaterial"},
        },
        duration: 20,
      },
      {
        name: "Refine Titanium",
        description: "Reclaims titanium from structural scrap.",
        category: Fabrication_Category.Science,
        inputs: [
          {name: "Scrap Metal", count: 2},
          {name: "Refinery Catalyst", count: 1, consumed: false},
        ],
        output: {
          name: "Titanium",
          count: 1,
          metadata: {type: "countermeasureMaterial"},
        },
        duration: 30,
      },
      {
        name: "Extract Carbon",
        description: "Extracts carbon from chemical waste.",
        category: Fabrication_Category.Science,
        inputs: [{name: "Chemical Sludge", count: 1}],
        output: {
          name: "Carbon",
          count: 2,
          metadata: {type: "countermeasureMaterial"},
        },
        duration: 20,
      },
      {
        name: "Polymerize Plastic",
        description: "Converts chemical sludge into usable polymer stock.",
        category: Fabrication_Category.Science,
        inputs: [{name: "Chemical Sludge", count: 2}],
        output: {
          name: "Plastic",
          count: 2,
          metadata: {type: "countermeasureMaterial"},
        },
        duration: 20,
      },
      {
        name: "Condense Plasma",
        description: "Charges reclaimed electronics into plasma cells.",
        category: Fabrication_Category.Science,
        inputs: [
          {name: "Salvaged Electronics", count: 1},
          {name: "Chemical Sludge", count: 1},
        ],
        output: {
          name: "Plasma",
          count: 1,
          metadata: {type: "countermeasureMaterial"},
        },
        duration: 40,
      },
      {
        name: "Railgun Slugs",
        description: "Presses scrap metal into railgun slugs.",
        category: Fabrication_Category.Weapon,
        inputs: [{name: "Scrap Metal", count: 2}],
        output: {
          name: "Railgun Slugs",
          count: 10,
          metadata: {type: "railgunAmmo"},
        },
        duration: 30,
      },
      {
        name: "Munitions Surge",
        description:
          "A high-yield pressing run that floods the railgun magazine.",
        category: Fabrication_Category.Weapon,
        inputs: [
          {name: "Scrap Metal", count: 2},
          {name: "Raw Ore", count: 2},
          {name: "Salvaged Electronics", count: 1},
        ],
        output: {
          name: "Railgun Slugs",
          count: 40,
          metadata: {type: "railgunAmmo"},
        },
        duration: 90,
        secret: true,
        hint: "A richer mix of salvage could keep the press running much longer.",
        nearMiss: true,
      },
    ],
  },
  {
    id: "medical-supplies",
    name: "Medical Supplies",
    description:
      "Field medical fabrication for sickbay and away teams. Includes a secret experimental serum.",
    cargo: [
      {name: "Biogel", count: 12},
      {name: "Sterile Casing", count: 10},
      {name: "Stimulant Compound", count: 8},
      {name: "Herbal Extract", count: 8},
    ],
    recipes: [
      {
        name: "Medkit",
        description: "Standard field medical kit.",
        category: Fabrication_Category.Misc,
        inputs: [
          {name: "Biogel", count: 1},
          {name: "Sterile Casing", count: 1},
        ],
        output: {
          name: "Medkit",
          count: 1,
          metadata: {description: "Treats common injuries in the field."},
        },
        duration: 30,
      },
      {
        name: "Stim Pack",
        description: "Emergency stimulant injector.",
        category: Fabrication_Category.Misc,
        inputs: [
          {name: "Stimulant Compound", count: 1},
          {name: "Sterile Casing", count: 1},
        ],
        output: {
          name: "Stim Pack",
          count: 1,
          metadata: {description: "Keeps an injured crew member on their feet."},
        },
        duration: 30,
      },
      {
        name: "Antidote",
        description: "Broad-spectrum antitoxin.",
        category: Fabrication_Category.Misc,
        inputs: [
          {name: "Herbal Extract", count: 1},
          {name: "Biogel", count: 1},
        ],
        output: {
          name: "Antidote",
          count: 1,
          metadata: {description: "Counteracts most known toxins."},
        },
        duration: 40,
      },
      {
        name: "Miracle Serum",
        description:
          "An experimental compound rumored to bring patients back from the brink.",
        category: Fabrication_Category.Misc,
        inputs: [
          {name: "Stimulant Compound", count: 1},
          {name: "Herbal Extract", count: 1},
          {name: "Biogel", count: 1},
        ],
        output: {
          name: "Miracle Serum",
          count: 1,
          metadata: {description: "Stabilizes even critical patients instantly."},
        },
        duration: 120,
        secret: true,
        hint: "Three ingredients from the medical stores, blended together.",
        nearMiss: true,
      },
    ],
  },
];
