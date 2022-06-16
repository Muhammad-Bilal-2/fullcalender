import React from "react";

export const AlertBox = (props) => {
  return (
    <div class="table-responsive">
      <table class="table">
        <tbody>
          <tr>
            <td>Title</td>
            <td>
              <strong>{props.event.event.title}</strong>
            </td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td>
              <strong>{props.event.event.start}</strong>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
