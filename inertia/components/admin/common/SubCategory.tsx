import React, { useState, useEffect } from "react";
import SelectInput from '#inertia/components/form/SelectInput';
const SubCategory = ({name,value,change,category,error,label}:any)=>{
    const [categories, setCategories] = useState([]);
  
    function getSubCats(category:number){
        if(category){
            fetch('/admin/category/sub-categories/'+category).then(async(data)=>{
                const d = await data.json()
                setCategories(d?.categories);
                //setOldValue('')
            });
        }
        
    }
    useEffect(() => {
        getSubCats(category);
        //setOldValue(oldValue)
        //console.log(category,'category in sub cat');
    }, [category]);
    return (
        <div className="mb-4 row align-items-center">
            <label className="form-label-title col-sm-3 mb-0">{label}</label>
            <div className="col-sm-9">
                <SelectInput
                    name={name}
                    value={value}
                    onChange={change}
                    options={categories}
                    // oldValue={noldValue}
                   // selected={selected}
                />
                {error && (
                    <p style={{ color: "red" }}>{error?.toString()}</p>
                )}
            </div>
        </div>
    );
}
export default SubCategory;