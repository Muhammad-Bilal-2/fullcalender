import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { resources } from "./records/resources";
import { events } from "./records/events";
import Modal from "./modal";
import { Col, Row } from "react-bootstrap";
import Alert from "sweetalert2";
import "./style.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.css";
import { EventModal } from "./EventModal";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

function App() {
  const [tableState, setTableState] = useState(events);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState();
  const dateRef = useRef();
  const addEvent = (e) => {
    const newEvent = {
      id: tableState.length + 1,
      title: e.target.title.value,
      start: e.target.startdate.value + ":00+00:00",
      end: e.target.enddate.value + ":00+00:00",
      resourceId: "d",
      // resourceEditable: false, to Preventing shifting between resources
    };
    setTableState((prev) => {
      console.log(...prev);
      console.log();
      console.log(newEvent);

      return [...prev, newEvent];
    });

    e.preventDefault();
  };
  const handleDateClick = (arg) => {
    console.log("Arg", arg.dateStr);
  };

  const saveRecord = (record) => {
    var today = new Date(record);
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();
    // today = yyyy + "-" + mm + "-" + dd;
    console.log(today, "today");

    dateRef.current = { today };

    setShow(true);
  };
  const injectwithButton = (args) => {
    return (
      <div>
        <button onClick={() => saveRecord(args.date)}>
          {args.dayNumberText}
        </button>
      </div>
    );
  };
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      minDistance: 5,
      eventData: function (eventEl) {
        console.log("drag element ", eventEl);
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
        };
      },
    });
  }, []);

  const eventClicked = (event) => {
    console.log("event", event);
    Alert.fire({
      title: event.event.title,
      html:
        `<div class="table-responsive">
      <table class="table">
      <tbody>
      <tr >
      <td>Title</td>
      <td><strong>` +
        event.event.title +
        `</strong></td>
      </tr>
      <tr >
      <td>Start Time</td>
      <td><strong>
      ` +
        event.event.start +
        `
      </strong></td>
      </tr>
      </tbody>
      </table>
      </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.value) {
        let start =
          "Thu Jun 16 2022 16:30:00 GMT+0500 (Pakistan Standard Time)";
        console.log("ll", event.event._instance.range);
        event.event._instance.range.start = start;

        event.event._instance.range.end =
          "Thu Jun 16 2022 17:30:00 GMT+0500 (Pakistan Standard Time)";
        event.el.style.borderColor = "red";
        console.log(typeof event.event._instance.range.start);
        console.log("ll", event.event._instance.range);
        // event.event.remove(); // It will remove event from the calendar
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };
  return (
    <div className="animated fadeIn p-4 demo-app">
      <Row>
        <Col lg={3} sm={3} md={3}>
          <div
            id="external-events"
            style={{
              padding: "10px",
              width: "20%",
              height: "auto",
            }}
          >
            <p align="center">
              <strong> Events</strong>
            </p>
            {events.map((event, index) => (
              <div
                className="fc-event"
                title={event.title}
                data={event.id}
                key={index}
              >
                {event.title}
              </div>
            ))}
          </div>
        </Col>

        <Col lg={9} sm={9} md={9}>
          <Modal
            show={show}
            onClose={() => setShow(false)}
            addEvent={addEvent}
            selectedDate={dateRef}
          />
          {showModal && (
            <EventModal
              show={showModal}
              onHide={() => setShowModal(false)}
              event={eventData}
            />
          )}
          ;
          <div className="demo-app-calendar" id="mycalendartest">
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                resourceTimelinePlugin,
              ]}
              initialView="resourceTimeline"
              headerToolbar={{
                left: "today,prev,next",
                center: "title",
                right:
                  "new dayGridMonth,timeGridWeek,timeGridDay,resourceTimeline",
              }}
              customButtons={{
                new: {
                  text: "add new event",
                  click: (e) => setShow(true),
                },
              }}
              eventColor="grey"
              nowIndicator={true}
              events={tableState}
              resources={resources}
              dateClick={handleDateClick}
              eventClick={eventClicked}
              editable={true}
              eventDragStart={(drag) => console.log("drag start ", drag)}
              eventDrop={(drop) => {
                // console.log("drop", drop.oldEvent._instance.range);
                // console.log("drop", drop.oldEvent._def.publicId);
                // console.log("drop event", drop.revert());
                setShowModal(true);
                setEventData(drop);
              }}
              eventResizableFromStart={true}
              eventResize={(resize) => console.log("resize", resize)}
              dayCellContent={injectwithButton}
              // eventMouseEnter={(info) => {
              //   console.log("enter", info);
              //   // setShow(true);
              // }}
              // eventMouseLeave={(e) => {
              //   console.log("leave", e);
              //   // if(show)
              //   // setShow(false);
              // }}
              schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
              droppable={true}
              eventReceive={(receive) => {
                console.log("receive", receive);
                setShowModal(true);
                setEventData(receive);
                // console.log("receive", e.event._instance.range);
                // e.event.remove();
              }}
              // drop={(drop) => {
              //   // setShowModal(true);
              //   console.log("external drop", drop);
              // }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
