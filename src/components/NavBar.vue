<template lang="">
  <div class="flex items-center justify-between p-4 bg-blue-500">
    <div class="flex items-center gap-4 links">
      <router-link class="text-white hover:text-gray-200" to="/">Home</router-link>
      <router-link class="text-white hover:text-gray-200" to="/category">Category</router-link>
      <router-link class="text-white hover:text-gray-200" to="/forum">Forum</router-link>
    </div>
    <router-link to="/profile" class="flex items-center space-x-3 user">
      <img class="w-8 h-8 rounded-full" :src="authUser.avatar" alt="User image">
      <span class="font-bold text-gray-900"> {{authUser.username}} </span>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </router-link>
 </div>
</template>
<script setup lang="ts">
import { useUsersStore } from '@/stores/UsersStore';

const { authUser } = useUsersStore()
</script>
<style lang="">
  
</style>