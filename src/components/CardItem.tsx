import React, { memo, useState } from "react";
import { TJobData } from "../types/interfaces";
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
        <IconTextkernel context="brand" size={48} title="Textkernel" />
        <div className="company-name">
          <Heading align="left" context="default" level="h4">
            company name
          </Heading>
        </div>
        <div className="job-name">
          <Heading align="left" context="default" level="h4">
            Job Title
          </Heading>
        </div>
      </div>
      <div className="right-content">
        <StepperButton
          disabled={false}
          icon="minus"
          onClick={function noRefCheck() {}}
        />
      </div>
      <div className="bottom">
        <Button
          context="brand"
          disabled={false}
          isBlock={false}
          isInline={false}
          onClick={function noRefCheck() {}}
          size="normal"
          type="submit"
        >
          Locate the Job
        </Button>
      </div>
    </div>
  );
};

export default CardItem;
export const MemoizedCard = memo(CardItem, (prevProps, nextProps) => {
  return Object.is(prevProps, nextProps);
});
