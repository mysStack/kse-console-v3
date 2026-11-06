/*
 * This file is part of KubeSphere Console.
 * Copyright (C) 2019 The KubeSphere Console Authors.
 *
 * KubeSphere Console is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * KubeSphere Console is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with KubeSphere Console.  If not, see <https://www.gnu.org/licenses/>.
 */

import { action } from 'mobx'
import Base from 'stores/base'
import { silenceUnsupportedListReject } from 'stores/silenceUnsupported'

export default class IPPool extends Base {
  module = 'ippools'

  // KS 4.1.x: resources.kubesphere.io/.../ippools and network.kubesphere.io
  // CRD both unavailable; silence like S2I / namespacenetworkpolicies.
  @action
  fetchList(params = {}) {
    return super.fetchList({
      ...params,
      reject: silenceUnsupportedListReject,
    })
  }
}
