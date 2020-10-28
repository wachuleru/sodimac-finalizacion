import { API_V2, API_MONGO } from './constants';

//Pokemons
export const POKEMONS = `${API_V2}pokemon/`;

export const POKEMON_DETAIL = (pokemonName) => `${POKEMONS}${pokemonName}/`;


// Login


// Login
export const LOGIN = `${API_MONGO}user/login/`;

export const FAVORITES = `${API_MONGO}favorites/`;
//register
export const REGISTER = `${API_MONGO}user/`;





