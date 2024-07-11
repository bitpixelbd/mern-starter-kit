/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

import { UpdatePasswordDto } from "../dto/updatePasswordDto";
import { UserDashBoardService } from "../services/user-dashboard.service";
import { UserDashboardNotificationService } from "../services/user-dashboard-notification.service";
import { MarkNotificationsReadDto } from "../dto/mark-notification-read.dto";
import { CreateUpdateVerificationDto } from "../dto/add-update-verification-data.dto";
import { VerifyOtpForPhoneNumberUpdateDto } from "../dto/verify-otp-for-phone-number-update.dto";

@UseGuards(JwtAuthGuard)
@Controller('user-profile')
export class UserDashBoardController {
    constructor(
        private readonly userDashboardService: UserDashBoardService,
        private readonly notificationService: UserDashboardNotificationService
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

    @Patch('update-password')
    async updateUserPassword(@Req() req, @Body() data: UpdatePasswordDto) {
        const { id } = req.user
        const response = await this.userDashboardService.updateUserPassword(data, Number(id))
        return res.success(response)
    }

    @Get('notifications')
    async getUserNotifications(@Req() req) {
      const { id: userId } = req.user;
      const notifications = await this.notificationService.getUserNotifications(userId);
      return res.success(notifications, 'User notifications retrieved successfully');
    }
  
    @Post('notifications/mark-read')
    async markNotificationsAsRead(@Req() req, @Body() markNotificationsReadDto: MarkNotificationsReadDto) {
      const { id: userId } = req.user;
      const result = await this.notificationService.markNotificationsAsRead(userId, markNotificationsReadDto);
      return res.success(result, 'Notifications marked as read successfully');
    }

    @Post('verification-info-crud')
    async createOrUpdateUserVerification(@Req() req, @Body() dto: CreateUpdateVerificationDto) {
        const { id: userId } = req.user;
        const verification = await this.userDashboardService.createOrUpdateUserVerification(userId, dto);
        return res.success(verification, 'User verification created or updated successfully');
    }

    @Post("update/phone/verify/otp")
    async verifyOtpForUpdatePhone (@Body() payload: VerifyOtpForPhoneNumberUpdateDto) {
        const instanceOfVerification = await this.userDashboardService.verifyOtpForPhoneNumberUpdate(payload)
        return res.success({mesasge: "successfully verified", instanceOfVerification})
    }

    @Post("update/phone-number")
    async updatePhoneNumber(@Req() req, @Body() payload: {newNumber:string}) {
        const { id: userId } = req.user;
        const updatePhoneNumber = await this.userDashboardService.updatePhoneNumber(userId, payload.newNumber)
        return res.success(updatePhoneNumber, "Update Successfully")
    }
}