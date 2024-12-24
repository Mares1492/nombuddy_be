export interface RestoMenu {
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

interface Restaurant {
    id: number;
    restaurantId: number;
    menu: Menu;
    category: MenuCategory;
    position: MenuPosition;
    discount?: Discount; // Discount is optional because some positions might not have a discount
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
    restoId: number;
    menuId: number;
    posId: number;
    restoName: string;
    id?: string;
}

