import {FastifyInstance} from "fastify";
import {getPositionsByRestoId} from "../../../../controllers/positions";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', getPositionsByRestoId);
}
