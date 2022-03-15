import Config from 'react-native-config';

export const getEnv = (env) => Config[`REACT_APP_${env}`];
