// Routes for /restaurants/menus
import {FastifyReply, FastifyRequest} from "fastify";
import {CreateMenuBody, RestoMenu, RestoParams} from "../types/global";
import {prisma} from "../index";
import {getRestaurantMenus} from "../services/menus";
import {returnErrorMessage} from "../utils/errorHandlers";
import {isNumber} from "../utils/validators";

export const getAllMenus = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const menus = await prisma.menu.findMany();
    if (!menus) {
        reply.send(returnErrorMessage("No menus found."));
    }
    reply.send({body:menus,message:"Found menus"});
};


export const getAllRestaurantMenus = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
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
    const { id } = request.params;
    const menu:RestoMenu|null = await prisma.menu.findUnique({
        where:{
            id: Number(id)
        }
    });
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${id}`));
    }
    reply.send({body:menu,message:"Menu found"});
};

export const updateMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    const menu = await prisma.menu.findUnique({
        where: {id: Number(id)}
    })
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${id}`));
    }
    // TODO: get updated data from body
    // TODO: check if has right to do updates
    // const updatedMenu = await prisma.menu.update()
    // TODO: update resto menu data
    reply.send({body:menu,message:"Menu updated(actually not)"});
}

export const deleteMenuById = async (request:FastifyRequest<{ Params: RestoParams }>, reply:FastifyReply) => {
    const { id } = request.params;
    const menu = await prisma.menu.findUnique({
        where: {id: Number(id)}
    })
    if (!menu) {
        reply.send(returnErrorMessage(`No menu found with given id-${Number(id)}`));
    }
    // TODO: delete menu
    reply.send({body:menu,message:"Has been deleted"});
}

export const createNewMenu = async (request:FastifyRequest<{ Params: RestoParams, Body:CreateMenuBody }>, reply:FastifyReply) => {
    //restaurant id
    const { id } = request.params;
    if (!isNumber(id)) {
        reply.send(returnErrorMessage(`Provided restaurant id:${id}, failed validation`));
    }
    if (!isNumber(request.body.menu_category_id)){
        reply.send(returnErrorMessage(`Provided menu category id:${request.body.menu_category_id}, failed validation`));
    }
    /*TODO:
       - validate body data
       - consider using transactions
     */
    const newMenu = await prisma.menu.create({ data: request.body.resto_menu});
    const newMenuCategoryMenu = await prisma.menu_category_menu.create({data:{menu_id:newMenu.id,menu_category_id:request.body.menu_category_id}});
    const newRestaurantMenu = await prisma.restaurant_menu.create({data:{restaurant_id:Number(id),menu_id:newMenu.id}});
    return {body:newMenu,message:`Added new menu for restaurant ${id}`};
};
