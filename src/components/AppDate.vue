
<script setup lang="ts">
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)
const differForHumans = () => {
  return dayjs.unix(props.timestamp).fromNow()
}
const humanFriendlyDate = () => {
  return dayjs.unix(props.timestamp).format("MMMM D, YYYY h:mm A")
}
const props = defineProps({
  timestamp: {
    type: Number,
    required: true
  }
})
</script>
<template lang="">
  <span class="text-sm text-gray-600 dark:text-gray-400" :title="humanFriendlyDate()"
        >
          {{ differForHumans() }}
</span>
</template>

<style lang="">
  
</style> 