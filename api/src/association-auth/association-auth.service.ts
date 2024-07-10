
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import EmailService from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUpdateAssociationDto } from './dtos/create-update-association';

@Injectable()
export class AssociationAuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

  async createOrUpdateAssociation(id: number | null, associationDto: CreateUpdateAssociationDto) {
    if (id) {
      return this.prismaService.association.update({
        where: { id },
        data: associationDto,
      });
    } else {
      return this.prismaService.association.create({
        data: associationDto,
      });
    }
  }

}
