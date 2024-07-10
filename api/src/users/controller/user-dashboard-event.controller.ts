/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

import { UpdatePasswordDto } from "../dto/updatePasswordDto";
import { UserDashBoardService } from "../services/user-dashboard.service";
import { UserDashBoardEventService } from "../services/user-dashboard-event.service";
import { AddEventParticipantDto } from "../dto/add-event-participation.dto";

@UseGuards(JwtAuthGuard)
@Controller('user-profile/event')
export class UserDashBoardEventController {
    constructor(
        private readonly userDashboardEventService: UserDashBoardEventService
    ) { }
    @Post('participate')
    async addParticipant(@Req() req, @Body() addParticipantDto: AddEventParticipantDto) {
      const { id: userId } = req.user;
      const participant = await this.userDashboardEventService.addParticipant(userId, addParticipantDto);
      return res.success(participant, 'Successfully registered');
    }
}