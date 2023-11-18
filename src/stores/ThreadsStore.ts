import { ref, computed } from "vue";

import { defineStore, acceptHMRUpdate } from "pinia";
import { usePostsStore } from "./PostsStore";
import sourceData from "@/data.json"

export const useThreadsStore = defineStore("ThreadsStore", () => {
  const threads = ref(sourceData.threads);
  const { posts } = usePostsStore()


  const findThreadById = (id: string) => {
    return threads.value.find(thread => thread.id === id)
  }
  const findPostsThatMatchesThread = (id: string) => {
    return posts.filter(post => post.threadId === id)
  }

  const createThread = (thread: any) => {
    thread.id = 'ggqq' + Math.random()
    thread.publishedAt = Math.floor(Date.now() / 1000)
    threads.value.push(thread)
  }

  const appendPostToThread = (post: any) => {
    const thread = findThreadById(post.threadId)
    thread?.posts.push(post.id)
  }

  const appendThreadToForum = (thread: any) => {
    const forum = findForumById(thread.forumId)
    forum?.threads.push(thread.id)
  }

  

  return {
    threads,
    findThreadById,
    findPostsThatMatchesThread
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useThreadsStore, import.meta.hot)
  );
}
