import React from 'react';
import { render } from 'react-dom';

interface DetailsProps {
    name: string;
}

const Details: React.FC<DetailsProps> = (props) => {
    const { name } = props;
    const style: React.CSSProperties = { border: '1px solid blue', borderRadius: '5px', padding: '1rem', textAlign: 'center' };
    return (
        <div style={ style }>
            <h2>{ name }</h2>
        </div>
    )
}

render(<Details name="React with Typescript" />, document.getElementById('app-ts'))
