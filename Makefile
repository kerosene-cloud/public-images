AWS_REGION := us-east-1
AWS_ACCOUNT_ID := $(shell aws sts get-caller-identity --query Account --output text)
ECR_REGISTRY_ALIAS := f3o6v9p3
ECR_REPO_HOST := public.ecr.aws/$(ECR_REGISTRY_ALIAS)
ECR_REPO_URL := $(ECR_REPO_HOST)/$(IMAGE):latest

run:
	go run main.go

docker-build:
	docker build -t $(IMAGE) ./$(IMAGE)

docker-run: docker-build
	docker run -p 3000:3000 $(IMAGE)

push: docker-build
	aws ecr-public get-login-password --region $(AWS_REGION) | docker login --username AWS --password-stdin public.ecr.aws/$(ECR_REGISTRY_ALIAS)
	docker tag $(IMAGE) $(ECR_REPO_URL)
	docker push $(ECR_REPO_URL)

repositories:
	cd cdk; cdk deploy


.PHONY := run docker-build docker-run push