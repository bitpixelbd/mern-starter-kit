import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MarkNotificationsReadDto } from '../dto/mark-notification-read.dto';


@Injectable()
export class UserDashboardNotificationService {
  constructor(private prisma: PrismaService) {}

  async getUserNotifications(userId: number) {
    try{
        return this.prisma.notification.findMany({
            where: { owner_id: userId },
            orderBy: { createdAt: 'desc' },
            include: {
              Association: true,
              Event: true,
              Joiner:true,
              Owner:true
            }
          });
    }catch(err){
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async markNotificationsAsRead(userId: number, markNotificationsReadDto: MarkNotificationsReadDto) {
   try{
    const { notificationIds } = markNotificationsReadDto;

    const notifications = await this.prisma.notification.findMany({
      where: {
        id: { in: notificationIds },
        owner_id: userId,
        isRead: false,
      },
    });

    if (notifications.length === 0) {
      throw new NotFoundException('No unread notifications found for the provided IDs');
    }

    const updatedNotifications = await this.prisma.notification.updateMany({
      where: {
        id: { in: notificationIds },
        owner_id: userId,
        isRead: false,
      },
      data: { isRead: true },
    });

    return { message: `${updatedNotifications.count} notifications marked as read` };
   }catch(err){
    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
   }
  }
}
