<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forum.name }}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel"></ThreadEditor>
  </div>
</template>
<script setup lang="ts">
import ThreadEditor from "@/components/ThreadEditor.vue";
import { ref } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useForumStore } from "@/stores/ForumStore"
import { useThreadsStore } from "@/stores/ThreadsStore";
const router = useRouter();
const route = useRoute()
const { createThread } = useThreadsStore();

const { findForumById } = useForumStore();

const props = defineProps({
  forumId: {
    type: String,
    required: true
  }
})
const forum = findForumById(props.forumId);

const cancel = () => {
  router.push({
    name: 'Forum',
    params: {
      id: props.forumId
    }
  })
}
const save = async ({ title, text }) => {
  const thread = await createThread(
    {
      title: title,
      text: text,
      forumId: props.forumId
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