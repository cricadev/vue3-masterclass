<script setup lang="ts">
import PostList from '@/components/PostList.vue'
import PostEditor from '@/components/PostEditor.vue'
import { useThreadsStore } from '@/stores/ThreadsStore';
import { usePostsStore } from '@/stores/PostsStore';
import { useUsersStore } from '@/stores/UsersStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const threadsStore = useThreadsStore()
const postsStore = usePostsStore()
const usersStore = useUsersStore()
const props = defineProps({
  threadId: {
    type: String,
    required: true
  }
})


const { threads } = storeToRefs(threadsStore);
const { findThreadById } = threadsStore

let thread = findThreadById(props.threadId);

thread = ({
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
})

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
      <router-link :to="{
        name: 'ThreadEdit', params: {
          id: props.threadId,
        }
      }" class="btn">
        Edit Thread
      </router-link>
    </h2>
    <p>
      By <a href="#" class="link-unstyled">{{ thread.author.name }}</a>,
      <AppDate :timestamp="thread.publishedAt" />.
      <span style="float:right; margin-top: 2px;" class="hide-mobile text-faded text-small">{{ thread.repliesCount }}
        replies by {{ thread.contributorsCount }} contributors</span>
    </p>
    <!-- USER CONTAINER -->
    <post-list :posts="threadPosts"></post-list>
    <!-- POST EDIT -->
    <post-editor @save="submitNewPost"></post-editor>
  </div>
</template>
<style scoped>
.btn {
  @apply bg-green-100 p-3 block;
}
</style>
