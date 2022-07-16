#==============================================================================
# File Name: check.sh
# Author: zhubo
# mail: 286154864@qq.com
# Create Time: 2017-07-08
#==============================================================================

# 再约定哪种shell解释时，后面需要用 -来填充空白，避免将空白传递给引用程序造成错误
#! /bin/bash -

# tput命令通过 terminfo 数据库对您的终端会话进行初始化和操作，sgr0表示正常屏幕，感觉很有用
resetterm=$(tput sgr0)

# 声明变量share关联数组；赋值=前后不能有空格！！！
declare i share
i=0
numbers=""

for script_file in `ls check_*`
do
    # 在颜色配置时，必须要”“双引号包起来
    echo -e "\033[32m" "The Script:" ${i} '===>' "\033[0m" ${script_file}
    # 将查到的文件名放入share中
    share[${i}]=${script_file}
    if [[ $numbers ]];
    then
        numbers="${numbers} | ${i}"
    else
        numbers="${i}"
    fi
    i=$((i+1))
done

# 开启转义，能解释转义字符。-n是关闭且不换行输出
echo -e "\033[31;47m请输入数字选择，若非数字自动退出\033[0m"

while true
do
    read -p "Please input a number [ ${numbers} ]:" exec
    if [[ ! ${exec} =~ ^[0-9]+ ]]; then
        exit
    fi
    if [ ${share[$exec]} ]
    then
        echo -e "${share[$exec]}"
    else
        echo -e "\033[34;43m你输入的数字不在上述的lists中\033[0m"
    fi
    bash ./${share[$exec]}
done
