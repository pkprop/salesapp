import { Link, usePage } from "@inertiajs/react";
import { useState,useEffect } from "react";


const AdminNavBar = ({mobileToggle,setMobileToggle}:any) => {
    const [menuIndex, setMenuIndex] = useState('');
    const {path} = usePage().props||{}
   // const [width, setWidth] = useState(window.innerWidth);

    const toggleVisibility = (index:string) => {
        // if(path){
        //     const p = path.toString().split('/')
        //     setMenuIndex(p[2]);
        // }else{
            setMenuIndex(index);
        //}
    };
    useEffect(() => {
        //console.log(path,'path')
        if(path){
            const p = path.toString().split('/')
            setMenuIndex(p[2]);
        }
    }, []);
    
    return (
           <div className={`sidebar-wrapper ${mobileToggle?'close_icon':''}`}>
                {/* <div id="sidebarEffect"></div> */}
                <div>
                    <div className="logo-wrapper logo-wrapper-center">
                        <Link href="/admin/dashboard">
                            Nextbuying.in
                        </Link>
                        <div className="back-btn">
                            <button onClick={()=>{setMobileToggle(!mobileToggle)}}>
                                 <i className="fa fa-angle-left ml-5"></i>
                            </button>
                           
                        </div>
                        <div className="toggle-sidebar">
                            <i className="ri-apps-line status_toggle middle sidebar-toggle"></i>
                        </div>
                    </div>
                    <div className="logo-icon-wrapper">
                        <Link href="/admin/dashboard">
                            NXBKart
                        </Link>
                    </div>
                    <nav className="sidebar-main">
                        <div className="left-arrow" id="left-arrow">
                            {/* <i data-feather="arrow-left"></i> */}
                            <i className="ri-arrow-left-line ml-5"></i>
                        </div>

                        <div id="sidebar-menu">
                            <ul className="sidebar-links" id="simple-bar">
                                <li className="back-btn"></li>
                                <li className="sidebar-list active" onClick={()=>toggleVisibility('dashboard')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='dashboard' ? 'active' : ''}`} href="/admin/dashboard">
                                        <i className="ri-home-line"></i>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('customers')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='customers' ? 'active' : ''}`} href="/admin/customers">
                                        <i className="ri-user-line"></i>
                                        <span>Customer Management</span>
                                    </Link>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('orders')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='orders' ? 'active' : ''}`} href="/admin/orders">
                                        <i className="ri-archive-line"></i>
                                        <span>Orders</span>
                                    </Link>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('products')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='products' ? 'active' : ''}`} href="/admin/products" onClick={()=>{return false;}}>
                                        <i className="ri-store-3-line"></i>
                                        <span>Products</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=="products" ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='products' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/products">Products</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/add-new-product">Add New Products</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('categories')}>
                            <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='categories' ? 'active' : ''}`} href="/admin/categories" onClick={()=>{return false;}}>
                                        <i className="ri-list-check-2"></i>
                                        <span>Categories</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='categories' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='categories' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/categories">Category List</Link>
                                        </li>
                                        <li>
                                        <Link href="/admin/add-new-category">Add New Category</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('attributes')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='attributes' ? 'active' : ''}`} href="/admin/attributes" onClick={()=>{return false;}}>
                                        <i className="ri-list-settings-line"></i>
                                        <span>Attributes</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='attributes' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='attributes' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/attributes">Attributes</Link>
                                        </li>

                                        <li>
                                            <Link href="/admin/add-new-attributes">Add Attributes</Link>
                                        </li>
                                    </ul>
                                </li>

                                

                                <li className="sidebar-list" onClick={()=>toggleVisibility('coupons')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='coupons' ? 'active' : ''}`} href="/admin/coupons" onClick={()=>{return false;}}>
                                        <i className="ri-price-tag-3-line"></i>
                                        <span>Coupons</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='coupons' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='coupons' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/coupons">Coupon List</Link>
                                        </li>

                                        <li>
                                            <Link href="/admin/create-coupon">Create Coupon</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('taxes')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='taxes' ? 'active' : ''}`} href="/admin/taxes" onClick={()=>{return false;}}>
                                        <i className="ri-percent-line"></i>
                                        <span>Taxes</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='taxes' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='taxes' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/taxes">Tax List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/taxes/add">Add Tax</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('locations')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='locations' ? 'active' : ''}`} href="/admin/locations/pincodes" onClick={()=>{return false;}}>
                                        <i className="ri-focus-3-line"></i>
                                        <span>Locations</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='locations' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='locations' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/locations/pincodes">Pincodes</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/locations/cities">Cities</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/locations/districts">Districts</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/locations/states">States</Link>
                                        </li>
                                        
                                        <li>
                                            <Link href="/admin/locations/countries">Countries</Link>
                                        </li>
                                        
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('shipping')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='shipping' ? 'active' : ''}`} href="/admin/shippings" onClick={()=>{return false;}}>
                                        <i className="ri-price-tag-3-line"></i>
                                        <span>Shipping Charges</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='shipping' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='shipping' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/shippings">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/shippings/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('settings')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='settings' ? 'active' : ''}`}  href="/admin/settings">
                                        <i className="ri-settings-3-line"></i>
                                       <span>Settings</span>
                                   </Link>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('offers')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='offers' ? 'active' : ''}`} href="/admin/offers" >
                                        <i className="ri-gift-line"></i>
                                        <span>Offers</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='offers' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='offers' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/offers">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/offer/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>

                                 <li className="sidebar-list" onClick={()=>toggleVisibility('banners')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='banners' ? 'active' : ''}`} href="/admin/banners" >
                                        <i className="ri-image-line"></i>
                                        <span>Banners</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='banners' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='banners' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/banners">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/banner/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('deals')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='deals' ? 'active' : ''}`} href="/admin/deals" >
                                        <i className="ri-lightbulb-flash-line"></i>
                                        <span>Deals</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='deals' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='deals' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/deals">Products</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/deal/add">Add Product</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('ads')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='ads' ? 'active' : ''}`} href="/admin/ads" >
                                    <i className="ri-advertisement-line"></i>
                                        <span>Ads</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='ads' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='ads' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/ads">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/ad/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="sidebar-list" onClick={()=>toggleVisibility('pages')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='pages' ? 'active' : ''}`} href="/admin/pages" >
                                        <i className="ri-pages-line"></i>
                                        <span>Cms Pages</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='pages' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='pages' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/pages">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/page/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('faqs')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='faqs' ? 'active' : ''}`} href="/admin/faqs" >
                                        <i className="ri-question-answer-line"></i>
                                        <span>FAQ</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='faqs' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='faqs' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/faqs">List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/faq/add">Add</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('blogs')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='blogs' ? 'active' : ''}`} href="/admin/blog/categories" >
                                    <i className="ri-file-list-3-line"></i>
                                        <span>Blogs</span>
                                        <div className="according-menu">
                                            <i className={`${menuIndex=='blogs' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div>
                                    </Link>
                                    <ul className={`sidebar-submenu ${menuIndex=='blogs' ? '' : 'hide'}`}>
                                        <li>
                                            <Link href="/admin/blog/categories">Blog Categories</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/blog/category/add">Add Category</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/blogs">Blog List</Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/blog/add">Add Blog</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('tickets')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='tickets' ? 'active' : ''}`}  href="/admin/tickets">
                                        <i className="ri-question-line"></i>
                                       <span>Tickets</span>
                                   </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="right-arrow" id="right-arrow">
                            {/* <i data-feather="arrow-right"></i> */}
                            <i className="ri-arrow-right-line ml-5"></i>
                        </div>
                    </nav>
				</div>
            </div>
    );
  };

  export default AdminNavBar;
