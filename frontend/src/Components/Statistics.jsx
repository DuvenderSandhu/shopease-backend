import React,{useEffect,useState} from 'react';
import { Col, Row, Statistic } from 'antd';
import AdminDashboard from './Admin';
import ProductsTable from './ProductsTable';
import PieChartComponent from './Chart';
import UserTable from './UserTable'
import OrderTable from './OrderTable'
import CountUp from 'react-countup';
import AdminBreadCrumb from './AdminBreadCrumb';
const Statistics = () => {
  const [data,setData] = useState([])
   const formatter = (value) => <CountUp end={value} separator="," />;
  useEffect(()=>{
    fetch('http://localhost/api/statistics').then(res=>res.json()).then(data=>console.log(data))
  },[])
   return (
   <div className='w-4/5 mx-auto '>
     <AdminBreadCrumb  />
 <div className="my-6">
   <Row gutter={16}>
    <Col span={6}>
      <Statistic title="Active Users" value={11}formatter={formatter} />
    </Col>
    <Col span={6}>
      <Statistic title="Account Balance (CNY)" value={101} precision={2} formatter={formatter} />
    </Col>
    <Col span={6}>
      <Statistic title="Active Users" value={15} formatter={formatter} />
    </Col>
    <Col span={6}>
      <Statistic title="Account Balance (CNY)" value={2460} precision={2} formatter={formatter} />
    </Col>
  </Row>
  {/* <PieChartComponent/> */}
    <UserTable/>
    <ProductsTable/>
    <OrderTable/>

 </div>
   </div>
)}

export default Statistics
