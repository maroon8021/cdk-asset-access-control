# CDK

## cdk install

`npx cdk init --language typescript`

## How to Deploy

今回 `.env` の中身を読み込んだ上で deploy コマンドを実行したいので、以下のようなコマンドを実行する

```sh
$ yarn set-env  yarn run cdk deploy '*' --profile cdk-user
```
