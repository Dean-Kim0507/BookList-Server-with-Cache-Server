import redis from "redis";

const redis_client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: 6379
})

redis_client.on('error', err => {
    console.log('Error ' + err);
});

const setData = data => {
    redis_client.hmset(
        'data', 'posts', JSON.stringify(data),
    );
}

export { redis_client, setData }