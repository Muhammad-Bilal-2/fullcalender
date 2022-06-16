import React from "react";
import { Col, Modal, Row } from "react-bootstrap";

export const EventModal = (props) => {
  console.log("porps", props);

  return (
    <Modal
      animation={false}
      show={props.show}
      onHide={() => {
        props.event.revert();
        props.onHide(false);
      }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="justify-content-center">
        <Modal.Title id="contained-modal-title-vcenter">event</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col>
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  <tr>
                    <td>ID</td>
                    <td>
                      <strong>{props.event.event._def.publicId}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Title</td>
                    <td>
                      <strong>{props.event.event._def.title}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Start Time</td>
                    <td>
                      <strong>
                        {props.event.event._instance.range.start.toString()}
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        onClick={() => {
                          props.event.revert();
                          props.onHide(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          props.onHide(false);
                        }}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};
