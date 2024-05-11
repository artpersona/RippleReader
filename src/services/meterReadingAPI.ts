/* eslint-disable-@typescript-eslint/no-explicit-any */
import {postRequest, getRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const getReadingListAPI = () => {
  const URL = 'api/meter-reader/accounts/';
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getCompletedListAPI = () => {
  const URL = 'api/meter-reader/accounts/completed';
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getAccountDetailsAPI = (accountID: number) => {
  const URL = `api/meter-reader/accounts/${accountID}`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const submitReadingAPI = (params: any) => {
  const URL = 'api/meter-reader/submit';
  return postRequest(URL, params, RESPONSE_RETURN_VALUE) as any;
};

export const getSOAAPI = (accountID: number) => {
  const URL = `api/meter-reader/accounts/${accountID}/soa`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};
