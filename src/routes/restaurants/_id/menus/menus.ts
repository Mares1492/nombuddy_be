import {FastifyInstance} from "fastify";
import {
    createRestaurantMenuById,
    getAllRestaurantMenusById,
} from "../../../../controllers/menus";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantMenusById);
    fastify.post('/', createRestaurantMenuById);
}
