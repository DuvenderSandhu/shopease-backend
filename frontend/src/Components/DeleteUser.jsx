import React, { useState ,useEffect} from 'react';
import {  Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { AudioOutlined } from '@ant-design/icons';
import actionCreators from '../../state';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Flex
} from 'antd';
import AdminBreadCrumb from '../Components/AdminBreadCrumb';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const onChange = (e) => {
  console.log('Change:', e.target.value);
};

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);


const DeleteUser = () => {
    const [data,setData]=useState({name:"Duvender Sandhu",brand:"XYZ"})
    const dispatch= useDispatch()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);}
    const onSearch = (value, _e, info) =>{
    fetch(`http://localhost/api/delete/user`,{
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userID:value
          })
    }).then(res=>res.json()).then(data=>{
        if(data.type==='success'){
            dispatch(actionCreators.showNotification({type:data.type,msg:data.msg}))
        }
        else{
            dispatch(actionCreators.showNotification({type:data.type,msg:data.msg}))

        }
    })
    };
    return (
        <div className='px-8 md:px-24 m-auto lg:px-48'>
            
        {user.isAdmin?<AdminBreadCrumb/>:""}
        <div className='flex justify-center flex-col items-center m-8'>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl my-8">Remove User </h1>
        <Space direction="vertical">
                    <Search
                    placeholder="Enter Email"
                    allowClear
                    enterButton="Search"
                    size="large"
                    className='bg-danger'
                    onSearch={onSearch}
                    />
                </Space>
        </div>
                </div>
)};
export default DeleteUser;
