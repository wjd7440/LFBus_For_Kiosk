import React, { useState, useEffect } from "react";
import RootRouter from "./src/Router";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { AsyncStorage } from "react-native";
import ApolloClient from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import apolloClientOptions from "./apollo";
import { Block, GalioProvider } from "galio-framework";

import { ApolloProvider } from "react-apollo-hooks";
import NavController from "./src/navigation/index";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const preLoad = async () => {
    try {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        link: authLink.concat(apolloClientOptions),
      });
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    loaded &&
    client && (
      <ApolloProvider client={client}>
        <NavController />
      </ApolloProvider>
    )
  );
}
