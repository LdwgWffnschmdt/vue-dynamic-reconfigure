# deploy_demo.sh

#!/usr/bin/env sh

# abort on errors
set -e

# build
echo Building. this may take a minute...
npm run build-demo

# navigate into the build output directory
cd demo

# if you are deploying to a custom domain
# echo 'example.com' > CNAME

echo Deploying..
git init
git add -A
git commit -m 'deploy'

# deploy

git remote add origin https://github.com/LdwgWffnschmdt/vue-dynamic-reconfigure.git
git push origin master:gh-pages --force
cd -