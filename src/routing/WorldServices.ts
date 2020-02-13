import {log} from '../shared/log';
import {Request} from '../Request';
import {BaseServices} from '../services/BaseServices';
import {ServiceNames} from '../services/ServiceNames';

/**
 * WorldServices is meant to route jsons to the appropriate services.
 *
 * @export
 * @class WorldServices
 */
export class WorldServices {
  private services: Map<ServiceNames, BaseServices>;

  /**
   * Creates an instance of WorldServices.
   *
   * @memberof WorldServices
   */
  constructor() {
    log.info('WorldService initialized.');
    this.services = new Map<ServiceNames, BaseServices>();
  }

  /**
   * Register a new service with WorldServices.
   *
   * @param {BaseServices} service
   * @memberof WorldServices
   */
  registerService(service: BaseServices) {
    this.services.set(service.serviceName, service);
  }

  /**
   *
   *
   * @param {*} json
   * @return {Request}
   * @memberof WorldServices
   */
  dispatchRequest(json): any {
    log.info('WorldServices received json: ' + JSON.stringify(json));

    const services = this.services;
    return new Promise( function(resolve, reject) {
      try {
        json = Request.fromJSON(json);
      } catch (err) {
        reject(err);
      }
      // check if service exists
      if (services.get(json.service) === undefined) {
        reject(new Error('Unrecognized service: ' + json.service));
        return;
      }
      services.get(json.service).handle(json)
          .then((res) => {
            const response = JSON.stringify(res);
            log.info('WorldService returning response: ' + response);
            resolve(res);
          })
          .catch((err) => {
            err = JSON.stringify(err);
            reject(err);
          });
    });
  }
}
