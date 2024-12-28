import {FastifyInstance} from "fastify";
import {deleteRestaurantById, getRestaurantById, updateRestaurantById} from "../../../controllers/restaurants";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getRestaurantById);
    fastify.patch('/', updateRestaurantById);
    fastify.delete('/', deleteRestaurantById);
}
