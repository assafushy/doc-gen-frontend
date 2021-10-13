#!/bin/bash

echo replace SITE_IP with $VM_IP

find '/app/src/store/' -name '*.js' -exec sed -i 's,http://10.180.0.127,'"${VM_IP}"',g' {} \;
find '/app/src/' -name '*.js' -exec sed -i 's,http://10.180.0.127,'"${VM_IP}"',g' {} \;


echo replace TFS_URL with $TFS_URI

find '/app/src/store/' -name '*.js' -exec sed -i 's,http://aptfs2018:8080/tfs/TestCollection/,'"${TFS_URI}"',g' {} \;

echo replace TFS_PAT with $TFS_PAT

find '/app/src/store/' -name '*.js' -exec sed -i 's,zzzblgncnspeem2mzlekconi7dkeycvcsr2wxwcfgzmkea24xcwa,'"${TFS_PAT}"',g' {} \;

echo starting server

npm start