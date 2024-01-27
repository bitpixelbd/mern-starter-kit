import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
// import { res } from "src/common/response.helper";
// import { Role } from "src/user-auth/dto/role.enum";
// import { HasRoles } from "src/user-auth/jwt/has-roles.decorator";
// import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";
// import { RolesGuard } from "src/user-auth/jwt/roles.guard";

// import { UserSendMessageDto } from "../dto/advior-message.dto";
// import { UpdatePasswordDto } from "../dto/updatePasswordDto";
// import { UserDashBoardService } from '../services/user-dashboard.service';

// @HasRoles(Role.User)
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user/dashboard')
export class UserDashBoardController {
    constructor() { }

    // @Patch('update/profile')
    // async updateUserProfile(@Req() req, @Body() data) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.updateUserProfile(data, Number(id))
    //     return res.success(response)
    // }

    // @Patch('update/password')
    // async updateUserPassword(@Req() req, @Body() data: UpdatePasswordDto) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.updateUserPassword(data, Number(id))
    //     return res.success(response)
    // }

    // @Get('profile')
    // async getUser(@Req() req) {
    //     const user = req?.user
    //     const id = user?.id
    //     const response = await this.userDashBoardService.getUser(Number(id))
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