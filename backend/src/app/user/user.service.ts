import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    }
    const createdUser = await this.userRepository.save(this.userRepository.create(data));
    return {
      ...createdUser,
      password: undefined
    };
  };

  async findByEmail (email: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ email: email})
  }
}
