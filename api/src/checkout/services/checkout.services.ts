/* eslint-disable */
import { Injectable } from "@nestjs/common";

import { PrismaService } from '../../prisma/prisma.service';
import { CheckoutDto, } from "../dto/checkout.dto";
import { DiscountTypes } from "@prisma/client";

@Injectable()
export class CheckouthService {
    constructor(
        private readonly prismaService: PrismaService,
        // private readonly jwtSignService: JwtSignService
    ) { }

    async createCheckout(payload: CheckoutDto,user_id:number) {
        const body = payload
        
       
        const data:any = {...payload}
        data.user_id = user_id

        if(payload.product){
            const order_on_product = await this.getOrderOnProduct(payload.product)
            data.OrderOnProduct ={ create:order_on_product}
            const products_total_price = await this.getProductTotalPrice(payload.product)
            // data.
        }

        if(payload.shipping){
            if(payload.shipping?.address_id){
                data.shipping_id = Number(payload.shipping?.address_id) 
            }
            else{
                delete payload.shipping['address_id']
                data.ShippingAddress = {
                    create:{...payload.shipping,
                        user_id,
                        is_billing_address:false                    
                    }
                }
            }
        }

        if(payload.billing){
            if(payload.billing?.address_id){
                data.billing_id = Number(payload.billing?.address_id) 
            }
            else{
                delete payload.billing['address_id']
                data.BillinggAddress = {
                    create:{...payload?.billing,
                    user_id,
                    is_billing_address:true                    
                    }
                }
            }
        }

        delete data['billing']
        delete data['shipping']
        delete data['product']
        
        // console.log(data);
        // return data

        return await this.prismaService.order.create({
            data
        })
        
    }

    /*
    // user_id
    // discount_id
    sub_amount
    promotion_amount
    tax_amount
    shipping_amount
    // payment_method
    shipping_id
    billing_id
    note
    status
    is_company_invoice
    company_name
    company_email
    company_address
    company_tax
    OrderOnProduct
    ShippingAddress
    BillinggAddress
    [1,2,3,]
    */

    async getOrderOnProduct(products:any){
        const data = []
        const ids = await products?.map(item=> Number(item?.product_id))
        const findProduts = await this.prismaService.product.findMany({
            where:
            {
                id:{in:ids}
            },
            select:{
                id:true,
                cost_pert_item:true,
                price:true,
                Discount:true
            }
        })

        for (let i = 0; i < products?.length; i++) {
            const element = products[i];
            
            const product = await this.prismaService.product.findFirst({
                where:{id:Number(element?.product_id)},
                select:{
                id:true,
                cost_pert_item:true,
                price:true,
                Discount:true
            }})

            let total = product?.price * element?.quantity
            if(Array.isArray(product?.Discount) && product?.Discount?.length){
                const find = product?.Discount?.find(i=> !i.is_expired) 
                if(find && find?.discount_type === DiscountTypes.FIXED){
                    total -= (find.discount_amount * element?.quantity)
                }
                else if(find && find?.discount_type === DiscountTypes.PERCENTAGE){
                    const disc = find.discount_amount
                    const total_disc = (disc / 100) * total;
                    total -=total_disc; 
                }
            }
            data.push({
                total_price:total,
                product_quantity:element?.quantity,
                product_id:product?.id
            })
        }

        return data

    }


    async getProductTotalPrice (products:any){
        const ids = await products?.map(item=> Number(item?.product_id))
        const findProduts = await this.prismaService.product.findMany({
            where:
            {
                id:{in:ids}
            },
            select:{
                id:true,
                cost_pert_item:true,
                price:true,
                Discount:true
            }
        })
        const arr = await products?.map(item=>{
            const find=  findProduts?.find(j=> j?.id === item?.product_id)
            let total = find?.price * item?.quantity
            if(Array.isArray(find?.Discount) && find?.Discount?.length){
                const f = find?.Discount?.find(i=> !i.is_expired) 
                if(f && f?.discount_type === DiscountTypes.FIXED){
                    total -= (f.discount_amount * item?.quantity)
                }
                else if(f && f?.discount_type === DiscountTypes.PERCENTAGE){
                    const disc = f.discount_amount
                    const total_disc = (disc / 100) * total;
                    total -=total_disc; 
                }
            }
            return total;
        })
        const sumWithTotal = arr.reduce((a, b) => a + b,0);
        return sumWithTotal;
    }

    // async checkIfEmailExists(email: string): Promise<boolean> {
    //     const check = await this.prismaService.user.findFirst({ where: { email: email } })
    //     return !!(check)
    // }

