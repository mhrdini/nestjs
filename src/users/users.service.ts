import { Injectable } from '@nestjs/common'

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
      return this.users.filter((user) => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id)
    return user
  }

  create(user: {
    name: string
    email: string
    role: 'INTERN' | 'ENGINEER' | 'ADMIN'
  }) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    }
    this.users.push(newUser)
    return newUser
  }

  update(
    id: number,
    user: {
      name?: string
      email?: string
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN'
    },
  ) {
    this.users = this.users.map((u) => {
      if (u.id == id) {
        return { ...u, ...user }
      }
      return u
    })

    return this.findOne(id)
  }

  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users = this.users.filter((user) => user.id !== id)
    return removedUser
  }
}
