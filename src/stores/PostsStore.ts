import { ref, computed } from "vue";
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import { useUsersStore } from "./UsersStore";
import sourceData from "@/data.json"

export const usePostsStore = defineStore("PostsStore", () => {

  const posts = ref(sourceData.posts);
  const { authUser } = useUsersStore()
  const { findThreadById } = useThreadsStore()

  const createPost = (post: any) => {
    post.id = 'ggqq' + Math.random()
    post.publishedAt = Math.floor(Date.now() / 1000)
    posts.value.push(post)
    appendPostToThread(post)
  }

  const appendPostToThread = (post: any) => {
    const thread = findThreadById(post.threadId)
    thread?.posts.push(post.id)
  }

  return {
    posts,
    createPost,
  }
});
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(usePostsStore, import.meta.hot)
  );
}
