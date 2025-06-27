#!/bin/bash

# Deployment script for Jerkhome CL
# Usage: ./deploy.sh [staging|production]

set -e

ENV=${1:-staging}
VPS_USER=root
VPS_IP=147.79.74.244
REMOTE_DIR="/var/www/jerkhomecl"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting deployment to ${ENV} environment...${NC}"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Please create it from .env.example${NC}"
    exit 1
fi

# Install dependencies and build frontend
echo -e "${YELLOW}🛠️  Installing frontend dependencies and building...${NC}"
cd frontend
npm install
npm run build
cd ..

# Create deployment archive
echo -e "${YELLOW}📦 Creating deployment package...${NC}
DEPLOY_ARCHIVE="deploy-$(date +%Y%m%d%H%M%S).tar.gz"
tar --exclude='.git' --exclude='node_modules' --exclude='venv' --exclude='__pycache__' -czf "$DEPLOY_ARCHIVE" .

# Upload to VPS
echo -e "${YELLOW}📤 Uploading to VPS...${NC}
scp "$DEPLOY_ARCHIVE" "$VPS_USER@$VPS_IP:$REMOTE_DIR/"

# Connect to VPS and deploy
echo -e "${YELLOW}🚀 Deploying on VPS...${NC}
ssh "$VPS_USER@$VPS_IP" << EOF
    set -e
    cd "$REMOTE_DIR"
    
    echo "Extracting files..."
    tar -xzf "$DEPLOY_ARCHIVE" -C . --strip-components=1
    rm "$DEPLOY_ARCHIVE"
    
    echo "Setting up Docker..."
    docker-compose down || true
    docker-compose up -d --build
    
    echo "Running database migrations..."
    docker-compose exec backend alembic upgrade head || echo "No migrations to run"
    
    echo "Cleaning up..."
    docker system prune -f
EOF

# Clean up
echo -e "${YELLOW}🧹 Cleaning up...${NC}"
rm "$DEPLOY_ARCHIVE"

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Application should be available at: http://$VPS_IP${NC}"
