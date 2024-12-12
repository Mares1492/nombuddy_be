import {
    createNewMenu, deleteMenuById,
    getAllMenus,
    getMenuById,
    updateMenuById,
} from "../../controllers/menus";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllMenus);
    fastify.post('/', createNewMenu);
    fastify.get('/:menuId', getMenuById);
    fastify.patch('/:menuId', updateMenuById)
    fastify.delete('/:menuId', deleteMenuById);
}
