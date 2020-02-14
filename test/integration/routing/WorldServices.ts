import { worldServices } from "../../../src/routing";
import * as chai from 'chai';
import * as mocha from 'mocha';
import {log} from '../../../src/shared/log';
import { ServiceNames } from "../../../src/services/ServiceNames";
import { ServiceOperations } from "../../../src/services/ServiceOperations";
import { models } from "../../../src/models";

const assert = chai.assert;

describe('WorldServices', function() {
  // Start transaction before each test
  const connection = models.sequelize;
  beforeEach(() => {
    return connection.query('START TRANSACTION');
  });
  // Rollback any database changes made during a test
  afterEach(() => {
    return connection.query('ROLLBACK');
  });

  it('should registerUser request to the right service and return expected response', async function() {
    const username = 'test_username';
    const password = 'test_password';
    const registerUserData = {
      'username': username,
      'password': password,
    };
    const registerUserRequestJson = {
      'service': ServiceNames.User,
      'operation': ServiceOperations.RegisterUser,
      'data': registerUserData,
    };
    return worldServices.dispatchRequest(registerUserRequestJson)
        .then((response) => {
          // assert response contains valid jwt
          throw new Error('TODO assert jwt is valid');
          // assert expected service
          assert(response.data.service === ServiceNames.User);
          // assert expected operation
          assert(response.data.operation === ServiceOperations.RegisterUser);
        })
        .catch((err) => {
          log.error(err.message);
          assert.fail(err);
        });
  });

  it('should return error for unrecognized request service', async function() {
    const unrecognizedRequest = {
      'service': 'unRecognizedService',
      'operation': ServiceOperations.RegisterUser,
      'data': {},
    };

    return worldServices.dispatchRequest(unrecognizedRequest)
        .then((response) => {
          assert.fail('Expected unrecognized service error');
        })
        .catch((err) => {
          assert(err.message === 'Unrecognized service: unRecognizedService', 'Didn\'t get unsrecognized service error');
        });
  });
});
