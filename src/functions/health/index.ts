import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.health`,
  events: [
    {
      http: {
        method: 'get',
        path: 'health'        
      },
    },
  ],
};
