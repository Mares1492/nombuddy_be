import {RestoMenu} from "../types/global";
import {prisma} from "../index";

export const getRestaurantMenus = async (restoID:number) => {
    // Business validation here
    // TODO: abstract data query using repository
    const menus:RestoMenu[] = await prisma.$queryRaw`
        SELECT *
        FROM menu m
        JOIN restaurant_menu rm ON m.id = rm.menu_id
        WHERE rm.restaurant_id = ${restoID};
    `
    if (!menus){
        // TODO: create error handling
        return []
    }
    // Business logic here
    return menus;
}