import React from "react";
import { render, screen } from "@testing-library/react";
import CardItem from "../../components/CardItem";
import { JobData } from "../../models/job.model";

const dummyData: JobData = {
  id: 123,
  job_title: "an example job title",
  organization_name: "an example organization name",
  location_coordinates: [18.858093, 2.4294694],
};

describe("Card Item Component", () => {
  test("should render job data correctly", () => {
    render(<CardItem job={dummyData} />);
    expect(screen.getByText(dummyData.job_title)).toBeInTheDocument();
    expect(screen.getByText(dummyData.organization_name)).toBeInTheDocument();
  });
  test("should have a button to find the job in the map", () => {
    render(<CardItem job={dummyData} />);
    expect(screen.getByText("Locate the Job")).toBeInTheDocument();
  });
});
