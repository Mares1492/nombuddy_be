import {FastifyReply, FastifyRequest} from "fastify";
import {Order, OrderCreateInput, OrderUpdateInput, RestoParams} from "../types/global";
import {prisma} from "../index";
import {returnErrorMessage} from "../utils/errorHandlers";
import {isNumber} from "../utils/validators";


export const getAllRestaurantOrders = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Got all orders from restaurant(not really)"});
}

export const getRestaurantByOrderId = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    reply.send({body:{},message:"Got place of order: {id}(not really)"});
}

export const createNewOrder = async (request:FastifyRequest<{ Params: RestoParams, Body: OrderCreateInput }>, reply:FastifyReply) => {
    const newOrder = await prisma.order.create({data:{
            display_id: crypto.randomUUID(),
            order_time: new Date(),
            order_state_id: 1,
            ...request.body.client_data
    }})
    if (!newOrder) {
        reply.send(returnErrorMessage("Could not create order"));
    }
    const orderPositions = request.body.positions.map(menu_position_id=>(
        {
            order_id: newOrder.id,
            menu_position_id,
            chosen_options: {}
        }
    ))
    //@ts-ignore
    const newOrderPositions = await prisma.order_menu_position.createMany({data:orderPositions})
    reply.send({body:newOrder,message:"Created order"});
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

export const updateOrderById = async (request:FastifyRequest<{ Params: RestoParams, Body:OrderUpdateInput  }>, reply:FastifyReply) => {
    const {id} = request.params;
    if (!isNumber(id)){
        reply.send(returnErrorMessage("Provided order id is invalid"))
    }
    await prisma.order.update({where:{id:id},data:request.body});
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
