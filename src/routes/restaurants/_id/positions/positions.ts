import {FastifyInstance} from "fastify";
import {getAllRestaurantPositions} from "../../../../controllers/positions";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantPositions);
}
