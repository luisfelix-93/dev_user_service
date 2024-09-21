import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtAuthGuard } from 'src/auth/auth.guard';
// import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() userDTO : CreateUserDTO) {
        return this.usersService.register(userDTO);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(CacheInterceptor)
    findAll() {
        console.log('Searching data on DB')
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOnde(id);
    }

    @Put('id')
    update(@Param('id') id: string, @Body() userDTO : UpdateUserDTO) {
        return this.usersService.update(id, userDTO);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.usersService.delete(id);
    }
}
