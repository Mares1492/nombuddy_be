import {FastifyInstance} from "fastify";
import {getAllPositions} from "../../controllers/positions";

export default async (fastify: FastifyInstance) => {
    fastify.get('/',getAllPositions)
}
