import { Link,usePage } from '@inertiajs/react';
import classNames from 'classnames';

export default function Pagination({meta,baseUrl}:any) {
  const {filters} = usePage<any>()?.props|| [];
  const params = new URLSearchParams();
  const pageUrl =(page:number)=>{
    
    if(page){
      params.set('page', page.toString());
    }
    return baseUrl+'?'+params.toString();
  }

  const pageUrlFromUrl =(url:string)=>{
   // console.log(url,'url from url',meta);
    if(!url) return '';
    if(url==null) return '';
    if (typeof window === 'undefined') return url;
    const urlObj = new URL(url, window.location.origin);
    const params = new URLSearchParams(urlObj.search);
    
    return baseUrl+'?'+params.toString();
  }

  if (meta?.lastPage === 1) return null;
  return (
    <div className="flex flex-wrap mt-6 -mb-1">
        <PaginationItem key={'page_first'} label={'First'} url={pageUrl(meta?.firstPage)} active={meta?.currentPage==meta?.firstPage?true:false} />
        <PaginationItem key={'page_prev'} label={'Previous'} url={pageUrlFromUrl(meta?.previousPageUrl)} active={false} />
        {/* <PaginationNumber meta={meta} baseUrl={baseUrl}/> */}
        {PaginationNumber(meta).map((page, index) => (
          <PaginationItem key={index} label={page} url={pageUrl(page)} active={meta?.currentPage==page?true:false} />
        ))}
        <PaginationItem key={'page_Next'} label={'Next'} url={pageUrlFromUrl(meta?.nextPageUrl)} active={false} />
        <PaginationItem key={'page_Last'} label={'Last'} url={pageUrl(meta?.lastPageUrl)} active={meta?.currentPage==meta?.lastPage?true:false} />
    </div>
  );
}

function PaginationNumber(meta:any){
    const pageNumbers = [];
    const firstPage = 1;
    const lastPage = meta?.totalPages;
    const startPage = Math.max(meta?.firstPage, meta?.currentPage - Math.floor(10 / 2));
    const endPage = Math.min(meta?.lastPage, startPage + 10 - 1);
    if (startPage > firstPage) {
      pageNumbers.push(firstPage);
      if (startPage > firstPage + 1) pageNumbers.push('...');
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < lastPage) {
      if (endPage < lastPage - 1) pageNumbers.push('...');
      pageNumbers.push(lastPage);
    }
    return pageNumbers;
}

function PaginationItem({active, label, url,disabled }:any) {
  const className = classNames(
    [
      'mr-1 mb-1',
      'paging',
      'border border-solid border-gray-300 rounded',
      'text-sm',
      'hover:bg-white',
      'focus:outline-none focus:border-indigo-700 focus:text-indigo-700'
    ],
    {
      'bg-white active_paging':active
    }
  );
  return (
    <>
    {disabled ? <span className="mr-1 mb-1 paging border border-solid border-gray-300 rounded text-sm">...</span>:
    <Link className={className} href={url as string}>
      <span>{label}</span>
    </Link>
  }
    </>
    
  );
}
