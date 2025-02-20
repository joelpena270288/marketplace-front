<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-card-section>
      <p>{{ content }}</p>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
export default {
  name: 'VisionComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
}
</script>
