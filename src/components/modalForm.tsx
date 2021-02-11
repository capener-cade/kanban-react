import React, {useState, useEffect} from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'


function ModalForm(props: any) {
    const [show, setShow] = useState(false);
    const [titleValue, setTitleValue] = useState('')

    const handleClose = () => {setShow(false)};
    const handleShow = () => setShow(true);

    const addCard = async () => {
        const newCard = {
                "boardId":1,
                "column": props.column,
                "title": titleValue
        }
        await axios.post('http://localhost:3001/api/board/1/cards', newCard)
        await props.refreshBoard(1);
        handleClose()
    }

    return (
        <>
      <Button variant="primary" size="sm" onClick={handleShow}>
       Add A Card
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicPassword">
               <Form.Label>Title</Form.Label>
               <Form.Control type="title" placeholder="Title" value={titleValue}  onChange={e => setTitleValue(e.target.value)}/>
             </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addCard}>
            Add Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default ModalForm;