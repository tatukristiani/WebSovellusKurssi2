import React, {useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import Node from './Node'
import axios from "axios";

const List = () => {
    const [nodes, setNodes] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/nodes')
            .then(response => {
                setNodes(response.data)
            })
    }, [])

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