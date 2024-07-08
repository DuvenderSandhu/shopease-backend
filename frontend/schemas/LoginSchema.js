import {z} from 'zod'

 const  LoginSchema = z.object({
    email:z.string().email({message:"Email Must be Valid Email"}),
    password:z.string().min(8,{message:"Password Must be 8 Digit"}).max(20,{message:"Password Must not Exceed 20 Digit"})
  });

export default LoginSchema