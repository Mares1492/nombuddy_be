import {FastifyInstance} from "fastify";
import {createNewOrder, getAllRestaurantOrders} from "../../../../controllers/orders";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantOrders);
    fastify.post('/', createNewOrder);
}
