import { middyfy } from '@libs/lambda';

const statusCheck = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      title: 'Check Health Status',
      message: 'Health ok..!'
    })
  };
};

export const health = middyfy(statusCheck);
