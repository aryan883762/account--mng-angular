#!/bin/bash

gns_dev=gns-dev.server.lncknight.com

project_path_web_uat=/data/gp/web-uat

function deploy_code(){

  PORT=${3}
  if [ ! "$PORT" ];
  then
    PORT=22
  fi

  ssh -i ${HOME}/.ssh/id_rsa root@${1} -p ${PORT} \
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=no \
    "[ -d $2 ] || mkdir -p ${2}"

  rsync -hraz --delete \
    --exclude "/.git/*" \
    --exclude "/logs/*" \
    --exclude "/cache/*" \
    --exclude "/node_modules/*" \
    --exclude "/src/*" \
    --stats \
    -e "ssh -i ${HOME}/.ssh/id_rsa -p ${PORT} -o StrictHostKeyChecking=no -o UserKnownHostsFile=no" \
    . root@${1}:${2}
}


function restart_docker(){
  dont_restart=$4

  PORT=${5}
  if [ ! "$PORT" ];
  then
    PORT=22
  fi

  $dont_restart || ssh -i ${HOME}/.ssh/id_rsa root@${1} -p ${PORT} \
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=no \
    "cd ${2} && docker-compose rm -f -s ${3}"

  ssh -i ${HOME}/.ssh/id_rsa root@${1} -p ${PORT} \
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=no \
    "cd ${2} && docker-compose build ${3}"

  ssh -i ${HOME}/.ssh/id_rsa root@${1} -p ${PORT} \
    -o StrictHostKeyChecking=no -o UserKnownHostsFile=no \
    "cd ${2} && docker-compose --compatibility up -d ${3}"
}

if [ "$ENV" = "uat" ]
then

    cat .env-uat > .env

    # deploy web
    echo "-------------- deploying ----------------"
    deploy_code $gns_dev $project_path_web_uat
    restart_docker $gns_dev $project_path_web_uat "web" false

fi

if [ "$ENV" = "prod" ]
then

    cat .env-prod > .env

    # deploy web
    echo "-------------- deploying ----------------"
    deploy_code $gns_dev $project_path_web_uat
    restart_docker $gns_dev $project_path_web_uat "web" false

fi

