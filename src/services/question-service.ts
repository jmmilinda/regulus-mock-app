import { DynamoDB } from 'aws-sdk';
import { QUESTION } from '../constants/question-constant';
import { v4 as uuid } from 'uuid';

export default class QuestionService {
    dynamoDBClient: DynamoDB.DocumentClient;

    constructor(db: DynamoDB.DocumentClient) {
        this.dynamoDBClient = db;
    }

    insert = async (question: any) => {
        const now = new Date().getTime();
        const id = uuid();

        const params = {
            RequestItems: {
                [`${QUESTION}`]: [
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: 'ITEM#HEADER',
                                content: null,
                                updateTime: now,
                                createTime: now,
                                type: 'header',
                                gsk1sort: 'ACTIVE#9999999999',
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: 'ITEM#WIP',
                                title: question.title,
                                name: question.name,
                                content: JSON.stringify(question),
                                updateTime: now,
                                createTime: now,
                                type: 'wip',
                                gsk1sort: 'ACTIVE#8888888888',
                            }
                        }
                    }
                ]
            }
        };

        try {
            await this.dynamoDBClient.batchWrite(params).promise();
            return { question, id };
        } catch (error) {
            console.error(error);
        }
    };

    getAll = async () => {
        try {
            let results = this.dynamoDBClient.scan({ TableName: `${QUESTION}` }).promise();
            return results;
        } catch (error) {
            console.error(error);
        }
    };

    getById = async (id: string) => {
        try {
            let results = this.dynamoDBClient.get({
                TableName: `${QUESTION}`,
                Key: {
                    id
                }
            }).promise();
            return results;
        } catch (error) {
            console.error(error);
        }
    };

    getAllAsLimit = async (id: string) => {
        try {
            const params = {
                TableName: `${QUESTION}`,
                KeyConditionExpression: 'id = :hashKey',
                ExpressionAttributeValues: {
                    ':hashKey': id
                },
                Limit: 3
            };
            let results = this.dynamoDBClient.query(params).promise();
            return results;
        } catch (error) {
            console.error(error);
        }
    };
}
