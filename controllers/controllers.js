import { postAction } from '../data/actions.js';
import { setData } from '../redis/redis.js';

export const ping = (req, res, next) => {
    try {
        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export const posts = async (req, res, next) => {
    try {
        let data = await postAction();
        //caching
        setData(data);
        res.status(200).json({ success: true, data: data })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
