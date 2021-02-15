sudo apt update && sudo apt upgrade -y
curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs -y
sudo apt install npm -y

curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt update -y
sudo apt install -y mongodb-org
sudo systemctl enable mongod
sudo systemctl stop mongodb
sudo systemctl start mongodb
sudo systemctl stop mongod
sudo systemctl start mongod