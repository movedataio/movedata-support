

#pip install mkdocs-material

rm -rf ./lib
mkdir -p ./lib

cp -r ./src/. ./lib/

git clone --depth=1 --branch=documentation https://github.com/movedataio/movedata-support.git ./lib/docs/user_guide
rm -rf ./lib/docs/user_guide/.git

node ./bin/convert-nav.js ./lib/docs/user_guide/SUMMARY.md "User Guide" user_guide
node ./bin/convert-frontmatter.js ./lib/docs/user_guide
node ./bin/migrate-images.js user_guide ./lib/docs/user_guide
node ./bin/convert-embeds.js ./lib/docs/user_guide
node ./bin/convert-hints.js ./lib/docs/user_guide
node ./bin/convert-lists.js ./lib/docs/user_guide
cat ./lib/docs/user_guide/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/developer
git clone --depth=1 --branch=developer https://github.com/movedataio/movedata-support.git ./lib/docs/developer
rm -rf ./lib/docs/developer/.git

node ./bin/convert-nav.js ./lib/docs/developer/SUMMARY.md "Developer" developer
node ./bin/convert-frontmatter.js ./lib/docs/developer
node ./bin/migrate-images.js developer ./lib/docs/developer
node ./bin/convert-embeds.js ./lib/docs/developer
node ./bin/convert-hints.js ./lib/docs/developer
node ./bin/convert-lists.js ./lib/docs/developer
cat ./lib/docs/developer/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

echo "  - Reference:" >> ./lib/mkdocs.yml
echo "    - "Home Page": reference/index.md " >> ./lib/mkdocs.yml

rm -rf ./lib/docs/reference/extension/commerce
git clone --depth=1 --branch=extension/commerce https://github.com/movedataio/movedata-support.git ./lib/docs/reference/extension/commerce
rm -rf ./lib/docs/reference/extension/commerce/.git

node ./bin/convert-nav.js ./lib/docs/reference/extension/commerce/SUMMARY.md "Extension: Commerce" "reference/extension/commerce" 2
node ./bin/convert-frontmatter.js ./lib/docs/reference/extension/commerce
node ./bin/migrate-images.js reference ./lib/docs/reference/extension/commerce
node ./bin/convert-embeds.js ./lib/docs/reference/extension/commerce
node ./bin/convert-hints.js ./lib/docs/reference/extension/commerce
node ./bin/convert-lists.js ./lib/docs/reference/extension/commerce
cat ./lib/docs/reference/extension/commerce/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/reference/extension/npsp-fundraising
git clone --depth=1 --branch=extension/npsp-fundraising https://github.com/movedataio/movedata-support.git ./lib/docs/reference/extension/npsp-fundraising
rm -rf ./lib/docs/reference/extension/npsp-fundraising/.git

node ./bin/convert-nav.js ./lib/docs/reference/extension/npsp-fundraising/SUMMARY.md "Extension: NPSP Fundraising" "reference/extension/npsp-fundraising" 2
node ./bin/convert-frontmatter.js ./lib/docs/reference/extension/npsp-fundraising
node ./bin/migrate-images.js reference ./lib/docs/reference/extension/npsp-fundraising
node ./bin/convert-embeds.js ./lib/docs/reference/extension/npsp-fundraising
node ./bin/convert-hints.js ./lib/docs/reference/extension/npsp-fundraising
node ./bin/convert-lists.js ./lib/docs/reference/extension/npsp-fundraising
cat ./lib/docs/reference/extension/npsp-fundraising/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/reference/extension/non-profit-cloud
git clone --depth=1 --branch=extension/non-profit-cloud https://github.com/movedataio/movedata-support.git ./lib/docs/reference/extension/non-profit-cloud
rm -rf ./lib/docs/reference/extension/non-profit-cloud/.git

node ./bin/convert-nav.js ./lib/docs/reference/extension/non-profit-cloud/SUMMARY.md "Extension: Non-Profit Cloud" "reference/extension/non-profit-cloud" 2
node ./bin/convert-frontmatter.js ./lib/docs/reference/extension/non-profit-cloud
node ./bin/migrate-images.js reference ./lib/docs/reference/extension/non-profit-cloud
node ./bin/convert-embeds.js ./lib/docs/reference/extension/non-profit-cloud
node ./bin/convert-hints.js ./lib/docs/reference/extension/non-profit-cloud
node ./bin/convert-lists.js ./lib/docs/reference/extension/non-profit-cloud
cat ./lib/docs/reference/extension/non-profit-cloud/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/reference/schema/commerce
git clone --depth=1 --branch=schema/commerce https://github.com/movedataio/movedata-support.git ./lib/docs/reference/schema/commerce
rm -rf ./lib/docs/reference/schema/commerce/.git

node ./bin/convert-nav.js ./lib/docs/reference/schema/commerce/SUMMARY.md "Schema: Commerce" "reference/schema/commerce" 2
node ./bin/convert-frontmatter.js ./lib/docs/reference/schema/commerce
node ./bin/migrate-images.js reference ./lib/docs/reference/schema/commerce
node ./bin/convert-embeds.js ./lib/docs/reference/schema/commerce
node ./bin/convert-hints.js ./lib/docs/reference/schema/commerce
node ./bin/convert-lists.js ./lib/docs/reference/schema/commerce
cat ./lib/docs/reference/schema/commerce/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

rm -rf ./lib/docs/reference/schema/donation
git clone --depth=1 --branch=schema/donation https://github.com/movedataio/movedata-support.git ./lib/docs/reference/schema/donation
rm -rf ./lib/docs/reference/schema/donation/.git

node ./bin/convert-nav.js ./lib/docs/reference/schema/donation/SUMMARY.md "Schema: Donation" "reference/schema/donation" 2
node ./bin/convert-frontmatter.js ./lib/docs/reference/schema/donation
node ./bin/migrate-images.js reference ./lib/docs/reference/schema/donation
node ./bin/convert-embeds.js ./lib/docs/reference/schema/donation
node ./bin/convert-hints.js ./lib/docs/reference/schema/donation
node ./bin/convert-lists.js ./lib/docs/reference/schema/donation
cat ./lib/docs/reference/schema/donation/SUMMARY-nav.yaml >> ./lib/mkdocs.yml

