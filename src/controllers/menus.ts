// Routes for /restaurants/menus
import {FastifyReply, FastifyRequest} from "fastify";
import type {RestoParams} from "../types/global";
import {prisma} from "../index";

export const getAllMenus = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch menu from restaurant
    const menus = await prisma.restaurant.findMany();
    reply.send(menus);
};

export const getMenusFromRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch menu from restaurant
    const { id } = request.params;
    const menus:Array<Object> = await prisma.$queryRaw`
        SELECT *
        FROM menu m
        JOIN restaurant_menu rm ON m.id = rm.menu_id
        WHERE rm.restaurant_id = ${Number(id)};
    `;
    if (!menus || menus.length === 0) {
        reply.send({body:{},message:"No restaurant found"});
    }
    reply.send(menus);
};

export const getMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { menuId } = request.params;
    const menu = await prisma.menu.findUnique({
        where:{
            id: Number(menuId)
        }
    });
    reply.send(menu);
};

export const createMenuInRestaurantById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    // Example: const newMenu = await prisma.menu.create({ data: { ...request.body, restaurantName: restoName } });
    return {body:{},message:`Added new menu for restaurant ${id}`};
};