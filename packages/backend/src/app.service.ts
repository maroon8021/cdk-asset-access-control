import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CloudFront } from "aws-sdk";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  async getAssetUrl() {
    const keyPairId = this.configService.get<string>("KEY_PAIR_ID");
    const privateKey = this.configService
      .get<string>("PRIVATE_KEY")
      .replace(/(KEY-----)/, `$1\n`)
      .replace(/(-----END)/, `\n$1`);

    const cloudFrontUrl = this.configService.get<string>("CLOUD_FRONT_URL");

    const signer = new CloudFront.Signer(keyPairId, privateKey);
    const url = signer.getSignedUrl({
      url: `https://${cloudFrontUrl}/Sample-1.pdf`,
      expires: Math.floor(new Date().getTime() / 1000) + 60, // ミリ秒ではなく秒で指定する必要あり
    });

    return url;
  }

  getHello(): string {
    return "Hello World!";
  }
}
