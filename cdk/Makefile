clean:
	rm app.js

app.js:
	npx tsc

build: app.js

synth: build
	npx cdk synth --app app.js

deploy: build
	npx cdk deploy --app app.js