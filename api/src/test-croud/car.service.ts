/* eslint-disable */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()

export class CarService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async createCar(data) {
        const response = await this.prismaService.car.create({ data })
        return response
    }

    async getallCar() {
        return await this.prismaService.car.findMany()
    }

    async getSingleCar(id: number) {
        const res = await this.prismaService.car.findFirst({ where: { id: id } })
        return res
    }

    async updateCar(data, id: number) {
        const res = await this.prismaService.car.update({ where: { id: id }, data: data })
        return res
    }

    async deleteCar(id: number) {
        return await this.prismaService.car.delete({ where: { id: id } })
    }

}