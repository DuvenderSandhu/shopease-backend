import React,{useState,useEffect} from 'react';
import { Modal,Form  } from 'antd';
import {User} from 'lucide-react';
import {Link, useNavigate} from'react-router-dom'
import { useDispatch ,useSelector} from 'react-redux';
import actionCreators from '../../state';
import TableFormat from './Table'
import ChangePasswordFormat from './ChangePassword'
import AdminBreadCrumb from './AdminBreadCrumb';
const Profile = ({ username="Stanger", email="Email@email.com", bio="Nothing" }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.changeUser)
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
    function Logout(){
        dispatch(actionCreators.changeUser(""))
        navigate('/signin')
    }
    function ValidateActivation(){
      dispatch(actionCreators.showNotification({type:"error",msg:"Your Account is Deactivate"}))
      dispatch(actionCreators.changeUser({username:"",email:"",token:""}))
      navigate('/signup')
    }
    useEffect(()=>{
      user.token?user.isAdmin?"":navigate('/profile'):navigate('/signup')
      user.token?user.activactionStatus===false?ValidateActivation():"":""
    },[])
  return (
    <div className="bg-white shadow-md rounded-lg w-4/5 m-auto">
      
      {user.isAdmin?<AdminBreadCrumb/>:""}
      {!user.activationStatus?<div className="font-bold text-red-800 text-center text-lg my-4"> Your Account has been Deactivated by Admin You Can only Access Your Account</div>:""}
      <div className="flex items-center mb-4 my-8">
        <User />
        <h1 className="ml-2 text-xl font-semibold">{user.email}</h1>
      </div>
      <p className="text-gray-600 mb-2">Email: {user.email}</p>
      <p className="text-gray-600 mb-4">Bio: {user.bio || "BIO"}</p>
      <div 
            
            onClick={()=>{dispatch(actionCreators.changeUser({token:"",username:"",email:""}));navigate('/signin');dispatch(actionCreators.showNotification("success","Logout Successfully"))}}
            className="rounded-md inline border mx-4 cursor-pointer border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Log Out
          </div>
          <Modal title="Basic Modal"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ChangePasswordFormat/>
      </Modal>
      <div 
            
            onClick={showModal}
            className="cursor-pointer rounded-md inline border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Change Password
          </div>
<div className="mt-8">
<h1 className='ml-2 text-xl font-semibold'>Orders</h1>
          <TableFormat email={user.email}/> 
</div>
    </div>
  );
};

export default Profile;
