import React from 'react';

const SECURITY_CODE = 'paradigma'

const initialState = {
    value: '',
    error: false,
    loading: false,
    delete: false,
    confirm: false,
}

const actionTypes = {
    CHECK: 'CHECK',
    ERROR: 'ERROR',
    CONFIRM: 'CONFIRM',
    WRITE: 'WRITE',
    PREVIEW: 'PREVIEW',
    CANCEL: 'CANCEL',
}
const UseReducerComponent = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {
        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
                }

            }, 2500);

        }
    }, [state.loading])


    // actions creators

    const onConfirm = () => {
        dispatch({ type: actionTypes.CONFIRM })
    }

    const onError = () => {
        dispatch({ type: actionTypes.ERROR })
    }

    const onWrite = (newValue) => {
        dispatch({ type: actionTypes.WRITE, payload: newValue })
    }

    const onCheck = () => {
        dispatch({ type: actionTypes.CHECK })
    }

    const onPreviewConfirm = () => {
        dispatch({ type: actionTypes.PREVIEW })
    }

    const onCancel = () => {
        dispatch({ type: actionTypes.CANCEL })
    }


    if (!state.delete && !state.confirm) {
        return (
            <div>
                <h2>Eliminar {props.name}</h2>
                <p>Por favor escriba el codigo de seguridad</p>
                {(state.error && !state.loading) && (
                    <p>Error: El codigo es incorrecto</p>
                )}
                {state.loading && (
                    <p>Cargando...</p>
                )}
                <input type="text" placeholder='Codigo de seguridad'
                    value={state.value}
                    onChange={(event) => onWrite(event.target.value)} />
                <button onClick={onCheck}>Comprobando...</button>

            </div>
        );

    }
    else if (state.confirm && !state.delete) {
        return (<>
            <p>Pedimos Confirmacion, estas seguro </p>
            <button onClick={onPreviewConfirm}>Si, eliminar</button>
            <button onClick={onCancel}>No, regresar</button>
        </>)
    }
    else {
        return (<>
            <p>Eliminado con exito</p>
            <button onClick={onCancel}>
                Resetear, volver atras</button>
        </>)
    }
}


const reducerId = (state, action) => {
    if (action.type === 'ERROR') {
        return { ...state, error: true, loading: false }
    } else if (action.type === 'CHECK') {
        return { ...state, loading: true }
    } else if (action.type === 'CONFIRM') {
        return { ...state, loading: false, error: false, confirm: true }
        // } else if (action.type === 'WRITE') {
        //     return {...state,value: event.target.value}
    } else if (action.type === 'PREVIEW') {
        return { ...state, delete: true }
    } else if (action.type === 'CANCEL') {
        return { ...state, confirm: false, delete: false, value: '' }
    } else {
        return { ...state }
    }
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'CHECK': return { ...state, loading: true }
        case 'ERROR': return { ...state, error: true, loading: false }
        case 'CONFIRM': return { ...state, loading: false, error: false, confirm: true }
        //case 'WRITE':   return {...state,value: event.target.value}
        case 'PREVIEW': return { ...state, delete: true }
        case 'CANCEL': return { ...state, confirm: false, delete: false, value: '' }
        default: return { ...state }
    }
}

/* tercera forma */
const reducerObject = (state, payload) => ({
    [actionTypes.CHECK]: { ...state, loading: true },
    [actionTypes.ERROR]: { ...state, error: true, loading: false },
    [actionTypes.CONFIRM]: { ...state, loading: false, error: false, confirm: true },
    [actionTypes.WRITE]: { ...state, value: payload },
    [actionTypes.PREVIEW]: { ...state, delete: true },
    [actionTypes.CANCEL]: { ...state, confirm: false, delete: false, value: '' },
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

export { UseReducerComponent };