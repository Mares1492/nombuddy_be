import {createRestaurant, getRestaurantById, getAllRestaurants} from "../../controllers/restaurants";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurants);
    fastify.get('/:restoId', getRestaurantById);
    fastify.post('/', createRestaurant);
}
