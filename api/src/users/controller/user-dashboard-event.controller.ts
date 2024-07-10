/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

import { UpdatePasswordDto } from "../dto/updatePasswordDto";
import { UserDashBoardService } from "../services/user-dashboard.service";
import { UserDashBoardEventService } from "../services/user-dashboard-event.service";
import { AddEventParticipantDto } from "../dto/add-event-participation.dto";
import { ShareEventDto } from "../dto/add-share-event.dto";
import { SubscribeAssociationDto } from "../dto/subscribe-association.dto";

@UseGuards(JwtAuthGuard)
@Controller('user-profile/association')
export class UserDashBoardEventController {
    constructor(
        private readonly userDashboardEventService: UserDashBoardEventService
    ) { }
    @Post('event/participate')
    async addParticipant(@Req() req, @Body() addParticipantDto: AddEventParticipantDto) {
      const { id: userId } = req.user;
      const participant = await this.userDashboardEventService.addParticipant(userId, addParticipantDto);
      return res.success(participant, 'Successfully registered');
    }

    @Post('event/share')
    async shareEvent(@Req() req, @Body() shareEventDto: ShareEventDto) {
      const { id: userId } = req.user;
      const eventShare = await this.userDashboardEventService.shareEvent(userId, shareEventDto);
      return res.success(eventShare, 'Event shared successfully');
    }
    @Post('subscribe')
    async subscribeToAssociation(@Req() req, @Body() subscribeAssociationDto: SubscribeAssociationDto) {
      const { id: userId } = req.user;
      const subscription = await this.userDashboardEventService.subscribeToAssociation(userId, subscribeAssociationDto);
      return res.success(subscription, 'Subscribed to association successfully');
    }
}