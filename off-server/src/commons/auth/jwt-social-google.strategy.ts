import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    console.log('뇨뇨뇨', process.env.GOOGLE_CLIENTID);
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTPASS,
      callbackURL: 'http://localhost:3000',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log('google.strategy=====', profile);
    return {
      email: profile.emails[0].value,
      password: '12093812093',
      name: profile.displayName,
      nickname: profile.displayName,
      phone: '01000000000',
    };
  }
}
