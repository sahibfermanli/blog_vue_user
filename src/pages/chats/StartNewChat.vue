<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon" />
          <h3 class="card-label">
            Start new chat
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body">
          <div class="form-group row">
            <BaseTextarea
                v-model="new_message"
                label="Type message..."
                :required="true"
                colspan-class="col-lg-12"
            />
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-lg-12">
              <div class="float-right">
                <el-button
                  v-loading="loading"
                  type="primary"
                  @click="startNewChat()"
                >
                  Send
                </el-button>
                <el-button
                  v-loading="loading"
                  type="warning"
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
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import chatService from '@/services/chatService'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

const route = useRoute()
const store = useStore()
const router = useRouter()

let loading = ref(false)

const userId = route.params.userId

let new_message = ref('')

const startNewChat = async () => {
  if (loading.value) return false

  loading.value = true

  try {
    const newChatId = await chatService.startNewChat({message: new_message.value, user_id: userId})

    await router.push({ name: 'chat_messages', params: {id: newChatId} })
  } catch (e) {

  } finally {
    loading.value = false
  }
}

function clearData () {
  loading.value = false

  new_message.value = ''
}

</script>
