<template>
  <div :class="colspanClass">
    <label v-if="label">{{ label }}: <span v-if="required" style="color: red">*</span></label>

    <el-select
        v-bind="$attrs"
        v-model="message"
        :class="{'is-invalid': error}"
        :disabled="disabled"

        :aria-invalid="error?true:null"
        placeholder="Choose item(s)"
        :required="required"

        clearable
        multiple
        filterable
    >
      <el-option
          v-for="item in options"
          :key="item[optionValue]"
          :label="item[optionTitle]"
          :value="item[optionValue]"
      />
    </el-select>
    <span v-if="error" class="form-text text-muted">{{ error }}</span>
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
    modelValue: {
      type: [Number, String],
    },
    options: {
      type: [Object, Array],
      default: () => [],
      required: true
    },
    optionTitle: {
      type: String,
      default: 'title',
    },
    optionValue: {
      type: String,
      default: 'id',
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
