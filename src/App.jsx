import "./App.css";
import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import timeGridPlugin from "@fullcalendar/timegrid";
import { resources } from "./records/resources";
import { events } from "./records/events";
import Modal from "./modal";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

function App() {
  const [tableState, setTableState] = useState(events);
  const [show, setShow] = useState(false);
  const dateRef = useRef();
  const addEvent = (e) => {
    const newEvent = {
      id: tableState.length + 1,
      title: e.target.title.value,
      start: e.target.startdate.value,
      end: e.target.enddate.value,
    };
    setTableState((prev) => [...prev, newEvent]);
    e.preventDefault();
  };
  const handleDateClick = (arg) => {
    console.log("Arg", arg.dateStr);
  };

  const saveRecord = (record) => {
    var today = new Date(record);
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
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
  return (
    <>
      <>
        <button onClick={() => setShow(true)}>Show Modal</button>
        <Modal
          show={show}
          onClose={() => setShow(false)}
          addEvent={addEvent}
          selectedDate={dateRef}
        />
      </>

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
          right: "new dayGridMonth,timeGridWeek,timeGridDay,resourceTimeline",
        }}
        customButtons={{
          new: {
            text: "add new event",
            click: (e) => console.log(e),
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
      />
    </>
  );
}

export default App;
