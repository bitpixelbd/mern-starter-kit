/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

import { UserDashBoardService } from "../services/user-dashboard.service";

@UseGuards(JwtAuthGuard)
@Controller('user-profile')
export class UserDashBoardController {
    constructor(
        private readonly userDashboardService: UserDashBoardService
    ) { }
    @Get('user')
    async recommendedCommunities(@Req() req) {
        const { id } = req.user;
        const response = await this.userDashboardService.getUser(+id)
        return res.success(response);
    }

    @Patch('update')
    async updateUserProfile(@Req() req, @Body() data) {
        const { id } = req.user;
        const response = await this.userDashboardService.updateUserProfile(data, Number(id))
        return res.success(response)
    }






    // @Patch('update/password')
    // async updateUserPassword(@Req() req, @Body() data: UpdatePasswordDto) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.updateUserPassword(data, Number(id))
    //     return res.success(response)
    // }



    // @Get('recommended/communities')
    // async recommendedCommunities(@Req() req) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.recommendedCommunities(Number(id))
    //     return res.success(response)
    // }

    // @Get('saved/communities')
    // async savedCommunities(@Req() req) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.savedCommunities(Number(id))
    //     return res.success(response)
    // }

    // @Get('refer/list')
    // async getReferdUsers(@Req() req) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.getReferdUsers(Number(id))
    //     return res.success(response)
    // }

    // @Post('quizz')
    // async saveUserQuizz(@Body() quizz, @Req() req) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.saveUserQuizz(quizz, Number(id))
    //     return res.success(response)
    // }

    // @Post('message/advisor')
    // async sendAdvisorMessage(@Body() message: UserSendMessageDto, @Req() req){
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.sendAdvisorMessage(message, Number(id))
    //     return res.success(response)
    // }
}