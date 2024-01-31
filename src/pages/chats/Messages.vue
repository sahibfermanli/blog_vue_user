<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Messages
          </h3>
<!--          <el-button-->
<!--              v-loading="loading"-->
<!--              type="success"-->
<!--              @click="$router.push({name: 'messages_create'})"-->
<!--          >-->
<!--            New-->
<!--          </el-button>-->
        </div>
      </div>
      <div class="card-body">
        <div class="d-block mb-20">
          <div class="row">
            <BaseTextarea
                v-model="new_message"
                label="Type message..."
                :required="true"
                colspan-class="col-lg-12"
            />
          </div>
          <div class="float-right mt-5">
            <el-button
                v-loading="loading"
                type="primary"
                @click="sendMessage()"
            >
              Send
            </el-button>
            <el-button
                v-loading="loading"
                type="warning"
                @click="clearData"
            >
              Clear
            </el-button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <el-row justify="center">
          <el-pagination
              v-model:currentPage="currentPage"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              v-bind="pagination"
              sortable="custom"
              @update:current-page="onCurrentPageUpdated"
          />
        </el-row>
        <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="allMessages"
            max-height="70vh"
            :row-class-name="setRowStyle"
            border
            :empty-text="'No data!'"
        >
          <el-table-column
              prop="id"
              label="#"
              width="100"
              fixed
          />
          <el-table-column
              prop="sender"
              label="Sender"
          />
          <el-table-column
              prop="receiver"
              label="Receiver"
          />
          <el-table-column
              prop="message"
              label="Message"
          />
          <el-table-column
              prop="created_date"
              label="Sent Date"
          />
          <el-table-column
              prop="read_at"
              label="Read Date"
          />
        </el-table>
        <el-row justify="center">
          <el-pagination
              v-model:currentPage="currentPage"
              :hide-on-single-page="true"
              layout="prev, pager, next"
              v-bind="pagination"
              sortable="custom"
              @update:current-page="onCurrentPageUpdated"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import chatService from '@/services/chatService'
import usePagination from '@/composables/common/usePagination'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

const route = useRoute()
const store = useStore()


const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination(route.params.page)

let loading = ref(false)
let new_message = ref('')
let allMessages = ref([])

let search_data = reactive({})

const id = route.params.id

const search = async () => {
  try {
    loading.value = true

    const {
      data: {
        data: messagesData,
        meta
      }
    } = await chatService.loadMessages(id, search_data, currentPage.value, perPage.value)
    allMessages.value = messagesData

    setPagination(meta)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

function clearData() {
  new_message.value = ''
}

const sendMessage = async () => {
  if (loading.value) return false

  loading.value = true

  try {
    const {
      data: {
        data: messagesData,
      }
    } = await chatService.sendMessage(id, {message: new_message.value})

    allMessages.value = messagesData

    clearData()
  } catch (e) {

  } finally {
    loading.value = false
  }
}

const onCurrentPageUpdated = async (page) => {
  currentPage.value = page

  await search()
}

onMounted(async () => {
  try {
    loading.value = true

    await search()

    window.Echo.private('chat-channel.' + store.getters['auth/GET_USER']?.id).listen('PrivateChat',(e)=>{
      let message = e.message
      message.is_new = true
      allMessages.value.unshift(message)
    })
  } catch (e) {

  } finally {
    loading.value = false
  }
})

function setRowStyle({row, rowIndex}) {
  if (row.is_new) {
    return 'green'
  }

  return ''
}

</script>

<style>
.green {
  background-color: greenyellow !important;
}
</style>
