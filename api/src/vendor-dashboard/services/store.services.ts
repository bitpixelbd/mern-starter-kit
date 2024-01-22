/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { PrismaService } from '../../prisma/prisma.service';
import { StoreDto } from "../dto/store.dto";

@Injectable()
export class StoreService {
    constructor(
        private readonly prismaService: PrismaService,
        // private readonly jwtSignService: JwtSignService
    ) { }

    async createStore (payload:StoreDto , vendor_id: number){

        const verified_vendor = await this.prismaService.user.findFirst({
            where: {id:vendor_id},
            select: {
                is_vendor:true,
                is_verified:true,
            }
        });

        if(verified_vendor?.is_vendor && verified_vendor.is_verified){

            const _payload = {...payload , user_id: vendor_id}

            const store = await this.prismaService.store.create({ data: _payload }) ;
            return store
        }
        else{
            throw new HttpException("Vendor not verified" , HttpStatus.FORBIDDEN)
        }
    }

    async getStores(vendor_id: number){

        const verified_vendor = await this.prismaService.user.findFirst({
            where: {id:vendor_id},
            select: {
                is_vendor:true,
                is_verified:true,
            }
        });

        if(verified_vendor?.is_vendor && verified_vendor.is_verified){

            const stores = await this.prismaService.store.findMany({ 
                where:{user_id:vendor_id}
            })

            return stores
        }
        else{
            throw new HttpException("Vendor not verified" , HttpStatus.FORBIDDEN)
        }
    }

    async updateStore( data, store_id:number) {

        const findStore = await this.prismaService.store.findFirst({
            where: {
                id: store_id
              }
        })


        if( findStore === null ) {
             throw new HttpException( "Store not found", HttpStatus.NOT_FOUND);

        }else{

            delete data["user_id"] // can not update the vendor data

            const updatedStore = await this.prismaService.store.update({
                where: {
                    id: store_id
                  },

                 data
            })

            return updatedStore
           
        }
    }
}
