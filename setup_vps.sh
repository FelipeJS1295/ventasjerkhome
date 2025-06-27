#!/bin/bash

# VPS setup script for Jerkhome CL
# Run this script on a fresh VPS instance

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting VPS setup for Jerkhome CL...${NC}"

# Update package list and upgrade existing packages
echo -e "${YELLOW}🔄 Updating system packages...${NC}"
apt-get update
apt-get upgrade -y

# Install required packages
echo -e "${YELLOW}📦 Installing required packages...${NC}"
apt-get install -y \
    git \
    curl \
    wget \
    nginx \
    docker.io \
    docker-compose \
    certbot \
    python3-certbot-nginx \
    mysql-client \
    fail2ban \
    ufw

# Start and enable Docker
echo -e "${YELLOW}🐳 Setting up Docker...${NC}"
systemctl enable --now docker
usermod -aG docker $USER

# Configure firewall
echo -e "${YELLOW}🔥 Configuring firewall...${NC}"
ufw allow OpenSSH
ufw allow http
ufw allow https
ufw --force enable

# Create project directory
PROJECT_DIR="/var/www/jerkhomecl"
mkdir -p "$PROJECT_DIR"
chown -R $USER:$USER "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Clone the repository (if not already done)
if [ ! -d "$PROJECT_DIR/.git" ]; then
    echo -e "${YELLOW}📥 Cloning repository...${NC}"
    git clone https://github.com/FelipeJS1295/ventasjerkhome.git "$PROJECT_DIR"
    cd "$PROJECT_DIR"
    git config --global --add safe.directory "$PROJECT_DIR"
else
    echo -e "${YELLOW}✅ Repository already exists. Pulling latest changes...${NC}"
    cd "$PROJECT_DIR"
    git pull
fi

# Create necessary directories
mkdir -p "$PROJECT_DIR/nginx/ssl"
mkdir -p "$PROJECT_DIR/db"

# Set proper permissions
chown -R $USER:$USER "$PROJECT_DIR"
chmod -R 755 "$PROJECT_DIR"

# Create .env file if it doesn't exist
if [ ! -f "$PROJECT_DIR/.env" ]; then
    echo -e "${YELLOW}⚠️  Please create a .env file from the example:${NC}"
    echo "cp $PROJECT_DIR/.env.example $PROJECT_DIR/.env"
    echo -e "${YELLOW}And update it with your configuration.${NC}"
    exit 1
fi

# Install SSL certificate (uncomment and update domain when ready)
# echo -e "${YELLOW}🔒 Setting up SSL certificate...${NC}"
# certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Build and start containers
echo -e "${YELLOW}🚀 Building and starting Docker containers...${NC}"
cd "$PROJECT_DIR"
docker-compose up -d --build

# Set up automatic updates
echo -e "${YELLOW}⏰ Setting up automatic updates...${NC}"
cat > /etc/cron.weekly/auto-update << 'EOL'
#!/bin/bash
apt-get update
apt-get upgrade -y
cd /var/www/jerkhomecl
git pull
docker-compose up -d --build
EOL

chmod +x /etc/cron.weekly/auto-update

echo -e "${GREEN}✅ VPS setup completed successfully!${NC}"
echo -e "${GREEN}🌐 Your application should now be running at: http://$(curl -s ifconfig.me)${NC}"
