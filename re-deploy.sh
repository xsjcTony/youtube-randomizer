#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npx vite build

# 进入构建文件夹
cd dist

# 如果你要部署到自定义域名
echo 'youtube-randomizer.aelita.me' > CNAME

git init
git checkout main
git add -A
git commit -m 'deploy'

git push -f git@github.com:xsjcTony/youtube-randomizer.git main:gh-pages

cd -
