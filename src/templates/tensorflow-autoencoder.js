module.exports = [
  {
    index: 'pipeline_0',
    type: 'DatasetLoader',
    title: 'Dataset Loader',
    description:
      'This pipeline uses the iris dataset from UCI Machile Learning ' +
      '[repository](https://archive.ics.uci.edu/ml/datasets/iris). It ' +
      'uses **tensorflow** to create a model that exemplifies an **autoencoder** to reduce ' +
      'dimensions.',
    data: {
      remoteFile: 'https://raw.githubusercontent.com/pandas-dev/pandas/master/pandas/tests/data/iris.csv'
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
    title: 'Autoencoder Model',
    description:
      'When **training** this autoencoder, the model *output* will try to fit its ' +
      '*input*, while a *hidden* layer will reduce the feature dimensions.',
    data: {
      epochSize: 30,
      batchSize: 20,
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
      xAxis: 4,
      yAxis: 5,
      zAxis: 6,
      lAxis: 7
    }
  }
]