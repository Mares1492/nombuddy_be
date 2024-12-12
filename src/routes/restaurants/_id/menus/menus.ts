import {FastifyInstance} from "fastify";
import {
    createNewMenu,
    getAllRestaurantMenusById,
} from "../../../../controllers/menus";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantMenusById);
    fastify.post('/', createNewMenu);
}
