/* eslint-disable */
import { Body, Controller, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { HasRoles } from "src/auth/jwt/has-roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { RolesGuard } from "src/auth/jwt/roles.guard";

import { Role } from "src/auth/dto/role.enum";
import { ProductDto } from "../dto/product.dto";
import { ProductService } from "../services/product.services";
import { res } from "src/common/response.helper";

@HasRoles(Role.Vendor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vendor')
export class ProductController {

    constructor(
        private readonly productService: ProductService,
    ) { }

    @Post('products/create')
    async createProduct(@Body() data: ProductDto , @Req() req) {
        const {id} = req.user // gets id of the vendor/user from bearer token

        const response = await this.productService.createProduct(data , +id)

        return  res.success(response)

    }

    @Patch("product/update/:id")
    async updateStore(@Param('id') id: string, @Body() data , @Req() req) {

        const response = await this.productService.updateProduct(data , +id)

        return res.success(response); 
    }
}
