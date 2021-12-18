import { ping, posts } from '../controllers/controllers.js';
import httpMocks from 'node-mocks-http';
import expectedData from './data/expectedData.json';

jest.mock('../controllers/controllers.js');

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
})

it("ping test", async () => {

    ping(req, res, next);
    expect(res.status).toBe(200);

})

it("posts test", async () => {

    controllers.ping(req, res, next);
    expect(res.status).toBe(200);
    expect(res._getJSONData()).toStrictEqual(expectedData)
})
