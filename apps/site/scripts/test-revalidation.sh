#!/bin/bash

# Test script for the revalidation endpoint
# Usage: ./scripts/test-revalidation.sh [secret] [url]

SECRET="${1:-test-secret}"
URL="${2:-http://localhost:3000/api/revalidate}"

echo "Testing revalidation endpoint..."
echo "URL: ${URL}?secret=${SECRET}"
echo ""

# Test 1: Site Settings update
echo "Test 1: Site Settings update"
curl -X POST "${URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "siteSettings",
    "_id": "siteSettings"
  }'
echo -e "\n"

# Test 2: Post update
echo "Test 2: Post update"
curl -X POST "${URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "post",
    "_id": "post-123",
    "slug": {
      "current": "test-post"
    }
  }'
echo -e "\n"

# Test 3: Project update
echo "Test 3: Project update"
curl -X POST "${URL}?secret=${SECRET}" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "project",
    "_id": "project-456",
    "slug": {
      "current": "test-project"
    }
  }'
echo -e "\n"

# Test 4: Invalid secret (should fail with 401)
echo "Test 4: Invalid secret (should return 401)"
curl -X POST "${URL}?secret=wrong-secret" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "siteSettings",
    "_id": "siteSettings"
  }'
echo -e "\n"

# Test 5: Missing secret (should fail with 401)
echo "Test 5: Missing secret (should return 401)"
curl -X POST "${URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "_type": "siteSettings",
    "_id": "siteSettings"
  }'
echo -e "\n"

echo "Tests complete!"
