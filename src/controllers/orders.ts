import {FastifyReply, FastifyRequest} from "fastify";
import {RestoParams} from "../types/global";
import {prisma} from "../index";
import {returnErrorMessage} from "../utils/errorHandlers";
import {isNumber} from "../utils/validators";


export const getAllRestaurantOrders = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Got all orders from restaurant(not really)"});
}

export const getRestaurantOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Got all orders from restaurant(not really)"});
}

export const createNewOrder = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // create new order
    reply.send({body:{},message:"Created order(not really)"});
}

export const getOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    if (!isNumber(id)){
        reply.send(returnErrorMessage("Provided order id is invalid"))
    }
    const order = await prisma.order.findUnique({where:{id:id}});
    if (!order){
        reply.send(returnErrorMessage("Order not found"))
    }
    reply.send({body:order,message:"Found order"});
}

export const updateOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    if (!isNumber(id)){
        reply.send(returnErrorMessage("Provided order id is invalid"))
    }
    reply.send({body:{},message:"Updated order(not really)"});
}

export const deleteOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    //mb soft delete
    const {id} = request.params;
    if (!isNumber(id)){
        reply.send(returnErrorMessage("Provided order id is invalid"))
    }
    const order = await prisma.order.findUnique({where:{id:id}});
    if (!order){
        reply.send(returnErrorMessage("Order not found"))
    }
    await prisma.order.delete({where:{id:id}});
    reply.send({body:order,message:"Deleted order"});
}
