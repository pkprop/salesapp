import { Head } from '@inertiajs/react';
import AdminHeader from '#inertia/components/admin/AdminHeader';
import AdminFooter from '#inertia/components/admin/AdminFooter';
import AdminNavBar from '#inertia/components/admin/AdminNavBar';
import React, { useState,useEffect } from 'react';
interface MainLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function AdminLayout({ title, children }: MainLayoutProps) {
  const [mobileToggle, setMobileToggle] = useState(false);
  useEffect(() => {
      const handler = () => setMobileToggle(window.innerWidth <= 768);
      window.addEventListener('resize', handler);
     // console.log(mobileToggle,'mobileToggle')
      return () => window.removeEventListener('resize', handler);

  }, []);
  return (
    <>
      <Head title={title} />
      <AdminHeader className="header" mobileToggle={mobileToggle} setMobileToggle={setMobileToggle} />
      <div className="page-body-wrapper">
        <AdminNavBar mobileToggle={mobileToggle}  setMobileToggle={setMobileToggle} />
        {children}
        <AdminFooter className="footer" />
      </div>
    </>
  );
}
