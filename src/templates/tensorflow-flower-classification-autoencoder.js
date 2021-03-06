module.exports = [
  {
    index: 'pipeline_0',
    type: 'DatasetLoader',
    title: 'Dataset Loader',
    description:
      'This pipeline uses the iris dataset from UCI Machile Learning ' +
      '[repository](https://archive.ics.uci.edu/ml/datasets/iris). It ' +
      'uses **tensorflow** to create a model that exemplifies making an **autoencoder** to reduce ' +
      'dimensions. These dimensions are then used to classify the flowers.',
    data: {
      remoteFile: 'https://raw.githubusercontent.com/pandas-dev/pandas/0.19.x/pandas/tests/data/iris.csv'
    }
  },
  {
    index: 'pipeline_1',
    input_ref: 'pipeline_0',
    type: 'DatasetTableViewer',
    data: {
      header: true,
      xAxis: 0,
      yAxis: 1,
      zAxis: 2,
      lAxis: 4
    }
  },
  {
    index: 'pipeline_2',
    input_ref: 'pipeline_1',
    type: 'DatasetSplitter',
    title: 'Dataset Splitter',
    data: {
      sampleSplit: 1,
      shuffle: false,
      trainingRatio: 1,
      evaluationRatio: 0,
      inputUnits: [
        {
          key: 0,
          checked: true,
          label: 'Column 0'
        },
        {
          key: 1,
          checked: true,
          label: 'Column 1'
        },
        {
          key: 2,
          checked: true,
          label: 'Column 2'
        },
        {
          key: 3,
          checked: true,
          label: 'Column 3'
        }
      ],
      outputUnits: [
        {
          key: 0,
          checked: true,
          label: 'Column 0'
        },
        {
          key: 1,
          checked: true,
          label: 'Column 1'
        },
        {
          key: 2,
          checked: true,
          label: 'Column 2'
        },
        {
          key: 3,
          checked: true,
          label: 'Column 3'
        }
      ],
      indexLabel: 4
    }
  },
  {
    index: 'pipeline_3',
    input_ref: 'pipeline_2',
    type: 'TSModelBuilder',
    title: 'Autoencoder Model',
    description:
      'In this model, the input shape of 4 will be **reduced** to 3, then it ' +
      'will reshape the output back to 4.',
    data: {
      layerSize: 2,
      units: [3, 4],
      activation: ['relu', 'relu'],
      kernelInitializer: ['randomNormal', 'randomNormal'],
      biasInitializer: ['ones', 'ones']
    }
  },
  {
    index: 'pipeline_4',
    input_ref: 'pipeline_3',
    type: 'TSModelCompiler',
    description:
      'When **training** this autoencoder, the model *output* will try to fit its ' +
      '*input*, while a *hidden* layer will reduce the feature dimensions from 4 to 3.',
    data: {
      epochs: 200,
      batchSize: 32,
      validationSplit: 0.1,
      shuffle: true,
      inputUnitsNormalize: false,
      outputUnitsNormalize: false,
      compilerOptimizerSelected: 'sgd',
      compilerLossSelected: 'meanSquaredError'
    }
  },
  {
    index: 'pipeline_5',
    input_ref: 'pipeline_4',
    type: 'TSModelPredictor',
    title: 'Prediction: Encoder/Decoder',
    description:
      'The prediction will use the hidden layer so output values will ' +
      'have 3 feature dimensions encoding the total units of this layer. The last layer could be ' +
      'used to predict back all the features, however we want to use the encoded features as inputs ' +
      'for a different classifier for the labels. If you open the table chart you should be able to ' +
      'identify **clusters** of the iris data.',
    data: {
      layerSize: 1
    }
  },
  {
    index: 'pipeline_6',
    input_ref: 'pipeline_5',
    type: 'DatasetTableViewer',
    data: {
      xAxis: 8,
      yAxis: 9,
      zAxis: 10,
      lAxis: 11
    }
  },
  {
    index: 'pipeline_7',
    input_ref: 'pipeline_6',
    type: 'DatasetTableViewer',
    data: {
      xAxis: 0,
      yAxis: 1,
      zAxis: 2,
      lAxis: 3,
      columns: [
        {
          key: 'Column 0',
          label: 'Column 0',
          checked: false,
          state: 0
        },
        {
          key: 'Column 1',
          label: 'Column 1',
          checked: false,
          state: 0
        },
        {
          key: 'Column 2',
          label: 'Column 2',
          checked: false,
          state: 0
        },
        {
          key: 'Column 3',
          label: 'Column 3',
          checked: false,
          state: 0
        },
        {
          key: 'Column 4',
          label: 'Column 4',
          checked: false,
          state: 0
        },
        {
          key: 'Column 5',
          label: 'Column 5',
          checked: false,
          state: 0
        },
        {
          key: 'Column 6',
          label: 'Column 6',
          checked: false,
          state: 0
        },
        {
          key: 'Column 7',
          label: 'Column 7',
          checked: false,
          state: 0
        },
        {
          key: 'Column 8',
          label: 'Column 8',
          checked: 'Column 8',
          state: 1
        },
        {
          key: 'Column 9',
          label: 'Column 9',
          checked: 'Column 9',
          state: 1
        },
        {
          key: 'Column 10',
          label: 'Column 10',
          checked: 'Column 10',
          state: 1
        },
        {
          key: 'Column 11',
          label: 'Column 11',
          checked: 'Column 11',
          state: 1
        }
      ]
    }
  },
  {
    index: 'pipeline_8',
    input_ref: 'pipeline_7',
    type: 'DatasetSplitter',
    title: 'Dataset Splitter',
    data: {
      sampleSplit: 1,
      shuffle: true,
      trainingRatio: 0.7,
      evaluationRatio: 0.3,
      inputUnits: [
        {
          key: 0,
          checked: true,
          label: 'Column 0'
        },
        {
          key: 1,
          checked: true,
          label: 'Column 1'
        },
        {
          key: 2,
          checked: true,
          label: 'Column 2'
        }
      ],
      outputUnits: [
        {
          key: 3,
          checked: true,
          label: 'Column 3'
        }
      ],
      indexLabel: 3
    }
  },
  {
    index: 'pipeline_9',
    input_ref: 'pipeline_8',
    type: 'TSModelBuilder',
    title: 'Create model to classify the flower',
    description: '',
    data: {
      layerSize: 3,
      units: [10, 10, 3],
      activation: ['relu', 'relu', 'softmax']
    }
  },
  {
    index: 'pipeline_10',
    input_ref: 'pipeline_9',
    type: 'TSModelCompiler',
    title: 'Train model',
    description: '',
    data: {
      epochs: 200,
      batchSize: 32,
      validationSplit: 0.1,
      shuffle: true,
      inputUnitsNormalize: false,
      outputUnitsNormalize: false,
      compilerOptimizerSelected: 'adamax',
      compilerLossSelected: 'sparseCategoricalCrossentropy'
    }
  },
  {
    index: 'pipeline_11',
    input_ref: 'pipeline_10',
    type: 'TSModelPredictor',
    title: 'Make Predictions',
    description:
      'The predictions are run over the evaluation dataset, the class accuracy and confusion matrix ' +
      'can be viewed to evaluate if the training model is preducting the categories as desired.',
    data: {
      layerSize: 3
    }
  },
  {
    index: 'pipeline_12',
    input_ref: 'pipeline_11',
    description:
      'Notice columns 0, 1 and 2 used to classify the flowers are the encoded dimensions from ' +
      'the autoencoder and not the original inputs from **pipeline 1**. However, to encode these ' +
      'dimentions, the values from **pipeline 1** need to be encoded first, so this classification ' +
      'requires **2** steps, reducing dimensions can be a good solution to avoid feeding a ' +
      'classifier with too much inputs.',
    type: 'DatasetTableViewer',
    data: {}
  }
]
