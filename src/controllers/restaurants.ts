// Routes for /restaurants
import {FastifyReply, FastifyRequest} from "fastify";
import type {RestoParams} from "../types/global";
import {prisma} from "../index";

export const getRestaurants = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch all restaurants
    const restaurants = await prisma.restaurant.findMany();
    reply.send(restaurants.map(({formal_name,display_name}) => ({formal_name,display_name})));
};

export const createRestaurant = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Add a new restaurant
    // TODO: check input data
    // TODO: create right structure
    // TODO: insert new resto into db
    // Example: const newRestaurant = await prisma.restaurant.create({ data: request.body });
    return reply.send({body:{},message:"New restaurant has been created"});
};

// Routes for a specific restaurant by id
export const getRestaurantById =  async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { restoId } = request.params;
    const id = Number(restoId)
    const restaurant = await prisma.restaurant.findFirst({ where: { id:id } });
    if (!restaurant) {
        return reply.send({body:{},message:"No restaurant found"});
    }
    return reply.send({body:restaurant,message:`Found ${restaurant.display_name}`});
};

export const updateRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {restoId} = request.params
    const id = Number(restoId)
    const restaurant = await prisma.restaurant.findFirst({ where: { id:id } });
    if (!restaurant) {
        return reply.send({body:{},message:"No restaurant found"});
    }
    // TODO: check if has right to do so
    // TODO: update resto data
    return reply.send({body:{},message:"Updated restaurant data(actually not)"});
}

export const deleteRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {restoId} = request.params;
    const id = Number(restoId);
    const restaurant = await prisma.restaurant.findFirst({ where: { id:id } });
    if (!restaurant) {
        return {body:{},message:"No restaurant found"};
    }
    // TODO: check if has right to do so
    // TODO: delete resto
    return reply.send({body:{},message:"Updated restaurant data(actually not)"});
}