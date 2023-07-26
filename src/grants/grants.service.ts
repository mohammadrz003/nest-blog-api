import { Injectable } from '@nestjs/common';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GrantCreatedEvent } from './events/grant-created.event';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { Util } from 'src/util';

@Injectable()
export class GrantsService {
  constructor(
    private prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    @InjectRolesBuilder() private readonly rolesBuilder: RolesBuilder,
  ) {}

  async create(createGrantDto: Prisma.GrantCreateInput, roleName: string) {
    const createdGrant = await this.prismaService.grant.create({
      data: createGrantDto,
    });
    this.eventEmitter.emit(
      'grant.created',
      new GrantCreatedEvent(
        roleName,
        createGrantDto.resource,
        createGrantDto.action,
        createGrantDto.attributes,
      ),
    );
    return createdGrant;
  }

  findAll() {
    return `This action returns all grants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} grant`;
  }

  findByResource(roleId: string, resource: string) {
    return this.prismaService.grant.findMany({
      where: {
        roleId,
        resource,
      },
    });
  }

  update(id: number, updateGrantDto: UpdateGrantDto) {
    return `This action updates a #${id} grant`;
  }

  remove(id: number) {
    return `This action removes a #${id} grant`;
  }

  @OnEvent('grant.created')
  async handleGrantCreatedEvent(payload: GrantCreatedEvent) {
    const splitedAction = payload.action.split(':') as [string, 'any' | 'own'];
    this.rolesBuilder
      .grant(payload.role)
      [Util.identifyAction(splitedAction[0], splitedAction[1])](
        payload.resource,
        payload.attributes.split(', '),
      );
    console.log('grant added');
  }
}
