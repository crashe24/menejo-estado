import React from 'react';

const SECURITY_CODE = 'paradigma'

const UseReducerComponent = (props) => {

  const [state, dispatch] = React.useReducer(reducer, initialState)

  React.useEffect(()=>{
    if(state.loading ) {
        setTimeout(() => {
            if (state.value === SECURITY_CODE) {
                 dispatch({type: 'CONFIRM'})
            } else {
                 dispatch({type: 'ERROR'})
            }
          
        }, 2500);

    }
  },[state.loading])


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
            onChange={ (event) => dispatch({type: 'WRITE', payload: event.target.value})} />
             <button onClick={()=> dispatch({type: 'CHECK'})}>Comprobando...</button>
            
        </div>
      );

  }
  else if (state.confirm && !state.delete) {
    return (<>
        <p>Pedimos Confirmacion, estas seguro </p>
        <button onClick={()=> dispatch({type:'PREVIEW'})}>Si, eliminar</button>
        <button onClick={()=> dispatch({type:'CANCEL'})}>No, regresar</button>
    </>)
  }
  else {
    return (<>
        <p>Eliminado con exito</p>
        <button onClick={()=> dispatch({type:'CANCEL'})}>
                Resetear, volver atras</button>
    </>)
  }
}




const initialState = {
    value:'',
    error:false,
    loading:false,
    delete: false,
    confirm: false,
}

const reducerId = (state, action) => {
    if (action.type === 'ERROR') {
        return {...state,error: true,loading: false}
    } else if (action.type === 'CHECK') {
        return {...state,loading: true}
    } else if (action.type === 'CONFIRM') {
        return {...state,loading:false, error:false, confirm:true}
    // } else if (action.type === 'WRITE') {
    //     return {...state,value: event.target.value}
    } else if (action.type === 'PREVIEW') { 
        return {...state,delete:true}
    } else if (action.type === 'CANCEL') { 
        return {...state,confirm:false, delete:false, value:''}
    } else {
        return {...state}
    }   
}

const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'CHECK':   return {...state,loading: true}
        case 'ERROR':   return {...state,error: true,loading: false}
        case 'CONFIRM': return {...state,loading:false, error:false, confirm:true}
        //case 'WRITE':   return {...state,value: event.target.value}
        case 'PREVIEW': return {...state,delete:true}
        case 'CANCEL':  return {...state,confirm:false, delete:false, value:''}
        default:        return {...state}
    }
}

/* tercera forma */
const reducerObject = (state,payload) => ({
    'CHECK'  : {...state,loading: true},
    'ERROR'  : {...state,error: true,loading: false},
    'CONFIRM': {...state,loading:false, error:false, confirm:true},
    'WRITE'  : {...state,value: payload},
    'PREVIEW': {...state,delete:true},
    'CANCEL' : {...state,confirm:false, delete:false, value:''},
})

const reducer = (state, action ) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}

export {UseReducerComponent};