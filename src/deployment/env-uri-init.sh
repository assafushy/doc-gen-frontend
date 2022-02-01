echo replace BACKEND-URL-PLACEHOLDER-ContentControl
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,BACKEND-URL-PLACEHOLDER-ContentControl,'"${BACKEND-URL-PLACEHOLDER-ContentControl}"',g' {} \;

echo starting server
nginx -g "daemon off;"

