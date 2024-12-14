import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { ApolloProvider} from '@apollo/client';
import { client } from './app/graphql/graphqlClient';



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </StrictMode>
);
