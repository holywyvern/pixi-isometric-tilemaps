const path = require('path');

module.exports = [
  {
    entry: path.join(__dirname, 'src', 'test.ts'),
    output: {
      filename: 'test.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'] 
    },
    module: {
      rules: [ 
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
  },
  {
    entry: path.join(__dirname, 'src', 'test.ts'),
    output: {
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'] 
    },
    module: {
      rules: [ 
        { 
          test: /\.tsx?$/, 
          loader: 'ts-loader',
          options: {
            configFileName: 'test.tsconfig.json'
          }
        }
      ]
    }
  },
  {
    entry: path.join(__dirname, 'src', 'build.ts'),
    target: 'node',
    output: {
      filename: '[name].js',
      path: './dist',
      libraryTarget: 'commonjs2',
    },
    externals: [ 'pixi.js', 'fpsmeter' ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js'] 
    },
    node: {
      __dirname: false,
      __filename: false,
    },    
    module: {
      rules: [ 
        { test: /\.tsx?$/, loader: 'ts-loader' }
      ]
    }
  }  
]