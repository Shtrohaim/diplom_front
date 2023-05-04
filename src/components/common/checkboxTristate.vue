<template>
  <input
    type="checkbox"
    :class="{ 'checkbox--negative': modelValue === false, 'checkbox--positive': modelValue }"
    :value="modelValue"
    @change="onChange"
    class="checkbox"
  />
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'checkboxTristate',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Boolean,
      default: null
    }
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const onChange = () => {
      switch (modelValue.value) {
        case null:
          emit('update:modelValue', false)
          break
        case true:
          emit('update:modelValue', null)
          break
        case false:
          emit('update:modelValue', true)
          break
      }
    }
    return { onChange }
  }
})
</script>

<style lang="scss">
.checkbox {
  position: relative;

  width: 30px;
  height: 30px;

  margin-left: 10px;

  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;

  transition: 0.3s linear;

  border-radius: 4px;
  border: 3px solid $gray-light;

  background: transparent;

  @media (max-width: 769px) {
    width: 22px;
    height: 22px;
  }

  &::before,
  &::after {
    display: none;
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 20px;
    height: 3px;
    background-color: $white;
    border-radius: 4px;
    transition: 0.2s linear 0.2s;

    @media (max-width: 769px) {
      width: 16px;
      height: 2px;
    }
  }

  &::before {
    transform: translate(-50%, -100%) translateY(-12px);
  }

  &::after {
    transform: translate(-50%, 100%) translateY(12px);
  }

  &--negative {
    border: none;
    background: $red;

    &::before {
      display: inline;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
      display: inline;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  &--positive {
    border: none;
    background: $primary;
    transition: 0.2s linear 0.2s;

    &::before {
      display: inline;
      width: 10px;
      transform: translate(-50%, -50%) translate(-4px, 3px) rotate(45deg);

      @media (max-width: 769px) {
        width: 7px;
        transform: translate(-50%, -50%) translate(-3px, 2px) rotate(45deg);
      }
    }

    &::after {
      display: inline;
      width: 18px;
      transform: translate(-50%, -50%) translate(4px, 0) rotate(-45deg);

      @media (max-width: 769px) {
        width: 12px;
        transform: translate(-50%, -50%) translate(3px, 0) rotate(-45deg);
      }
    }
  }
}
</style>
