/**
 * Implementation of the Mock-Backend
 * https://medium.com/@OlegVaraksin/set-up-a-http-service-for-backendless-development-in-angular-2-83172970949b
 * with some slight changes @JDE
 */

import {
  Http,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend,
  RequestOptions
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { users } from './users';
import { User } from '../user/models/user.model';
import { parse } from 'querystring';

function fakeBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions,
  realBackend: XHRBackend
) {
  // first, get users from the local storage or initial data array
  let data: User[] = JSON.parse(localStorage.getItem('users')) || users;

  // configure fake backend
  backend.connections.subscribe((connection: MockConnection) => {
    // wrap in timeout to simulate server api call
    setTimeout(() => {
      // get all users
      if (
        connection.request.url.endsWith('/api/user') &&
        connection.request.method === RequestMethod.Get
      ) {
        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              body: data
            })
          )
        );

        return;
      }

      // create user
      if (
        connection.request.url.endsWith('/api/user') &&
        connection.request.method === RequestMethod.Post
      ) {
        const receivedUser = JSON.parse(connection.request.getBody());
        const newUser = Object.assign(receivedUser, {
          id: new Date().valueOf()
        });
        data[data.length] = newUser;

        localStorage.setItem('users', JSON.stringify(data));

        connection.mockRespond(
          new Response(
            new ResponseOptions({
              status: 200,
              body: newUser
            })
          )
        );

        return;
      }

      // update user
      if (
        connection.request.url.endsWith('/api/user') &&
        connection.request.method === RequestMethod.Put
      ) {
        const receivedUser = JSON.parse(connection.request.getBody());
        const clonedUser = Object.assign({}, receivedUser);
        let userWasFound = false;
        data.some((element: User, index: number) => {
          if (element.id === clonedUser.id) {
            data[index] = clonedUser;
            userWasFound = true;
            return true;
          }
        });

        if (!userWasFound) {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 400,
                body: 'User could not be updated because was not found'
              })
            )
          );
        } else {
          localStorage.setItem('users', JSON.stringify(data));

          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200 }))
          );
        }

        return;
      }

      // delete user
      if (
        connection.request.url.match(/\/api\/user\/[0-9]*$/) &&
        connection.request.method === RequestMethod.Delete
      ) {
        const urlParts = connection.request.url.split('/');
        const id = parseInt(urlParts[urlParts.length - 1], 10);
        const sizeBeforeDelete = data.length;
        data = data.filter((element: User) => element.id !== id);
        if (sizeBeforeDelete === data.length) {
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                status: 400,
                body: 'User could not be deleted because was not found'
              })
            )
          );
        } else {
          localStorage.setItem('users', JSON.stringify(data));

          connection.mockRespond(
            new Response(new ResponseOptions({ status: 200 }))
          );
        }

        return;
      }

      // pass through any requests not handled above
      const realHttp = new Http(realBackend, options);
      const requestOptions = new RequestOptions({
        method: connection.request.method,
        headers: connection.request.headers,
        body: connection.request.getBody(),
        url: connection.request.url,
        withCredentials: connection.request.withCredentials,
        responseType: connection.request.responseType
      });
      realHttp.request(connection.request.url, requestOptions).subscribe(
        (response: Response) => {
          connection.mockRespond(response);
        },
        (error: any) => {
          connection.mockError(error);
        }
      );
    }, 500);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service
  provide: Http,
  useFactory: fakeBackendFactory,
  deps: [MockBackend, BaseRequestOptions, XHRBackend]
};
