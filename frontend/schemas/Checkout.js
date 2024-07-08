import { z } from 'zod';

const currentDate = new Date();
const day = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
const currentYear = currentDate.getFullYear();

const CheckoutSchema = z.object({

    card: z.string().min(16, { message: "Invalid Card" }).max(16, { message: "Invalid Card" }),
   expiry: z.object({
    month: z.number().min(1).max(12),
    year: z.number().min(currentYear),
}).refine(value => {
    const { year, month } = value;
    return year > currentYear || (year === currentYear && month >= currentMonth);
}, { message: "Invalid Expiry Date" }),

    cvc: z.string().min(3, { message: "CVC Must be 3 Digits" }).max(3, { message: "CVC Must be 3 Digits" }),
    address: z.string().min(5, { message: "Address must be at least 5 letters" }).max(50, { message: "Address can't exceed more than 50 letters" }),
    city: z.string().min(3, { message: "City must be at least 3 letters" }),
    state: z.string().min(5, { message: "State must be at least 5 letters" }),
    pincode: z.string().min(6, { message: "Invalid PinCode" }).max(6, { message: "Invalid PinCode" }),
});

export default CheckoutSchema;
