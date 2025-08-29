import { Head } from '@inertiajs/react'
import { Link,usePage } from '@inertiajs/react';
import AdminLayout from '#inertia/layouts/adminLayout';
import Pagination from '#inertia/components/pagination/Pagination';
import {PaginatedData } from '../../../types';
import { Drawer} from 'rsuite';
import 'rsuite/Drawer/styles/index.css';
import 'rsuite/Animation/styles/index.css';
import { useState,useEffect } from 'react';

function ListPage(){
  const { datas } = usePage<{ datas?: PaginatedData<any> }>().props;
  const data = datas?.data ?? [];
  const meta = datas?.meta ?? {};
  const [showInquiry,setShowInquiry] = useState(false)
  const [formattedDate, setFormattedDate] = useState("");
  const [inquiryData,setInquiryData] = useState<any>({})
const fd=(d:any)=>{
    let dt = new Date(d);
    return dt.toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  useEffect(() => {
     
  }, []);
//console.log(data,meta,'data and meta'); 
  const viewInquiry = (id:number)=>{
    const d = data.find(elm=>elm.id==id)
    setInquiryData(d)
    setShowInquiry(true);
  }
  
  return (
    <>
    <Head title="All Newslatter Emails" />
      <div className='page-body'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                          <div className="card-body">
                            <div className="title-header option-title">
                              <h5>All Emails</h5>
                              {/* <Link href="/admin/page/add" className="align-items-center btn btn-theme">
                                  <i className="ri-add-line"></i>Add New
                              </Link> */}
                            </div> 
                             <div className="table-responsive category-table">
                                <table className="table all-package theme-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {
                                      (data || []).map((row:any,indx:number)=>(
                                        <tr key={'row_'+indx}>
                                        <td>{indx+1}</td>
                                        <td>
                                          <div>
                                          {row?.name}
                                          </div>
                                        </td>
                                          <td>{row?.email}</td>
                                          <td>{fd(row?.createdAt)}</td>
                                          <td>#</td>
                                        </tr>
                                        ))} 
                                    </tbody>
                                </table>
                            </div>
                            <div className='dataTables_wrapper'>
                                <div className="dataTables_paginate" id="table_id_paginate">
                                    <Pagination meta={meta} baseUrl={'/admin/newslatters'} />
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
  <AdminLayout title="List of All data" children={page} />
);

export default ListPage;