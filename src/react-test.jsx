import React from 'react';
import { render } from 'react-dom';

const App = () => {
    const style = { border: '1px solid red', borderRadius: '5px', padding: '1rem', textAlign: 'center' };
    return (
        <div style={ style }>
            <h2>React</h2>
        </div>
    )
}

render(<App />, document.getElementById('app'))
