// import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
// import { JwtAuthGuard } from 'src/user-auth/jwt/jwt-auth.guard';
// import { AssociationService } from './association.service';
// import { CreateEventDto } from './dtos/createEventDto';
// import { res } from 'src/common/response.helper';

// @UseGuards(JwtAuthGuard)
// @Controller('association-private')
// export class AssociationPrivateController {
//     constructor(
//         private associationService: AssociationService
//     ){}

//     @Post('event')
//     async createOrUpdateEvent(@Req() req, @Body() eventDto: CreateEventDto) {
//         const { id: associationId } = req.user;
    
//         if (eventDto.id) {
//           // If event ID is present, update the existing event
//           const updateData  = await this.associationService.updateEvent(eventDto.id, eventDto);
//           return res.success(updateData,`${eventDto.id} has updated`)
//         } else {
//           // Otherwise, create a new event
//           const newEvent = this.associationService.createEvent(associationId, eventDto);
//           return res.success(newEvent,`New event has created`)
//         }
//       }
// }


import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user-auth/jwt/jwt-auth.guard';
import { AssociationService } from './association.service';
import { CreateEventDto } from './dtos/createEventDto';
import { res } from 'src/common/response.helper';

@UseGuards(JwtAuthGuard)
@Controller('association-private')
export class AssociationPrivateController {
    constructor(
        private associationService: AssociationService
    ){}

    @Post('event')
    async createOrUpdateEvent(@Req() req, @Body() eventDto: CreateEventDto) {
        const { id: associationId } = req.user;
    
        if (eventDto.id) {
          // If event ID is present, update the existing event
          const updateData  = await this.associationService.updateEvent(+eventDto.id, eventDto);
          return res.success(updateData, `${eventDto.id} has been updated`);
        } else {
          // Otherwise, create a new event
          const newEvent = await this.associationService.createEvent(+associationId, eventDto);
          return res.success(newEvent, `New event has been created`);
        }
    }
}
