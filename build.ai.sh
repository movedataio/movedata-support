#!/bin/bash

# MoveData Support Documentation Sync Script for AWS Bedrock
# This script syncs documentation from multiple branches to S3 and triggers AWS Bedrock ingestion

set -e  # Exit on error

# Configuration
ENVIRONMENT="${ENVIRONMENT:-uat}"
S3_BUCKET_PATH="s3://${ENVIRONMENT}-movedata-ai/support/"
KNOWLEDGE_BASE_ID="${KNOWLEDGE_BASE_ID:-IJDF9WCJTI}"
KNOWLEDGE_BASE_DATA_SOURCE_ID="${KNOWLEDGE_BASE_DATA_SOURCE_ID:-GREZAHSG06}"
KNOWLEDGE_BASE_SUPPRESS="${KNOWLEDGE_BASE_SUPPRESS:-1}"
AWS_REGION="ap-southeast-2"

# Algolia Configuration
ALGOLIA_APP_ID="${ALGOLIA_APP_ID:-EAEIU7PW2Y}"
ALGOLIA_ADMIN_KEY="${ALGOLIA_ADMIN_KEY}"
ALGOLIA_INDEX_NAME="${ALGOLIA_INDEX_NAME:-prod_support_index}"

echo "======================================================================"
echo "MoveData Support Documentation Sync"
echo "======================================================================"
echo "Environment: $ENVIRONMENT"
echo "S3 Bucket: $S3_BUCKET_PATH"
echo "Knowledge Base ID: $KNOWLEDGE_BASE_ID"
echo "Data Source ID: $KNOWLEDGE_BASE_DATA_SOURCE_ID"
echo "Algolia Index: $ALGOLIA_INDEX_NAME"
echo "======================================================================"
echo ""

# Check for required tools
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v aws &> /dev/null; then
    echo "Error: AWS CLI is not installed. Please install AWS CLI first."
    exit 1
fi

# Check AWS credentials
if [ -z "$AWS_ACCESS_KEY_ID" ] && [ -z "$AWS_SECRET_ACCESS_KEY" ] && [ -z "$AWS_PROFILE" ]; then
    echo "Warning: AWS credentials not found in environment variables."
    echo "Make sure AWS CLI is configured or set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, or set AWS_PROFILE."
fi

# Clean and setup temporary directory
echo "Setting up temporary directory..."
rm -rf ./.tmp
mkdir -p ./.tmp
cd ./.tmp
mkdir -p ./extension
mkdir -p ./schema
echo "✓ Temporary directory created"
echo ""

# Clone MoveData support repository
echo "Cloning MoveData support repository..."
git clone https://github.com/movedataio/movedata-support.git movedata-support
echo "✓ Repository cloned"
echo ""

# Copy BIN folder (prefer local version with latest fixes if it exists)
if [ -d "../bin" ]; then
    echo "Copying BIN folder from local directory (contains latest fixes)..."
    cp -R ../bin ./bin
    echo "✓ Local BIN folder copied"
else
    echo "Copying BIN folder from cloned repository..."
    cp -R movedata-support/bin ./bin
    echo "✓ Repository BIN folder copied"
fi
echo ""

# Function to process a branch
process_branch() {
    local branch=$1
    local output_dir=$2
    local web_path_prefix="${3:-$2}"
    local branch_name=$(basename $branch)
    
    echo "======================================================================"
    echo "Processing branch: $branch"
    echo "======================================================================"
    
    cd movedata-support
    git checkout $branch
    cd ..
    
    echo "Converting GitBook hints to MkDocs admonitions..."
    node ./bin/convert-hints.js ./movedata-support
    
    echo "Converting metadata from note blocks to frontmatter..."
    node ./bin/convert-metadata.js ./movedata-support
    
    echo "Generating AWS Bedrock metadata sidecar files..."
    node ./bin/generate-metadata-aws.js ./movedata-support $web_path_prefix --source-repo ./movedata-support
    
    echo "Syncing files to output directory..."
    mkdir -p ./$output_dir
    rsync -av --exclude='SUMMARY.md' --exclude='SUMMARY.md.metadata.json' --include='*/' --include='*.md' --include='*.metadata.json' --exclude='*' movedata-support/ ./$output_dir/
    
    cd movedata-support
    git reset --hard
    git clean -fd
    cd ..
    
    echo "✓ Branch $branch processed"
    echo ""
}

# Process all branches
process_branch "documentation" "documentation" "user_guide"
process_branch "knowledgebase" "knowledgebase"
process_branch "developer" "developer"
process_branch "extension/npsp-fundraising" "extension/npsp-fundraising"
process_branch "extension/commerce" "extension/commerce"
process_branch "extension/non-profit-cloud" "extension/non-profit-cloud"
process_branch "schema/commerce" "schema/commerce"
process_branch "schema/donation" "schema/donation"

echo "Cleaning up cloned repository..."
rm -rf ./movedata-support

# Sync to Algolia Search
echo "======================================================================"
echo "Syncing to Algolia Search"
echo "======================================================================"
echo "Target Index: $ALGOLIA_INDEX_NAME"
echo ""

#pwd
#ls -R

