import { Button } from "react-bootstrap";

const AnswerButton = (props) => {
  const answer = props.truthValue ? "Yes" : "No";

  return (
    <Button
      variant="outline-warning"
      active={props.currentQuestionAnswer === props.truthValue}
      className="m-2"
      block
      onMouseUp={() => {
        props.setCurrentQuestionAnswer(props.answerValue);
      }}
    >
      {answer}
    </Button>
  );
};

export default AnswerButton;
