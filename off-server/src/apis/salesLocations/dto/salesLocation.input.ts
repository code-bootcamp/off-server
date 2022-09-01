import { InputType, OmitType } from '@nestjs/graphql';
import { SalesLocation } from '../entities/salesLocation.entity';

@InputType()
export class SalesLocationInput extends OmitType(
  SalesLocation,
  ['id'],
  InputType,
) {}
