import {FastifyReply, FastifyRequest} from "fastify";
import {RestaurantMenuData, RestoParams} from "../types/global";
import {returnErrorMessage} from "../utils/errorHandlers";
import {getPositionData, getPositionsData, getRestoPositionsData} from "../services/positions";

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

const applyDaytimeDiscounts = (positions:RestaurantMenuData[]) => {
    for (const position of positions) {
        //
    }
    return positions;
}

export const getPositionsByRestoId = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    const positions:RestaurantMenuData[] = await getRestoPositionsData(Number(id));
    // Business discount
    const positions = await applyDaytimeDiscounts(positions);
    if (!positions.length) {
        reply.send(returnErrorMessage("No positions found."));
    }
    reply.send({body:positions,message:"Found positions"});
}
