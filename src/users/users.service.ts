import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

/*
  For the routes that we have in the controller,
  we need to create methods that hold the logic inside of a service,
  then we will inject that service back into the controller.
*/

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Astarion Ancunin',
      email: 'totallynotavampire@bg3.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Karlach Cliffgate',
      email: 'cliffg8@bg3.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Gale Dekarios',
      email: 'mystraluvr@bg3.com',
      role: 'ENGINEER',
    },
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const roleUsers = this.users.filter((user) => user.role === role)
      if (roleUsers.length === 0)
        throw new NotFoundException('User role not found')
      return roleUsers
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)

    if (!user) throw new NotFoundException('User not found')
    return user
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == id) {
        return { ...user, ...updateUserDto }
      }
      return user
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return removedUser
  }
}
