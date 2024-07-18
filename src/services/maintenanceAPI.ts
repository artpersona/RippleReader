/* eslint-disable-@typescript-eslint/no-explicit-any */
import {postRequest, getRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const getDisconnectionListAPI = (search: string, clusters: string) => {
  let URL = 'api/support/reconnection';
  const queryParams = '?search=' + search + '&clusters=' + clusters;
  URL += queryParams;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getReconnectionListAPI = (search: string, clusters: string) => {
  let URL = 'api/support/disconnection';
  const queryParams = '?search=' + search + '&clusters=' + clusters;
  URL += queryParams;

  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const getOtherListAPI = (search: string, clusters: string) => {
  let URL = 'api/support/other-services';
  const queryParams = '?search=' + search + '&clusters=' + clusters;
  URL += queryParams;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const addActionAPI = (params: any) => {
  const URL = 'api/support/action-taken';
  return postRequest(URL, params, RESPONSE_RETURN_VALUE) as any;
};

export const createTicket = (params: any) => {
  const URL = 'api/support/create-ticket';
  return postRequest(URL, params, RESPONSE_RETURN_VALUE, null, {
    'Content-Type': 'multipart/form-data',
  }) as any;
};

export const getAccountTickets = (account_id: string) => {
  const URL = 'api/support/tickets?account_id=' + account_id;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};
