// Routes for /restaurants
import {FastifyReply, FastifyRequest} from "fastify";
import type {CreateRestaurantBody, RestoParams} from "../types/global";
import {prisma} from "../index";

export const getAllRestaurants = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch all restaurants
    const restaurants = await prisma.restaurant.findMany();
    //reply.send(restaurants.map(({formal_name,display_name}) => ({formal_name,display_name})));
    reply.send({body: restaurants,message:"Restaurants found"});
};

export const createRestaurant = async (request:FastifyRequest<{ Params: RestoParams, Body:CreateRestaurantBody }>, reply:FastifyReply) => {
    // Add a new restaurant
    // TODO: check input data
    const newRestaurant = await prisma.restaurant.create({ data: request.body.restaurant_data });
    const newRestaurantRole = await prisma.restaurant_role.create({data: {
            restaurant_id:newRestaurant.id,
            role_id: 3, //Manager
            is_admin: true,
            discount_percentage:50,
            discount_code: crypto.randomUUID()
    }})
    const newRestaurantPerson = await prisma.restaurant_person.create({data:{
            person_id: request.body.admin_id,
            restaurant_role_id: newRestaurantRole.id,
    }})
    // TODO: create additional references
    return reply.send({body:newRestaurant,message:"New restaurant has been created"});
};

// Routes for a specific restaurant by id
export const getRestaurantById =  async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    const restaurant = await prisma.restaurant.findFirst({ where: { id:Number(id) } });
    if (!restaurant) {
        return reply.send({body:{},message:"No restaurant found"});
    }
    return reply.send({body:restaurant,message:`Found ${restaurant.display_name}`});
};

export const updateRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params
    const restaurant = await prisma.restaurant.findFirst({ where: { id:Number(id) } });
    if (!restaurant) {
        return reply.send({body:{},message:"No restaurant found"});
    }
    // TODO: check if has right to do so
    // TODO: update resto data
    return reply.send({body:{},message:"Updated restaurant data(actually not)"});
}

export const deleteRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {id} = request.params;
    const restaurant = await prisma.restaurant.delete({ where: { id:Number(id) } });
    if (!restaurant) {
        return {body:{},message:"No restaurant found"};
    }
    // TODO: check if has right to do so
    // TODO: delete resto
    return reply.send({body:{},message:"Updated restaurant data(actually not)"});
}