/* eslint-disable */
import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { HasRoles } from 'src/auth/jwt/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/auth/jwt/roles.guard';

import { Role } from 'src/auth/dto/role.enum';
import { res } from 'src/common/response.helper';
import { WithdrawalDto } from '../dto/withdrawal.dto';
import { WithdrawalService } from '../services/withdrawal.services';

@HasRoles(Role.Vendor)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) { }

  @Post('create')
  async createWithdrawal(@Body() data: WithdrawalDto, @Req() req) {
    const { id } = req.user; // gets id of the vendor/user from bearer token
    console.log(id);

    const response = await this.withdrawalService.createWithdrawal(data, +id);

    return res.success(response);
  }

  @Get()
  async getWithdrawal() {
    const response = await this.withdrawalService.getWithdrawal();
    return res.success(response)
  }

  @Patch(':id')
  async updateWithdrawal(@Param('id') id: number, @Body() data) {
    const response = await this.withdrawalService.updateWithdrawal(Number(id), data)
    return res.success(response)
  }

  @Delete(':id')
  async deleteWithdrawal(@Param('id') id: number) {
    const response = await this.withdrawalService.deleteWithdrawal(id);
    return res.success(response)
  }

}