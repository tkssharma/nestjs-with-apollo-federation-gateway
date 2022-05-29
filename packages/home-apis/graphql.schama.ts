
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class HomeInput {
    name: string;
    locality_id: string;
    description: string;
}

export class HomeLocalityInput {
    city: string;
    street: string;
    state: string;
    zip_code: string;
    country: string;
    name: string;
}

export class Home {
    id: string;
    name: string;
    locality_id: string;
    description: string;
    display_images?: Nullable<string[]>;
    original_images?: Nullable<string[]>;
    is_active: boolean;
}

export abstract class IQuery {
    abstract homes(): Nullable<Home[]> | Promise<Nullable<Home[]>>;

    abstract home(id?: Nullable<string>): Home | Promise<Home>;

    abstract allLocalities(): Nullable<HomeLocality[]> | Promise<Nullable<HomeLocality[]>>;

    abstract locality(id?: Nullable<string>): HomeLocality | Promise<HomeLocality>;
}

export abstract class IMutation {
    abstract createHome(payload: HomeInput): Nullable<Home> | Promise<Nullable<Home>>;

    abstract updateHome(id: string, payload: HomeInput): Nullable<Home> | Promise<Nullable<Home>>;

    abstract createLocality(payload: HomeLocalityInput): Nullable<HomeLocality> | Promise<Nullable<HomeLocality>>;

    abstract updateLocality(id: string, payload: HomeLocalityInput): Nullable<HomeLocality> | Promise<Nullable<HomeLocality>>;
}

export class HomeLocality {
    id: string;
    city: string;
    name: string;
    street: string;
    state?: Nullable<string>;
    zip_code: string;
    country: string;
}

type Nullable<T> = T | null;
