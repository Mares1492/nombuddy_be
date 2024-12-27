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
    const {id} = request.params;
    const position = await getPositionData(Number(id));
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
    if (request.body.menu_category_menu_id === null || isNaN(request.body.menu_category_menu_id)) {
        reply.send(returnErrorMessage(`Received a wrong menu category id: ${request.body.menu_category_menu_id}`));
    }
    const newPosition = await prisma.position.create({ data: request.body.position_data})
        .then(async (position) => {
            await prisma.menu_position.create({
                data: {
                    menu_category_menu_id: Number(request.body.menu_category_menu_id),
                    position_id: position.id
                }
            }).catch((err) => {
                reply.send(returnErrorMessage("Created position without linking it to menu",err.statusCode,position));
            })
            return position
        })
        .catch(()=>{
            reply.send(returnErrorMessage("Position was not created"));
        })

    /*TODO:
       - validate body data
       - consider using transactions
     */
    reply.send({body:newPosition,message:"Created new position"});

}

export const deletePositionById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    const position = await prisma.position.findUnique({where:{id:Number(id)}})
    if (!position) {
        reply.send(returnErrorMessage("No position found.",404));
    }
    //TODO: move to service lvl
    await prisma.menu_position.deleteMany({where:{position_id:Number(id)}})
    // TODO: check if has right to do so
    await prisma.position.delete({ where: { id:Number(id) } }).catch((err) => {
        //TODO: err.message should only be send to trusted source
        reply.send(returnErrorMessage(err.message,err.statusCode));
    });
    reply.send({body:position,message:`Deleted position: ${id}`});
}
