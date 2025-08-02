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
function EditPage(){
    const { invalidError,page } = usePage<any>().props;
    const [btnLoading, setBtnLoading] = useState(false);
    const [btnMetaLoading, setBtnMetaLoading] = useState(false);
    
    const [html, setHtml] = useState('');
    const csrfToken = useCsrfToken();

    const schema = yup.object({ 
      title:yup.string().required("Title is required"),
      content:yup.string().required("Content is required"),
      image:yup.mixed().notRequired(),
      meta_title:yup.string().required("Meta Title is required"),
      meta_description:yup.string().required("Meta Description is required"),
      meta_keywords:yup.string().required("Meta Keywords is required"),
    });
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors }
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        title:page?.title||'',
        content:page?.content||'',
        image:page?.image||'',
        meta_title:page?.meta_title||'',
        meta_description:page.meta_description||'',
        meta_keywords:page?.meta_keywords||'',
      },
    });
    const onSubmit = async (data: any) => {
      setBtnLoading(true);
      Inertia.post('/admin/page/update/'+page?.id,data,
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
    function descriptionOnChange(e:any) {
      setHtml(e.target.value);
      setValue('content',e.target.value);
      console.log(e.target.value);
  }
  const aiMeta = ()=>{
    setBtnMetaLoading(true);
    fetch('/admin/page/ai-meta/'+page?.id).then((res)=>res.json()).then((data)=>{
       // console.log(data)
        if(data?.status=="success"){
            setValue('meta_title',data?.data?.title);
            setValue('meta_keywords',data?.data?.keywords);
            setValue('meta_description',data?.data?.description);
        }
        setBtnMetaLoading(false);
    }).finally(()=>{
        setBtnMetaLoading(false);
    })
}
    useEffect(() => {
      if(page?.content){
        //setValue('content',page?.content);
        setHtml(page?.content);
      }
      //setBtnLoading(false);
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
                                  <h5>Edit Information</h5>
                                  <Link href="/admin/pages" className="align-items-center btn btn-theme">
                                    <i className="ri-list-check-2"></i>Pages
                                  </Link>
                              </div>
                            <form className="theme-form theme-form-2 mega-form" onSubmit={handleSubmit(onSubmit)} > 
                        
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0"> Title</label>
                                    <div className="col-sm-9">
                                        <input 
                                            {...register("title")}
                                            className="form-control"
                                            placeholder="Title"
                                        />
                                        {errors?.title?.message && (
                                          <p style={{ color: "red" }}>{errors?.title?.message?.toString()}</p>
                                        )}
                                    </div>
                              </div>

                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0"> Slug</label>
                                    <div className="col-sm-9">
                                        {page?.slug?page?.slug:''}
                                    </div>
                              </div>
                            
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Page content</label>
                                    <div className="col-sm-9">
                                        <TextEditor value={html} change={descriptionOnChange}  />
                                        {errors?.content?.message && (
                                            <p style={{ color: "red" }}>{errors?.content?.message?.toString()}</p>
                                        )}
                                    </div>
                              </div>
                             
                              
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Image</label>
                                    <div className="col-sm-9">
                                        <input
                                            {...register('image', { required: true })}
                                            className="form-control"
                                            placeholder="Image"
                                            type='file'
                                        />
                                        {errors?.image?.message && (
                                            <p style={{ color: "red" }}>{errors?.image?.message?.toString()}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Meta Title</label>
                                    <div className="col-sm-9">
                                        <input 
                                            {...register("meta_title")}
                                            className="form-control"
                                            placeholder="Title"
                                        />
                                        {errors?.meta_title?.message && (
                                          <p style={{ color: "red" }}>{errors?.meta_title?.message?.toString()}</p>
                                        )}
                                    </div>
                              </div>
                              <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Meta Keywords</label>
                                    <div className="col-sm-9">
                                        <input 
                                            {...register("meta_keywords")}
                                            className="form-control"
                                            placeholder="Keywords"
                                        />
                                        {errors?.meta_keywords?.message && (
                                          <p style={{ color: "red" }}>{errors?.meta_keywords?.message?.toString()}</p>
                                        )}
                                    </div>
                              </div>

                                <div className="mb-4 row align-items-center">
                                    <label className="form-label-title col-sm-3 mb-0">Meta description</label>
                                    <div className="col-sm-9">
                                        <textarea 
                                            {...register("meta_description")}
                                            className="form-control"
                                            placeholder="Description"
                                        ></textarea>
                                        {errors?.meta_description?.message && (
                                            <p style={{ color: "red" }}>{errors?.meta_description?.message?.toString()}</p>
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
                                    <div className="col-sm-6 form-label-title">
                                      <button className="flex items-center focus:outline-none btn btn-animation w-30 btn-info" type="button" disabled={btnMetaLoading} onClick={aiMeta}>
                                          {btnMetaLoading?<Loader />:<>Generate Meta <i className="fa fa-robot ml-1"></i></>}
                                      </button>
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

EditPage.layout = (page: React.ReactNode) => (
  <AdminLayout title="Edit Page" children={page} />
);

export default EditPage;