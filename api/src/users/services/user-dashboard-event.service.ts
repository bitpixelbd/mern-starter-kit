import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import EmailService from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { AddEventParticipantDto } from '../dto/add-event-participation.dto';

@Injectable()
export class UserDashBoardEventService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService
    ) { }

    async addParticipant(userId: number, addParticipantDto: AddEventParticipantDto) {
        try{
            const { eventId } = addParticipantDto;
            const event = await this.prisma.events.findUnique({
            where: { id: eventId },
            });
        
            if (!event) {
            throw new HttpException(`Event with ID ${eventId} not found`, HttpStatus.NOT_FOUND);
            }
        
            // Check if the user is already a participant
            const existingParticipant = await this.prisma.participants.findFirst({
            where: {
                eventId,
                user_id: userId,
                isCanceled: false,
            },
            });
        
            if (existingParticipant) {
                throw new HttpException(`User is already a participant in this event`, HttpStatus.CONFLICT);
                }
        
                // Add the participant
                return this.prisma.participants.create({
                data: {
                    eventId,
                    user_id: userId,
                    isCanceled: false,
                },
            });
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }   
    }
}
