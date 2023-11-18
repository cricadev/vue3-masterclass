<template>
  <div class="profile-card">
    <p class="text-center">
      <img :src="user.avatar" :alt="`${user.name} profile picture`" class="avatar-xlarge" />
    </p>

    <h1 class="title">{{ user.username }}</h1>

    <p class="text-lead">{{ user.name }}</p>

    <p class="text-justify">{{ user.bio || "No bio specified." }}</p>

    <span class="online">{{ user.username }} is online</span>

    <div class="stats">
      <span>{{ user.postsCount }} posts</span>
      <span>{{ user.threadsCount }} threads</span>
    </div>

    <hr />

    <p v-if="user.website" class="text-center text-large">
      <i class="fa fa-globe"></i>
      <a :href="user.website">{{ user.website }}</a>
    </p>

    <router-link :to="`/profile/edit`" class="btn-blue">Edit Profile</router-link>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue"
const props = defineProps({
  user: {
    type: Object,
    required: true
  }

})
watch(() => props.user, () => {
  console.log(props.user)
})
</script>