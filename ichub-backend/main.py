#################################################################################
# Eclipse Tractus-X - Industry Core Hub Backend
#
# Copyright (c) 2025 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied. See the
# License for the specific language govern in permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
#################################################################################


from fastapi import FastAPI, HTTPException, Request

## FAST API example for keycloak
from fastapi_keycloak_middleware import CheckPermissions
from fastapi_keycloak_middleware import get_user
from datetime import datetime
import sys
import argparse
from logging import config
import logging
import yaml
import uvicorn
import urllib3

from pathlib import Path
## Import paths
sys.path.append(str(Path(__file__).resolve().parents[1]))
sys.dont_write_bytecode = True

## Import Library Packeges
from tractusx_sdk.shared.tools import op
from tractusx_sdk.shared.tools import httpTools
from tractusx_sdk.shared.managers import authManager
from tractusx_sdk.dataspace.services import edcService
from tractusx_sdk.industry.services import aasService

## Declare Global Variables
app_configuration:dict
log_config:dict

## In memory storage/management services
edc_service: edcService

## In memory authentication manager service
auth_manager: authManager

urllib3.disable_warnings()
logging.captureWarnings(True)

## Create Logging Folder
op.make_dir("logs")

# Load the logging config file
with open('./config/logging.yml', 'rt') as f:
    log_config = yaml.safe_load(f.read())
    date = op.get_filedate()
    op.make_dir(dir_name="logs/"+date)
    log_config["handlers"]["file"]["filename"] = f'logs/{date}/{op.get_filedatetime()}-ic-backend-sdk.log'
    config.dictConfig(log_config)

# Load the configuation for the application
with open('./config/configuration.yml', 'rt') as f:
    # Read the yaml configuration
    app_configuration = yaml.safe_load(f.read())
    
# Add the previous folder structure to the system path to import the utilities
app = FastAPI(title="main")

@app.get("/example")
async def api_call(request: Request):
    """
    Example documentation

    Returns:
        response: :obj:`__insert response here__`
    """
    try:
        ## Check if the api key is present and if it is authenticated
        if(not auth_manager.is_authenticated(request=request)):
            return httpTools.get_not_authorized()
        ## Standard way to know if user is calling or the EDC.
        calling_bpn = request.headers.get('Edc-Bpn', None)
        if(calling_bpn is not None):
            logger.info(f"[Consumption Request] Incomming request from [{calling_bpn}] EDC Connector...")
        
        ## DO LOGIC HERE!!!
        return None
    
    except Exception as e:
        logger.exception(str(e))
        return httpTools.get_error_response(
            status=500,
            message="It was not possible to execute the request!"
        )

def start(host:str, port:int, log_level:str="info"):
    ## Load in memory data storages and authentication manager
    global edc_service, auth_manager
    
    ## Start storage and edc communication service
    edc_service = edcService()

    ## Start the authentication manager
    auth_manager = authManager()
    
    ## Once initial checks and configurations are done here is the place where it shall be included
    logger.info("[INIT] Application Startup Initialization Completed!")
    uvicorn.run(app, host=host, port=port, log_level=log_level)       
    
def get_arguments():
    
    parser = argparse.ArgumentParser()
    
    parser.add_argument("--debug", default=False, action="store_false", help="Enable and disable the debug", required=False)
    
    parser.add_argument("--port", default=8080, help="The server port where it will be available", type=int, required=False,)
    
    parser.add_argument("--host", default="localhost", help="The server host where it will be available", type=str, required=False)
    
    args = parser.parse_args()
    return args


if __name__ == "__main__":
    print("\nEclipse Tractus-X Industry Core Hub\n")
    print(r"""
        __________     __  __      __       ____             __                  __
       /  _/ ____/    / / / /_  __/ /_     / __ )____ ______/ /_____  ____  ____/ /
       / // /  ______/ /_/ / / / / __ \   / __  / __ `/ ___/ //_/ _ \/ __ \/ __  / 
     _/ // /__/_____/ __  / /_/ / /_/ /  / /_/ / /_/ / /__/ ,< /  __/ / / / /_/ /  
    /___/\____/    /_/ /_/\__,_/_.___/  /_____/\__,_/\___/_/|_|\___/_/ /_/\__,_/   
    """)
    print("\n\n\t\t\t\t\t\t\t\t\t\tv0.0.1")
    print("Application starting, listening to requests...\n")

    args = get_arguments()
    logger = logging.getLogger('staging')
    if(args.debug):
        logger = logging.getLogger('development')

    start(host=args.host, port=args.port, log_level=("debug" if args.debug else "info"))

    print("\nClosing the application... Thank you for using the Eclipse Tractus-X Industry Core Hub Backend!")