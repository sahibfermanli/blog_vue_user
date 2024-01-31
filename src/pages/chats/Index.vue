<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <h3 class="card-label">
            Chats
          </h3>
          <BaseSelect
              v-model="userId"
              colspan-class="col-lg-8"
              :options="allUsers"
              clearable
          />
          <el-button
              v-loading="loading"
              type="success"
              :disabled="!userId"
              @click="$router.push({name: 'start_new_chat', params: {userId: userId}})"
          >
            Start new chat
          </el-button>
        </div>
      </div>
      <div class="card-body">
        <el-row style="margin-bottom: 5px;">
          <el-col :span="4">
            <label>Pagination (Total : <strong>{{ pagination.total }}</strong>)</label>
            <el-select
                v-model="perPage"
                placeholder="Seç"
                @change="search"
            >
              <el-option
                  v-for="item in perPageCounts"
                  :key="item"
                  :label="item"
                  :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
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
            :data="allChats"
            max-height="70vh"
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
              prop="title"
              label="Title"
          />
          <el-table-column
              prop="all_messages_count"
              label="All messages"
          />
          <el-table-column
              prop="un_read_messages_count"
              label="Unread messages"
          />
          <el-table-column
              prop="created_date"
              label="Date"
          />
          <el-table-column
              label="Show"
              width="70"
              class-name="actions"
          >
            <template #default="scope">
              <div style="display: flex; gap: 2px;">
                <el-button
                    size="small"
                    :icon="More"
                    type="primary"
                    @click="$router.push({name: 'chat_messages', params: {id: scope.row.id}})"
                />
              </div>
            </template>
          </el-table-column>
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
import BaseSelect from '@/components/base/BaseSelect.vue'
import userService from '@/services/userService'
import { More } from '@element-plus/icons'

const route = useRoute()
const store = useStore()

let search_data = reactive({})

const { pagination, setPagination, currentPage, perPage, perPageCounts } = usePagination(route.params.page)

let loading = ref(false)
let allChats = ref([])
let userId = ref(null)
let allUsers = ref([])

const search = async () => {
  try {
    loading.value = true

    const { data: { data: usersData } } = await userService.list()
    allUsers.value = usersData

    const {
      data: {
        data: chatsData,
        meta
      }
    } = await chatService.load(search_data, currentPage.value, perPage.value)
    allChats.value = chatsData

    setPagination(meta)
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
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
