<template lang="">
  <div>
 
    <div v-for="poke in pokemonList" :key="poke.name">
      <router-link class="text-5xl" :to="`/pokemon/${poke.name}`">
      {{ poke?.name }}
      </router-link>

    </div>
    <input type="text" v-model="newPokemon">
    <button @click="addPokemon(newPokemon)" class="m-4 border-2 border-blue-400">Add Pokemon</button>
    <button @click="removeWatcher"  class="m-4 border-2 border-blue-400">remove watcher</button>
    <h2 v-if="pokemonEntered" class="text-3xl text-red-600">
      {{newPokemonAdded}}
      
    </h2>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue';
import usePokemon from '@/composables/usePokemon.ts';
const pokemon = ref(null);
const newPokemon = ref('');
const pokemonEntered = ref(false);

const { pokemonList, fetchAll } = usePokemon();
fetchAll();



const newPokemonAdded = computed(() => {
  return pokemonEntered.value ? newPokemon.value + ' was added' : 'No Pokemon Entered'
})

const addPokemon = (name: string) => {
  pokemonEntered.value = true;
  pokemonList.push({ name })

}
watch(() => [...pokemonList], (newValue, oldValue) => {
  console.log(newValue, oldValue)
  if (newValue) {
    setTimeout(() => {
      pokemonEntered.value = false;
      newPokemon.value = '';
    }, 1000)
  }
})

// exposing and using this function in the template will remove the watcher 
const removeWatcher = watch(pokemonList, (newValue, oldValue) => {
  console.log(newValue, oldValue)
})


</script>
<style lang="">
  
</style>