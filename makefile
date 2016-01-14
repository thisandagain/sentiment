ESLINT=./node_modules/.bin/eslint
TAP=./node_modules/.bin/tap

# ------------------------------------------------------------------------------

# Builds a JSON representation of the raw AFINN word list
build:
	node ./build/index.js

# ------------------------------------------------------------------------------

lint:
	$(ESLINT) ./lib/*.js
	$(ESLINT) ./build/*.js
	$(ESLINT) ./test/**/*.js

unit:
	$(TAP) ./test/unit/*.js

integration:
	$(TAP) ./test/integration/*.js

test:
	@make lint
	@make unit
	@make integration

# ------------------------------------------------------------------------------

coverage:
	$(TAP) ./test/{integration,unit}/*.js --coverage --coverage-report=lcov

# ------------------------------------------------------------------------------

benchmark:
	node ./test/benchmark/performance.js

# ------------------------------------------------------------------------------

.PHONY: build lint unit test coverage benchmark
