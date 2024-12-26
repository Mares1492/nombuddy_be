import {FastifyReply, FastifyRequest} from "fastify";
import {CreatePositionBody, MenuPosition, Position, RestaurantMenuData, RestoParams} from "../types/global";
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

export const createNewPosition = async (request:FastifyRequest<{ Params: RestoParams, Body: CreatePositionBody }>, reply:FastifyReply) => {
    const newPosition = await prisma.position.create({ data: request.body.position_data});
    /*TODO:
       - validate body data
       - consider using transactions
     */
    const newMenuPosition = await prisma.menu_position.create({data: {menu_category_menu_id:request.body.menu_category_id,position_id:newPosition.id}})
    reply.send({body:{},message:"Created new position"});

}
