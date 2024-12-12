export interface RestoMenu {
    id: number;
    name: string;
    menu_type_id: number;
    description: string | null;
}

export interface RestoParams {
    restoId: number;
    menuId: number;
    restoName: string;
    id?: string;
}

