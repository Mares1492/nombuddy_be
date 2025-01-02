import {FastifyReply, FastifyRequest} from "fastify";
import {RestoParams} from "../types/global";


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
    reply.send({body:{},message:"Found order(not really)"});
}

export const updateOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Updated order(not really)"});
}

export const deleteOrderById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Deleted order(not really)"});
}
