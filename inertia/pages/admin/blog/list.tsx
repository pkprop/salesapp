import { Head } from '@inertiajs/react'
import { Link,usePage } from '@inertiajs/react';
import AdminLayout from '#inertia/layouts/adminLayout';
import Pagination from '#inertia/components/pagination/Pagination';
import {PaginatedData } from '../../../types';
import { Toggle,Image ,Placeholder} from 'rsuite';
import 'rsuite/Toggle/styles/index.css';
import 'rsuite/Placeholder/styles/index.css';

function ListPage(){
  const { blogs } = usePage<{ blogs:PaginatedData<any> }>().props;
  const {data,meta} = blogs;
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
    <Head title="All Blogs" />
      <div className='page-body'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="title-header option-title">
                              <h5>All Blogs</h5>
                              <Link href="/admin/blog/add" className="align-items-center btn btn-theme">
                                  <i className="ri-add-line"></i>Add New
                              </Link>
                              <Link href="/admin/blog/categories" className="align-items-center btn btn-theme">
                                <i className="ri-list-check-2"></i>Blog Categories
                              </Link>
                            </div> 
                             <div className="table-responsive category-table">
                                <table className="table all-package theme-table" id="table_id">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Category</th>
                                            <th>Image</th>
                                            <th>Title</th>
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
                                        <td>{row?.category?.name||'NA'}</td>
                                        <td>
                                          <div className="table-image">
                                          {row.image?<Image 
                                              src={row.image}
                                              //placeholder={<Placeholder.Graph active />}
                                              className="img-fluid" 
                                              alt={row?.title}
                                            />:<Placeholder.Graph active height={50} />}
                                          </div>
                                        </td>
                                          <td>{row?.title}</td>
                                            
                                          <td>
                                          <Toggle
                                              checkedChildren="Active"
                                              unCheckedChildren="Inactive" 
                                              defaultChecked={!!row?.status}
                                              color="green"
                                              onChange={()=>{
                                                fetch('/admin/blog/change-status/'+row?.id)
                                              }}
                                          />
                                          </td>
                                          <td>{fd(row?.createdAt)}</td>
                                            <td>
                                            <ul>
                                                <li>
                                                  <Link href={"/admin/blog/edit/"+row?.id}>
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
                                    <Pagination meta={meta} baseUrl={'/admin/blogs'} />
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