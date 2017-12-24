# This is the configuration I use for testing locally.
# In production, the environment variables should be changed.

export DATABASEURL="mongodb://localhost/ffllc"
echo "DATABASEURL set"
export PORT="3000"
echo "PORT set"
export ADMINUSER="a"
echo "ADMINUSER set"
export ADMINPWD="a"
echo "ADMINPWD set"
export REPOPULATE="yes"
echo "REPOPULATE set"

echo ""

cat > env-variables.txt << EOF

DATABASEURL: $DATABASEURL
PORT: $PORT
ADMINUSER: $ADMINUSER
ADMINPWD: $ADMINPWD
REPOPULATE: $REPOPULATE

EOF

cat env-variables.txt
