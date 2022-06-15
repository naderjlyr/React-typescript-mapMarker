import { ContentPlaceholder } from "@textkernel/oneui";
import React from "react";
import { useSelector } from "react-redux";
import { selectJobsStatus } from "../features/store";
import { FetchStatus } from "../models/job.model";
const ContentPlaceHolder: React.FC = () => {
  const jobStatus = useSelector(selectJobsStatus);
  return (
    <>
      {jobStatus === FetchStatus.LOADING && (
        <>
          <ContentPlaceholder
            duration={1}
            height={undefined}
            width={100}
            withoutMargin={false}
          />
          <ContentPlaceholder
            duration={1}
            height={undefined}
            width={55}
            withoutMargin={false}
          />
          <ContentPlaceholder
            duration={1}
            height={undefined}
            width={65}
            withoutMargin
          />
        </>
      )}
    </>
  );
};

export default ContentPlaceHolder;
