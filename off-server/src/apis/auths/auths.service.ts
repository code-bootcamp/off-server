import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService, //
    // private readonly userService: UserService,
  ){
    getAccessToken(){
      // getAccessToken
    }
  }
}