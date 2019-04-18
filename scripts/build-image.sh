#!/bin/bash

# This script builds a Docker image for home-web.
# TODO: upload static resource to CDN & change the reference.

set -o nounset
set -o pipefail

HOME_WEB_ROOT="$(dirname "${BASH_SOURCE}")/.."

function usage {
  echo -e "Usage:"
  echo -e "  ./build-image.sh [tag]"
  echo -e ""
  echo -e "Parameter:"
  echo -e " tag\tDocker image tag, treated as portal ui release version. If provided, the tag must be"
  echo -e "    \tthe form of vA.B.C, where A, B, C are digits, e.g. v1.0.1. If not provided, current"
  echo -e "    \tdate/time will be used, i.e. YYYY-mm-DD-HH-MM-SS, where YYY is year, mm is month, DD"
  echo -e "    \tis day, HH is hour, MM is minute and SS is second, e.g. 2015-09-10-18-15-30. The second"
  echo -e "    \tcase is used for development."
  echo -e ""
  echo -e "Environment variable:"
  echo -e " PUSH_TO_REGISTRY\tSet to Y if the scripts needs to push new images to Dockerhub, default value: N"
  echo -e " SYNC_CDN(not implemented)\tSet to Y if the scripts needs to publish static resources (images, JS, css) to CDN, default value: N"
}

# -----------------------------------------------------------------------------
# Parameters for building Docker image, see usage.
# -----------------------------------------------------------------------------
# Decide if we need to push the new images to Docker hub.
PUSH_TO_REGISTRY=${PUSH_TO_REGISTRY:-"N"}

# Decide if we need to publish static resources to CDN.
SYNC_CDN=${SYNC_CDN:-"N"}

# Find image tag version.
# if [[ "$#" == "1" ]]; then
#   if [[ "$1" == "help" ]]; then
#     echo -e ""
#     usage
#     exit 0
#   elif [[ $1 = "latest" ]]; then
#     IMAGE_TAG="latest"
#   elif [[ ! $1 =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ && ! $1 =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}-[0-9]{2}$ ]]; then
#     # We also allow passing date/time directly, this is usually used internally.
#     echo -e "Error: image tag format error, see usage."
#     echo -e ""
#     usage
#     exit 1
#   else
#     # Tag used for the new image; the tag is also considered as release version.
#     IMAGE_TAG=${1}
#   fi
# else
#   IMAGE_TAG="latest"
# fi
IMAGE_TAG=${1}
# build & push image
echo "+++++ Start building home-web image"
cd ${HOME_WEB_ROOT}
Docker build -t cargo.caicloud.io/caicloud/home-web:${IMAGE_TAG} .
echo "Successfully built Docker image cargo.caicloud.io/caicloud/home-web:${IMAGE_TAG}"
cd -

# Decide if we need to push image to Docker hub.
if [[ "$PUSH_TO_REGISTRY" == "Y" ]]; then
  echo ""
  echo "+++++ Start pushing home-web image"
  Docker push cargo.caicloud.io/caicloud/home-web:${IMAGE_TAG}
fi
