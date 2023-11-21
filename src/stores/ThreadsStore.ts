import { ref, computed } from "vue";

import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { usePostsStore } from "./PostsStore";
import { useUsersStore } from "./UsersStore";
import type { Thread } from "../../types/index"
import { useForumStore } from "./ForumStore"
import sourceData from "@/data.json"

export const useThreadsStore = defineStore("ThreadsStore", () => {
  const threads = ref(sourceData.threads);
  const postsStore = usePostsStore();
  const { posts } = storeToRefs(postsStore)

  const usersStore = useUsersStore()
  const { authId } = storeToRefs(usersStore)
  const { findUserById } = usersStore;
  const { findForumById } = useForumStore();

  const findThreadById = (id: string) => {
    return threads.value.find(thread => thread.id === id)
  }
  const findPostsThatMatchesThread = (id: string) => {
    return posts.value.filter(post => post.threadId === id)
  }

  const createThread = async ({ text, title, forumId }) => {
    const { createPost } = postsStore

    try {
      const id = 'ggqq' + Math.random()
      const userId = authId.value
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = {
        forumId, title, publishedAt, text, userId, id, posts: []
      }
      // ad thread to the threads
      threads.value.push(thread)
      // add thread to the user
      const user = findUserById(userId)
      user.threads = user.threads || []
      user.threads.push(id)

      // add thread to the forum

      const forum = findForumById(forumId)
      forum.threads = forum.threads || []
      forum.threads.push(id)

      // create the post
      const post = {
        threadId: id,
        userId: userId,
        text: text,
      }
      createPost(post)
      return threads.value.find(thread => thread.id === id)
    }
    catch (error) {
      console.error(error)
    }
  }

  const updateThread = async ({ id, text, title }) => {
    try {
      console.log(id, text, title)
      // Find the thread
      const threadIndex = threads.value.findIndex(thread => thread.id === id)
      if (threadIndex === -1) {
        throw new Error('Thread not found')
      }

      // Update thread properties
      threads.value[threadIndex] = {
        ...threads?.value[threadIndex],
        title
      }

      // Find the post
      const postIndex = posts.value.findIndex(post => post.threadId === id)
      if (postIndex === -1) {
        throw new Error('Post not found')
      }

      // Update post properties
      posts.value[postIndex] = {
        ...posts.value[postIndex],
        text
      }
    }
    catch (error) {
      console.error(error)
    }
  }



  return {
    threads,
    findThreadById,
    findPostsThatMatchesThread,
    createThread,
    updateThread
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useThreadsStore, import.meta.hot)
  );
}
