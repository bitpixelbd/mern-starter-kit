/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService: PrismaService,
        // private readonly jwtSignService: JwtSignService
    ) { }

    async createProduct (payload , vendor_id: number){

        // const store = await this.prismaService.st

        const product = await this.prismaService.product.create({
            data: payload
        }) 

        return product
    }

    async updateProduct( data, product_id: number) {

        const findProduct = await this.prismaService.product.findFirst({
            where: {
                id: product_id
              }
        })


        if( findProduct === null ) {
             throw new HttpException("Product not found" , HttpStatus.NOT_FOUND);

        }else{
            
            delete data["store_id"] // can not update the vendor data

            const updatedProduct = await this.prismaService.product.update({
                where: {
                    id: product_id
                  },

                 data
            })

            return updatedProduct
           
        }
    }

 

}
