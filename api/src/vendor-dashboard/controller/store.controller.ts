/* eslint-disable */
import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { HasRoles } from "src/auth/jwt/has-roles.decorator";
import { JwtAuthGuard } from "src/auth/jwt/jwt-auth.guard";
import { RolesGuard } from "src/auth/jwt/roles.guard";

import { Role } from "src/auth/dto/role.enum";

import { StoreService } from "../services/store.services";
import { res } from "src/common/response.helper";
import { StoreDto } from "../dto/store.dto";

@HasRoles(Role.Vendor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vendor')
export class StoreController {

    constructor(
        private readonly storeService: StoreService,
    ) { }

    @Post('stores/create')
    async createStore(@Body() data: StoreDto , @Req() req) {

        const {id} = req.user // gets the id of the vendor/user from bearer token

        const response = await this.storeService.createStore(data , +id)

        return  res.success(response)
    }

    @Get("stores/:id")
    async getStore(@Param('id') id : number ){

        const response = await this.storeService.getStores(+id)

        return res.success(response);
    }

    @Patch("store/update/:id")
    async updateStore(@Param('id') id: string, @Body() data , @Req() req) {

        const response = await this.storeService.updateStore(data , +id)

        return res.success(response); 
    }
}
