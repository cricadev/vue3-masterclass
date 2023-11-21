<script setup lang="ts">
import ThreadList from "@/components/ThreadList.vue"
import { useForumStore } from "@/stores/ForumStore"

const store = useForumStore()

const { findForumById, findCategoryThatMatchesForum, findThreadsThatMatchesForum } = store;

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const forum = findForumById(props.id);
const category = findCategoryThatMatchesForum(forum?.categoryId);
const threads = findThreadsThatMatchesForum(props.id);
</script>
<template lang="">
   <div class="">
     <div>
      <h1 class="mb-4 text-3xl font-bold">{{ forum.name }}</h1>
      <p class="mb-8 text-gray-500">{{ forum.description }}</p>
      <thread-list :threads="threads" :category="category"></thread-list>
      
      </div>
      <router-link :to="{
            name: 'ThreadCreate',
            params: { forumId: forum.id }
          }" class="">
            Start a thread
          </router-link>
   </div>
</template>

<style lang="">
  
</style>