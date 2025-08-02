import AdminLayout from "#inertia/layouts/adminLayout";

function DashboardPage(){
    return (
    <>
      <div className='page-body'>
        <div className="container-fluid">
          <div className='row'>
            <div className='col-12'>
              <h3 className='text-center'>Dashboard</h3>
              <p className='text-center'>Welcome to the SalesApp Admin Dashboard</p>
            </div>
          </div>
          </div>
        </div>
    </>
    )
}

DashboardPage.layout = (page: React.ReactNode) => (
  <AdminLayout title="Dashboard" children={page} />
);

export default DashboardPage;