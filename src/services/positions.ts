import {prisma} from "../index";

export const getPositionsData = async () => {
    // TODO: instead of simple positions fetch complex data with position + options + category + menu
    return prisma.position.findMany();
}
