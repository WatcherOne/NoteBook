#==============================================================================
# File Name: check.sh
# Author: zhubo
# mail: 286154864@qq.com
# Create Time: 2017-07-08
#==============================================================================

#! /bin/bash -
reset=$(tput sgr0)

NginxServer='http://127.0.0.1/nginx_status'

check_nginx_server() {
    status_code=$(curl -m 5 -s -w %{http_code} ${NginxServer})
    echo -n ${status_code}
    if [ ${status_code} -eq 000 -o ${status_code} -ge 500 ]
    then
        echo -e "\033[32mError\033[0m" $reset ${status_code}
    else
        Http_content=$(curl -s ${NginxServer})
        echo -e "\033[32mOk!\033[0m" $reset ${status_code}
    fi
}

check_nginx_server
