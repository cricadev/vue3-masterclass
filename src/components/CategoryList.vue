<script setup lang="ts">
import ForumList from "@/components/ForumList.vue"

import { ref, computed } from 'vue';
import { useForumStore } from "@/stores/ForumStore"
import { storeToRefs } from 'pinia'
const { forums } = storeToRefs(useForumStore());

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})
console.log(forums, 'forums')

console.log(props.categories, 'props.categories')

</script>
<template lang="">
  <div>
    <!--CATEGORY CONTAINER-->
    <forum-list  v-for="category in categories"  :key="category.id" :forums="forums.filter((forum) => forum.categoryId === category.id)" :title="category.name" :category-id="category.id"></forum-list>
  </div>
 
</template>

<style lang="">
  
</style>