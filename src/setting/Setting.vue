<template>
  <div class="w-[1000px]">
    <Columns v-model="columns" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Columns from "../columns/Columns.vue";
import { COLUMNS } from "../columns/data";

const columns = ref([...COLUMNS]);
</script>
