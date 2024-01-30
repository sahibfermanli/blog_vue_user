<template>
  <router-view v-if="!isAuthorized" />

  <div v-if="isAuthorized">
    <HeaderMobileBlock />

    <div class="d-flex flex-column flex-root">
      <!--begin::Page-->
      <div class="d-flex flex-row flex-column-fluid page">
        <AsideBlock />

        <!--begin::Wrapper-->
        <div
          id="kt_wrapper"
          class="d-flex flex-column flex-row-fluid wrapper pb-16"
          style="padding-top: 75px !important;"
        >
          <HeaderBlock />

          <div class="mobile-margin d-md-none mt-6" />

          <router-view />

          <UserPanel />
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Page-->
    </div>
  </div>
</template>

<script setup>

import AsideBlock from './components/AsideBlock.vue'
import HeaderMobileBlock from './components/HeaderMobileBlock.vue'
import HeaderBlock from './components/HeaderBlock.vue'
import UserPanel from './components/UserPanel.vue'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

onMounted(async () => {
  if (!store.getters['auth/IS_AUTH']) {
    await router.push({ name: 'auth' })
  }
})

const isAuthorized = computed(() => store.getters['auth/IS_AUTH'])
</script>
