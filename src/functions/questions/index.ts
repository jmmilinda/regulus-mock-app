import { handlerPath } from '@libs/handler-resolver';

export default {
  getAllQuestions: {
    handler: `${handlerPath(__dirname)}/handlers/retrieve.getAll`,
    events: [
      {
        http: {
          method: 'get',
          path: 'questions'
        },
      },
    ],
  },
  getQuestionById: {
    handler: `${handlerPath(__dirname)}/handlers/retrieve.getQuestionById`,
    events: [
      {
        http: {
          method: 'get',
          path: 'questions/{id}'          
        },
      },
    ],
  },
  createNewQuestion: {
    handler: `${handlerPath(__dirname)}/handlers/persist.createNew`,
    events: [
      {
        http: {
          method: 'post',
          path: 'questions/question'          
        },
      },
    ],
  },
  getAllQuestionsAsSorted: {
    handler: `${handlerPath(__dirname)}/handlers/retrieve.getAllAsSort`,
    events: [
      {
        http: {
          method: 'get',
          path: 'questions/{id}/sort'
        },
      },
    ],
  }
};