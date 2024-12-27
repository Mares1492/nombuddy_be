import {
    createNewMenu, deleteMenuById,
    getAllMenus,
    getMenuById,
    updateMenuById,
} from "../../controllers/menus";
import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getAllMenus);
    fastify.get('/:id', getMenuById);
    fastify.patch('/:id', updateMenuById)
    fastify.delete('/:id', deleteMenuById);
}
