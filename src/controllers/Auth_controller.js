/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */

export const checkAuth = async (requestObject) => {
  console.log(`-> GOT AUTH REQUEST\n\t${requestObject}`);
  const resStatus = 200;
  const resJson = {
    message: 'You are now logged in !',
  };
  return { status: resStatus, json: resJson };
};
