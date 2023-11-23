import { ref, computed } from "vue";

import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { usePostsStore } from "./PostsStore";
import { useUsersStore } from "./UsersStore";
import type { Thread } from "../../types/index"
import { useForumStore } from "./ForumStore"
import sourceData from "@/data.json"
import { findById, makeAppendChildToParentMutation } from "@/helpers"
export const useThreadsStore = defineStore("ThreadsStore", () => {

  const threads = ref(sourceData.threads);
  const postsStore = usePostsStore();
  const { posts } = postsStore;

  const usersStore = useUsersStore()
  const { authId } = storeToRefs(usersStore)
  const { findUserById } = usersStore;
  const { forums } = useForumStore();
  const { users } = usersStore

  const findThreadById = (id: string) => {
    return findById(threads.value, id)
  }
  const getThread = computed(() => (id: string) => {
    const thread = findThreadById(id);
    return {
      ...thread,
      get author() {
        return usersStore.findUserById(thread?.userId)

      },
      get repliesCount() {
        return thread?.posts.length - 1
      },
      get contributorsCount() {
        return thread?.contributors.length
      }
    }
  })


  const findPostsThatMatchesThread = (id: string) => {
    return posts.filter(post => post.threadId === id)
  }
  const appendThreadToForum = makeAppendChildToParentMutation({ parent: forums, child: 'threads' });
  const appendThreadToUser = makeAppendChildToParentMutation({ parent: users, child: 'threads' });

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
      appendThreadToUser({ childId: thread.id, parentId: thread.userId })
      // add thread to the forum
      appendThreadToForum({ childId: thread.id, parentId: thread.forumId })

      // create the post
      const post = {
        threadId: id,
        userId: userId,
        text: text,
      }
      createPost(post)
      return findById(threads.value, id)
    }
    catch (error) {
      console.error(error)
    }
  }

  const updateThread = async ({ id, text, title }) => {
    const { posts } = postsStore;

    try {

      // Find the thread
      const threadIndex = threads?.value.findIndex(thread => thread.id === id)
      if (threadIndex === -1) {
        throw new Error('Thread not found')
      }


      // Update thread properties
      threads.value[threadIndex] = {
        ...threads?.value[threadIndex],
        title
      }

      // Find the post
      const postIndex = posts.findIndex(post => post.threadId === id)
      if (postIndex === -1) {
        throw new Error('Post not found')
      }
      // Update post properties
      posts[postIndex] = {
        ...posts[postIndex],
        text
      }
    }
    catch (error) {
      console.error(error)
    }
  }



  return {
    threads,
    getThread,
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
