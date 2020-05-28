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
if (typeof window === 'undefined') {
  window = self
}
self.importScripts('tf.min.js')
self.importScripts('utilities.js')

self.onEpochEnd = async function(epoch, logs) {
  console.log('WC')
  self.postMessage(['onEpochEnd', epoch, logs])
}

self.builder = async function(data) {
  let output = await utilities.tasks.builder(tf, data)
  await output.model.save('indexeddb://model')
  self.postMessage(['onEnd'])
}

self.compiler = async function(data, inputTensorJSON, outputTensorJSON) {
  let model = await tf.loadLayersModel('indexeddb://model')
  console.log('WA')
  let output = await utilities.tasks.compiler(
    tf,
    model,
    data,
    inputTensorJSON,
    outputTensorJSON,
    {
      onEpochEnd: self.onEpochEnd
    }
  )
  console.log('WB')
  await output.model.save('indexeddb://model')
  self.postMessage(['onEnd', output.train])
}

self.predictor = async function(data, inputTensorJSON) {
  let model = await tf.loadLayersModel('indexeddb://model')
  let output = await utilities.tasks.predictor(
    tf,
    model,
    data,
    inputTensorJSON
  )
  self.postMessage(['onEnd', output.predictTensorJSON])
}

self.addEventListener('message', function(event) {
  if (event.data[0] === 'builder') {
    self.builder(event.data[1])
  }
  if (event.data[0] === 'compiler') {
    self.compiler(event.data[1], event.data[2], event.data[3])
  }
  if (event.data[0] === 'predictor') {
    self.predictor(event.data[1], event.data[2], event.data[3])
  }
})