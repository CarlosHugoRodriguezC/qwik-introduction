// Generated by https://quicktype.io

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: null;
  results: SimplePokemon[];
}

export interface SimplePokemon {
  name: string;
  url: string;
}