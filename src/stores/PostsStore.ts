import { ref, computed, onMounted } from "vue";
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import sourceData from "@/data.json"
import { useRoute } from 'vue-router'
export const usePostsStore = defineStore("PostsStore", () => {
  const posts = ref(sourceData.posts);
  const { findThreadById } = useThreadsStore()
  const createPost = (post: any) => {
    const id = 'ggqq' + Math.random()
    const publishedAt = Math.floor(Date.now() / 1000)
    post = { ...post, id, publishedAt }
    posts.value.push(post)
    appendPostToThread(post)
  }

  const appendPostToThread = async (post: any) => {
    const thread = await findThreadById(post.threadId)
    thread.posts = thread?.posts || []
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
