import React from "react";
import { Table } from 'react-bootstrap'
import Node from './Node'

const List = ({nodes}) => {
    return(
        <div className="container">
            {/* A JSX comment */}

            {/* <div>
                <p>Valinta 2.</p>
            </div>
            */}
            <Table striped>
            <tbody>
                {nodes.map(node =>
                <Node
                key={node.id}
                node={node}/>
                )}
            </tbody>
            </Table>

        </div>
    )
}

export default List