import {FastifyInstance} from "fastify";
import {getAllMenus, getMenusFromRestaurantById} from "../../../../controllers/menus";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllMenus);
    fastify.get('/:menuId', getMenusFromRestaurantById);
    fastify.post('/', ()=>{});
}
