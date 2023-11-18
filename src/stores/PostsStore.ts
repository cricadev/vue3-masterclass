import { ref, computed } from "vue";

import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import { useUsersStore } from "./UsersStore";
import sourceData from "@/data.json"

export const usePostsStore = defineStore("PostsStore", () => {
  const posts = ref(sourceData.posts);
  const { authUser } = useUsersStore()
  const createPost = (post: any) => {
    post.id = 'ggqq' + Math.random()
    post.publishedAt = Math.floor(Date.now() / 1000)
    posts.value.push(post)
    const { threads } = storeToRefs(useThreadsStore())
    const thread = threads.value.find(thread => thread.id === post.threadId)
    thread?.posts.push(post.id)
  }

  // const userPosts = computed(() => {
  //   return posts.value.filter(post => post.userId === authUser?.id)
  // })

  // const userPostsCount = computed(() => {
  //   return userPosts.value.length
  // })
  // const userThreads = computed(() => { 
  //   const { threads } = storeToRefs(useThreadsStore())
  //   return threads.value.filter(thread => thread.userId === authUser?.id)
  // })

  // const userThreadsCount = computed(() => {
  //   return userThreads.value.length
  // })
  return {
    posts,
    createPost,
    // userPosts,
    // userPostsCount,
    // userThreads,
    // userThreadsCount
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePostsStore, import.meta.hot)
  );
}
