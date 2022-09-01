import { InputType, OmitType } from '@nestjs/graphql';
import { SalesLocations } from '../entities/salesLocation.entity';

@InputType()
export class SalesLocationsInput extends OmitType(
  SalesLocations,
  ['id'],
  InputType,
) {}
