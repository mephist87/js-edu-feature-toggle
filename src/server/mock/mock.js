const nock = require('nock');

const normalDelay = 1000;

function healthCheck() {
    nock('http://localhost:8080')
        .persist()
        .get('/health')
        .delay(normalDelay)
        .reply(200, require('./health.json'));
}

module.exports = {
    healthCheck
};
