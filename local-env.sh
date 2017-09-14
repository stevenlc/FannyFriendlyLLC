# This is the configuration I use for testing locally.
# In production, the environment variables should be changed.

export DATABASEURL="mongodb://localhost/ffllc"
export PORT="3000"
export ADMINUSER="a"
export ADMINPWD="a"
export REPOPULATE="no"

echo "DATABASEURL:" $DATABASEURL
echo "PORT:" $PORT
echo "ADMINUSER:" $ADMINUSER
echo "ADMINPWD:" $ADMINPWD
echo "REPOPULATE:" $REPOPULATE
