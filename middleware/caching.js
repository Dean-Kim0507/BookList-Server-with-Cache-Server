import { redis_client } from '../redis/redis.js';

const caching = async (req, res, next) => {
    redis_client.hget(
        'data', 'posts', (err, data1) => {
            const data = JSON.parse(data1);
            //if data exists, return it or next
            if (data) return res.status(200).json(data);
            else next();
        }
    );
}


export default caching;