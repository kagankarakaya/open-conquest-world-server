import {log} from '../shared/log';
import {Request} from '../Request';
import {Response} from '../Response';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as config from '../../config/real-config';

/**
 * Middleware for validating incoming JWTs.
 *
 * @export
 * @class JWTMiddleware
 */
export class JWTMiddleware {
  /**
   * Creates an instance of JWTMiddleware.
   *
   * @memberof JWTMiddleware
   */
  constructor() {}

  /**
   * Check to see whether a JWT is valid. This method will
   * also modify the user property of a request by changing
   * it to reflect the user that was included in the JWT.
   *
   * @param {Request} request
   * @return {Request} modified request
   * @memberof JWTMiddleware
   */
  checkJwt(request: Request): Request {
    // first get the jwt from the request
    let token;
    try {
      token = request.data.token;
      if (token === undefined) {
        throw new Error('Expected authorization token in request');
      }
    } catch (err) {
      throw new Error('Expected authorization token in request');
    }
    // check if token is valid
    try {
      // check if token is valid
      const payload = jwt.verify(token, config.secret);
      // get the user
      const username = payload.username;
      // set the user to the request
      request.data.username = username;
      return request;
    } catch (err) {
      log.error(err);
      throw new Error('Access denied, invalid authorization token.');
    }
  }
}
