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
export REPOPULATE="no"
echo "REPOPULATE set"

echo ""

echo "DATABASEURL:" $DATABASEURL
echo "PORT:" $PORT
echo "ADMINUSER:" $ADMINUSER
echo "ADMINPWD:" $ADMINPWD
echo "REPOPULATE:" $REPOPULATE
