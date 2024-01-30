<template>
  <div class="container-fluid">
    <div class="card card-custom">
      <div class="card-header">
        <div class="card-title">
          <span class="card-icon" />
          <h3 class="card-label">
            Edit
          </h3>
        </div>
      </div>
      <div class="card-body">
        <div class="card-body">
          <div
              v-if="currentImages"
              class="form-group row"
          >
            <div v-for="image in currentImages" :key="image['id']" class="border p-2 mt-3">
              <img
                  :src="image['url']"
                  class="img-fluid"
                  width="250"
              >
              <el-popconfirm
                  cancel-button-text="Cancel"
                  confirm-button-text="Yes"
                  title="Are you sure you want to delete?"
                  @confirm="deleteImage(image['id'])"
              >
                <template #reference>
                  <el-button
                      size="small"
                      :icon="Delete"
                      type="danger"
                  />
                </template>
              </el-popconfirm>
            </div>
          </div>
          <div
              v-if="previewImages"
              class="form-group row"
          >
            <div v-for="image in previewImages" :key="image" class="border p-2 mt-3">
              <img
                  :src="image"
                  class="img-fluid"
                  width="250"
              >
            </div>
          </div>
          <div class="form-group row">
            <BaseInput
                label="Image"
                max-length="255"
                type="file"
                accept="image/.jpg,.png,.jpeg"
                :required="true"
                multiple
                colspan-class="col-lg-4"
                @change="previewImage"
            />
            <BaseInput
                v-model="input_data.title"
                label="Title"
                max-length="255"
                :required="true"
                colspan-class="col-lg-8"
            />
          </div>
          <div class="form-group row">
            <BaseInput
                v-model="input_data.description"
                label="Description"
                max-length="500"
                :required="true"
                colspan-class="col-lg-12"
            />
            <BaseTextarea
                v-model="input_data.body"
                label="Body"
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
                  @click="updateItem()"
                >
                  Update
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
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import blogService from '@/services/blogService'
import BaseTextarea from '@/components/base/BaseTextarea.vue'
import { Delete } from '@element-plus/icons'

const route = useRoute()
const store = useStore()
const router = useRouter()

let loading = ref(false)

const id = route.params.id

let images = ref([])
let previewImages = ref([])
let currentImages = ref([])

let input_data = ref({
  title: '',
  description: '',
  body: '',
})

let input_data_clear = ref({
  title: '',
  description: '',
  body: '',
})

function previewImage(event) {
  reset()

  let input = event.target
  if (input.files) {
    images.value = input.files

    for (let i = 0; i < images.value.length; i++) {
      let reader = new FileReader()
      reader.onload = (e) => {
        previewImages.value[i] = e.target.result
      }
      reader.readAsDataURL(input.files[i])
    }
  }
}

function reset() {
  images.value = []
  previewImages.value = []
}

const updateItem = async () => {
  if (loading.value) return false

  loading.value = true

  try {
    let formData = new FormData()

    Object.keys(input_data.value).forEach(key => {
      formData.append(key, input_data.value[key])
    })

    for (let i = 0; i < images.value.length; i++) {
      formData.append('images[]', images.value[i]);
    }

    await blogService.update(id, formData)

    await router.push({ name: 'blogs' })
  } catch (e) {

  } finally {
    loading.value = false
  }
}

function clearData () {
  loading.value = false

  reset()
  Object.assign(input_data.value, input_data_clear.value)
}

const deleteImage = async (mediaId) => {
  if (loading.value) return false

  try {
    loading.value = true

    await blogService.deleteImage(id, mediaId)
    currentImages.value = currentImages.value.filter(row => row.id !== mediaId)
  } catch (e) {

  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    loading.value = true
    const { data: { data: blogData } } = await blogService.show(id)
    input_data.value = blogData
    currentImages.value = blogData.images
  } catch (e) {

  } finally {
    loading.value = false
  }
})

</script>
