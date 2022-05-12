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
                                updateTime: now,
                                createTime: now,
                                type: 'header',
                                gsk1sort: 'ACTIVE#9999999999',
                                publishedVer: 4,
                                latestVer: 5,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: 'VERSION#1',
                                title: question.title,
                                name: question.name,
                                content: question.content,
                                updateTime: now,
                                createTime: now,
                                type: 'wip',
                                version: 1,
                                gsk1sort: `ACTIVE#WIP#${now}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: `VERSION#2`,
                                title: question.title,
                                name: question.name,
                                content: question.content,
                                updateTime: now,
                                createTime: now,
                                type: 'wip',
                                version: 2,
                                gsk1sort: `ACTIVE#WIP#${now}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: `VERSION#3`,
                                title: question.title,
                                name: question.name,
                                content: question.content,
                                updateTime: now,
                                createTime: now,
                                type: 'published',
                                version: 3,
                                gsk1sort: `ACTIVE#PUBLISHED#${now}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: `VERSION#4`,
                                title: question.title,
                                name: question.name,
                                content: question.content,
                                updateTime: now,
                                createTime: now,
                                type: 'published',
                                version: 4,
                                gsk1sort: `ACTIVE#PUBLISHED#${now}`,
                            },
                        },
                    },
                    {
                        PutRequest: {
                            Item: {
                                id,
                                sort: `VERSION#5`,
                                title: question.title,
                                name: question.name,
                                content: question.content,
                                updateTime: now,
                                createTime: now,
                                type: 'deleted',
                                version: 5,
                                gsk1sort: `DELETED#${now}`,
                            },
                        },
                    },
                ],
            },
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
