#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { Asset } from "../lib/asset";
import { Iam } from "../lib/iam";

const app = new cdk.App();

new Asset(app, "AssetAccessControl-Asset");

//new Iam(app, "AssetAccessControl-Iam");
