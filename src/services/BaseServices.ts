import {log} from '../shared/log';
import {Response} from '../Response';
import {ServiceNames} from './ServiceNames';

/**
 * The base class for all services which contains the shared handle
 * implementation.
 *
 * @class BaseServices
 */
export class BaseServices {
  public handlers;
  public serviceName: ServiceNames;

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
    const serviceName = this.serviceName;
    const clazz = this.constructor.name;

    log.info(clazz + ' received request: ' + JSON.stringify(request));
    return new Promise( function(resolve, reject) {
      if (handlers[request.operation] === undefined) {
        return reject(new Error('Unsupported operation: ' + request.operation));
      }
      handlers[request.operation](request)
          .then((res) => {
            const response = new Response(serviceName, request.operation, res);
            log.info(clazz + ' returning response: ' + JSON.stringify(response));
            resolve(response);
          })
          .catch((err) => {
            log.error(err.stack);
            reject(err.stack);
          });
    });
  }
}
