// /* eslint-disable import/no-unresolved */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { Body, Controller, Get, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
// import { res } from "src/common/response.helper";
// import { JwtAuthGuard } from "src/user-auth/jwt/jwt-auth.guard";

// import { UpdatePasswordDto } from "../dto/updatePasswordDto";
// import { UserDashBoardService } from "../services/user-dashboard.service";
// import { CreateUpdateAssociationDto } from "../../association-auth/dtos/create-update-association";
// import { AssociationService } from "../services/association-service";

// @UseGuards(JwtAuthGuard)
// @Controller('association')
// export class AssociationController {
//     constructor(
//         private readonly userDashboardService: UserDashBoardService,
//         private readonly associationService: AssociationService
//     ) { }
//     @Post("create-update")
//     createOrUpdate(@Query('id', ParseIntPipe) id: number | null, @Body() associationDto: CreateUpdateAssociationDto) {
//       return this.associationService.createOrUpdateAssociation(id, associationDto);
//     }
// }