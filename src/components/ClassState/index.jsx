import React from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = 'paradigma'


class ClassStateComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            error: false, 
            loading: false, 
        }
    }
    
    //componentWillMount() {
    // UNSAFE_componentWillMount() {
    //     console.log('componentWill')
    // }

    // componentDidMount() {
    //     console.log('Didmount')
    // }

    componentDidUpdate() {
        console.log('actualizacion')
        if(this.state.loading ) {
            setTimeout(() => {
                if (SECURITY_CODE === this.state.value) {
                    this.setState({loading:false, error:false})
                } else {
                    this.setState({loading:false, error: true})


                }
            }, 2500);
    
        }
    }
    
    render() {
         
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>
                <p>Por favor escriba el codigo de seguridad</p>
                {(this.state.error && !this.state.loading) && (
                    <p>Error: El codigo es incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input type="text" placeholder='Codigo de seguridad'
                value={this.state.value}
                onChange={(event)=> {
                    this.setState({value: event.target.value})
                }}/>
                {/* <button onClick={() => this.setState({error:!this.state.error })}>Comprobar</button> */}
                {/* <button onClick={() => this.setState(
                    prevState => ({error : !prevState.error})
                )}>Comprobar</button> */}
                <button onClick={() => this.setState(
                    () => ({loading : true})
                )}>Loading</button>
            </div>
        )
    }
}

export {ClassStateComponent};
