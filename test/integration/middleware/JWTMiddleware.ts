import * as chai from 'chai';
import * as mocha from 'mocha';
import {Response} from '../../../src/Response';
import {JWTMiddleware} from '../../../src/middleware/JWTMiddleware';
import { userServices } from '../../../src/services';
import { Request } from '../../../src/Request';
import { ServiceNames } from '../../../src/services/ServiceNames';
import { ServiceOperations } from '../../../src/services/ServiceOperations';
import { models } from '../../../src/models';
import { log } from '../../../src/shared/log';

const jwtMiddleware = new JWTMiddleware();

describe('JWTMiddleware', function() {
  const assert = chai.assert;

  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('should accept a valid JWT', async function() {
    const username = 'test_username';
    const password = 'test_password';
    const registerUserData = {
      'username': username,
      'password': password,
    };
    const registerUserRequest = new Request(ServiceNames.User, ServiceOperations.RegisterUser, registerUserData);
    // create a jwt by registering a new user
    return userServices.registerUser(registerUserRequest)
        .then((response) => {
          // get jwt from response
          const token = response.data;
          log.info(token);
          // create new request with token
          const getArmiesData = {
            'token': token,
          };
          const getArmiesRequest = new Request(ServiceNames.Army, ServiceOperations.GetArmies, getArmiesData);
          // validate token
          const actualRequest = jwtMiddleware.checkJwt(getArmiesRequest);
          // assert response is expected
          assert(actualRequest.data.username === username);
        })
        .catch((err) => {
          assert.fail(err.message);
        });
  });

  it('should fail with a invalid JWT', async function() {
    throw new Error('no impl');
  });

  it('should fail when a JWT is not included', async function() {
    throw new Error('no impl');
  });

  it('should fail when the request data is null', async function() {
    throw new Error('no impl');
  });

  it('should fail with a JWT signed with a different secret', async function() {
    throw new Error('no impl');
  });
});
