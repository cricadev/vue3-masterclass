<template>
  <div>
    <router-link :to="`/categories/${categoryId}`" class="my-4 rounded-lg even:bg-green-200 odd:bg-green-100">
      <h2 class="p-4 mb-4 text-4xl text-red-500 bg-red-100">
        {{ title }}
      </h2>
    </router-link>

    <div v-for="forum in forums" :key="forum.id" class="relative p-4">



      <router-link class="text-2xl font-bold transition-all -top-2 hover:animate-bounce"
        :to="{ name: 'Forum', params: { id: forum.id } }">{{
          forum.name
        }}</router-link>


      <p class="mb-4 text-gray-500">{{ forum.description }}</p>

      <div class="threads-count">
        <p class="mb-4 text-gray-500">{{ forum.threads?.length }}
          {{
            forum.threads?.length > 0 ? 'thread' : 'no threads'
          }}
        </p>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">



defineProps({
  forums: {
    type: Array,
    required: true
  }
  ,
  title: {
    type: Array,
    required: true
  },
  categoryId: {
    type: String,
    required: false
  }
})
</script>