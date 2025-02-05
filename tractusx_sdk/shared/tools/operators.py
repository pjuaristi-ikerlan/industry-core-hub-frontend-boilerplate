#################################################################################
# Eclipse Tractus-X - Software Development KIT
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

## Authorization Managment from Eclipse Tractus-X Simple Wallet 
## Author: Mathias Brunkow Moser
## License: Apache License, Version 2.0
## Source: https://github.com/eclipse-tractusx/digital-product-pass/blob/main/dpp-verification/simple-wallet/utilities/operators.py
## Extended here with some additional functionality

# Set log levels
from shutil import copyfile, move
import shutil
import os
import sys
import json
import time
import io

from datetime import datetime, timezone, timedelta

"""
Class that defines operations in files, directories, clases, ...
"""
class op:
    @staticmethod
    def json_string_to_object(json_string: str | bytes | bytearray):
        data = json.loads(s=json_string)
        return data

    @staticmethod
    def to_json(source_object,indent:int=0,ensure_ascii:bool=True):
        return json.dumps(obj=source_object,indent=indent,ensure_ascii=ensure_ascii)
    
    @staticmethod
    def to_json_file(source_object,json_file_path:str,file_open_mode:str="w",indent:int=2):
        tmp_json_string=op.to_json(source_object=source_object,indent=indent)
        op.write_to_file(data=tmp_json_string, filePath=json_file_path,openMode=file_open_mode, end="")
        
    @staticmethod
    def read_json_file(file_path,encoding:str="utf-8"):
        data=None
        f = open(file_path,"r",encoding=encoding)
        data = json.load(f)
        f.close()
        
        return data  

    @ staticmethod
    def path_exists(file_path):
        return os.path.exists(file_path)

    @ staticmethod
    def make_dir(dir_name, permits=0o777) -> bool:
        if op.path_exists(dir_name):
            return True
        os.makedirs(dir_name, permits)
        return True
    
    @ staticmethod
    def delete_dir(dir_name):
        if not op.path_exists(dir_name):
            return False
        
        shutil.rmtree(dir_name)
    @ staticmethod
    def copy_file(file_path, dst):
        return copyfile(file_path, dst)

    @ staticmethod
    def move_file(file_path, dst):
        return move(file_path, dst)

    @ staticmethod
    def to_string(file_path, openmode:str="r", encoding=sys.stdout.encoding):
        str = open(file_path, openmode, encoding=encoding).read()
        return str
    
    @ staticmethod
    def load_file(file_path) -> io.BytesIO:
        buffer = io.BytesIO(open(file_path, "rb").read())
        return buffer

    @ staticmethod
    def delete_file(file_path) -> bool:
        if not op.path_exists(file_path):
            return False

        os.remove(file_path)
        return True
    
    @staticmethod
    def timestamp(zone=timezone.utc, string=False):
        timestamp = datetime.timestamp(datetime.now(zone))
        if (string):
            return str(timestamp)
        return timestamp
    
    @staticmethod
    def get_filedatetime(zone=timezone.utc):
        return datetime.now(zone).strftime("%Y%m%d_%H%M%S")
    
    @staticmethod
    def get_filedate(zone=timezone.utc):
        return datetime.now(zone).strftime("%Y%m%d")

    @ staticmethod
    def get_path_without_file(file_path):
        return os.path.dirname(file_path)

    @ staticmethod
    def write_to_file(data, file_path, openMode:str="r", end:str="") -> bool:
        if(data == "" or data == None):
            return False

        with open(file_path, openMode, encoding=sys.stdout.encoding) as file:
            file.write(data)
            file.write(end)
        
        return True
    
    @staticmethod
    def wait(seconds):
        return time.sleep(seconds)
    
    @staticmethod
    def get_attribute(sourceObject,attr_path:str,default_value=None,path_sep:str="."):
        tmp_ret=default_value
        if sourceObject == None:
            return tmp_ret
    
        if path_sep == None or path_sep == "":
            return tmp_ret
    
        tmpParts=attr_path.split(path_sep)
        if tmpParts == None or tmpParts == "":
            return tmp_ret
        for part in tmpParts:
            if not part in sourceObject:
                return tmp_ret
            sourceObject=sourceObject[part]
        tmp_ret=sourceObject
        return tmp_ret
    
