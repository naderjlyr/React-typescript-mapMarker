import { ContentPlaceholder } from "@textkernel/oneui";
import React from "react";
import { FetchStatus } from "../models/job.model";
type Props = {
  fetchState: string;
};

const ContentPlaceHolder: React.FC<Props> = ({ fetchState }: Props) => {
  return (
    <>
      {fetchState === FetchStatus.LOADING && (
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
