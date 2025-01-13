/* eslint-disable-@typescript-eslint/no-explicit-any */
import {getRequest, postRequest} from './request';
import {RESPONSE_RETURN_VALUE} from './serviceapi';

export const downloadReadingListAPI = (clusterId: string) => {
  const URL = 'api/download/reading-list' + `?cluster_id=${clusterId}`;
  return getRequest(URL, RESPONSE_RETURN_VALUE) as any;
};

export const downloadComputingDataAPI = (projectIds: any) => {
  const URL = 'api/meter-reader/computation-data';
  const params = {
    project_ids: projectIds,
  };
  return postRequest(URL, params, RESPONSE_RETURN_VALUE) as any;
};
