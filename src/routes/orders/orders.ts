import {FastifyInstance} from "fastify";
import {deleteOrderById, getOrderById, getRestaurantOrderById, updateOrderById} from "../../controllers/orders";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getRestaurantOrderById);
    fastify.get('/', getOrderById);
    fastify.patch('/:id', updateOrderById);
    fastify.delete('/:id',deleteOrderById)
}
