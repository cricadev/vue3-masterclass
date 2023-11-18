<script setup lang="ts">

import CategoryList from "@/components/CategoryList.vue"
import { useForumStore } from "@/stores/ForumStore"

const store = useForumStore()

const { findCategoryById, forumsThatMatchesCategory } = store;


const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const category = findCategoryById(props.id);



</script>
<template>
  <div class="p-32" v-if="category">
    <h1 class="mb-4 text-3xl font-bold">{{ category.name }}</h1>
    <category-list :categories="forumsThatMatchesCategory(id)"></category-list>

  </div>
  <div class="text-5xl font-bold text-center" v-else>
    NOT FOUND CATEGORY DOESN'T EXIST
    <router-link to="/" class="block my-4 text-green-500">Go Home</router-link>
  </div>
</template>
<style></style>
