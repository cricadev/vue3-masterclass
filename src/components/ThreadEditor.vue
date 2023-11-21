<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title" />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea v-model="form.text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ existing ? 'update' : 'publish' }}
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from "vue"
const props = defineProps(
  {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
)
const existing = computed(() => {
  return !!props.title
})
const form = reactive({
  title: props.title,
  text: props.text
})

const emit = defineEmits(['save', 'cancel', 'update:title', 'update:text'])

const save = () => {
  emit('save', { ...form })
}
const cancel = () => {
  emit('cancel')
}

</script>