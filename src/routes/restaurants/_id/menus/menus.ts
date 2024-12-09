import {FastifyInstance} from "fastify";
import {
    createMenuInRestaurantById,
    getMenusFromRestaurantById
} from "../../../../controllers/menus";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getMenusFromRestaurantById);
    fastify.post('/', createMenuInRestaurantById);
}
