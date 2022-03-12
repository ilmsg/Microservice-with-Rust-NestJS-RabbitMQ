import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {

  constructor(
    @Inject('RECEIVER_SERVICE') private receiverService: ClientProxy,
  ) { }


  async sayHello(): Promise<void> {
    await firstValueFrom(this.receiverService.send({
      target: 'rust', cmd: 'hello'
    }, 'From NestJS'));
  }

  getHello(): string {
    return 'Hello World!';
  }
}
