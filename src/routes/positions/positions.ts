import {FastifyInstance} from "fastify";
import {createNewPosition, deletePositionById, getAllPositions, getPositionById} from "../../controllers/positions";

export default async (fastify: FastifyInstance) => {
    fastify.get('/',getAllPositions)
    fastify.get('/:id',getPositionById)
    fastify.post('/',createNewPosition)
    fastify.delete('/:id',deletePositionById)
}
