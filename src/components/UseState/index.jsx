import React from 'react';

const SECURITY_CODE = 'paradigma'

const UseStateComponent = (props) => {

  const [state, setState] = React.useState({
    value:'',
    error:false,
    loading:false,
    delete: false,
    confirm: false,
  })

  React.useEffect(()=>{
    if(state.loading ) {
        setTimeout(() => {
            if (state.value === SECURITY_CODE) {
                setState({...state,loading:false, error:false, confirm:true})
            } else {
                setState({...state,loading:false, error:true})    
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
            onChange={ (event) => setState({...state,value: event.target.value})} />
             <button onClick={()=> setState({...state,loading:true})}>Loading</button>
            
        </div>
      );

  }
  else if (state.confirm && !state.delete) {
    return (<>
        <p>Pedimos Confirmacion, estas seguro </p>
        <button onClick={()=>{ 
            setState({...state,delete:true})
        }}>Si, eliminar</button>
        <button onClick={()=> {
            setState({...state,confirm:false, value:''})
        }}>No, regresar</button>
    </>)
  }
  else {
    return (<>
        <p>Eliminado con exito</p>
        <button onClick={()=> {
            setState({...state,confirm:false, delete:false, value: ''})
        }}>Resetear, volver atras</button>
    </>)
  }
}

export {UseStateComponent};
