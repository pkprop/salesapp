import { Head } from '@inertiajs/react'
import { Link,usePage } from '@inertiajs/react';
import AdminLayout from '#inertia/layouts/adminLayout';
import Pagination from '#inertia/components/pagination/Pagination';
import {PaginatedData } from '../../../types';
import { Toggle,Image ,Placeholder} from 'rsuite';
import 'rsuite/Toggle/styles/index.css';
import 'rsuite/Placeholder/styles/index.css';

function ListPage(){
  const { pages } = usePage<{ pages:PaginatedData<any> }>().props;
  const {data,meta} = pages;
  const fd=(d:any)=>{
    let dt = new Date(d);
    return dt.toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  return (
    <>
    <Head title="All Pages" />
      <div className='page-body'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="title-header option-title">
                              <h5>All Pages</h5>
                              <Link href="/admin/page/add" className="align-items-center btn btn-theme">
                                  <i className="ri-add-line"></i>Add New
                              </Link>
                            </div> 
                             <div className="table-responsive category-table">
                                <table className="table all-package theme-table" id="table_id">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Title</th>
                                            <th>Slug</th>
                                            <th>Status</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        data.map((row:any,indx:number)=>(
                                        <tr key={'row_'+indx}>
                                        <td>{indx+1}</td>
                                        <td>
                                          <div className="table-image">
                                          {row.image?<Image 
                                              src={row.image}
                                             // placeholder={<Placeholder.Graph active />}
                                              className="img-fluid" 
                                              alt={row?.title}
                                            />:<Placeholder.Graph active height={50} />}
                                          </div>
                                        </td>
                                          <td>{row?.title}</td>
                                          <td>{row?.slug||'NA'}</td>
                                            
                                          <td>
                                          <Toggle
                                              checkedChildren="Active"
                                              unCheckedChildren="Inactive" 
                                              defaultChecked={!!row?.status}
                                              color="green"
                                              onChange={()=>{
                                                fetch('/admin/page/change-status/'+row?.id)
                                              }}
                                          />
                                          </td>
                                          <td>{fd(row?.createdAt)}</td>
                                            <td>
                                            <ul>
                                                <li>
                                                  <Link href={"/admin/page/edit/"+row?.id}>
                                                    <i className="ri-pencil-line"></i>
                                                  </Link>
                                                </li>
                                            </ul>
                                            </td>
                                        </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>
                            <div className='dataTables_wrapper'>
                                <div className="dataTables_paginate" id="table_id_paginate">
                                    <Pagination meta={meta} baseUrl={'/admin/pages'} />
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    </>
  )
}

ListPage.layout = (page: React.ReactNode) => (
  <AdminLayout title="List All Category" children={page} />
);

export default ListPage;