import React from 'react';
import AuthContextProps from './AuthContext.types';

const AuthContext = React.createContext<Partial<AuthContextProps>>({});

export default AuthContext;
