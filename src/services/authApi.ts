/* eslint-disable-@typescript-eslint/no-explicit-any */
import {postRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const loginAPI = (params: {Username: string; Password: string}) => {
  const URL = 'api/meter-reader/login';
  return postRequest(URL, params, RESPONSE_RETURN_VALUE) as any;
};
