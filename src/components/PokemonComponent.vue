<template lang="">
  <div>
    <div class="p-32" v-if="pokemon">
      <h1 class="mb-4 text-3xl font-bold">{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="">
      <img :src="pokemon.sprites.back_default" alt="">
      <img :src="pokemon.sprites.front_shiny" alt="">
      <img :src="pokemon.sprites.back_shiny" alt="">
    </div>
    <div class="text-5xl font-bold text-center" v-else>
      NOT FOUND POKEMON DOESN'T EXIST
      <router-link to="/" class="block my-4 text-green-500">Go Home</router-link>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch, computed, onMounted } from 'vue';
import usePokemon from '@/composables/usePokemon.ts';
import {useRoute} from 'vue-router'
const { fetchOne, pokemon } = usePokemon();
const route = useRoute();


fetchOne(route.params.id)

</script>
<style lang="">
  
</style>