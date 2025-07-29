import { useEffect, useState } from "react";

const formatDate = (d:any) => {
    let dt = new Date(d);
    return dt.toLocaleDateString('en-IN', {
      weekday: 'long', 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
};
export default formatDate;
