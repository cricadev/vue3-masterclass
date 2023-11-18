<script setup lang="ts">
import { useUsersStore } from '@/stores/UsersStore';

import PostList from '@/components/PostList.vue';
import UserProfileCard from '@/components/UserProfileCard.vue';
import userProfileCardEditor from '@/components/UserProfileCardEditor.vue';
const { authUser: user } = useUsersStore();

defineProps({
  edit: {
    type: Boolean,
    default: false
  }
})

</script>
<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">

        <user-profile-card v-if="!edit" :user="user" />
        <user-profile-card-editor v-else :user="user" />

      </div>
      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user?.username }} recent activity </span>
          <a href="#">See only started threads?</a>
        </div>
        <hr />
        <PostList :posts="user?.posts" />
      </div>
    </div>
  </div>
</template>
