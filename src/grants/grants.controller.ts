import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GrantsService } from './grants.service';
import { CreateGrantDto } from './dto/create-grant.dto';
import { UpdateGrantDto } from './dto/update-grant.dto';
import { RolesService } from 'src/roles/roles.service';
import { ATTRIBUTES, RESOURCE } from 'src/constants';
import { Grant as GrantModel } from '@prisma/client';

/**
 * برای گرنت ها CRUD کنترلر تعریف عملیات
 * @class GrantsController
 * @property {GrantsService} grantsService
 * @property {RolesService} roleService
 * @module GrantsController
 */
@Controller('grants')
export class GrantsController {
  constructor(
    private readonly grantsService: GrantsService,
    private readonly roleService: RolesService,
  ) {}

  /**
   * ایجاد گرنت جدید
   * @param {CreateGrantDto} createGrantDto
   * @memberof GrantsController
   * @method create
   * @public
   * @returns {Promise<GrantModel>}
   */
  @Post()
  async create(@Body() createGrantDto: CreateGrantDto) {
    const role = await this.roleService.findRoleByTitle(createGrantDto.role);
    if (!role) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const grantsByResource = await this.grantsService.findByResource(
      role.id,
      createGrantDto.resource,
    );
    if (grantsByResource.length >= 4) {
      throw new HttpException(
        'Resource already has 4 grants',
        HttpStatus.BAD_REQUEST,
      );
    }

    const resourceEnumValues = Object.values(RESOURCE);
    const isResourceValid = resourceEnumValues.includes(
      createGrantDto.resource,
    );
    if (!isResourceValid) {
      throw new HttpException('Resource not valid', HttpStatus.BAD_REQUEST);
    }

    const isActionAlreadyGranted = grantsByResource.some(
      (grant) => grant.action === createGrantDto.action,
    );
    if (isActionAlreadyGranted) {
      throw new HttpException('Action already granted', HttpStatus.BAD_REQUEST);
    }

    const validAttributes = ATTRIBUTES[createGrantDto.resource];
    const isAttributeValid = createGrantDto.attributes.every((attribute) => {
      if (attribute === '*') {
        return true;
      } else if (attribute.startsWith('!')) {
        const slicedAttribute = attribute.slice(1);
        return validAttributes.includes(slicedAttribute);
      }

      const isAttributeIncluded = validAttributes.includes(attribute);
      return isAttributeIncluded;
    });
    if (!isAttributeValid) {
      throw new HttpException('Attribute not valid', HttpStatus.BAD_REQUEST);
    }

    const uniqueAttributes = [...new Set(createGrantDto.attributes)];

    const isDuplicateAttribute = uniqueAttributes.some((attribute) => {
      const value = attribute.startsWith('!') ? attribute.slice(1) : attribute;
      const isAttributeDuplicated = uniqueAttributes.filter((attr) =>
        attr.startsWith('!') ? attr.slice(1) : attr === value,
      ).length;
      return isAttributeDuplicated > 1;
    });
    if (isDuplicateAttribute) {
      throw new HttpException(
        'Duplicate attribute found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const formattedAttributes = uniqueAttributes.join(', ');

    return this.grantsService.create(
      {
        resource: createGrantDto.resource,
        action: createGrantDto.action,
        attributes: formattedAttributes,
        author: { connect: { id: role.userId } },
        role: { connect: { id: role.id } },
      },
      role.role,
    );
  }

  /**
   * برای دریافت تمام گرنت ها
   * @memberof GrantsController
   * @method findAll
   * @public
   * @returns {Promise<GrantModel[]>}
   */
  @Get()
  findAll() {
    return this.grantsService.findAll();
  }

  /**
   * برای دریافت گرنت با شناسه
   * @param {string} id
   * @memberof GrantsController
   * @method findOne
   * @public
   * @returns {Promise<GrantModel>}
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grantsService.findOne(id);
  }

  /**
   * برای به روز رسانی گرنت با شناسه
   * @param {string} id
   * @param {UpdateGrantDto} updateGrantDto
   * @memberof GrantsController
   * @method update
   * @public
   * @returns {Promise<GrantModel>}
   * @todo پیاده کردن منطق
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGrantDto: UpdateGrantDto) {
    // پیاده کردن منطق...
    throw new HttpException('NOT_IMPLEMENTED', HttpStatus.NOT_IMPLEMENTED);
  }

  /**
   * برای حذف گرنت با شناسه
   * @param {string} id
   * @memberof GrantsController
   * @method remove
   * @public
   * @returns {Promise<void>}
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grantsService.remove(id);
  }
}
