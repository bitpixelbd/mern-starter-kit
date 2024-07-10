import { Controller } from '@nestjs/common';
import { AssociationService } from './association.service';

@Controller('association-public')
export class AssociationPublicController {
    constructor(private associationService: AssociationService){}
}
