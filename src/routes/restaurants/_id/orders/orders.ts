import {FastifyInstance} from "fastify";
import {getAllRestaurantOrders} from "../../../../controllers/orders";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantOrders);
}
