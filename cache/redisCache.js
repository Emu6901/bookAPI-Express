const redis = require('async-redis');
const client = redis.createClient(6379);

const expirationTime = 120; //second

async function setCache(path, data) {
    var path = path
    return await set(path, JSON.stringify(data))
}

async function getCache(path) {
    var data = await get(path);
    return JSON.parse(data);
}

async function set(key, data) {
    await client.setex(key, expirationTime, data);
}

async function get(key) {
    return await client.get(key);
}

async function clearCache(path) {
    return await clear(path);
}

async function clear(key) {
    return await client.del(key);
}

module.exports.getCache = getCache
module.exports.setCache = setCache
module.exports.clearCache = clearCache