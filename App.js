import React, {Component} from 'react';
import ExternalRoutes from './routes/ExternalRoutes';
import InternalRoutes from './routes/InternalRoutes';
import { Provider, Subscribe } from 'unstated';
import sessionState from './states/session';
import Loading from './components/Loading';

class App extends Component {
  componentDidMount() {
    
  }
  render() {
    return (
      <Provider>
        <Subscribe to={[sessionState]}>
          {(session) => {
            if (session.state.isLogued == null) {
              session.verify();
              return <Loading />;
            } else if (session.state.isLogued) {
              return <InternalRoutes />
            } else {
              return <ExternalRoutes />
            }
          }}
        </Subscribe>
      </Provider>
    );
  }
}

export default App;
