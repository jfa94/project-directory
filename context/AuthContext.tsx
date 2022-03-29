import React, {useState, createContext, useCallback} from "react"

const AuthContext = createContext(null)

function AuthProvider(props) {
    const [user, setUser] = useState(null)

    const login = useCallback(async (username: string, password: string) => {
        const response = await fetch('api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json()

        if (data.idToken) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('tokens', JSON.stringify(data))
            }
            setUser({'id': data.idToken.payload.sub})
            return {'message': 'successfully logged in', 'success': true}
        } else {
            return {'message': 'Login failed', data}
        }
    }, [])

    const logout = useCallback(async () => {
        const data = await fetch('api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await data.json()

        if (response.success) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('tokens')
            }
            setUser(null)
            return {'message': 'successfully logged out', 'success': true}
        } else {
            console.log('logout failed with response: ', JSON.stringify(response))
            return {'message': 'Logout failed'}
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {props.children}
        </AuthContext.Provider>
    );
}

export {AuthProvider, AuthContext}