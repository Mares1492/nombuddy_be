import {FastifyInstance} from "fastify";
import {
    createNewMenu,
    getAllRestaurantMenus,
} from "../../../../controllers/menus";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllRestaurantMenus);
    fastify.post('/', createNewMenu);
}
