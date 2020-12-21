/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { TabsWithChasingUnderline } from './TabsWithChasingUnderline'

import './styles.css'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

const TabPanel = styled.div<{ background: string }>`
  height: 95vh;
  background: ${(p) => p.background};
  color: white;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Home() {
  React.useEffect(() => {
    document.title = 'Tabs with chasing underline'
  }, [])

  return (
    <div className="App">
      <TabsWithChasingUnderline />

      <TabPanel
        id="details"
        role="tabpanel"
        aria-labelledby="tab-details"
        background="red"
      >
        Details
      </TabPanel>

      <TabPanel
        id="overview"
        role="tabpanel"
        aria-labelledby="tab-overview"
        background="green"
      >
        Overview
      </TabPanel>

      <TabPanel
        id="example-scenario"
        role="tabpanel"
        aria-labelledby="tab-example-scenario"
        background="blue"
      >
        Example Scenario
      </TabPanel>

      <TabPanel
        id="faqs"
        role="tabpanel"
        aria-labelledby="tab-faqs"
        background="purple"
      >
        FAQs
      </TabPanel>
    </div>
  )
}
