import React from "react";
import { render, screen, RenderResult } from "@testing-library/react";
import CardItem from "../../components/CardItem";
import { JobData } from "../../models/job.model";
import { Provider } from "react-redux";
import store from "../../features/store";
const dummyData: JobData = {
  id: 123,
  job_title: "an example job title",
  organization_name: "an example organization name",
  location_coordinates: ["18.858093", "2.4294694"],
};
const renderCardItem = (): RenderResult =>
  render(
    <Provider store={store}>
      <CardItem job={dummyData} />
    </Provider>
  );
describe("Card Item Component", () => {
  test("should render job data correctly", () => {
    const { asFragment } = renderCardItem();
    expect(asFragment()).toMatchSnapshot();

    //Checking for company name and job title present in the snapshot provided.
    expect(screen.getByText(dummyData.job_title)).toBeInTheDocument();
    expect(screen.getByText(dummyData.organization_name)).toBeInTheDocument();

    //Checking for two buttons for the card appearing in the snapshot
    expect(screen.getByText(/Locate the Job/i)).toBeInTheDocument();
    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
  });
});
