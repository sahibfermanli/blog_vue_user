<template>
  <!--begin::Header-->
  <div
    id="kt_header"
    class="header header-fixed"
  >
    <!--begin::Container-->
    <div class="container-fluid d-flex align-items-stretch justify-content-between">
      <!--begin::Header Menu Wrapper-->
      <div
        id="kt_header_menu_wrapper"
        class="header-menu-wrapper header-menu-wrapper-left"
      >
        <!--begin::Header Menu-->
        <div
          id="kt_header_menu"
          class="header-menu header-menu-mobile header-menu-layout-default"
        >
          <!--begin::Info-->
          <div class="d-flex align-items-center flex-wrap mr-2">
            <!--begin::Page Title-->
            <h5 class="text-light font-weight-bold mt-2 mb-2 mr-5">
              <!--              {{ routeName }}-->
            </h5>
            <!--end::Page Title-->
          </div>
          <!--end::Info-->
        </div>
        <!--end::Header Menu-->
      </div>
      <!--end::Header Menu Wrapper-->
      <!--begin::Topbar-->
      <div class="topbar">
        <!--begin::User-->
        <div class="topbar-item">
          <div
            id="kt_quick_user_toggle"
            class="btn btn-icon btn-icon-mobile w-auto btn-clean d-flex align-items-center btn-lg px-2"
            @click="showUserPanel()"
          >
            <span class="text-muted font-weight-bold font-size-base d-none d-md-inline mr-1">Salam,</span>
            <span class="text-dark-50 font-weight-bolder font-size-base d-none d-md-inline mr-3">{{
              $store.getters['auth/GET_USER']?.name
            }}</span>
            <span class="symbol symbol-lg-35 symbol-25 symbol-light-success">
              <span class="symbol-label text-dark font-size-h5 font-weight-bold">{{ getNameFirstLetter() }}</span>
            </span>
          </div>
        </div>
        <!--end::User-->
      </div>
      <!--end::Topbar-->
    </div>
    <!--end::Container-->
  </div>
  <!--end::Header-->
</template>

<script setup>

import {useRoute} from "vue-router";
import {useStore} from 'vuex'
import {computed} from "vue";

const route = useRoute();
const store = useStore();

const routeName = computed(() => {
  const routes = {
    '/users': 'Клиенты',
    '/internal-users': 'Модераторы',
  }
  return routes[route.path]
})

const getNameFirstLetter = () => {
  return store.getters['auth/GET_USER_NAME_FIRST_LETTER']
}

const showUserPanel = () => {
  store.commit('theme/CHANGE_USER_PANEL')
}

</script>
