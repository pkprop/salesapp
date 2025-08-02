import { Link } from '@inertiajs/react';
import classNames from 'classnames';

export default function FrontPagination({meta,baseUrl}:any) {
  
  if (meta?.lastPage === 1) return null;
  return (
    <nav className="custome-pagination">
      <ul className='pagination justify-content-center'>
      <PaginationItem key={'page_first'} label={'<<'} url={meta?.firstPageUrl} active={meta?.currentPage==meta?.firstPage?true:false} />
        <PaginationItem key={'page_prev'} label={'<'} url={meta?.previousPageUrl} active={false} />
        {/* <PaginationNumber meta={meta} baseUrl={baseUrl}/> */}
        {PaginationNumber(meta).map((page, index) => (
          <PaginationItem key={index} label={page} url={baseUrl+'?page='+page} active={meta?.currentPage==page?true:false} />
        ))}
        <PaginationItem key={'page_Next'} label={'>'} url={meta?.nextPageUrl} active={false} />
        <PaginationItem key={'page_Last'} label={'>>'} url={meta?.lastPageUrl} active={meta?.currentPage==meta?.lastPage?true:false} />
      </ul> 
    </nav>
  );
}

function PaginationNumber(meta:any){
  let pElement =[];
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
    //console.log(pageNumbers,'pageNumbers',meta);
    return pageNumbers;
}

function PaginationItem({active, label, url,disabled }:any) {
  const className = classNames(
    [
      'page-item'
    ],
    {
      'active':active
    }
  );
  return (
    <>
    {disabled ? 
    <li className='page-item disabled'> <span className="page-link">...</span></li>
    :
    <li className={className}>
      <Link className='page-link' href={url as string}>
        <span>{label}</span>
      </Link>
    </li>
    }
    </>
    
  );
}
