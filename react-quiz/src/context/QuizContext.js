import { createContext, useReducer, useContext, useEffect } from 'react';

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFailed':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case 'newAnswer':
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };

    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case 'finish':
      const newHighscore =
        state.points > state.highscore ? state.points : state.highscore;

      return {
        ...state,
        status: 'finished',
        highscore: newHighscore,
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    default:
      throw new Error('Unknown action type');
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  useEffect(function () {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }

  return context;
}

export { QuizProvider, useQuiz };
