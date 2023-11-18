<script setup lang="ts">
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { useThreadsStore } from '@/stores/ThreadsStore';
import { usePostsStore } from '@/stores/PostsStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const props = defineProps({
  threadId: {
    type: String,
    required: true
  }
})


const { threads } = storeToRefs(threadsStore);
const { findThreadById } = threadsStore

const thread = findThreadById(props.threadId);
const threadPosts = computed(() => postsStore.posts.filter((post) => post.threadId === props.threadId))




const submitNewPost = (eventData) => {
  const post = {
    ...eventData,
    threadId: props.threadId
  }
  postsStore.createPost(post)
}

</script>
<template>
  <div v-if="thread" class="p-32">

    <h2 class="text-5xl font-bold text-center">
      {{ thread.title }}
    </h2>
    <!-- USER CONTAINER -->
    <post-list :posts="threadPosts"></post-list>
    <!-- POST EDIT -->
    <post-editor @save="submitNewPost"></post-editor>
  </div>
</template>
<style></style>
