/* eslint-disable-@typescript-eslint/no-explicit-any */
import {postRequest, getRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const getCCFTypesAPI = () => {
  const URL = '/api/support/types?is_user=true';
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getReadingListAPI = (search: string, clusters: string) => {
  let URL = 'api/meter-reader/accounts/';
  const queryParams = '?search=' + search + '&clusters=' + clusters;
  URL += queryParams;
  console.log('URL', URL);
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getCompletedListAPI = (search: string, clusters: string) => {
  let URL = 'api/meter-reader/accounts/completed';
  const queryParams = '?search=' + search + '&clusters=' + clusters;
  URL = URL + queryParams;

  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getClustersAPI = (includeCount: boolean) => {
  let URL = 'api/meter-reader/clusters';
  if (includeCount) {
    URL = URL + '?include_count=true';
  }
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getAccountDetailsAPI = (accountID: number) => {
  const URL = `api/meter-reader/accounts/${accountID}`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const submitReadingAPI = (params: any) => {
  const URL = 'api/meter-reader/submit';
  console.log('type of params: ', typeof params);
  return postRequest(URL, params, RESPONSE_RETURN_VALUE, null, {
    'Content-Type': 'multipart/form-data',
  }) as any;
};

export const getSOAAPI = (soa_id: number) => {
  const URL = `api/billing/soa?soa_id=${soa_id}`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getAccountSOAAPI = (accountID: number) => {
  const URL = `api/meter-reader/accounts/${accountID}/soa`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const createUserTicket = (params: any) => {
  const URL = 'api/support/create-ticket';
  return postRequest(URL, params, RESPONSE_RETURN_VALUE) as any;
};
