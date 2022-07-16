#==============================================================================
# File Name: check.sh
# Author: zhubo
# mail: 286154864@qq.com
# Create Time: 2017-07-08
#==============================================================================

#! /bin/bash -
clear   # 清屏， $# 参数个数
if [[ $# -eq 0 ]]
then
# 将命令的结果赋给自定义的shell变量

reset_terminal=$(tput sgr0)
# check OS Release Version and Name 操作系统
os=$(uname -v)
# check Architecture cpu的执行级是32还是64位的
architecture=$(uname -m)
# check Kernel Release 操作系统内核版本号
kernel_release=$(uname -r)
# check hostname 主机名
hostname=$(uname -n)
# check External IP 公网的IP
external_ip=$(curl -s http://ipecho.net/plain)
# check DNS 局域网dns服务器IP
nameservers=$(cat /etc/resolv.conf | grep -E "\<nameserver[ ]+" | awk '{print $NF}')

echo -e "\033[32m 操作系统: \033[0m" $reset_terminal $os
echo -e "\033[32m CPU执行级: \033[0m" $reset_terminal $architecture
echo -e "\033[32m OS内核版本: \033[0m" $reset_terminal $kernel_release
echo -e "\033[32m 主机名: \033[0m" $reset_terminal $hostname
echo -e "\033[32m 公网IP: \033[0m" $reset_terminal $external_ip
echo -e "\033[32m DNS_IP: \033[0m" $reset_terminal $nameservers
fi
