import { JobData } from "../models/job.model";
import { Heading, Button, IconTextkernel } from "@textkernel/oneui";
import { useAppDispatch } from "../features/store";
import { jobActions } from "../features/slices/jobSlice";
interface IProps {
  job: JobData;
}
const CardItem: React.FC<IProps> = ({ job }: IProps) => {
  const dispatch = useAppDispatch();

  const removeHandler = () => {
    dispatch(jobActions.onRemove(job.id));
  };
  const findPositionHandler = () => {
    dispatch(jobActions.findPosition(job));
  };
  return (
    <>
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
            onClick={findPositionHandler}
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
            onClick={removeHandler}
            size="normal"
            type="submit"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardItem;
// export const MemoizedCard = memo(CardItem, (prevProps, nextProps) => {
//   return Object.is(prevProps, nextProps);
// });
