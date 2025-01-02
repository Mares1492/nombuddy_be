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
