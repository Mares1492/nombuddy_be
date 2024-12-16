import {FastifyReply, FastifyRequest} from "fastify";
import {RestoParams} from "../types/global";
import {returnErrorMessage} from "../utils/errorHandlers";
import {getPositionData, getPositionsData} from "../services/positions";

export const getAllPositions = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const positions = await getPositionsData()
    if (!positions) {
        reply.send(returnErrorMessage("No positions found."));
    }
    reply.send({body:positions,message:"Found positions"});
};

export const getPositionById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {posId} = request.params;
    const position = await getPositionData(Number(posId));
    if (!position) {
        reply.send(returnErrorMessage("No position found."));
    }
    reply.send({body:position,message:"Found position"});
}
