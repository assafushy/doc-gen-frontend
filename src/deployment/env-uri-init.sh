echo replace MINIO-ENDPOINT-PLACEHOLDER
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,MINIO-ENDPOINT-PLACEHOLDER,'"${MINIO-ENDPOINT-PLACEHOLDER}"',g' {} \;

echo replace MINIO-URL-PLACEHOLDER
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,MINIO-URL-PLACEHOLDER,'"${MINIO-URL-PLACEHOLDER}"',g' {} \;
      
echo replace BACKEND-URL-PLACEHOLDER-ContentControl
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,BACKEND-URL-PLACEHOLDER-ContentControl,'"${BACKEND-URL-PLACEHOLDER-ContentControl}"',g' {} \;

echo replace MINIO-ACCESS-ID-PLACEHOLDER
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,MINIO-ACCESS-ID-PLACEHOLDER,'"${MINIO-ACCESS-ID-PLACEHOLDER}"',g' {} \;
      
echo replace MINIO-SECRET-ACCESS-KEY-PLACEHOLDER
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,MINIO-SECRET-ACCESS-KEY-PLACEHOLDER,'"${MINIO-SECRET-ACCESS-KEY-PLACEHOLDER}"',g' {} \;
      
echo replace AWS-REGION-PLACEHOLDER
find '/usr/share/nginx/html/static/js' -name '*.js' -exec sed -i 's,AWS-REGION-PLACEHOLDER,'"${AWS-REGION-PLACEHOLDER}"',g' {} \;
      
echo starting server
nginx -g "daemon off;"

