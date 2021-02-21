# pixijs-example-maru-utsushi
- [Pixi.js](https://www.pixijs.com/)の学習用にするぞ
- [Examples](https://pixijs.io/examples/)をひたすら写経する
- 飽きたらいったん休んでいずれ再開しよ

## 開発環境

### Docker
http://localhost:8080/

**コンテナ作る**  
初回だけ
```zash
  docker run --name $(basename `pwd`) -d -p 8080:80 -v $(pwd)/public:/usr/share/nginx/html nginx:alpine
```
**Docker起動**
```zash
  docker start $(basename `pwd`)
```
**Docker止める**
```zash
  docker stop $(basename `pwd`)
```

### Webpack
```zash
  npm run js:watch
```