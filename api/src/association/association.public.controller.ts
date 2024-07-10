import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AssociationService } from './association.service';
import { GetEventsDto } from './dtos/getEventByCategoryDTO.dto';
import { res } from 'src/common/response.helper';

@Controller('association-public')
export class AssociationPublicController {
    constructor(private associationService: AssociationService){}
    @Post('query/events')
    async getEvents(@Body() body: GetEventsDto) {
        const events = await  this.associationService.getEventsByCategory(body);
        return res.success(events, `${events.events.length} event found!!` )
    }
}
