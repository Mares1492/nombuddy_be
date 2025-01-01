import {FastifyReply, FastifyRequest} from "fastify";
import {CreatePositionBody, MenuPosition, Position, RestaurantMenuData, RestoParams} from "../types/global";
import {returnErrorMessage} from "../utils/errorHandlers";
import {deletePosition, getPositionData, getPositionsData, getRestoPositionsData} from "../services/positions";
import {prisma} from "../index";

export const getAllPositions = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const positions = await getPositionsData()
    if (!positions) {
        reply.send(returnErrorMessage("No positions found."));
    }
    reply.send({body:positions,message:"Found positions"});
};

export const getAllRestaurantPositions = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    let positions:RestaurantMenuData[] = await getRestoPositionsData(Number(id));
    if (!positions.length) {
        reply.send(returnErrorMessage("No positions found."));
    }
    reply.send({body:positions,message:"Found positions"});
}

export const createNewPosition = async (request:FastifyRequest<{ Params: RestoParams, Body: CreatePositionBody }>, reply:FastifyReply) => {
    if (typeof request.body.menu_category_menu_id !== 'number') {
        reply.send(returnErrorMessage(`Received a wrong menu category menu id: ${request.body.menu_category_menu_id}`));
    }
    const menuCategoryMenu = await prisma.menu_category_menu.findUnique({where:{id:Number(request.body.menu_category_menu_id)}});
    if (!menuCategoryMenu){
        reply.send(returnErrorMessage(`Menu category menu with id: ${request.body.menu_category_menu_id}, does not exist`,404));
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

export const getPositionById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    const position = await getPositionData(Number(id));
    if (!position) {
        reply.send(returnErrorMessage(`No position found with id: ${id}`,404));
    }
    reply.send({body:position,message:"Found position"});
}

export const updatePositionById = async (request:FastifyRequest<{ Params: RestoParams, Body:Position }>, reply:FastifyReply) => {
    const {id} = request.params;
    // TODO: check if requester has right to update position
    const updatedPosition = await prisma.position.update({where:{id:Number(id)},data:request.body})
    reply.send({body:updatedPosition,message:"Position updated"});
}

export const deletePositionById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    // TODO: check if has right to do so
    const position = await prisma.position.findUnique({where:{id:Number(id)}})
    if (!position) {
        reply.send(returnErrorMessage("No position found.",404));
    }
    try {
       await deletePosition(Number(id));
    }
    catch(err) {
        reply.send(returnErrorMessage("Could not delete position",500));
    }
    reply.send({body:position,message:`Deleted position: ${id}`});
}
