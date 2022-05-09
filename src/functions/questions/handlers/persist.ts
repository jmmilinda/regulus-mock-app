import QuestionService from '../../../services/question-service';
import { dynamoDBClient } from './../../../services/dynamoClient-service';

export const createNew = async (events: any) => {

    const questionService = new QuestionService(dynamoDBClient);    
    const response = await questionService.insert(events.body);
    return {
        statusCode: 201,
        body: JSON.stringify(response)
    };
};
