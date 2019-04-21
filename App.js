import React, {Component} from 'react';
import ExternalRoutes from './routes/ExternalRoutes';
import InternalRoutes from './routes/InternalRoutes';
import { Provider, Subscribe } from 'unstated';
import sessionState from './states/session';
import tripState from './states/trip';
import Loading from './components/Loading';

class App extends Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[sessionState, tripState]}>
          {(session, trip) => {
            if (session.state.isLogued == null) {
              session.verify();
              return <Loading />;
            } else if (session.state.isLogued) {
              return <InternalRoutes screenProps={{ session, trip }}  />
            } else {
              return <ExternalRoutes screenProps={{ session }} />
            }
          }}
        </Subscribe>
      </Provider>
    );
  }
}

export default App;
