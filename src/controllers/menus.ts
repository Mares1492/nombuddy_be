// Routes for /restaurants/menus
import {FastifyReply, FastifyRequest} from "fastify";
import {RestoMenu, RestoParams} from "../types/global";
import {prisma} from "../index";
import {getRestaurantMenus} from "../services/menus";
import {returnErrorMessage} from "../utils/errorHandlers";

export const getAllMenus = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const menus = await prisma.menu.findMany();
    if (!menus) {
        reply.send(returnErrorMessage("No menus found."));
    }
    reply.send({body:menus,message:"Found menus"});
};


export const getAllRestaurantMenusById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    // TODO: create input validator
    // getRestaurantMenus from menus service
    const menus:RestoMenu[] = await getRestaurantMenus(Number(id))
    if (!menus.length) {
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
    // TODO: get updated data from body
    // TODO: check if has right to do updates
    // const updatedMenu = await prisma.menu.update()
    // TODO: update resto menu data
    reply.send({body:menu,message:"Menu updated(actually not)"});
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

export const createNewMenu = async (request:FastifyRequest<{ Params: RestoParams, Body:RestoMenu }>, reply:FastifyReply) => {
    const { id } = request.params;
    //TODO: validate body data
    const newMenu = await prisma.menu.create({ data: request.body});
    return {body:newMenu,message:`Added new menu for restaurant ${id}`};
};
