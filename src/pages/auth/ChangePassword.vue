<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
          </span>
          <h3 class="card-label">
            Change password
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body">
          <div class="form-group row">
            <BaseInput
                v-model="input_data.password"
                label="Password"
                min-length="8"
                colspan-class="col-lg-6"
                type="password"
            />
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-lg-12">
              <div class="float-right">
                <el-button
                    type="primary"
                    v-loading="loading"
                    @click="changePassword()"
                >
                  Submit
                </el-button>
                <el-button
                    type="warning"
                    v-loading="loading"
                    @click="clearData()"
                >
                  Clear
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import internalUserService from '@/services/internal-users/internalUserService'

const route = useRoute()
const store = useStore()
const router = useRouter()

let loading = ref(false)

let input_data = ref({
  password: '',
})

let input_data_clear = ref({
  password: '',
})

const changePassword = async () => {
  if (loading.value) return false

  loading.value = true

  try {
    await internalUserService.changePassword(input_data.value)

    await router.push({ name: 'dashboard' })
  } catch (e) {

  } finally {
    loading.value = false
  }
}

function clearData () {
  loading.value = false

  Object.assign(input_data.value, input_data_clear.value)
}

</script>
