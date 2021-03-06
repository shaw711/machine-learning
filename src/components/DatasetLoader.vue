<template>
  <component-layout :component.sync="component" :length.sync="length" :loading.sync="loading">
    <b-input-group class="mb-2">
      <b-form-file
        v-model="localFile"
        ref="select-local-file"
        class="select-button"
        placeholder="Choose a data source..."
        :no-drop="true"
        @change="selectLocalFile"
      ></b-form-file>
      <b-input-group-append>
        <b-button class="select-button" @click="selectLocalFile">Select local file</b-button>
      </b-input-group-append>
    </b-input-group>

    <b-input-group class="mb-2">
      <b-form-input v-model="remoteFile" placeholder="Choose a remote web address..."></b-form-input>
      <b-input-group-append>
        <b-button class="select-button" @click="selectRemoteFile">Select remote file</b-button>
      </b-input-group-append>
    </b-input-group>
  </component-layout>
</template>

<script>
/**
 * @license
 * Copyright 2020 Rodrigo Oshiro. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import ComponentLayout from './ComponentLayout'
import { mixin } from './mixin'
import path from 'path'
const cors = process.env.VUE_APP_CORS_API

export default {
  name: 'DatasetLoader',
  components: { ComponentLayout },
  mixins: [mixin],
  data() {
    let data = {
      serializable: ['localFile', 'remoteFile', 'filename'],
      localFile: null,
      remoteFile: null,
      fileName: ''
    }
    return this.importData(data)
  },
  computed: {
    plugActionDisabled() {
      let disabled = 0
      disabled |= this.loading === true
      return disabled === 1
    }
  },
  methods: {
    loadFileContent(content) {
      this.output = content
      this.plugActionEnd()
    },
    selectLocalFile(event) {
      if (event instanceof MouseEvent) {
        this.$refs['select-local-file'].$el.children[0].click()
      } else if (event instanceof Event) {
        if (event.target.files.length) {
          this.loading = true
          this.$emit('onPlugAction', this.loading)
          let file = event.target.files[0]
          let reader = new FileReader()
          this.fileName = file.name
          reader.onload = e => this.selectLocalFile(e.target)
          reader.readAsArrayBuffer(file)
        }
      } else if (event instanceof FileReader) {
        this.loadFileContent(event.result)
      }
    },
    selectRemoteFile() {
      let content = null
      this.loading = true
      this.$emit('onPlugAction', this.loading)
      this.$axios
        .get(this.remoteFile, { responseType: 'arraybuffer' })
        .then(response => {
          content = response
          content.response = response.request.response
        })
        .catch(response => {
          if (response.request.status === 0) {
            content = null
            this.$axios
              .get(cors + this.remoteFile)
              .then(response => {
                content = response
                content.response = response.request.response
              })
              .catch(response => {
                content = response
                content.response = response.request.response
              })
              .finally(() => {
                if (content != null) {
                  this.fileName = path.basename(content.config.url)
                  this.loadFileContent(content.response)
                }
              })
          } else {
            content = response
            content.response = response.request.response
          }
        })
        .finally(() => {
          if (content != null) {
            this.fileName = path.basename(content.config.url)
            this.loadFileContent(content.response)
          }
        })
    },
    plugActionEvent(event) {
      this.selectRemoteFile(event)
    }
  }
}
</script>

<style>
label.custom-file-label::after {
  display: none;
}
</style>
<style scoped>
.select-button {
  width: 200px;
}
</style>
