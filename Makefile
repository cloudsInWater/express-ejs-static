# Makefile
#
# Targets:
#   build-image
#   release

# Make release, must pass version, e.g. make release VERSION=v0.1.0
.PHONY: release
release:
	# 如果有镜像仓库的账户密码
	PUSH_TO_REGISTRY=Y ./scripts/build-image.sh $(VERSION)

# Build test images. The images will be tagged with latest.
.PHONY: build-image
build-image:
	# 如果有镜像仓库的账户密码
	PUSH_TO_REGISTRY=N ./scripts/build-image.sh