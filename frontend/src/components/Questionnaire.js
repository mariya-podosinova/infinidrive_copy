import React, { useState, useEffect, useCallback } from "react";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  ButtonGroup,
  ProgressBar,
} from "react-bootstrap";
import localQuestions from "../questions";
import Answer from "./Answer";
import NextButton from "./NextButton";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import { fetchQuestions } from "../api";
import useLoader from "../useLoader";
import SubmitButton from "./SubmitButton";

const isProd = process.env.NODE_ENV === "production";

const sortQuestions = (questions) => {
  return [...questions].sort((a, b) => a.id - b.id);
};

const Questionnaire = () => {
  // Index to questions array
  // See: https://trello.com/c/FPKNAbAm
  const [isLoading, questions] = useLoader(
    useCallback(async () => {
      const questions = await fetchQuestions();
      return sortQuestions(questions);
    }, []),
    localQuestions,
    isProd
  );

  const [questionIdx, setQuestionIdx] = useState(0);
  const [question, setQuestion] = useState(null);
  const [answersResults, setAnswersResults] = useState(
    new Array(questions.length)
  );

  const nextQuestion = () => {
    setQuestionIdx(questionIdx + 1);
  };

  const prevQuestion = () => {
    questionIdx > 0 && setQuestionIdx(questionIdx - 1);
  };

  const hasNextQuestion = () => questionIdx + 1 < questions.length;

  const hasPrevQuestion = () => questionIdx > 0;

  const currentQuestionAnswer = () => {
    // {speed:10}
    return answersResults[questionIdx]
      ? Object.values(answersResults[questionIdx])[0]
      : null;
  };

  // Sets our answer for current question [{ speed: 10 }]
  /*
  {
    id: "1",
    text: "Would you mind feeding your vehicle?",
    type: "BOOLEAN",
    category: "feed",
    answer: [
      { "label": true, "value": 10 },
      { "label": false, "value": 0 }
    ]
  },
  */
  const setCurrentQuestionAnswer = (answer) => {
    const newAnswersResults = answersResults.slice();
    let value = answer;
    if (question.type === "BOOLEAN") {
      value = question.answer.find(
        (answerLabel) => answerLabel["label"] === answer
      )["value"];
    }

    newAnswersResults[questionIdx] = { [question.category]: value };
    setAnswersResults(newAnswersResults);
  };

  useEffect(() => {
    const currentQuestion = questions[questionIdx];
    currentQuestion && setQuestion(currentQuestion);
  }, [questionIdx, questions]);

  return isLoading ? (
    <Loading />
  ) : (
    <Container className="questionnaire animate__animated animate__bounceIn">
      <p className="progress-value font-weight-bold">
        {`${questionIdx + 1}/${questions.length}`}
      </p>
      <ProgressBar
        now={`${questionIdx + 1}0`}
        variant="warning"
        className="m-2"
      />
      <Card className="text-center border-warning mb-3">
        <Card.Img
          src={`../images/1${questionIdx}.JPG`}
          alt="space"
          className="card-image"
        />
        <Card.ImgOverlay>
          <Card.Body className="question-body">
            {question && (
              <>
                <Card.Title className="question-text">
                  {question.text}
                </Card.Title>
                <Answer
                  type={question.type}
                  answer={question.answer}
                  nextQuestion={nextQuestion}
                  currentQuestionAnswer={currentQuestionAnswer()}
                  setCurrentQuestionAnswer={setCurrentQuestionAnswer}
                />
              </>
            )}
          </Card.Body>
        </Card.ImgOverlay>
        <Card.Footer className="text-muted">
          {hasNextQuestion() ? (
            hasPrevQuestion() ? (
              <Row>
                <Col>
                  <ButtonGroup>
                    <Button
                      className="p-2 mx-2 rounded border border-warning"
                      variant="secondary"
                      onMouseUp={() => prevQuestion()}
                    >
                      Back
                    </Button>

                    <NextButton
                      nextQuestion={nextQuestion}
                      questionAnswer={currentQuestionAnswer}
                    />
                  </ButtonGroup>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col>
                  <NextButton
                    nextQuestion={nextQuestion}
                    questionAnswer={currentQuestionAnswer}
                  />
                </Col>
              </Row>
            )
          ) : (
            <Row>
              <Col>
                <ButtonGroup>
                  <Button
                    variant="secondary"
                    className="p-2 mx-2 rounded border border-warning"
                    onMouseUp={() => prevQuestion()}
                  >
                    Back
                  </Button>

                  <SubmitButton
                    answersResults={answersResults}
                    questionAnswer={currentQuestionAnswer}
                  />

                  {/* <Link
                    type="button"
                    className="btn btn-warning p-2 mx-2 rounded border border-warning"
                    //to="/result"
                    to={{
                      pathname: "/result",
                      state: {
                        rawAnswers: answersResults,
                      },
                    }}
                    disabled = {disable}
                  >
                    Submit
                  </Link> */}
                </ButtonGroup>
              </Col>
            </Row>
          )}
        </Card.Footer>
      </Card>
      {process.env.NODE_ENV !== "production" && (
        <Link
          type="button"
          className="btn btn-warning p-2 mx-2 rounded border border-warning"
          //to="/result"
          to={{
            pathname: "/result",
            state: {
              rawAnswers: [
                { feed: 0 },
                { ecofriendly: 0 },
                { wheels: 0 },
                { sentient: 0 },
                { destroy: 0 },
                { speed: 5 },
                { price: 5 },
                { real: 5 },
                { smartness: 5 },
                { daredevil: 5 },
              ],
            },
          }}
          //rawAnswers={answersResults}
        >
          Skip!
        </Link>
      )}
    </Container>
  );
};

export default Questionnaire;
