import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from 'vue'

import sourceData from "@/data.json"

export const useForumStore = defineStore("ForumStore",()=>{
  const forums = ref(sourceData.forums);
  // getters
  // const categories = computed(() => {
  //   return state.value.categories
  // })

  // const threads = computed(() => {
  //   return state.value.threads
  // })

  // const users = computed(() => {
  //   return state.value.users
  // })

  // const posts = computed(() => {
  //   return state.value.posts
  // })

  // actions find 

  // const findThreadsThatMatchesForum = (id: string) => {
  //   return threads.value.filter(thread => thread.forumId === id)
  // }

  // const findCategoryById = (id: string) => {
  //   return categories.value.find(category => category.id === id)
  // }

  // const forumsThatMatchesCategory = (id: string) => {
  //   return forums.value.filter(forum => forum.categoryId === id)
  // }

  // const findForumById = (id: string) => {
  //   return forums.value.find(forum => forum.id === id)
  // }
  // const findCategoryThatMatchesForum = (id: string) => {
  //   return categories.value.find(category => category.id === id)
  // }

  // const findUserById = (id: string) => {
  //   return users.value.find(user => user.id === id)
  // }

return {
  forums
}
  
});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useForumStore, import.meta.hot)
  );
}
