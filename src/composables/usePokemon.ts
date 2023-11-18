import { ref, reactive } from 'vue';
export default function usePokemon() {
  const pokemonList = reactive([])
  const pokemon = ref(null)
  const baseURL = "https://pokeapi.co/api/v2/pokemon"
  const fetchAll = async () => {
    const response = await fetch(`${baseURL}?limit=10`)
    const data = await response.json()
    pokemonList.push(...data.results)
  }
  const fetchOne = async (name) => {
    const response = await fetch(`${baseURL}/${name}`)
    const data = await response.json()
    pokemon.value = data
  }
  return {
    pokemonList,
    fetchAll,
    fetchOne,
    pokemon
  }
}
