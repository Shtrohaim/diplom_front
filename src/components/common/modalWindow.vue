<template>
  <teleport to="body">
    <div class="modal" v-show="show" @click="closeModal">
      <div class="modal__card" @click.stop>
        <span class="modal__close" @click="closeModal"></span>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'ModalWindow',
  props: {
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeModal'],
  setup(props, { emit }) {
    const show = ref(false)
    const closeModal = () => {
      emit('closeModal')
    }

    watch(
      () => props.modalShow,
      (modalShow) => {
        show.value = modalShow
      }
    )

    return { show, closeModal }
  }
})
</script>

<style scoped lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;

  width: 100%;
  height: 100vh;

  background: rgba(0 0 0 / 60%);
  overflow: hidden;

  z-index: 9999;

  &__card {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    min-height: 200px;
    max-height: 800px;

    padding: 35px 5px 5px;

    border-radius: 10px;

    background: $primary;
  }

  &__close {
    position: absolute;
    right: 10px;
    top: 12px;
    width: 10px;
    height: 10px;

    cursor: pointer;

    &:before,
    &:after {
      position: absolute;
      content: ' ';
      height: 16px;
      width: 2px;
      background-color: $white;
    }
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
}
</style>
