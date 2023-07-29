import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Grant as GrantModel } from '@prisma/client';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { GrantCreatedEvent } from './events/grant-created.event';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { Util } from 'src/util';

/**
 * سرویس برای مدیریت دسترسی ها
 * @class GrantsService
 * @property {PrismaService} prismaService
 * @property {EventEmitter2} eventEmitter
 * @property {RolesBuilder} rolesBuilder
 * @module GrantsService
 */
@Injectable()
export class GrantsService {
  constructor(
    private prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    @InjectRolesBuilder() private readonly rolesBuilder: RolesBuilder,
  ) {}

  /**
   * ایجاد دسترسی جدید
   * @param {Prisma.GrantCreateInput} createGrantDto
   * @param {string} roleName
   * @memberof GrantsService
   * @method create
   * @public
   * @returns {Promise<GrantModel>}
   */
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

  /**
   * دریافت تمامی دسترسی ها
   * @memberof GrantsService
   * @method findAll
   * @public
   * @returns {Promise<GrantModel[]>}
   */
  findAll() {
    return this.prismaService.grant.findMany();
  }

  /**
   * دریافت دسترسی با شناسه
   * @param {number} id
   * @memberof GrantsService
   * @method findOne
   * @public
   * @returns {Promise<GrantModel>}
   */
  findOne(id: string) {
    return this.prismaService.grant.findUnique({ where: { id } });
  }

  /**
   * دریافت دسترسی با شناسه نقش
   * @param {string} roleId
   * @param {string} resource
   * @memberof GrantsService
   * @method findByRole
   * @public
   * @returns {Promise<GrantModel[]>}
   */
  findByResource(roleId: string, resource: string) {
    return this.prismaService.grant.findMany({
      where: {
        roleId,
        resource,
      },
    });
  }

  /**
   * بروزرسانی دسترسی با شناسه
   * @param {string} id
   * @param {UpdateGrantDto} updateGrantDto
   * @memberof GrantsService
   * @method update
   * @public
   * @returns {Promise<GrantModel>}
   */
  update(id: string, updateGrantDto: Prisma.GrantUpdateInput) {
    return this.prismaService.grant.update({
      data: updateGrantDto,
      where: { id },
    });
  }

  /**
   * حذف دسترسی با شناسه
   * @param {number} id
   * @memberof GrantsService
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  remove(id: string) {
    return `This action removes a #${id} grant`;
  }

  /**
   * رویداد ایجاد دسترسی
   * @param {GrantCreatedEvent} payload
   * @memberof GrantsService
   * @method handleGrantCreatedEvent
   * @public
   * @returns {Promise<void>}
   */
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
