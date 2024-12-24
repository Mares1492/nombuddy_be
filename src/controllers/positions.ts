import {FastifyReply, FastifyRequest} from "fastify";
import {MenuPosition, Position, RestaurantMenuData, RestoParams} from "../types/global";
import {returnErrorMessage} from "../utils/errorHandlers";
import {getPositionData, getPositionsData, getRestoPositionsData} from "../services/positions";
import {prisma} from "../index";

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
        // business logic example
    }
    return positions;
}

export const getPositionsByRestoId = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    let positions:RestaurantMenuData[] = await getRestoPositionsData(Number(id));
    // Business discount
    positions = await applyDaytimeDiscounts(positions);
    if (!positions.length) {
        reply.send(returnErrorMessage("No positions found."));
    }
    reply.send({body:positions,message:"Found positions"});
}

export const createNewPosition = async (request:FastifyRequest<{ Params: RestoParams, Body: Position }>, reply:FastifyReply) => {
    const {id, menuId} = request.params;
    const newPosition = await prisma.position.create({ data: request.body});
    // TODO: add new menu position 
    const newMenuPosition = await prisma.menu_position.create({data: {}})

}
