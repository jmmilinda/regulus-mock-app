import type { AWS } from '@serverless/typescript';
import health from '@functions/health';
import questions from '@functions/questions';
import dynamoDBTableDef from './src/resources/table.def';

const serverlessConfiguration: AWS = {
  service: 'regulus-mock-app',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-dynamodb-local'],
  provider: {
    name: 'aws',     
    stage: 'local',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      QUESTION_CATEGORY: '${self:custom.question_category}',
      QUESTION: '${self:custom.question}'
    },    
  },
  resources: {
    Resources: dynamoDBTableDef
  },
  // import the function via paths
  functions: { health, ...questions },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    stage: '${opt:stg,  self:provider.stage}',
    question_category: '${self:service}-question-category-${opt:stage, self:provider.stage}-tld',
    question: '${self:service}-question-${opt:stage, self:provider.stage}-tld',
    dynamodb: {
      stages: ["local"],
      start: {
        port: 8900,
        migrate: true,
        inMemory: true,
        onStart: true
      }
    }
  },
};

module.exports = serverlessConfiguration;
