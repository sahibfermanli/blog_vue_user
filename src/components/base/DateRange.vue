<template>
  <div :class="colspanClass">
    <label v-if="label">{{ label }}: <span
      v-if="required"
      style="color: red"
    >*</span></label>

    <el-date-picker
      v-model="message"
      v-bind="$attrs"
      class="form-control"
      :class="{'is-invalid': error}"
      type="daterange"
      unlink-panels
      range-separator="-"
      start-placeholder="Hardan"
      end-placeholder="Hara"
      :shortcuts="shortcuts"
      :required="required"
      :disabled="disabled"
    />

    <span
      v-if="error"
      class="form-text text-muted"
    >{{ error }}</span>
    <span
      v-if="hint"
      class="form-text text-muted"
    >{{ hint }}</span>
  </div>
</template>

<script>
import { useModelWrapper } from '@/services/modelWrapper'

export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    minLength: {
      type: String,
      default: "0"
    },
    maxLength: {
      type: String,
      default: "1000"
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    colspanClass: {
      type: String,
      default: "col-lg-4"
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line vue/require-default-prop
    modelValue: {
      type: [Number, String],
    },
    shortcuts: {
      type: [Object, Array],
      default: () => [
        {
          text: 'Dünən',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24)
            end.setTime(end.getTime() - 3600 * 1000 * 24)
            return [start, end]
          },
        },
        {
          text: 'Bu gün',
          value: () => {
            const end = new Date()
            const start = new Date()
            return [start, end]
          },
        },
        {
          text: 'Sabah',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() + 3600 * 1000 * 24)
            end.setTime(end.getTime() + 3600 * 1000 * 24)
            return [start, end]
          },
        },
        {
          text: 'Son həftə',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: 'Son ay',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: 'Son 3 ay',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
        {
          text: 'Son 6 ay',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
            return [start, end]
          },
        },
        {
          text: 'Son 1 il',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
            return [start, end]
          },
        },
      ],
      required: false
    },
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return {
      message: useModelWrapper(props, emit, 'modelValue'),
    }
  },
}
</script>
