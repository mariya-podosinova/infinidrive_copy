import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubmitButton = (props) => {
  const disable = props.questionAnswer() === null ? true : false;
  return (
    <>
      <Link
        to={{
          pathname: "/result",
          state: {
            rawAnswers: props.answersResults,
          },
        }}
      >
        <Button
          variant="warning"
          className="p-2 mx-2 rounded border border-warning"
          disabled={disable}
        >
          Submit
        </Button>
      </Link>
    </>
  );
};

export default SubmitButton;
