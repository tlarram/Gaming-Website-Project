import React from 'react'
import {Card} from "react-bootstrap"

const StoreItem = () => {
  return (
    <Card>
    <Card.Img
        variant="top"
        // src= 
        height="200px"
        style={{objectFit:"cover"}}/>
        <Card.Body clasName="d-flex flex-column">
            <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
                <span className="fs-2">name</span>
                <span className="ms-2 text muted">price</span>
            </Card.Title>
        </Card.Body>
    </Card>
  )
}

export default StoreItem