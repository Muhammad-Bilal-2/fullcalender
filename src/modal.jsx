import React from "react";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className="modallll" style={{ zIndex: 10000 }}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Modal title</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={(data) => props.addEvent(data)}>
            <label>Event Name:</label>{" "}
            <input
              type="text"
              placeholder="enter event name"
              name="title"
            ></input>
            <br />
            <label>Start Date : </label>
            <input
              type="datetime-local"
              name="startdate"
              //   defaultValue={
              //     props.selectedDate.current && props.selectedDate.current.today
              //   }
            ></input>
            <br />
            <label>End Date : </label>
            <input type="datetime-local" name="enddate"></input>
            <br />
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>
            Close{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
