import { Container, Row, Col, ButtonGroup, Form } from "react-bootstrap";
import AnswerButton from "./AnswerButton";

const Answer = (props) => {
  if (props.type === "BOOLEAN") {
    return (
      <Row>
        <Col>
          <ButtonGroup className="d-flex justify-content-center align-items-end px-1 question-text">
            <AnswerButton
              truthValue={25}
              answerValue={true}
              currentQuestionAnswer={props.currentQuestionAnswer}
              setCurrentQuestionAnswer={props.setCurrentQuestionAnswer}
            />
            <AnswerButton
              truthValue={0}
              answerValue={false}
              currentQuestionAnswer={props.currentQuestionAnswer}
              setCurrentQuestionAnswer={props.setCurrentQuestionAnswer}
            />
          </ButtonGroup>
        </Col>
      </Row>
    );
  } else {
    return (
      <Container>
        <Form className="mx-0 my-auto question-text">
          <Form.Group controlId="formBasicRange">
            <Form.Label>
              <h5 className="border border-warning rounded-circle px-4 py-3 ">
                {props.currentQuestionAnswer
                  ? props.currentQuestionAnswer
                  : props.answer.min}
              </h5>
            </Form.Label>
            <Row>
              <Form.Control
                type="range"
                max={props.answer.max}
                min={props.answer.min}
                value={
                  props.currentQuestionAnswer
                    ? props.currentQuestionAnswer
                    : props.answer.min
                }
                onChange={(event) =>
                  props.setCurrentQuestionAnswer(event.target.value)
                }
                custom
                className="formRange"
              />
            </Row>
          </Form.Group>
        </Form>
      </Container>
    );
  }
};

export default Answer;
