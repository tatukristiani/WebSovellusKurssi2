import React from 'react'

const Node = ({node}) => {
    return (
        <tr>
            <td>
                <p>{node.id}</p>
            </td>
            <td>
                <p>{node.content}</p>
            </td>
        </tr>
    )
}

export default Node