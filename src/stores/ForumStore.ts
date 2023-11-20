import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { ref, onMounted, computed } from 'vue'
import { useCategoriesStore } from "./CategoriesStore";
import { useThreadsStore } from "./ThreadsStore";
import sourceData from "@/data.json"

export const useForumStore = defineStore("ForumStore", () => {
  const forums = ref(sourceData.forums);
  const threads = ref(sourceData.threads);
  const threadsStore = useThreadsStore()
  const { categories } = useCategoriesStore()

  // actions find 

  const findThreadsThatMatchesForum = (id: string) => {
    return threads.value.filter(thread => thread.forumId === id)
  }

  const findCategoryById = (id: string) => {
    return categories.find(category => category.id === id)
  }

  const forumsThatMatchesCategory = (id: string) => {
    return forums.value.filter(forum => forum.categoryId === id)
  }

  const findForumById = (id: string) => {
    return forums.value.find(forum => forum.id === id)
  }
  const findCategoryThatMatchesForum = (id: string) => {
    return categories.find(category => category.id === id)
  }


  return {
    forums,
    threads,
    forumsThatMatchesCategory,
    findCategoryById,
    findForumById,
    findCategoryThatMatchesForum,
    findThreadsThatMatchesForum
  }

});

if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useForumStore, import.meta.hot)
  );
}
