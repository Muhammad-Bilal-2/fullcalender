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
import "./style.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "bootstrap/dist/css/bootstrap.css";

import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

function App() {
  const [tableState, setTableState] = useState(events);
  const [show, setShow] = useState(false);
  const dateRef = useRef();
  const addEvent = (e) => {
    const newEvent = {
      id: tableState.length + 1,
      title: e.target.title.value,
      start: e.target.startdate.value + ":00+00:00",
      end: e.target.enddate.value + ":00+00:00",
      resourceId: "d",
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
    console.log("n");
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function (eventEl) {
        let title = eventEl.getAttribute("title");
        let id = eventEl.getAttribute("data");
        return {
          title: title,
          id: id,
        };
      },
    });
  }, []);

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
              eventClick={(e) => console.log(e.event.id)}
              editable={true}
              eventDragStart={(e) => console.log("ee", e)}
              eventDrop={(drop) => {
                console.log("drop", drop.oldEvent._instance.range);
                console.log("drop", drop.oldEvent._def.publicId);
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
              // eventReceive={(e) => {
              //   console.log("receive", e);
              //   console.log("receive", e.event._instance.range);
              // }}
              drop={(drop) => console.log("drop", drop)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
