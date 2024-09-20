import { API } from './API';

// FURNITURE

// read

export type FurnitureType =
	| 'CHAIR'
	| 'TV_STAND'
	| 'CLOSET'
	| 'STAND'
	| 'COUCH'
	| 'ARMCHAIR'
	| 'BED'
	| 'TABLE'
	| 'SHELF'
	| 'COFFEE_TABLE'
	| 'TV';

export type AreaType = 'KITCHEN' | 'LIVING_ROOM' | 'STUDY_ROOM' | 'CHILDRENS_ROOM';

export type Catalog = {
	type_sub_id: number;
	description: string;
	width: number;
	svg_file: string;
	tags: null | unknown;
	default_price: null | unknown;
	name: string;
	length: number;
	height: number;
	default_image_src: string;
	collage_image_src: string;
	id: number;
	type_sub: {
		default_image_src: string;
		area_types: AreaType[];
		default_svg_file: string;
		main_type: FurnitureType;
		name: string;
		tags: null | unknown;
		id: number;
	};
};

export type Pagination = {
	current_page: number;
	limit: number;
	total_count: number;
	total_pages: number;
};

export type Furniture = {
	data: Catalog[];
	pagination: Pagination;
};

export async function getFurniture({
	typeSubId = 0,
	skip,
	limit
}: {
	typeSubId?: number;
	skip: number;
	limit: number;
}): Promise<Furniture> {
	return await API.get(`item_furniture`, {
		searchParams: { type_sub_id: typeSubId, skip, limit }
	}).json();
}
