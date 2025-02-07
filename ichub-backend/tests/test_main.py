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

import pytest
import importlib
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from tractusx_sdk.shared.managers.auth_manager import AuthManager
main = importlib.import_module("ichub-backend.main")

app = main.app

# Set test_mode to True before running tests to skip uvicorn.run
def set_test_mode():
    import sys
    sys.argv = sys.argv + ['--test-mode'] 

@pytest.fixture
def client():
    set_test_mode()
    main.start()
    return TestClient(app)

@pytest.fixture
def mock_auth_manager():
    """Mock the authentication manager."""
    with patch("tractusx_sdk.shared.managers.auth_.is_authenticated", new_callable=AsyncMock, return_value=True) as mock_auth:
        yield mock_auth

def test_api_call_success(client):
    """Test API call with successful authentication."""
    response = client.get("/example")
    assert response.status_code == 200
    assert response.json() is None