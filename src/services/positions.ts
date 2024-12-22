import {prisma} from "../index";
import {RestaurantMenuData} from "../types/global";

export const getPositionsData = async () => {
    // TODO: instead of simple positions fetch complex data with position + options + category + menu
    return prisma.position.findMany();
}

export const getPositionData = async (id:number) => {
    return prisma.position.findUnique({where: {id:id}});
}

export const getRestoPositionsData = async (id:number) => {
    const restoPositions:RestaurantMenuData[] = await prisma.$queryRaw`
        WITH MaxDiscounts AS (
            SELECT
                menu_position_id,
                MAX(percentage) AS max_percentage
            FROM
                discount
            WHERE
                "start" <= NOW() AND "end" >= NOW() -- Only active discounts
            GROUP BY
                menu_position_id
        )
        SELECT
            r.id AS restaurant_id,
            m.id AS menu_id,
            m.name AS menu_name,
            mc.id AS category_id,
            mc.name AS category_name,
            p.id AS position_id,
            p.name AS position_name,
            p.description AS position_description,
            p.price AS position_price,
            COALESCE(mp.is_available, false) AS position_availability,
            d.id AS discount_id,
            d.percentage AS discount_percentage,
            d.start AS discount_start,
            d.end AS discount_end
        FROM
            restaurant r
                JOIN restaurant_menu rm ON r.id = rm.restaurant_id
                JOIN menu m ON rm.menu_id = m.id
                JOIN menu_category_menu mcm ON m.id = mcm.menu_id
                JOIN menu_category mc ON mcm.category_id = mc.id
                JOIN menu_position mp ON mcm.id = mp.menu_category_menu_id
                JOIN position p ON mp.position_id = p.id
                LEFT JOIN MaxDiscounts md ON mp.id = md.menu_position_id
                LEFT JOIN discount d
                  ON d.menu_position_id = md.menu_position_id AND d.percentage = md.max_percentage
        WHERE
            r.id = ${id};
    `;

    if (!restoPositions){
        return []
    }
    return restoPositions;
}
