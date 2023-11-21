import { ref, computed, onMounted } from "vue";
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import sourceData from "@/data.json"
import { useRoute } from 'vue-router'
export const usePostsStore = defineStore("PostsStore", () => {
  const posts = ref(sourceData.posts);
  const { findThreadById } = useThreadsStore()
  const createPost = (post: any) => {
    post.id = 'ggqq' + Math.random()
    post.publishedAt = Math.floor(Date.now() / 1000)
    post.threadId = 'tId' + Math.random()
    posts.value.push(post)
    appendPostToThread(post)
  }

  const appendPostToThread = async (post: any) => {
    console.log(post)
    const thread = await findThreadById(post.threadId)
    console.log(thread)
    thread.posts = thread.posts || []
    thread?.posts?.push(post.threadId)

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
