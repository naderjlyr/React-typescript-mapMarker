import { FaBuilding, FaBusinessTime, FaMinus } from "react-icons/fa";
import { JobData } from "../models/job.model";
import { Heading, Button } from "@textkernel/oneui";
import { useAppDispatch } from "../features/store";
import { jobActions } from "../features/slices/jobSlice";
import {  MouseEvent } from "react";
interface IProps {
  job: JobData;
}
const CardItem: React.FC<IProps> = ({ job }: IProps) => {
  const dispatch = useAppDispatch();
  const removeHandler = () => {
    dispatch(jobActions.onRemove(job.id));
  };

  const findPositionHandler = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>
  ) => {
    dispatch(jobActions.findPosition(job));
  };
  return (
    <>
      <div className="cm-card-item">
        <FaMinus
          data-testid="remove-button"
          color="#03002e"
          onClick={removeHandler}
          className="cm-remove-button"
        />
        <div className="card-body">
          <div className="company-name">
            <FaBuilding color="#03002e" />
            <Heading align="left" context="default" level="h5">
              {job ? `${job.organization_name}` : "company not found"}
            </Heading>
          </div>
          <div className="job-name">
            <FaBusinessTime color="#03002e" />
            <Heading align="left" context="default" level="h5">
              {job ? `${job.job_title}` : "job not found"}
            </Heading>
          </div>

          <div className="bottom">
            <Button
              context="neutral"
              disabled={false}
              isBlock={false}
              isInline={false}
              onClick={findPositionHandler}
              size="normal"
              type="submit"
            >
              Locate the Job
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
