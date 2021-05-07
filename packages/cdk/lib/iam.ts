import * as cdk from "@aws-cdk/core";
import * as iam from "@aws-cdk/aws-iam";

export class Iam extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new iam.Role(this, "AssetSampleIam", {
      roleName: `asset-access-control`,
      assumedBy: new iam.ServicePrincipal("cloudfront.amazonaws.com"),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("CloudFrontFullAccess"),
      ],
    });
  }
}
