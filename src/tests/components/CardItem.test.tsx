import React from "react";
import { render, screen } from "@testing-library/react";
import CardItem from "../../components/CardItem";
import { TJobData } from "../../types/data-models";

const dummyData: TJobData = {
  id: 123,
  job_title: "an example job title",
  organization_name: "an example organization name",
  location_coordinates: [18.858093, 2.4294694],
};

describe("Card Item Component", () => {
  it("should render job data correctly", () => {
    const { getByText } = render(
      <CardItem job={dummyData} onSelect={() => {}} onRemove={() => {}} />
    );

    expect(screen.getByText(dummyData.job_title)).toBeInTheDocument();
    expect(screen.getByText(dummyData.organization_name)).toBeInTheDocument();
  });

  it("should have a button to find the job in the map", () => {
    const { getByText } = render(
      <CardItem job={dummyData} onSelect={() => {}} onRemove={() => {}} />
    );

    expect(screen.getByText("Locate the Job")).toBeInTheDocument();
  });
});
