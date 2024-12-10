import {getAllMenus, getMenuById, updateRestaurantMenuById} from "../../controllers/menus";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllMenus);
    fastify.get('/:menuId', getMenuById);
    fastify.patch('/:menuId', updateRestaurantMenuById)
}
