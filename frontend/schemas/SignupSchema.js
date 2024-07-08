import {z} from 'zod'

 const  SignupSchema = z.object({
    email:z.string().email({message:"Email Must be Valid Email"}),
    password:z.string().min(8,{message:"Password Must be 8 Character"}).max(20,{message:"Password Must not Exceed 20 Character"}),
    fullName:z.string().min(3,{message:"Full Name Must be 3 Character"}).max(20,{message:"Full Name Must not Exceed 20 Character"})
  });

export default SignupSchema