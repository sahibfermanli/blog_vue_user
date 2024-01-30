<template>
  <div>
    <label v-if="label">{{ label }}: <span
      v-if="required"
      style="color: red"
    >*</span></label>

    <el-time-picker
      v-model="message"
      v-bind="$attrs"
      is-range
      range-separator="-"
      start-placeholder="Başlangıc"
      end-placeholder="Bitiş"
      :class="{'is-invalid': error, 'form-control': hasFormControlClass}"
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
    hasFormControlClass: {
      type: Boolean,
      default: true
    },
    minLength: {
      type: String,
      default: '0'
    },
    maxLength: {
      type: String,
      default: '1000'
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
      default: 'col-lg-4'
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
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    return {
      message: useModelWrapper(props, emit, 'modelValue'),
    }
  },
}
</script>
