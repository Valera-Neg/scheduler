import React from "react"
import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react";
import Application from "components/Application";
import '../../__mocks__/axios';
import '@testing-library/jest-dom';
import axios from "axios";



afterEach(cleanup);

describe("Application", () => {


  it("defaults to Monday and changes the schedule when a new day is selected", async () => {

    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });



  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    //1.Render the Application.
    const { container, debug } = render(<Application />);

    //2.Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //3.Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    //4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //5.Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6.Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"))

    //7.Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    //8.Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    //9.Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();


    // console.log(debug(appointment))
    // console.log(prettyDOM(day));

  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deletind..." is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

    // 8. Check that the DayListItem with the text "Monday" also has the text " 2 spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    // debug();
    // console.log(prettyDOM(appointment));
  });




  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    // 1. Render the Application.
    const { container } = render(<Application />);
   
     // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
 
      // 3. Click the "Edite" button on the modefiy appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. change the name and save the interview.
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button 
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Wait until the element with the "Lydia Miller-Jones" button is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 7. Check that the DayListItem with the text "Monday" also has the text " no spots remaining".
    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  //console.log(prettyDOM(container))
  //console.log(prettyDOM(appointment))
  //console.log(prettyDOM(day))
   });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    //3.Click the "Add" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Add"));

    //4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    //5.Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    //6.Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"))

    //7.Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    //8.Wait until the element with the text "Could not save the changes" is displayed.
    await waitForElement(() => queryByText(appointment, "Could not save the changes"));
    expect(getByText(appointment, "Could not save the changes")).toBeInTheDocument()

    //9. Click the "Close" button on the Error component
    fireEvent.click(getByAltText(appointment, "Close"));

    //10. Back to create appointment form
    await waitForElement(() => getByText(container, "Archie Cohen"));
    expect(getByAltText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    // console.log(prettyDOM(appointment));
  });




  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();


    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you want to delete?")).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deletind..." is displayed.
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    //7. Wait until the element with the text "Could not save the changes" is displayed.
    await waitForElement(() => queryByText(appointment, "Could not cancel appointment."));
    expect(getByText(appointment, "Could not cancel appointment.")).toBeInTheDocument();

    //8. Click the "Close" button on the Error component
    fireEvent.click(getByAltText(appointment, "Close"));

    //9. Back to Show mode 
    await waitForElement(() => getByText(container, "Archie Cohen"));
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();


    // console.log(prettyDOM(appointment));
  })

});


