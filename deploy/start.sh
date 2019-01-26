#!/bin/bash
set -e

### Configuration ###

SERVER=snookerscore@95.216.204.213
APP_DIR=/var/www/snookerscore
KEYFILE=
REMOTE_SCRIPT_PATH=/tmp/deploy-snookerscore.sh

### Library ###

function run()
{
  echo "Running: $@"
  "$@"
}

### Automation steps ###

if [[ "$KEYFILE" != "" ]]; then
  KEYARG="-i $KEYFILE"
else
  KEYARG=
fi

run meteor build ../snookerscore_build --server-only --architecture os.linux.x86_64
run scp $KEYARG ../snookerscore_build/snookerscore.tar.gz $SERVER:$APP_DIR/
run scp $KEYARG deploy/remote.sh $SERVER:$REMOTE_SCRIPT_PATH
rm -rf ../snookerscore_build
echo
echo "---- Running deployment script on remote server ----"
run ssh $KEYARG $SERVER bash $REMOTE_SCRIPT_PATH