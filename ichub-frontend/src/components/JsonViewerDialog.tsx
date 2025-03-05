/********************************************************************************
 * Eclipse Tractus-X - Industry Core Hub Frontend
 *
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the
 * License for the specific language govern in permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
********************************************************************************/

import { Button, Dialog, DialogHeader, DialogContent, Icon } from '@catena-x/portal-shared-components';
import ReactJson from "react-json-view";

import { PartInstance } from '../types/product';

interface JsonViewerDialogProps {
    open: boolean;
    onClose: () => void;
    carJsonData: PartInstance;  // Use CarPart interface here
  }

const JsonViewerDialog = ({ open, onClose, carJsonData }: JsonViewerDialogProps) => {
    const title = carJsonData?.Name ? `${carJsonData.Name} JSON data` : "DCM JSON Data";
    const description = carJsonData?.Description ? `${carJsonData.Description}` : "";

    return (
        <Dialog open={open} maxWidth="xl">
            <DialogHeader intro={description} title={title} />
            <DialogContent>
                <ReactJson src={carJsonData} theme="rjv-default" collapsed={false} />
            </DialogContent>
            <div className="mx-auto my-4 text-center">
                <Button variant="outlined" onClick={onClose} size='small'>
                    <Icon fontSize="16" iconName="Close" />
                    Close
                </Button>
            </div>
        </Dialog>
    )
}

export default JsonViewerDialog