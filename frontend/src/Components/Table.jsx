import { Table } from "antd";
import React, { useState,useEffect } from 'react'


  
  
  function TableFormat(props) {
    const [dataSource,setDataSource] = useState([]);
  
    const columns = [
      {
        title: 'Order Number',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
      },
      {
        title: 'Paid Amount',
        dataIndex: 'paidAmount',
        key: 'paidAmount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Order Date',
        dataIndex: 'orderdate',
        key: 'orderdate',
      },
      
      
    ];
    useEffect(()=>{
      fetch('http://localhost/api/getorders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email:props.email
          })
        }).then(res=>res.json()).then(data=>setDataSource(data.orders))
    },[])
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />;
        </div>
    )
  }
  
  export default TableFormat
  
