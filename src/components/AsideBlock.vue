<template>
  <!--begin::Aside-->
  <div
    id="kt_aside"
    class="aside aside-left aside-fixed d-flex flex-column flex-row-auto"
    :class="{'aside-on': showMobile}"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
  >
    <!--begin::Brand-->
    <div
      id="kt_brand"
      class="brand flex-column-auto"
      style="background-color: rgb(28, 28, 39);"
    >
      <!--begin::Logo-->
      <router-link
        :to="{name: 'dashboard'}"
        class="brand-logo"
      >
        <img
          alt="Logo"
          src="/logo.png"
          style="width:100%"
        >
      </router-link>
      <!--end::Logo-->
      <!--begin::Toggle-->
      <button
        id="kt_aside_toggle"
        class="brand-toggle btn btn-sm px-0"
        @click="toggleAsidePanel()"
      >
        <span class="svg-icon svg-icon svg-icon-xl">
          <!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Angle-double-left.svg-->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
          >
            <g
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <polygon points="0 0 24 0 24 24 0 24" />
              <path
                d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                fill="#000000"
                fill-rule="nonzero"
                transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999)"
              />
              <path
                d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                fill="#000000"
                fill-rule="nonzero"
                opacity="0.3"
                transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999)"
              />
            </g>
          </svg>
          <!--end::Svg Icon-->
        </span>
      </button>
      <!--end::Toolbar-->
    </div>
    <!--end::Brand-->
    <!--begin::Aside Menu-->
    <div
      id="kt_aside_menu_wrapper"
      class="aside-menu-wrapper flex-column-fluid"
    >
      <!--begin::Menu Container-->
      <div
        id="kt_aside_menu"
        class="aside-menu my-4"
        data-menu-vertical="1"
        data-menu-scroll="1"
        data-menu-dropdown-timeout="500"
      >
        <!--begin::Menu Nav-->
        <ul class="menu-nav">
          <li class="menu-section">
            <h4 class="menu-text">
              Main
            </h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md" />
          </li>
          <router-link
              :to="{name: 'dashboard'}"
              class="menu-item"
          >
            <a
                href="#"
                class="menu-link"
            >
              <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo2/dist/../src/media/svg/icons/General/User.svg--><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
              >
                  <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                  >
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                    />
                    <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                    />
                  </g>
                </svg><!--end::Svg Icon-->
              </span>
              <span class="menu-text">Home</span>
            </a>
          </router-link>
        </ul>
        <ul class="menu-nav">
          <li class="menu-section">
            <h4 class="menu-text">
              Profile
            </h4>
            <i class="menu-icon ki ki-bold-more-hor icon-md" />
          </li>
          <router-link
              :to="{name: 'blogs'}"
              class="menu-item"
          >
            <a
                href="#"
                class="menu-link"
            >
              <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo2/dist/../src/media/svg/icons/General/User.svg--><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
              >
                  <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                  >
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                    />
                    <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                    />
                  </g>
                </svg><!--end::Svg Icon-->
              </span>
              <span class="menu-text">My blogs</span>
            </a>
          </router-link>
          <router-link
              :to="{name: 'chats'}"
              class="menu-item"
          >
            <a
                href="#"
                class="menu-link"
            >
              <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo2/dist/../src/media/svg/icons/General/User.svg--><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
              >
                  <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                  >
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                    />
                    <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                    />
                  </g>
                </svg><!--end::Svg Icon-->
              </span>
              <span class="menu-text">Chat</span>
            </a>
          </router-link>
          <router-link
              :to="{name: 'change_password'}"
              class="menu-item"
          >
            <a
                href="#"
                class="menu-link"
            >
              <span class="svg-icon menu-icon">
                <!--begin::Svg Icon | path:/var/www/preview.keenthemes.com/metronic/releases/2021-05-14-112058/theme/html/demo2/dist/../src/media/svg/icons/General/User.svg--><svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
              >
                  <g
                      stroke="none"
                      stroke-width="1"
                      fill="none"
                      fill-rule="evenodd"
                  >
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                        d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                        opacity="0.3"
                    />
                    <path
                        d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                        fill="#000000"
                        fill-rule="nonzero"
                    />
                  </g>
                </svg><!--end::Svg Icon-->
              </span>
              <span class="menu-text">Change password</span>
            </a>
          </router-link>
        </ul>
        <!--end::Menu Nav-->
      </div>
      <!--end::Menu Container-->
    </div>
    <!--end::Aside Menu-->
  </div>
  <div
    v-if="showMobile"
    class="aside-overlay"
    @click="closeMobileMenu()"
  />
  <!--end::Aside-->
</template>
<script setup>
import {computed, onMounted} from 'vue'
import {useStore} from 'vuex'

const store = useStore()

const mouseOver = () => {
  if (!store.getters['theme/GET_ASIDE_PANEL']) {
    document.body.classList.remove('aside-minimize')
  }
}

const mouseLeave = () => {
  if (!store.getters['theme/GET_ASIDE_PANEL']) {
    document.body.classList.add('aside-minimize')
  }
}

const toggleAsidePanel = () => {
  store.commit('theme/CHANGE_ASIDE_PANEL')
  if (store.getters['theme/CHANGE_ASIDE_PANEL']) {
    document.body.classList.add('aside-minimize')
  } else {
    document.body.classList.remove('aside-minimize')
  }
}

onMounted(async () => {
  if (!store.getters['theme/GET_ASIDE_PANEL']) {
    document.body.classList.add('aside-minimize')
  }
})

const closeMobileMenu = () => {
  store.commit('theme/CHANGE_MOBILE_MENU')
}

const showMobile = computed(() => store.getters['theme/GET_MOBILE_MENU'])

</script>

