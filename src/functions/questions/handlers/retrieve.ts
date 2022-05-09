import { dynamoDBClient } from './../../../services/dynamoClient-service';
import QuestionService from '../../../services/question-service';

export const getAll = async () => {
    const questionService = new QuestionService(dynamoDBClient);
    let results = await questionService.getAll();

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};

export const getQuestionById = async (events: any) => {
    const questionService = new QuestionService(dynamoDBClient);
    let results = await questionService.getById(events.pathParameters.id)
 
    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};