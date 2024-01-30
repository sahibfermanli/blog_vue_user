<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon">
          </span>
          <h3 class="card-label">
            Home page
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="row align-items-end">
          Welcome, {{$store.getters['auth/GET_USER']?.name}} {{$store.getters['auth/GET_USER']?.surname}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import internalUserService from '@/services/internal-users/internalUserService'

const route = useRoute()
const store = useStore()

let loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true
    await internalUserService.checkLoggedIn()
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
