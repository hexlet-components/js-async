install:
	npm install

parser: babel-eslint

build:
	rm -rf dist
	npm run build

test:
	npm run test

lint:
	npx eslint .

publish:
	npm publish --access public

.PHONY: test
