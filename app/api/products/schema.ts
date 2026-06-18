import {z} from 'zod';

const shema = z.object({
    name:z.string().min(3),
    price:z.number().min(1).max(1000)
})

export default shema;