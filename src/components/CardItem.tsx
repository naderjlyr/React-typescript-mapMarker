import React, { memo, useState } from "react";
import { TJobData } from "../types/data-models";
import {
  Heading,
  Button,
  IconTextkernel,
  StepperButton,
} from "@textkernel/oneui";
interface Props {
  job: TJobData;
  onSelect: (job: TJobData) => void;
  onRemove: (job: TJobData) => void;
}

const CardItem = ({ job, onSelect, onRemove }: Props) => {
  return (
    <div className="cm-card-item">
      <div className="left-content">
        <IconTextkernel context="primary" size={48} title="Textkernel" />
        <div className="company-name">
          <Heading align="left" context="default" level="h4">
            {job.organization_name}
          </Heading>
        </div>
        <div className="job-name">
          <Heading align="left" context="default" level="h4">
            {job.job_title}
          </Heading>
        </div>
      </div>
      <div className="bottom">
        <Button
          context="primary"
          disabled={false}
          isBlock={false}
          isInline={false}
          onClick={() => onSelect(job)}
          size="normal"
          type="submit"
        >
          Locate the Job
        </Button>
        <Button
          context="bad"
          disabled={false}
          isBlock={false}
          isInline={false}
          onClick={() => onRemove(job)}
          size="normal"
          type="submit"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
export const MemoizedCard = memo(CardItem, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
