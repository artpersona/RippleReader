/* eslint-disable-@typescript-eslint/no-explicit-any */
import {getRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const downloadReadingListAPI = (clusterId: string) => {
  const URL = 'api/download/reading-list' + `?cluster_id=${clusterId}`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};
