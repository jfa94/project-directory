import React, {useState, createContext, useCallback} from "react"

const AuthContext = createContext(null)

function AuthProvider(props) {
    const [user, setUser] = useState(null)

    const login = useCallback(() => {
        setUser({'id': '1234'})
    }, [])

    const logout = useCallback(() => {
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext}