import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { MyLoggerService } from './my-logger/my-logger.service'
import { PrismaClientValidationError } from '@prisma/client/runtime/library'
import { Request, Response } from 'express'

type MyResponseObj = {
  statusCode: number
  timestamp: string
  path: string
  response: string | object
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const myResponseObj: MyResponseObj = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal Server Error',
    }

    if (exception instanceof HttpException) {
      myResponseObj.statusCode = exception.getStatus()
      myResponseObj.response = exception.getResponse()
    } else if (exception instanceof PrismaClientValidationError) {
      myResponseObj.statusCode = HttpStatus.UNPROCESSABLE_ENTITY
      myResponseObj.response = exception.message.replaceAll(/\n/g, '')
    }

    response.status(myResponseObj.statusCode).json(myResponseObj)

    this.logger.error(myResponseObj.response, AllExceptionsFilter.name)

    super.catch(exception, host)
  }
}
