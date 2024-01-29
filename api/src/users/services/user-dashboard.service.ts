import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import EmailService from '../../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePasswordDto } from '../dto/updatePasswordDto';

@Injectable()
export class UserDashBoardService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly emailService: EmailService
    ) { }

    async getUser(id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        delete user['password']
        return user
    }


    async updateUserProfile(data: any, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } });

        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: data
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }



    async updateUserPassword(data: UpdatePasswordDto, id: number) {
        const user = await this.prismaService.user.findFirst({ where: { id } })
        if (user === null) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND)
        }
        const password_match = await bcrypt.compare(data.current_password, user.password)
        if (!password_match) {
            throw new HttpException("Password did not match", HttpStatus.UNAUTHORIZED)
        }
        const hash = await bcrypt.hash(data?.new_password?.toString(), 10)
        const req = await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: hash }
        })
        if (req === null) {
            throw new HttpException("User update failed", HttpStatus.NOT_FOUND)
        }
        delete req['password']
        return req
    }



    // async recommendedCommunities(id: number) {
    //     const user = await this.prismaService.user.findFirst({
    //         where: { id },
    //         include: {
    //             Advisor: true
    //         }
    //     })

    //     if (user === null) {
    //         throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    //     }

    //     const data: any = {}
    //     // const communities = await this.prismaService.careHome.findMany({
    //     //     include: {
    //     //         Attachment: {
    //     //             select: {
    //     //                 id: true,
    //     //                 short_order: true,
    //     //                 url: true,
    //     //                 datetime: true,
    //     //             }
    //     //         },
    //     //         CareServiceOfferd: {
    //     //             include: {
    //     //                 CareTypes: true
    //     //             }
    //     //         },
    //     //         Review: true,

    //     //     }
    //     // })

    //     // const recomand_community = communities?.filter(item => item?.post_code === user?.postal_code)

    //     // if (recomand_community.length >= 4) {
    //     //     const arr = recomand_community.slice(0, 4)
    //     //     const care_home_arr = arr?.map(item => {
    //     //         return ({
    //     //             id: item?.id,
    //     //             name: item?.name,
    //     //             address: item?.address,
    //     //             price_start: item?.price_start,
    //     //             price_end: item?.price_end,
    //     //             slug: item?.slug,
    //     //             is_verified: item?.is_verified,
    //     //             services: item?.CareServiceOfferd?.map(item => {
    //     //                 return (
    //     //                     {
    //     //                         name: item?.CareTypes?.name,
    //     //                         icon: item?.CareTypes?.icon,
    //     //                         bg_color: item?.CareTypes?.bg_color,
    //     //                         text_color: item?.CareTypes?.text_color
    //     //                     }
    //     //                 )
    //     //             }),
    //     //             total_reviews: item?.Review?.length,
    //     //             total_reviews_ratings: item?.Review.map(i => {
    //     //                 return i.rating
    //     //             }),
    //     //             images: item?.Attachment?.length ? item?.Attachment : images,
    //     //         })
    //     //     })
    //     //     data.recommended_communities = care_home_arr
    //     // } else {
    //     //     communities?.map(item => {
    //     //         if (item.post_code > user.postal_code || item.post_code < user.postal_code) {
    //     //             if (recomand_community.length !== 4) {
    //     //                 recomand_community.push(item)
    //     //             }
    //     //         }
    //     //     })
    //     //     const arr = recomand_community.slice(0, 4)
    //     //     const care_home_arr = arr?.map(item => {
    //     //         return ({
    //     //             id: item?.id,
    //     //             name: item?.name,
    //     //             address: item?.address,
    //     //             price_start: item?.price_start,
    //     //             price_end: item?.price_end,
    //     //             slug: item?.slug,
    //     //             is_verified: item?.is_verified,
    //     //             services: item?.CareServiceOfferd?.map(item => {
    //     //                 return (
    //     //                     {
    //     //                         name: item?.CareTypes?.name,
    //     //                         icon: item?.CareTypes?.icon,
    //     //                         bg_color: item?.CareTypes?.bg_color,
    //     //                         text_color: item?.CareTypes?.text_color
    //     //                     }
    //     //                 )
    //     //             }),
    //     //             total_reviews: item?.Review?.length,
    //     //             total_reviews_ratings: item?.Review.map(i => {
    //     //                 return i.rating
    //     //             }),
    //     //             images: item?.Attachment?.length ? item?.Attachment : images,
    //     //         })
    //     //     })
    //     //     data.recommended_communities = care_home_arr
    //     // }



    //     // data.user_id = user?.id
    //     // data.first_name = user?.first_name
    //     // data.last_name = user?.last_name
    //     // data.email = user?.email
    //     // data.advisor = user.Advisor
    //     return data
    // }

    // async savedCommunities(id: number) {
    //     const user = await this.prismaService.user.findFirst({
    //         where: { id },
    //         include: {
    //             Favorite: {
    //                 include: {
    //                     CareHome: {
    //                         include: {
    //                             CareServiceOfferd: {
    //                                 include: {
    //                                     CareTypes: true
    //                                 }
    //                             },
    //                             Review: true,
    //                             Attachment: {
    //                                 select: {
    //                                     id: true,
    //                                     short_order: true,
    //                                     url: true,
    //                                     datetime: true,
    //                                 }
    //                             }

    //                         }
    //                     }
    //                 }
    //             },
    //             Advisor: true
    //         }
    //     })

    //     if (user === null) {
    //         throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    //     }

    //     const data: any = {}

    //     // const favourites = user.Favorite?.map(item => {
    //     //     return (
    //     //         {
    //     //             id: item?.CareHome?.id,
    //     //             name: item?.CareHome?.name,
    //     //             address: item?.CareHome?.address,
    //     //             price_start: item?.CareHome?.price_start,
    //     //             price_end: item?.CareHome?.price_end,
    //     //             slug: item?.CareHome?.slug,
    //     //             is_verified: item?.CareHome?.is_verified,
    //     //             services: item?.CareHome?.CareServiceOfferd?.map(item => {
    //     //                 return (
    //     //                     {
    //     //                         name: item?.CareTypes?.name,
    //     //                         icon: item?.CareTypes?.icon,
    //     //                         bg_color: item?.CareTypes?.bg_color,
    //     //                         text_color: item?.CareTypes?.text_color
    //     //                     }
    //     //                 )
    //     //             }),
    //     //             total_reviews: item?.CareHome?.Review?.length,
    //     //             total_reviews_ratings: item?.CareHome?.Review.map(i => {
    //     //                 return i.rating
    //     //             }),
    //     //             images: item?.CareHome?.Attachment?.length ? item?.CareHome?.Attachment : images,
    //     //         }
    //     //     )
    //     // })

    //     // data.user_id = user?.id;
    //     // data.first_name = user?.first_name;
    //     // data.last_name = user?.last_name;
    //     // data.email = user?.email;
    //     // data.advisor = user?.Advisor;
    //     // data.saved_communities = favourites

    //     return data
    // }

    // async getReferdUsers(id: number) {
    //     const user = await this.prismaService.user.findFirst({ where: { id } })
    //     if (user === null) {
    //         throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    //     }

    //     const refers = await this.prismaService.referral.findMany({
    //         where: { refer_by_user: id, status: ReferralStatus.ACCEPTED },
    //         orderBy: {
    //             id: "asc"
    //         },
    //         include: {
    //             User: {
    //                 select: {
    //                     first_name: true,
    //                     last_name: true,
    //                     id: true,
    //                     phone: true,
    //                     email: true
    //                 }
    //             }
    //         }
    //     })
    //     if (refers === null) {
    //         throw new HttpException("Refers not found", HttpStatus.NOT_FOUND)
    //     }

    //     const all_reffers = refers?.map(item => {
    //         return {
    //             ref_id: this.modifyRefId(item?.id),
    //             status: item?.status,
    //             user: {
    //                 user_id: item?.User?.id,
    //                 name: item?.User?.first_name + " " + item?.User?.last_name,
    //                 phone: item?.User?.phone,
    //                 email: item?.User?.email,
    //             }
    //         }
    //     })
    //     return all_reffers
    // }

    // async saveUserQuizz(data: any, id: number) {
    //     const quizz = await this.prismaService.quizzAnswers.findFirst({ where: { user_id: id } })
    //     if (quizz !== null) {
    //         try {
    //             await this.prismaService.quizzAnswers.delete({ where: { id: quizz.id } })
    //         } catch (err) {
    //             throw new HttpException("Something is wrong", HttpStatus.BAD_REQUEST)
    //         }
    //     }
    //     data.user_id = Number(id)
    //     const new_quizz = await this.prismaService.quizzAnswers.create({ data })
    //     if (new_quizz === null) {
    //         throw new HttpException("Quizz creation failed", HttpStatus.NOT_FOUND)
    //     }
    //     return new_quizz
    // }

    modifyRefId(id) {
        const number = Number(id)
        switch (true) {
            case number < 10:
                return `REF0000${number}`;
            case number < 100:
                return `REF000${number}`;
            case number < 1000:
                return `REF00${number}`;
            case number < 10000:
                return `REF0${number}`;
            default:
                return `REF${number}`;
        }
    }

    // async sendAdvisorMessage(data: UserSendMessageDto, user_id: number) {
    //     data.user_id = Number(user_id)
    //     const message = await this.prismaService.advisorMessage.create({
    //         data, include: {
    //             Advisor: true,
    //             User: true
    //         }
    //     })
    //     if (message === null) {
    //         throw new HttpException("Message failed", HttpStatus.NOT_FOUND)
    //     }
    //     try {
    //         await this.emailService.sendEmail(message?.Advisor?.email, `You have get a new messages from senior places user ${message?.User?.first_name} ${message?.User?.last_name}`,"",`
    //         <p>${message?.message}</p>
    //         `)
    //     } catch (err) {
    //         throw new HttpException("Something is wrong", HttpStatus.BAD_REQUEST)
    //     }
    //     return message
    // }
}
