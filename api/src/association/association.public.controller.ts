import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AssociationService } from './association.service';
import { GetEventsDto } from './dtos/getEventByCategoryDTO.dto';
import { res } from 'src/common/response.helper';
import { GetPeriodEventsDto } from './dtos/getWeeklyEvent.dto';

@Controller('association-public')
export class AssociationPublicController {
    constructor(private associationService: AssociationService){}
    @Post('query/events')
    async getEvents(@Body() body: GetEventsDto) {
        const events = await  this.associationService.getEventsByCategory(body);
        return res.success(events, `${events.events.length} event found!!` )
    }

    @Post('weekly-event')
    async getPeriodEvents(@Body() body: GetPeriodEventsDto) {
        const events = await this.associationService.getPeriodEvents(body);
        return res.success(events)
    }

    @Get('event/:id')
    async getEventById(@Param('id', ParseIntPipe) id: number) {
        const event = await  this.associationService.getEventById(id);
        return res.success(event, "Event Found!!!")
    }
}
