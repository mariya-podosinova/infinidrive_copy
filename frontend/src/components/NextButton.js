import { Button } from "react-bootstrap";

const NextButton = (props) => {
    const disable = props.questionAnswer() === null ? true : false;

    return (
        <Button
        variant="secondary"
        className="p-2 mx-2 rounded border border-warning"
        onMouseUp={() => {
          props.nextQuestion();
        }}
        disabled = {disable}
      >
        Next
      </Button>
    )
}

export default NextButton
