/* eslint-disable */


import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { res } from "src/common/response.helper";
import { CarDto } from "./car.dto";
import { CarService } from "./car.service";

@Controller('car')
export class CarController {

    constructor(
        private readonly carService: CarService,
    ) { }

    @Post()
    async createCar(@Body() data: CarDto) {
        const response = await this.carService.createCar(data)
        return res.success(response)
    }

    @Get()
    async getCars() {
        const response = await this.carService.getallCar()
        return res.success(response)
    }

    @Get('get-car/:id/test')
    async getSingleCar(@Param('id') id: number) {
        const response = await this.carService.getSingleCar(+id);
        return res.success(response)
    }

    @Patch(':id')
    async updateCar(@Param('id') id: number, @Body() data: CarDto) {
        const response = await this.carService.updateCar(data, +id)
        return res.success(response)
    }

    @Delete(':id')
    async deleteCar(@Param('id') id: number) {
        const response = await this.carService.deleteCar(+id)
        return res.success(response)
    }

}
