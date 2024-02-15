#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build  # билдим проект

# переходим в папку билда
cd dist

# если вы деплоите на кастомный домен 
# echo 'www.example.com' > CNAME

git init # инициализируем собственный гит внутри проекта для отслеживания изменений именно деплоя. Если он уже проинициализирован, то команда проигнорируется
git add -A  # добавляем все изменения
git commit -m 'deploy'  # коммитим

# если вы деплоите на https://<USERNAME>.github.io  -  это в случае основного сайта гита
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# если вы деплоите на https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:fess986/react-crypto.git master:gh-pages  # принудительно пушим изменения из нашей ветки master на удалённую gh-pages, таким образом мы не создавая локально ветку gh-pages - передавать её удалённо

cd - # возвращаемся в исходный репозиторий 