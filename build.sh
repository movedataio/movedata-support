

#pip install mkdocs-material

rm -rf ./lib
mkdir -p ./lib
mkdir -p ./lib/docs

cp -r ./src/. ./lib/

git clone --depth=1 --branch=documentation https://github.com/movedataio/movedata-support.git ./lib/docs/user_guide
rm -rf ./lib/docs/user_guide/.git

node ./bin/convert-nav.js ./lib/docs/user_guide/SUMMARY.md "User Guide" user_guide
node ./bin/convert-frontmatter.js ./lib/docs/user_guide
node ./bin/migrate-images.js user_guide ./lib/docs/user_guide
node ./bin/convert-embeds.js ./lib/docs/user_guide
cat ./lib/docs/user_guide/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/developer
git clone --depth=1 --branch=developer https://github.com/movedataio/movedata-support.git ./lib/docs/developer
rm -rf ./lib/docs/developer/.git

node ./bin/convert-nav.js ./lib/docs/developer/SUMMARY.md "Developer" developer
node ./bin/convert-frontmatter.js ./lib/docs/developer
node ./bin/migrate-images.js developer ./lib/docs/developer
node ./bin/convert-embeds.js ./lib/docs/developer
cat ./lib/docs/developer/SUMMARY-nav.yaml >> ./lib/mkdocs.yml
