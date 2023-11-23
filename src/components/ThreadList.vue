<script setup lang="ts">
import { useUsersStore } from "@/stores/UsersStore";
import { storeToRefs } from 'pinia'
const store = useUsersStore();

const { users } = storeToRefs(store);
const { findUserById } = store





const props = defineProps({
  threads: {
    type: Array,
    required: true
  },
  category: {
    type: Object,
    required: true
  }
})


</script>
<template>
  <div class="">
    <h2 class="p-5 text-2xl font-bold text-red-500 bg-red-100">{{ category.name }}</h2>
    <h2 class="p-5 text-2xl font-bold">Threads</h2>
    <div class="flex justify-between p-4 even:bg-green-100 odd:bg-green-200" v-for="thread in threads" :key="thread.id">


      <div class="flex flex-col gap-2">
        <p>
          <router-link :to="{
            name: 'ThreadShow',
            params: { threadId: thread.id }
          }" class="">
            {{ thread.title }}
          </router-link>
        </p>
        <p>
          By <a href="#" class="text-red-300">
            {{ findUserById(thread.userId).name }}
          </a>,
          <AppDate :timestamp="thread.publishedAt"></AppDate>
        </p>
      </div>

      <!-- activity -->
      <div class="flex gap-2 activity">
        <p>
          {{ thread?.repliesCount || 0 }}
        </p>
        <img :src="findUserById(thread.userId)?.avatar" alt="" class="object-cover w-8 h-8 rounded-full">
        <div>

          <p class="text-xs">
            <a href="">
              {{ findUserById(thread.userId).name }}

            </a>

          </p>
          <AppDate :timestamp="thread.publishedAt"></AppDate>


        </div>
      </div>
    </div>
  </div>
</template>
<style></style>      
