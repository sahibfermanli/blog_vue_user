<template>
  <!--begin::Login-->
  <div
    id="kt_login"
    class="login login-5 login-signin-on d-flex flex-row-fluid"
  >
    <div
      class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid"
      style="background-image: url(assets/media/bg/bg-2.jpg);"
    >
      <div class="login-form text-center text-white p-7 position-relative overflow-hidden">
        <!--begin::Login Header-->
        <div class="d-flex flex-center mb-15">
          <a href="#">
            <img
              src="/logo_login.png"
              class="max-h-75px"
              alt=""
            >
          </a>
        </div>
        <!--end::Login Header-->
        <!--begin::Login Sign in form-->
        <div class="login-signin">
          <div class="mb-20">
            <h3 class="opacity-40 font-weight-normal">
              Login
            </h3>
            <div class="mb-6 text-center" />
          </div>
          <form
            id="kt_login_signin_form"
            class="form"
            @submit.prevent="login()"
          >
            <div class="form-group">
              <input
                v-model="data.form.email"
                class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8"
                type="email"
                placeholder="E-mail"
                name="email"
                autocomplete="off"
                :class="{'is-invalid': data.errors.email}"
              >
            </div>
            <div class="form-group">
              <input
                v-model="data.form.password"
                class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8"
                type="password"
                name="password"
                autocomplete="current-password"
                :class="{'is-invalid': data.errors.password}"
                placeholder="Password"
              >
            </div>
            <div class="form-group text-center mt-10">
              <button
                id="kt_login_signin_submit"
                class="btn btn-pill btn-primary opacity-90 px-15 py-3"
                :class="{'spinner spinner-darker-white spinner-left disabled': data.isLoading}"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <!--end::Login Sign in form-->
      </div>
    </div>
  </div>
  <!--end::Login-->
</template>

<script setup>

import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const form = {}

const data = reactive({
  form,
  errors: [],
  isLoading: false
})

onMounted(async () => {
  if (store.getters['auth/IS_AUTH']) {
    await router.push({ name: 'dashboard' })
  }
})

const login = async () => {
  if (data.isLoading) {
    return
  }
  data.isLoading = true

  await store.dispatch('auth/LOGIN', data.form)
  data.isLoading = false
}

</script>
