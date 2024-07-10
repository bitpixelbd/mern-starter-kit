import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import EmailService from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';
import { AddEventParticipantDto } from '../dto/add-event-participation.dto';
import { ShareEventDto } from '../dto/add-share-event.dto';
import { SubscribeAssociationDto } from '../dto/subscribe-association.dto';

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


    async shareEvent(userId: number, shareEventDto: ShareEventDto) {
        try{
            const { eventId } = shareEventDto;
    
            // Check if the event exists
            const event = await this.prisma.events.findUnique({
            where: { id: eventId },
            });
        
            if (!event) {
            throw new HttpException(`Event with ID ${eventId} not found`, HttpStatus.CONFLICT);
            }
        
            // Check if the user has already shared the event
            const existingShare = await this.prisma.eventShare.findFirst({
            where: {
                event_id: eventId,
                user_id: userId,
            },
            });
        
            if (existingShare) {
            throw new HttpException(`User has already shared this event`, HttpStatus.CONFLICT);
            }
        
            // Share the event
            return this.prisma.eventShare.create({
            data: {
                event_id: eventId,
                user_id: userId,
            },
            include: {
                Event: true,
                User: true
            }
            });
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async subscribeToAssociation(userId: number, subscribeAssociationDto: SubscribeAssociationDto) {
        try{
            const { associationId } = subscribeAssociationDto;
    
            // Check if the association exists
            const association = await this.prisma.association.findUnique({
            where: { id: associationId },
            });
        
            if (!association) {
            throw new HttpException(`Association with ID ${associationId} not found`, HttpStatus.NOT_FOUND);
            }
        
            // Check if the user is already subscribed
            const existingSubscription = await this.prisma.associationSubscribers.findFirst({
            where: {
                association_id: associationId,
                subscriber_id: userId,
            },
            });
        
            if (existingSubscription) {
            throw new HttpException(`User is already subscribed to this association`, HttpStatus.CONFLICT);
            }
        
            // Subscribe the user to the association
            return this.prisma.associationSubscribers.create({
            data: {
                association_id: associationId,
                subscriber_id: userId,
            },
            include: {
                Subscriber: true,
                Association: true
            }
            });
        }catch(err){
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }   
    }
}

