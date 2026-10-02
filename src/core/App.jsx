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

import '@kube-design/components/esm/styles/index.scss'
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { syncHistoryWithStore } from 'mobx-react-router'
import React, { Component } from 'react'
import { Router } from 'react-router'
import 'scss/main.scss'

import RootStore from 'stores/root'
import { lazy } from 'utils'
import { renderRoutes } from 'utils/router.config'

import routes from './routes'
import { getRouterBasename } from './routerBase'
import { notifyHostRouteChange } from './routeSync'

const getActions = lazy(() =>
  import(/* webpackChunkName: "actions" */ 'actions')
)

class App extends Component {
  constructor(props) {
    super(props)

    this.rootStore = new RootStore()
    this.history = syncHistoryWithStore(
      createBrowserHistory({
        basename: getRouterBasename(window.location.pathname),
      }),
      this.rootStore.routing
    )
    this.unlistenRoute = this.history.listen(notifyHostRouteChange)
  }

  componentDidMount() {
    notifyHostRouteChange(this.history.location)
    getActions().then(actions =>
      this.rootStore.registerActions(actions.default)
    )
  }

  componentWillUnmount() {
    this.unlistenRoute()
  }

  render() {
    return (
      <Provider rootStore={this.rootStore}>
        <Router history={this.history}>{renderRoutes(routes)}</Router>
      </Provider>
    )
  }
}

export default App
