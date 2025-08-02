import React, { useState, useEffect } from "react";
import SelectInput from '#inertia/components/form/SelectInput';
const Category = ({name,value,change,label,error}:any)=>{
    const [parentCategories, setParentCategories] = useState([]);
    function getParentsCats(){
        fetch('/admin/category/all-parents').then(async(data)=>{
            const d = await data.json()
            setParentCategories(d?.categories);
        });
    }
    useEffect(() => {
        getParentsCats();
    }, []);
    return (
        <div className="mb-4 row align-items-center">
            <label className="form-label-title col-sm-3 mb-0">{label?label:'Parent Category'}</label>
            <div className="col-sm-9">
                <SelectInput
                    name={name}
                    value={value}
                    onChange={change}
                    options={parentCategories}
                    //selected={selected}
                    // oldValue={oldValue}
                />
                {error && (
                    <p style={{ color: "red" }}>{error?.toString()}</p>
                )}
            </div>
        </div>
    );
}
export default Category;