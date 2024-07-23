import {get} from 'lodash';
import {retrieveUserSession} from '../utils';
import getApi from './api';
import {ApiResponse, SessionData} from '../types';
import {AxiosResponse} from 'axios';

const getResponse = (
  response: AxiosResponse<ApiResponse, any>,
  returnValue?: any,
) => {
  return returnValue ? get(response, returnValue) : response;
};

const getHeaderRequest = (
  user: any,
  params: {[key: string]: any} | null,
  endPoint: string,
  method: string,
  headers?: {[key: string]: any},
) => {
  console.log('headers', headers);

  if (user) {
    const Authorization = `Bearer ${user.token}`;
    const AppName = 'RIPPLE';

    if (params) {
      // if (headers && headers['Content-Type'] === 'multipart/form-data') {
      //   return {
      //     method: method,
      //     url: endPoint,
      //     data: params,
      //     headers: {Authorization, AppName, ...headers},
      //     transformRequest: (data: any) => {
      //       return data; // thats enough
      //     },
      //   };
      // }
      return {
        method: method,
        url: endPoint,
        data: params,
        headers: {Authorization, AppName, ...headers},
      };
    } else {
      // if (headers && headers['Content-Type'] === 'multipart/form-data') {
      //   return {
      //     method: method,
      //     url: endPoint,
      //     headers: {Authorization, AppName, ...headers},
      //     transformRequest: (data: any) => {
      //       return data; // thats enough
      //     },
      //   };
      // }
      return {
        method: method,
        url: endPoint,
        headers: {Authorization, AppName, ...headers},
      };
    }
  } else {
    // if (headers && headers['Content-Type'] === 'multipart/form-data') {
    //   return {
    //     method: method,
    //     data: params,
    //     url: endPoint,
    //     headers: {AppName: 'RIPPLE', ...headers},
    //     transformRequest: (data: any) => {
    //       return data; // thats enough
    //     },
    //   };
    // }
    return {
      method: method,
      data: params,
      url: endPoint,
      headers: {AppName: 'RIPPLE', ...headers},
    };
  }
};

export const putRequest = (
  endPoint: string,
  params: {[key: string]: any},
  returnValue: string,
  errorHandler?: (error: any) => void,
) => {
  return new Promise((resolve, reject) => {
    retrieveUserSession().then((session): any => {
      const parsedSession: SessionData = session ? JSON.parse(session) : null;
      const headers = getHeaderRequest(parsedSession, params, endPoint, 'PUT');
      const api = getApi();
      api
        .request(headers)
        .then(response => resolve(getResponse(response, returnValue)))
        .catch(error => {
          reject(errorHandler ? errorHandler(error) : error);
        });
    });
  });
};

export const getRequest = (
  endPoint: string,
  returnValue: string,
  params: null | {[key: string]: any} = null,
  errorHandler?: (error: any) => void,
) => {
  return new Promise((resolve, reject) => {
    retrieveUserSession().then((session: string | null | undefined) => {
      const parsedSession: SessionData = session ? JSON.parse(session) : null;
      const headers = getHeaderRequest(
        parsedSession,
        params,
        endPoint,
        'GET',
      ) as any;
      if (returnValue === 'arraybuffer') {
        headers.responseType = 'arraybuffer';
        headers.responseEncoding = 'binary';
      }
      const api = getApi();
      api
        .request(headers)
        .then(response =>
          resolve(
            returnValue === 'arraybuffer'
              ? response
              : getResponse(response, returnValue),
          ),
        )
        .catch((error: any) => {
          reject(errorHandler ? errorHandler(error) : error);
        });
    });
  });
};

export const postRequest = (
  endPoint: string,
  params: {[key: string]: any},
  returnValue?: string,
  errorHandler?: ((error: any) => void) | null,
  extraHeaders?: {[key: string]: any},
) => {
  return new Promise((resolve, reject) => {
    retrieveUserSession().then(session => {
      const parsedSession: SessionData = session ? JSON.parse(session) : null;
      const headers = getHeaderRequest(
        parsedSession,
        params,
        endPoint,
        'POST',
        extraHeaders,
      );
      const api = getApi();
      api
        .request(headers)
        .then(response => resolve(getResponse(response, returnValue)))
        .catch(error => {
          reject(errorHandler ? errorHandler(error) : error);
        });
    });
  });
};

export const deleteRequest = (
  endPoint: string,
  params: {[key: string]: any} | null,
  returnValue: string,
  errorHandler?: (error: any) => void,
) => {
  return new Promise((resolve, reject) => {
    retrieveUserSession().then(session => {
      const parsedSession = session ? JSON.parse(session) : null;
      const headers = getHeaderRequest(
        parsedSession,
        params,
        endPoint,
        'DELETE',
      );
      const api = getApi();
      api
        .request(headers)
        .then(response => resolve(getResponse(response, returnValue)))
        .catch(error => {
          reject(errorHandler ? errorHandler(error) : error);
        });
    });
  });
};

export default {
  putRequest,
  getRequest,
  postRequest,
  deleteRequest,
};
