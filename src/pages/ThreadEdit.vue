<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor :title="thread?.title" :text="text" @save="save" @cancel="cancel"></ThreadEditor>
  </div>
</template>
<script setup lang="ts">
import ThreadEditor from "@/components/ThreadEditor.vue";
import { computed, ref } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useForumStore } from "@/stores/ForumStore"
import { useThreadsStore } from "@/stores/ThreadsStore";
import { usePostsStore } from "@/stores/PostsStore";
import { storeToRefs } from "pinia";
const router = useRouter();
const route = useRoute()
const { createThread, findThreadById, updateThread } = useThreadsStore();
const { posts } = storeToRefs(usePostsStore())


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const thread = findThreadById(props.id)
const text = computed(() => {
  return posts.value.find((post) => post.id === thread?.posts[0])?.text
})

const cancel = () => {
  router.push({
    name: 'Forum',
    params: {
      id: props.forumId
    }
  })
}
const save = async ({ title, text }) => {
  const thread = await updateThread(
    {
      id: props.id,
      title: title,
      text: text,
    }
  )

  router.push({
    name: 'ThreadShow',
    params: {
      threadId: thread?.id
    }
  })




  // dispatch a vuex action
}

</script>