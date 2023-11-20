import { ref, computed, onMounted } from "vue";
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import sourceData from "@/data.json"
import { useRoute } from 'vue-router'
export const usePostsStore = defineStore("PostsStore", () => {
  const posts = ref(sourceData.posts);
  const { findThreadById } = useThreadsStore()
  console.log(window.location.pathname.split('/')[2])
  const createPost = (post: any) => {
    post.id = 'ggqq' + Math.random()
    post.publishedAt = Math.floor(Date.now() / 1000)
    post.threadId = window.location.pathname.split('/')[2]
    posts.value.push(post)
    appendPostToThread(post)
  }

  const appendPostToThread = (post: any) => {
    console.log(post.threadId)
    const thread = findThreadById(post.threadId)
    console.log(thread)

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
