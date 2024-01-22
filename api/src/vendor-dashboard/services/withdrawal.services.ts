/* eslint-disable */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { DiscountTypes } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WithdrawalService {
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly jwtSignService: JwtSignService
  ) { }

  async createWithdrawal(payload, vendor_id: number) {

    const vendor = await this.prismaService.user.findFirst({
      where: { id: vendor_id }, select: {
        is_vendor: true,
        is_verified: true,
      }
    })

    if (vendor?.is_vendor && vendor?.is_verified) {
      const withdrawal = await this.prismaService.withdrawal.create({
        data: { ...payload, vendor_id },
      });

      return withdrawal;
    }

    else {
      throw new HttpException("Vendor not verified", HttpStatus.FORBIDDEN)
    }
  }

  async getOrderOnProduct(products: any) {
    const data = [];
    const ids = await products?.map((item) => Number(item?.product_id));
    const findProduts = await this.prismaService.product.findMany({
      where: {
        id: { in: ids },
      },
      select: {
        id: true,
        cost_pert_item: true,
        price: true,
        Discount: true,
      },
    });

    for (let i = 0; i < products?.length; i++) {
      const element = products[i];

      const product = await this.prismaService.product.findFirst({
        where: { id: Number(element?.product_id) },
        select: {
          id: true,
          cost_pert_item: true,
          price: true,
          Discount: true,
        },
      });

      let total = product?.price * element?.quantity;
      if (Array.isArray(product?.Discount) && product?.Discount?.length) {
        const find = product?.Discount?.find((i) => !i.is_expired);
        if (find && find?.discount_type === DiscountTypes.FIXED) {
          total -= find.discount_amount * element?.quantity;
        } else if (find && find?.discount_type === DiscountTypes.PERCENTAGE) {
          const disc = find.discount_amount;
          const total_disc = (disc / 100) * total;
          total -= total_disc;
        }
      }
      data.push({
        total_price: total,
        product_quantity: element?.quantity,
        product_id: product?.id,
      });
    }

    return data;
  }

  async getWithdrawal() {
    return await this.prismaService.withdrawal.findMany()
  }

  updateWithdrawal(id: number, data) {
    return this.prismaService.withdrawal.update({
      where: { id: id },
      data
    });
  }

  deleteWithdrawal(id: number) {
    return this.prismaService.withdrawal.delete({ where: {  id } })
  }


}
