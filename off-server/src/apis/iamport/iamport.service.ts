import { HttpService } from "@nestjs/axios";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class IamportService{
  constructor(
    private readonly httpService: HttpService
  ){}

  getIamportToken() {
    const promise = axios.post('https://api.iamport.kr/users/getToken', {
      imp_key: process.env.IMP_KEY,
      imp_secret: process.env.IMP_SECRET
    })
    const dataPromise = promise.then((res) => res.data.response.access_token);

    return dataPromise;
  }

  async checkToken({ impUid: imp_uid, iamportToken }) {
    const { data } = await axios
      .get(`https://api.iamport.kr/payments/${imp_uid}`, {
        headers: {
          Authorization: `Bearer ${iamportToken}`,
        },
      })
      .catch(() => {
        throw new UnprocessableEntityException('유효하지 않은 Imp_uid입니다');
      });

    return data;
  }

  async cancelPay({ iamportToken, reason, impUid, amount, checksum }) {
    await axios
      .post(
        'https://api.iamport.kr/payments/cancel',
        {
          reason: `${reason}`,
          imp_uid: `${impUid}`,
          amount,
          checksum,
        },
        {
          headers: {
            Authorization: iamportToken,
          },
        },
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log('!!!!!!!!실패!!!!!!!');
        console.log(error);
      });
    return '결제가 취소되었습니다.';
  }
}