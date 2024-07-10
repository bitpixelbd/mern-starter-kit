// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { CreateEventDto } from './dtos/createEventDto';

// @Injectable()
// export class AssociationService {
//     constructor(private prisma: PrismaService) {}
//     async createEvent(associationId: number, createEventDto: CreateEventDto) {
//         return this.prisma.events.create({
//           data: {
//             ...createEventDto,
//             association_id: associationId,
//           },
//         });
//     }

//     async updateEvent(eventId: number, updateEventDto: CreateEventDto) {
//         try{
//             const event = await this.prisma.events.findUnique({
//                 where: { id: eventId },
//               });
          
//               if (!event) {
//                 throw new HttpException(`Event with ID ${eventId} not found`, HttpStatus.NOT_FOUND);
//               }
          
//               return this.prisma.events.update({
//                 where: { id: eventId },
//                 data: {
//                   ...updateEventDto,
//                 },
//               });
//         }catch(err){
//             throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
//         } 
//     }
// }


import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEventDto } from './dtos/createEventDto';

@Injectable()
export class AssociationService {
    constructor(private prisma: PrismaService) {}

    async createEvent(associationId: number, createEventDto: CreateEventDto) {
        const { categoryIds, ...eventData } = createEventDto;

        return this.prisma.events.create({
          data: {
            ...eventData,
            association_id: associationId,
            Categories: {
              create: categoryIds.map(categoryId => ({
                category_id: categoryId,
              })),
            },
          },
          include: {
            Categories: true,
          },
        });
    }

    async updateEvent(eventId: number, updateEventDto: CreateEventDto) {
        const { categoryIds, ...eventData } = updateEventDto;

        try {
            const event = await this.prisma.events.findUnique({
                where: { id: eventId },
                include: { Categories: true },
            });
            if (!event) {
                throw new HttpException(`Event with ID ${eventId} not found`, HttpStatus.NOT_FOUND);
            }

            // Ensure the id is treated as an integer
            await this.prisma.events.update({
                where: { id: eventId },
                data: {
                  ...eventData,
                  Categories: {
                    deleteMany: {}, // Remove all existing categories
                    create: categoryIds.map(categoryId => ({
                      category_id: categoryId,
                    })),
                  },
                },
            });

            return this.prisma.events.findUnique({
                where: { id: eventId },
                include: { Categories: {
                    include: {
                        Category: true
                    }
                } },
            });
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
