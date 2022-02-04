import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SignupMiddleware } from './middleware/signup.middleware';

@Module({
  imports: [UsersModule],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignupMiddleware).forRoutes('api/auth/signup');
  }
}
