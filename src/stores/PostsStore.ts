import { ref, computed, onMounted } from "vue";
import { defineStore, acceptHMRUpdate, storeToRefs } from "pinia";
import { useThreadsStore } from "./ThreadsStore"
import sourceData from "@/data.json"
import { useRoute } from 'vue-router'
import { makeAppendChildToParentMutation } from "@/helpers"

export const usePostsStore = defineStore("PostsStore", () => {

  const posts = ref(sourceData.posts);

  const { threads } = useThreadsStore()



  const appendPostToThread = makeAppendChildToParentMutation({ parent: threads, child: 'posts' });
  const appendContributorToThread = makeAppendChildToParentMutation({ parent: threads, child: 'contributors' });

  const createPost = (post: any) => {
    const id = 'ggqq' + Math.random()
    const publishedAt = Math.floor(Date.now() / 1000)
    post = { ...post, id, publishedAt }
    posts.value.push(post)
    appendPostToThread({ childId: post?.id, parentId: post?.threadId });
    appendContributorToThread({ childId: post?.userId, parentId: post?.threadId });
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
