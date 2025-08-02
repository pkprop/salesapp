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
                            SalesApp
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
