install:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm run test

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
