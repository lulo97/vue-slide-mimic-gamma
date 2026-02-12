<template>
  <GridLayout
    v-model:layout="layout"
    :col-num="colNum"
    :row-height="cellSize"
    :margin="[10, 10]"
    :is-draggable="true"
    :is-resizable="false"
    :vertical-compact="true"
    :prevent-collision="false"
    :use-css-transforms="true"
  >
    <GridItem
      v-for="(item, index) in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="1"
      :h="1"
      :i="item.i"
    >
      <!-- Preserve original content -->
      <component :is="slotChildren[index]" />
    </GridItem>
  </GridLayout>
</template>

<script setup lang="ts">
import { ref, useSlots, computed } from "vue"
import { GridLayout, GridItem } from "grid-layout-plus"

interface LayoutItem {
  x: number
  y: number
  w: number
  h: number
  i: string
}

const colNum = 4        // number of columns
const cellSize = 120    // square size (width auto from grid, height controlled here)

const slots = useSlots()

const slotChildren = computed(() => {
  return slots.default ? slots.default() : []
})

// Auto generate square grid positions
const layout = ref<LayoutItem[]>(
  slotChildren.value.map((_, index) => ({
    x: index % colNum,
    y: Math.floor(index / colNum),
    w: 1,
    h: 1,
    i: index.toString()
  }))
)
</script>
