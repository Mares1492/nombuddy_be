import {FastifyInstance} from "fastify";

export default async (fastify: FastifyInstance) => {
    fastify.get('/', ()=>{});
    fastify.get('/:menuId', ()=>{});
    fastify.post('/', ()=>{});
}
