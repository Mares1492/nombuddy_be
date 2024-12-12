// Routes for /restaurants/menus
import {FastifyReply, FastifyRequest} from "fastify";
import {RestoMenu, RestoParams} from "../types/global";
import {prisma} from "../index";

const returnErrorMessage = (message:string) => ({body:{},message:message});

export const getAllMenus = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch menu from restaurant
    const menus = await prisma.menu.findMany();
    if (!menus) {
        reply.send(returnErrorMessage("No menus found."));
    }
    reply.send({body:menus,message:"Found menus"});
};

export const getAllRestaurantMenusById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    // Fetch menu from restaurant
    const { id } = request.params;
    const menus:Array<RestoMenu> = await prisma.$queryRaw`
        SELECT *
        FROM menu m
        JOIN restaurant_menu rm ON m.id = rm.menu_id
        WHERE rm.restaurant_id = ${Number(id)};
    `;
    if (!menus || menus.length === 0) {
        reply.send(returnErrorMessage("No restaurant found"));
    }
    reply.send({body: menus,message:`Menus found for resto-${id}`});
};

export const getMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { menuId } = request.params;
    const menu:RestoMenu|null = await prisma.menu.findUnique({
        where:{
            id: Number(menuId)
        }
    });
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${menuId}`));
    }
    reply.send({body:menu,message:"Menu found"});
};

export const updateMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { menuId } = request.params;
    const menu = await prisma.menu.findUnique({
        where: {id: Number(menuId)}
    })
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${menuId}`));
    }
    // TODO: update menu
    reply.send({body:menu,message:"Menu updated"});
}

export const deleteMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { menuId } = request.params;
    const menu = await prisma.menu.findUnique({
        where: {id: Number(menuId)}
    })
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${Number(menuId)}`));
    }
    // TODO: delete menu
    reply.send({body:menu,message:"Has been deleted"});
}

export const createNewMenu = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    // Example: const newMenu = await prisma.menu.create({ data: { ...request.body, restaurantName: restoName } });
    return {body:{},message:`Added new menu for restaurant ${id}`};
};

export const updateRestaurantMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const {menuId} = request.params
    const body = request.body
    // TODO: get updated data from body
    // TODO: check if has right to do updates
    // const updatedMenu = await prisma.menu.update()
    // TODO: update resto menu data
    return reply.send({body:{},message:`Update menu ${menuId} (actually not)`});
}