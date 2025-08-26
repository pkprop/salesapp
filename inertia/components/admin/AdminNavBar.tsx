import { Link, usePage } from "@inertiajs/react";
import { useState,useEffect } from "react";


const AdminNavBar = ({mobileToggle,setMobileToggle}:any) => {
    const [menuIndex, setMenuIndex] = useState('');
    const {path} = usePage().props||{}
    const toggleVisibility = (index:string) => {
        setMenuIndex(index);
    };
    useEffect(() => {
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
                           <img loading="lazy" src="/salesapp-logo.png" style={{width:'170px'}} alt="SalesApp" />
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
                            PrpertyXpo
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

                                <li className="sidebar-list" onClick={()=>toggleVisibility('inquiries')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='inquiries' ? 'active' : ''}`} href="/admin/inquiries">
                                        <i className="ri-pages-line"></i>
                                        <span>Inquiries</span>
                                        {/* <div className="according-menu">
                                            <i className={`${menuIndex=='inquiries' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div> */}
                                    </Link>
                                </li>
                                <li className="sidebar-list" onClick={()=>toggleVisibility('newslatters')}>
                                    <Link className={`sidebar-link sidebar-title link-nav ${menuIndex=='newslatters' ? 'active' : ''}`} href="/admin/newslatters">
                                        <i className="ri-pages-line"></i>
                                        <span>Newslatters</span>
                                        {/* <div className="according-menu">
                                            <i className={`${menuIndex=='newslatters' ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'}`}></i>
                                        </div> */}
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
