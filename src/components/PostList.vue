<script setup lang="ts">
import { useUsersStore } from '@/stores/UsersStore';
import { usePostsStore } from '@/stores/PostsStore';
const { findUserById } = useUsersStore()

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>
<template lang="">
  <div>

    <a v-for="post in posts" :key="post.id"
      class="flex flex-col items-center gap-12 mx-auto my-4 transition-all bg-green-300 border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 even:bg-green-300 odd:bg-green-100">
      <!-- USER INFO -->
      <div class="flex flex-col">
        <a :href="`/user/${findUserById(post.userId).id}`">
          {{ findUserById(post.userId).name }}
        </a>
        <img class="object-cover rounded-t-lg w-96 h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
          :src="findUserById(post.userId).avatar" alt="" />
        
      </div> 
      <!-- POST CONTENT -->

      <div class="flex flex-col justify-between p-4 leading-normal">
        <p>{{ post?.text }}</p>
        
   
        <AppDate :timestamp="post.publishedAt"></AppDate>
   
      </div>

      <!-- post date -->

    </a>
  </div>
</template>

<style lang="">
  
</style>