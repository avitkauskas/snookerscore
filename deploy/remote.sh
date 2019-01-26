#!/bin/bash
set -e

### Configuration ###

APP_DIR=/var/www/snookerscore
RESTART_ARGS=

### Automation steps ###

set -x

# Extract newly uploaded package
mkdir -p $APP_DIR/tmp
cd $APP_DIR/tmp
tar xzf $APP_DIR/snookerscore.tar.gz
rm -f $APP_DIR/snookerscore.tar.gz

# Install dependencies
cd $APP_DIR/tmp/bundle/programs/server
npm install --production
npm prune --production

# Copy over persistent files
if [[ -e $APP_DIR/bundle/Passengerfile.json ]]; then
  cp $APP_DIR/bundle/Passengerfile.json $APP_DIR/tmp/bundle/
fi

# Switch directories, restart app
cd $APP_DIR
mv $APP_DIR/bundle $APP_DIR/bundle.old
mv $APP_DIR/tmp/bundle $APP_DIR/bundle
passenger-config restart-app --ignore-app-not-running --ignore-passenger-not-running $RESTART_ARGS $APP_DIR/bundle
rm -rf $APP_DIR/bundle.old
rm -rf $APP_DIR/tmp