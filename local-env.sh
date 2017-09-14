# This is the configuration I use for testing locally.
# In production, the environment variables should be changed.
# Tip: for easier development, use this command so that git no longer tracks it
#    git update-index --assume-unchanged local-env.sh
# to track the file again, simply use the --no-assume-unchanged flag instead

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
