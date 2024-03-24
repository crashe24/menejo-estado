import React from 'react'

class Loading extends React.Component {
    componentWillUnmount() {
        console.log('componentWillUn')
    }
    render() {
        return (
            <p>Loading</p>
        )
    }
}
export {Loading}