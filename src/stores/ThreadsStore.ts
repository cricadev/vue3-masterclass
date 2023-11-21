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
        userId: userId,
        text: thread.title
      }
      createPost(post)
      console.log(threads.value.find(thread => thread.id === id))
    }
    catch (error) {
      console.error(error)
    }
  }





  return {
    threads,
    findThreadById,
    findPostsThatMatchesThread,
    createThread
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useThreadsStore, import.meta.hot)
  );
}
