import {log} from '../utils/log';
import {Response} from '../Response';

/**
 * The base class for all services which contains the shared handle
 * implementation.
 *
 * @class BaseServices
 */
export class BaseServices {
  public handlers;
  public service;

  /**
   * Creates an instance of BaseServices.
   * @memberof BaseServices
   */
  constructor() {}

  /**
   * Chooses which method to dispatch the request to based on the operation
   * specified by the request.
   *
   * @param {*} request
   * @return {Promise}
   * @memberof BaseServices
   */
  handle(request): Promise<Response> {
    const handlers = this.handlers;
    const service = this.service;
    const clazz = this.constructor.name;

    log(clazz + ' received request: ' + JSON.stringify(request));
    return new Promise( function(resolve, reject) {
      handlers[request.operation](request)
          .then((res) => {
            const response = new Response(service, request.operation, res);
            log(clazz + ' returning response: ' + JSON.stringify(response));
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
    });
  }
}