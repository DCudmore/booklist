export { PageShell }

import React from 'react'
import { PageContextProvider } from './usePageContext'
import { Provider } from "react-redux";
import { store } from "../state/store.ts";
import type { PageContext } from 'vike/types'
import './css/index.css'
import './PageShell.css'

function PageShell({ children, pageContext }: { children: React.ReactNode; pageContext: PageContext }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PageContextProvider pageContext={pageContext}>
          <Content>{children}</Content>
        </PageContextProvider>
      </Provider>
    </React.StrictMode>
  )
}


function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
          minHeight: '100vh'
        }}
      >
        {children}
      </div>
    </div>
  )
}
