import {FastifyInstance} from "fastify";
import {getRestaurantOrderById} from "../../controllers/orders";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getRestaurantOrderById);
}
