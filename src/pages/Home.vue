<script setup lang="ts">

import CategoryList from "@/components/CategoryList.vue"
import { ref, provide } from 'vue';
import { storeToRefs } from "pinia";
import { useCategoriesStore } from "@/stores/CategoriesStore"

const { categories } = storeToRefs(useCategoriesStore())

</script>
<template>
  <div class="p-32">

    <category-list :categories="categories"></category-list>
  </div>
</template>
<style></style>
