interface CreateMenuBody {
    resto_menu: RestoMenu;
    menu_category_id: number;

}

interface RestoMenu {
    id: number;
    name: string;
    menu_type_id: number;
    description: string | null;
}

interface Discount {
    id: number;
    percentage: string; // Using string for the percentage as it's typically a Decimal in databases
    start: string; // DateTime, stored as string
    end: string; // DateTime, stored as string
}

interface CreatePositionBody {
    position_data: Position;
    menu_category_menu_id: number;
}

interface Position {
    id: number;
    name: string;
    description: string;
    display_price: boolean;
    display_options: boolean;
    price: number;
}

interface MenuPosition {
    id: number;
    menu_category_menu_id:number;
    position_id: number;
    isAvailable: boolean;
}

interface MenuCategory {
    id: number;
    name: string;
}

interface Menu {
    id: number;
    name: string;
}

interface CreateRestaurantBody {
    restaurant_data:Restaurant;
    creators_person_id: number;
}

interface Restaurant {
    id: number;
    formal_name: string;
    display_name: string;
    image_id: number;
    restaurant_state_id: number;
}

interface OrderCreateClientData {
    expected_serve_time: Date;
    order_number: number;
    orderer_email: string;
}

interface OrderCreateInput {
    positions: number[];
    client_data: OrderCreateClientData;

}

interface OrderUpdateInput {
    is_deleted?: boolean;
}

interface Order {
    id: number;
    order_number: number;
    display_id: number;
    orderer_email: string;
    order_time: number;
    expected_serve_time: number;
    serve_time: number;
    order_state_id: number;
    is_deleted: boolean;
}

// Main response type that will hold all restaurant related information
interface RestaurantMenuData {
    restaurantId: number;
    menuId: number;
    menuName: string;
    categoryId: number;
    categoryName: string;
    positionId: number;
    positionName: string;
    positionDescription: string | null;
    positionPrice: string;
    positionAvailability: boolean;
    discountId?: number; // discountId is optional because some positions might not have a discount
    discountPercentage?: string; // discountPercentage is optional
    discountStart?: string; // discount start date
    discountEnd?: string; // discount end date
}


export interface RestoParams {
    menuCatId: number;
    restoId: number;
    menuId: number;
    posId: number;
    restoName: string;
    id: number;
}

