import {FastifyInstance} from "fastify";
import {createNewPosition, getAllPositions, getPositionById} from "../../controllers/positions";

export default async (fastify: FastifyInstance) => {
    fastify.get('/',getAllPositions)
    fastify.get('/:posId',getPositionById)
    fastify.post('/',createNewPosition)
}