    // async checkIfPhoneExists(phone: string): Promise<boolean> {
    //     const check = await this.prismaService.user.findFirst({ where: { phone } })
    //     return !!(check)
    // }

    // // async isUserPhoneVerified(phone: string): Promise<boolean> {
    // //     const check = await this.prismaService.user.findFirst({ where: { phone } })
    // //     return (check.is_verified)
    // // }

    // // async isUserEmailVerified(email: string): Promise<boolean> {
    // //     const check = await this.prismaService.user.findFirst({ where: { email } })
    // //     return (check.is_verified)
    // // }

    // async createOtp(data) {
    //     const otp_code = crypto.randomInt(100000, 999999)
    //     data.otp = otp_code

    //     const is_email_exist = await this.prismaService.otpVerification.findFirst({ where: { email: data.email } })

    //     if (is_email_exist !== null) {
    //         return this.prismaService.otpVerification.update({
    //             where: { email: is_email_exist.email, id: is_email_exist.id },
    //             data
    //         })
    //     }
    //     return await this.prismaService.otpVerification.create({
    //         data
    //     })

    // }

    // async loginUser(data: UserLoginDto) {
    //     const isEmail = await this.validateEmail(data.email_or_phone)
    //     let user = null
    //     if (!isEmail) {
    //         user = await this.prismaService.user.findFirst({
    //             where: { phone: data.email_or_phone }
    //         })
    //     } else {
    //         user = await this.prismaService.user.findFirst({
    //             where: { email: data.email_or_phone }
    //         })
    //     }
    //     // const user = await this.prismaService.user.findFirst({
    //     //     where: { email: data.email }
    //     // })
    //     if (user === null) {
    //         throw new HttpException("Invalid Credatials", HttpStatus.UNAUTHORIZED)
    //     }
    //     if (!user.is_verified) {
    //         throw new HttpException("This user is not verified", HttpStatus.NOT_ACCEPTABLE)
    //     }
    //     const isPasswordMatch = await bcrypt.compare(data.password, user?.password)
    //     if (!isPasswordMatch) {
    //         throw new HttpException("Invalid Credatials", HttpStatus.UNAUTHORIZED)
    //     }

    //     const role = user.is_vendor ? ROLE_VENDOR : ROLE_USER

    //     const access_token = await this.jwtSignService.signJwt({ email: user?.email, phone: user?.phone, id: user?.id }, role)
    //     delete user['password']
    //     return {
    //         ...user,
    //         access_token,
    //         role: role
    //     }
    // }

    // async verifyUser(data: VerifyOtpDto) {
    //     const verify = await this.prismaService.otpVerification.findFirst({ where: { email: data.email, otp: Number(data.otp) } })
    //     if (verify === null) {
    //         throw new HttpException("Otp not valid", HttpStatus.BAD_REQUEST)
    //     }
    //     const user = await this.prismaService.user.update({
    //         where: { email: data.email },
    //         data: {
    //             is_verified: true
    //         }
    //     })
    //     await this.prismaService.otpVerification.delete({ where: { id: verify.id, email: verify.email } })

    //     const role = user.is_vendor ? ROLE_VENDOR : ROLE_USER

    //     const access_token = await this.jwtSignService.signJwt({ email: user.email, phone: user.phone, id: user.id }, role);
    //     delete user['password'];
    //     return {
    //         ...user,
    //         access_token,
    //         role
    //     };

    // }

    // async createReferRequest(ref_by: string, user_id: number) {
    //     const data: any = {}
    //     const ref_by_req = ref_by?.split("-")
    //     if (ref_by_req[0] === "u") {
    //         const valid_user = await this.prismaService.user.findFirst({ where: { id: Number(ref_by_req[3]), first_name: ref_by_req[1], last_name: ref_by_req[2] } })
    //         if (valid_user !== null) {
    //             data.refer_by_user = valid_user.id
    //             data.type = ReferralTYPE.USER
    //         }
    //     }
    //     else if (ref_by_req[0] === "p") {
    //         const valid_partner = await this.prismaService.partner.findFirst({ where: { id: Number(ref_by_req[3]), first_name: ref_by_req[1], last_name: ref_by_req[2] } })
    //         if (valid_partner !== null) {
    //             data.refer_by_partner = valid_partner?.id
    //             data.type = ReferralTYPE.PARTNER
    //         }
    //     }
    //     data.user_id = user_id
    //     const referral = await this.prismaService.referral.create({ data })
    // }

    // async validateEmail(email) {
    //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     if (!emailRegex.test(email)) {
    //         return false
    //     } else {
    //         return true
    //     }
    // }

}
