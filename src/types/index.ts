interface People {
  name: string;
  birth_year?: string;
  eye_color?: string;
  gender: Gender | Unknown;
  hair_color?: string;
  height: string;
  mass?: string;
  skin_color?: string;
  homeworld?: string;
  films?: Film[];
  species?: Species[];
  starships?: Starship[];
  vehicles?: Vehicle[];
  url?: string;
  created?: string;
  edited?: string;
}

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  species: Species[];
  starships: Starship[];
  vehicles: Vehicle[];
  characters: People[];
  planets: Planet[];
  url: string;
  created: string;
  edited: string;
}

interface Starship {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  films: Film[];
  pilots: People[];
  url: string;
  created: string;
  edited: string;
}

interface Vehicle {
  name: string;
  model: string;
  vehicle_class: string;
  manufacturer: string;
  length: string;
  cost_in_credits: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  cargo_capacity: string;
  consumables: string;
  films: Film[];
  pilots: People[];
  url: string;
  created: string;
  edited: string;
}

interface Species {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  homeworld: string;
  people: People[];
  films: Film[];
  url: string;
  created: string;
  edited: string;
}

interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: People[];
  films: Film[];
  url: string;
  created: string;
  edited: string;
}

interface CharacterByGender {
  gender: string;
  characters: CharacterInfo[];
}

interface CharacterInfo {
  name: string;
  height: number;
  gender?: Gender | Unknown;
}

type Gender = "male" | "female";

type Unknown = "unknown" | "none" | "n/a";

export type {
  CharacterByGender,
  CharacterInfo,
  Film,
  Gender,
  People,
  Planet,
  Species,
  Starship,
  Unknown,
  Vehicle,
};
