import {prisma} from "../index";

export const getPositionsData = async () => {
    // TODO: instead of simple positions fetch complex data with position + options + category + menu
    return prisma.position.findMany();
}

export const getPositionData = async (id:number) => {
    return prisma.position.findUnique({where: {id:id}});
}

export const getRestoPositionsData = async (id:number) => {
    // TODO: get all resto postions with categories, menus, discounts etc
    return [];
}
