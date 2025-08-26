import { Config } from 'ziggy-js';

export interface RegUser{
  id: number;
  full_name: string;
  email: string;
  mobile:string,
  status:string
  role:string,
  remember_me:boolean
}


export interface User {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  owner: string;
  photo: string;
  deleted_at: string;
  account: Account;
}

export interface Category {
  id: number;
  name: string;
  short_code:string;
  slug: string;
  image:string;
  icon:string;
  description:string;
  parent_id:number;
  status:string;
  sort_index:number;
  meta_title:string;
  meta_description:string;
  meta_keywords:string;
  parentCategory:Category;
}

export interface Attribute {
  id: number;
  name: string;
  slug: string;
  type:string;
  category_id:string;
  required:number;
  status:number;
  category:Category
}

export interface ProductVideoUrl{
  id:number;
  video_url:string
}
export interface Product{
  id:number;
  product_no:string;
  name:string;
  slug:string;
  sku:string;
  hsn:string;
  gst:string;
  status:boolean;
  sale_price:number;
  price:number,
  image:string;
  statusText:string;
  topProductText:string;
  featuredProductText:string;
  top_product:boolean;
  featured_product:boolean;
  category:Category;
  productPrice:productPrice;
  productImages:ProductImage[];
  productInventory:productInventory;
  productRatings:number;
  averageRating:number;
}

export interface productInventory{
  id:number;
  sku:string;
  qty:number;
  stock_status:number;
}
export interface productPrice{
  id:number;
  price:number;
  sale_price:number;
}

export interface ProductImage{
  id:number;
  product_id:number;
  thum_url:string
}

export interface Contact {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  organization_id: number;
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postal_code: string;
  deleted_at: string;
  contacts: Contact[];
}

export type PaginatedData<T> = {
  data: T[];
  // links: {
  //   first: string;
  //   last: string;
  //   prev: string | null;
  //   next: string | null;
  // };
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
    firstPageUrl:string;
    lastPageUrl:string;
    nextPageUrl:string;
    previousPageUrl:string;

    // current_page: number;
    // from: number;
    // last_page: number;
    // path: string;
    // per_page: number;
    // to: number;
    // total: number;
    // links: {
    //   url: null | string;
    //   label: string;
    //   active: boolean;
    // }[];
  };
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  flash: {
    success: string | null;
    error: string | null;
  };
  ziggy: Config & { location: string };
};