echo "Uploading search records to Algolia..."
node ./bin/sync-to-algolia.js . \
    --app-id "$ALGOLIA_APP_ID" \
    --api-key "$ALGOLIA_ADMIN_KEY" \
    --index-name "$ALGOLIA_INDEX_NAME" \
    --clear-index

if [ $? -eq 0 ]; then
    echo "✓ Search records synced to Algolia"
else
    echo "❌ Failed to sync to Algolia"
    exit 1
fi
echo ""

# Clean up cloned repository
echo "Cleaning up cloned bin folder..."
rm -rf ./bin
echo "✓ Cleanup complete"
echo ""

# Sync to S3
echo "======================================================================"
echo "Syncing to S3"
echo "======================================================================"
echo "Target: $S3_BUCKET_PATH"
echo ""

# Optional: Clear existing S3 content (uncomment if needed)
# echo "Clearing existing S3 content..."
# aws s3 rm "$S3_BUCKET_PATH" --recursive --region $AWS_REGION
# echo "✓ S3 content cleared"
# echo ""

echo "Uploading files to S3..."
aws s3 sync . "$S3_BUCKET_PATH" --delete --region $AWS_REGION
echo "✓ Files synced to S3"
echo ""

# Go back to original directory
cd ..

# Execute Bedrock Knowledge Base Data Source Sync
if [ "$KNOWLEDGE_BASE_SUPPRESS" = "1" ]; then
    echo "======================================================================"
    echo "Skipping AWS Bedrock Knowledge Base Ingestion (KNOWLEDGE_BASE_SUPPRESS=1)"
    echo "======================================================================"
    echo ""
    echo "======================================================================"
    echo "Sync Complete!"
    echo "======================================================================"
    echo "Environment: $ENVIRONMENT"
    echo "S3 Bucket: $S3_BUCKET_PATH"
    echo "Algolia Index: $ALGOLIA_INDEX_NAME"
    echo "======================================================================"
    exit 0
fi

echo "======================================================================"
echo "Starting AWS Bedrock Knowledge Base Ingestion"
echo "======================================================================"
echo ""

echo "Starting ingestion job..."
INGESTION_JOB_ID=$(aws bedrock-agent start-ingestion-job \
    --knowledge-base-id $KNOWLEDGE_BASE_ID \
    --data-source-id $KNOWLEDGE_BASE_DATA_SOURCE_ID \
    --region $AWS_REGION \
    --query 'ingestionJob.ingestionJobId' \
    --output text)

if [ -z "$INGESTION_JOB_ID" ]; then
    echo "❌ Failed to start ingestion job"
    exit 1
fi

echo "✓ Ingestion job started with ID: $INGESTION_JOB_ID"
echo "Waiting for ingestion job to complete..."
echo ""

# Poll the job status until completion
POLL_COUNT=0
MAX_POLLS=120  # Maximum 60 minutes (120 * 30 seconds)

while true; do
    STATUS=$(aws bedrock-agent get-ingestion-job \
        --knowledge-base-id $KNOWLEDGE_BASE_ID \
        --data-source-id $KNOWLEDGE_BASE_DATA_SOURCE_ID \
        --ingestion-job-id $INGESTION_JOB_ID \
        --region $AWS_REGION \
        --query 'ingestionJob.status' \
        --output text)
    
    echo "Current status: $STATUS (poll $POLL_COUNT/$MAX_POLLS)"
    
    if [ "$STATUS" = "COMPLETE" ]; then
        echo ""
        echo "======================================================================"
        echo "✅ Ingestion job completed successfully!"
        echo "======================================================================"
        break
    elif [ "$STATUS" = "FAILED" ]; then
        echo ""
        echo "======================================================================"
        echo "❌ Ingestion job failed!"
        echo "======================================================================"
        exit 1
    elif [ "$STATUS" = "STOPPING" ] || [ "$STATUS" = "STOPPED" ]; then
        echo ""
        echo "======================================================================"
        echo "⚠️  Ingestion job was stopped!"
        echo "======================================================================"
        exit 1
    fi
    
    POLL_COUNT=$((POLL_COUNT + 1))
    if [ $POLL_COUNT -ge $MAX_POLLS ]; then
        echo ""
        echo "======================================================================"
        echo "⚠️  Timeout: Ingestion job did not complete within expected time"
        echo "======================================================================"
        echo "Job ID: $INGESTION_JOB_ID"
        echo "You can check the status manually using:"
        echo "aws bedrock-agent get-ingestion-job \\"
        echo "  --knowledge-base-id $KNOWLEDGE_BASE_ID \\"
        echo "  --data-source-id $KNOWLEDGE_BASE_DATA_SOURCE_ID \\"
        echo "  --ingestion-job-id $INGESTION_JOB_ID \\"
        echo "  --region $AWS_REGION"
        exit 1
    fi
    
    echo "Job still in progress, waiting 30 seconds..."
    sleep 30
done

echo ""
echo "======================================================================"
echo "Sync Complete!"
echo "======================================================================"
echo "Environment: $ENVIRONMENT"
echo "S3 Bucket: $S3_BUCKET_PATH"
echo "Algolia Index: $ALGOLIA_INDEX_NAME"
echo "Ingestion Job ID: $INGESTION_JOB_ID"
echo "======================================================================"
