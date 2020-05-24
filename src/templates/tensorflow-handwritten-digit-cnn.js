module.exports = [
  {
    index: 'pipeline_0',
    type: 'DatasetLoader',
    title: 'Dataset Loader',
    data: {
      remoteFile: 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png'
    }
  },
  {
    index: 'pipeline_1',
    input_ref: 'pipeline_0',
    type: 'DatasetSpriteViewer',
    data: {
      spriteWidth: 28,
      spriteHeight: 28
    }
  },
  {
    index: 'pipeline_2',
    type: 'DatasetLoader',
    data: {
      remoteFile: 'https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8'
    }
  },
  {
    index: 'pipeline_3',
    input_ref: 'pipeline_2',
    type: 'DatasetLabel',
    data: {
      labelSize: 10,
      output_ref: 'pipeline_1'
    }
  },
  {
    index: 'pipeline_4',
    type: 'TSModel',
    title: 'Define the model architecture',
    input_ref: 'pipeline_1',
    data: {
      layerSize: 6,
      layerName: ['conv2d', 'maxPooling2d', 'conv2d', 'maxPooling2d', 'flatten', 'dense'],
      units: [0, 0, 0, 0, 0, 10],
      kernelSize: [5, 0, 5, 0, 0, 0],
      filters: [8, -1, 16, -1, -1, 10],
      strides: [[1], [2, 2], [1], [2, 2], [], []],
      poolSize: [[], [2, 2], [], [2, 2], [], []],
      activation: ['relu', '--', 'relu', '--', '--', 'softmax'],
      kernelInitializer: ['varianceScaling', '--', 'varianceScaling', '--', '--', 'varianceScaling'],
      biasInitializer: ['zeros', 'zeros', 'zeros', 'zeros', 'zeros', 'zeros']
    }
  },
  {
    index: 'pipeline_5',
    type: 'TSModelCompiler',
    input_ref: 'pipeline_4',
    data: {
      epochSize: 10,
      batchSize: 512,
      shuffle: true,
      validationSplit: 0.16,
      compilerOptimizerSelected: 'adamax',
      compilerLossSelected: 'categoricalCrossentropy'
    }
  }
]
