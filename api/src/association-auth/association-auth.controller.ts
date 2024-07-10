import { Body, Controller, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AssociationService } from 'src/association/association.service';
import { UserDashBoardService } from 'src/users/services/user-dashboard.service';
import { CreateUpdateAssociationDto } from './dtos/create-update-association';
import { AssociationAuthService } from './association-auth.service';

@Controller('association-auth')
export class AssociationAuthController {
    constructor(
        private readonly userDashboardService: UserDashBoardService,
        private readonly associationAuthService: AssociationAuthService
    ) { }
    @Post("create-update")
    createOrUpdate(@Query('id', ParseIntPipe) id: number | null, @Body() associationDto: CreateUpdateAssociationDto) {
      return this.associationAuthService.createOrUpdateAssociation(id, associationDto);
    }
}