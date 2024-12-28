import {createRestaurant, getAllRestaurants} from "../../controllers/restaurants";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurants);
    fastify.post('/', createRestaurant);
}
