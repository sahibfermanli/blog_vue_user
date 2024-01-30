<template>
  <div :class="colspanClass">
    <label v-if="label">{{ label }}: <span
      v-if="required"
      style="color: red"
    >*</span></label>
    <el-tooltip
      v-if="tooltip"
      class="box-item"
      effect="dark"
      :content="tooltip"
      placement="auto"
    >
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        data-v-029747aa=""
        width="15"
        class="ml-2"
      ><path
        fill="currentColor"
        d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm23.744 191.488c-52.096 0-92.928 14.784-123.2 44.352-30.976 29.568-45.76 70.4-45.76 122.496h80.256c0-29.568 5.632-52.8 17.6-68.992 13.376-19.712 35.2-28.864 66.176-28.864 23.936 0 42.944 6.336 56.32 19.712 12.672 13.376 19.712 31.68 19.712 54.912 0 17.6-6.336 34.496-19.008 49.984l-8.448 9.856c-45.76 40.832-73.216 70.4-82.368 89.408-9.856 19.008-14.08 42.24-14.08 68.992v9.856h80.96v-9.856c0-16.896 3.52-31.68 10.56-45.76 6.336-12.672 15.488-24.64 28.16-35.2 33.792-29.568 54.208-48.576 60.544-55.616 16.896-22.528 26.048-51.392 26.048-86.592 0-42.944-14.08-76.736-42.24-101.376-28.16-25.344-65.472-37.312-111.232-37.312zm-12.672 406.208a54.272 54.272 0 0 0-38.72 14.784 49.408 49.408 0 0 0-15.488 38.016c0 15.488 4.928 28.16 15.488 38.016A54.848 54.848 0 0 0 523.072 768c15.488 0 28.16-4.928 38.72-14.784a51.52 51.52 0 0 0 16.192-38.72 51.968 51.968 0 0 0-15.488-38.016 55.936 55.936 0 0 0-39.424-14.784z"
      /></svg>
    </el-tooltip>
    <textarea
      v-bind="$attrs"
      v-model="message"
      :class="{'is-invalid': error, 'form-control': hasFormControlClass}"
      :disabled="disabled"
      :aria-invalid="error?true:null"
      :placeholder="placeholderText ? placeholderText : label"
      :maxlength="maxLength"
      :minlength="minLength"
      :required="required"
      rows="5"
      cols="30"
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
    tooltip: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    hasFormControlClass: {
      type: Boolean,
      default: true
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
    placeholderText: {
      type: String,
      default: '',
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
