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

  const onConfirm = () => {
    setState({...state,loading:false, error:false, confirm:true})
  }

  const onError = () => {
    setState({...state,loading:false, error:true})    
  }

  const onWrite = (event) => {
    setState({...state,value: event.target.value})
  }

  const onCheck = () => {
    setState({...state,loading:true})
  }

  const onPreviewConfirm = ()=>{ 
    setState({...state,delete:true})
    }

  const onCancel = ()=> { setState({...state,confirm:false, delete:false, value:''})}

  //const onReturn = ()=> { setState({...state,confirm:false, delete:false, value: ''})}

  React.useEffect(()=>{
    if(state.loading ) {
        setTimeout(() => {
            if (state.value === SECURITY_CODE) {
                //setState({...state,loading:false, error:false, confirm:true})
                onConfirm()
            } else {
                //setState({...state,loading:false, error:true})    
                onError()
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
            onChange={ (event) => onWrite(event)} />
             <button onClick={()=> onCheck()}>Comprobando...</button>
            
        </div>
      );

  }
  else if (state.confirm && !state.delete) {
    return (<>
        <p>Pedimos Confirmacion, estas seguro </p>
        <button onClick={()=>onPreviewConfirm()}>Si, eliminar</button>
        <button onClick={()=> onCancel()}>No, regresar</button>
    </>)
  }
  else {
    return (<>
        <p>Eliminado con exito</p>
        <button onClick={()=> onCancel()}>
                Resetear, volver atras</button>
    </>)
  }
}

export {UseStateComponent};
