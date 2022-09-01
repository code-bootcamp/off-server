import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { IamportService } from "./iamport.service";

@Module({
  imports: [HttpModule],
  providers: [IamportService]
})

export class IamportModule{}