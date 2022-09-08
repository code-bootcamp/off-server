import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENTID,
      clientSecret: process.env.KAKAO_CLIENTSECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log('profile', profile);
    console.log('email', profile._json.kakao_account.email);
    return {
      email: profile._json.kakao_account.email,
      password: '31412345',
      name: profile.displayName,
      nickname: profile.displayName,
      phone: "01000000000"
    };
  }
}
