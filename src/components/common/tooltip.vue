<template>
  <div class="tooltip-container">
    <slot />
    <div class="tooltip-container__tooltip">
      <span class="tooltip-container__text">{{ text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VTooltip',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.tooltip-container {
  position: relative;
  cursor: help;

  text-decoration: underline dotted;
  text-underline-offset: 6px;

  &__tooltip {
    display: none;
    color: $white;
    text-align: center;
    padding: 10px;
    border-radius: 0 30px 0 30px;

    width: 250px;
    bottom: 100%;
    left: 0;

    font-size: 18px;

    transform: translateX(-100%);

    position: absolute;
    z-index: 1;

    background: $primary;
  }

  &:hover .tooltip-container__tooltip {
    display: inline-block;
  }

  &__text::after {
    content: ' ';
    position: absolute;
    top: 100%;
    right: 0;

    margin-left: -5px;

    border-width: 5px;
    border-style: solid;
    border-color: $primary $primary transparent transparent;
  }
}
</style>
