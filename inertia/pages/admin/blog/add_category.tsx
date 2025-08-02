import { Head,Link,usePage } from '@inertiajs/react';
import { Inertia } from "@inertiajs/inertia"
import React, { useState, useEffect } from "react";
import AdminLayout from '#inertia/layouts/adminLayout';
import LoadingButton from '#inertia/components/button/LoadingButton';
import useCsrfToken from "#inertia/hooks//useCsrfToken";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Loader} from 'rsuite';
import 'rsuite/Loader/styles/index.css';
import TextEditor from '#inertia/components/admin/common/Editor';
function AddPage(){
    const { invalidError } = usePage<any>().props;
    const [btnLoading, setBtnLoading] = useState(false);
    const [html, setHtml] = useState('');
    const csrfToken = useCsrfToken();

    const schema = yup.object({ 
      name:yup.string().required("Name is required"),
      description:yup.string().notRequired(),
      icon:yup.mixed().notRequired(),
    });
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name:'',
        description:'',
        icon:''
      },
    });
    const onSubmit = async (data: any) => {
      setBtnLoading(true);
      Inertia.post('/admin/blog/category/save',data,
        {
            preserveScroll: true,
            headers: {
                "X-CSRF-TOKEN": csrfToken,
            },
            onError: (error:any) => {
                setBtnLoading(false);
            },
            onSuccess:()=>{
                setBtnLoading(false);
            }
        }
      );
      //setBtnLoading(false);
    }
    
    useEffect(() => {
      setBtnLoading(false);
    }, []);
  return (
    <>
    <Head title="Add Page Information" />
    <div className='page-body'>
      <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-8 m-auto">
                      <div className="card">
                          <div className="card-body">
                              <div className="title-header option-title">
                                  <h5>Information</h5>
                                  <Link href="/admin/blog/categories" className="align-items-center btn btn-theme">
                                    <i className="ri-list-check-2"></i>Blog Categories
                                  </Link>

                                  <Link href="/admin/blogs" className="align-items-center btn btn-theme">
                                    <i className="ri-list-check-2"></i>Blogs
                                  </Link>
                              </div>
                            <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit(onSubmit)} > 
                        
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0"> Title</label>
                                    <div className="col-sm-9">
                                        <input 
                                            {...register("name")}
                                            className="form-control"
                                            placeholder="Title"
                                        />
                                        {errors?.name?.message && (
                                          <p style={{ color: "red" }}>{errors?.name?.message?.toString()}</p>
                                        )}
                                    </div>
                              </div>
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Meta description</label>
                                    <div className="col-sm-9">
                                        <textarea 
                                            {...register("description")}
                                            className="form-control"
                                            placeholder="Description"
                                        ></textarea>
                                        {errors?.description?.message && (
                                            <p style={{ color: "red" }}>{errors?.description?.message?.toString()}</p>
                                        )}
                                    </div>
                                </div>
                              
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Image</label>
                                    <div className="col-sm-9">
                                        <input
                                            {...register('icon', { required: true })}
                                            className="form-control"
                                            placeholder="Image"
                                            type='file'
                                        />
                                        {errors?.icon?.message && (
                                            <p style={{ color: "red" }}>{errors?.icon?.message?.toString()}</p>
                                        )}
                                    </div>
                                </div>

                                
                             

                                {invalidError && <div className="mb-4 row align-items-center"><p style={{ color: "red" }}>{invalidError}</p> </div>}

                                  <div className="mb-4 row align-items-center">
                                    <div className="col-sm-3 form-label-title">
                                        <LoadingButton
                                          loading={false}
                                          type="submit"
                                          className="btn-indigo btn btn-animation w-30"
                                          disabled={btnLoading}>
                                          {btnLoading?<Loader />:'Save'}
                                        </LoadingButton>
                                    </div>
                                  </div>

                              </form>
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

AddPage.layout = (page: React.ReactNode) => (
  <AdminLayout title="Add Page" children={page} />
);

export default AddPage;