import {createRestaurant, getRestaurantById, getRestaurants} from "../../controllers/restaurants";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getRestaurants);
    fastify.get('/:restoId', getRestaurantById);
    fastify.post('/', createRestaurant);
}
