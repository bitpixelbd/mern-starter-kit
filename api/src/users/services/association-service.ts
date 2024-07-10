// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcryptjs';

// import EmailService from '../../email/email.service';
// import { PrismaService } from '../../prisma/prisma.service';
// import { CreateUpdateAssociationDto } from '../../association-auth/dtos/create-update-association';

// @Injectable()
// export class AssociationService {
//     constructor(
//         private readonly prismaService: PrismaService,
//         private readonly emailService: EmailService
//     ) { }

//   async createOrUpdateAssociation(id: number | null, associationDto: CreateUpdateAssociationDto) {
//     if (id) {
//       return this.prismaService.association.update({
//         where: { id },
//         data: associationDto,
//       });
//     } else {
//       return this.prismaService.association.create({
//         data: associationDto,
//       });
//     }
//   }

// }
