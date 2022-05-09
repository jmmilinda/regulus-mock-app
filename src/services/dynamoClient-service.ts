import { DynamoDB } from 'aws-sdk';

export const dynamoDBClient =  new DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8900'
});
