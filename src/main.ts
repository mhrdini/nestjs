import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './all-exceptions.filter'
// import { MyLoggerService } from './my-logger/my-logger.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // gives a buffer to make sure that MyLoggerService has been instantiated
    // bufferLogs: true,
  })

  const { httpAdapter } = app.get(HttpAdapterHost)

  // app.useLogger(app.get(MyLoggerService))
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))
  app.enableCors()
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
