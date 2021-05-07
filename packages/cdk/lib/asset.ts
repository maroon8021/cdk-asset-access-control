import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { ACCOUND_ID, ENCODED_KEY } from "./config";

export class Asset extends cdk.Stack {
  public readonly distribution: cloudfront.CloudFrontWebDistribution;

  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create S3 bucket which set assets
    // s3.tsとcloudfront.tsに分けたかったが、後述のところでs3にcloudfrontからのGETの権限を付与するところで
    // `a cyclic reference` として怒られるので、同一Stack内で生成する
    const bucket = new s3.Bucket(this, "AssetSampleBucket", {
      bucketName: `cdk-asset-access-control-sample`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      //publicReadAccess: false,
    });

    // Preparing OriginAccessIdentity
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "AssetSampleOriginAccessIdentity",
      {}
    );
    bucket.grantRead(originAccessIdentity);

    // Preparing signed URLs validating
    // const pubKey = new cloudfront.PublicKey(this, "AssetSamplePubKey", {
    //   encodedKey: ENCODED_KEY,
    // });
    // const keyGroup = new cloudfront.KeyGroup(this, "AssetSampleKeyGroup", {
    //   items: [pubKey],
    // });
    this.distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "AssetSampleWebDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket,
              originAccessIdentity,
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                //trustedKeyGroups: [keyGroup],
                trustedSigners: [ACCOUND_ID],
              },
            ],
          },
        ],
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      }
    );
  }
}
