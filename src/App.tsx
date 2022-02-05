import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        // const moveCard: any = boardCopy.find((toDo) => {
        //   return toDo.id === Number(draggableId);
        // });
        // 1) Delete Item on source.index
        boardCopy.splice(source.index, 1);
        // 2) Put back the item on the destination.index
        boardCopy.splice(destination.index, 0, taskObj);

        console.log(boardCopy);
        return { ...allBoards, [source.droppableId]: boardCopy };
      });
    }
    if (source.droppableId !== destination.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        // 1. source의 droppableId에 해당하는 index를 지운다.
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];
        // 인덱스로 선택한 card 정보 가져오기
        const taskObj = sourceBoard[source.index];
        // 아이디로 선택한 card 정보 가져오기
        /* const moveCard: any = sourceBoard.find((toDo) => {
          return toDo.id === Number(draggableId);
        }); */
        sourceBoard.splice(source.index, 1);

        destinationBoard.splice(destination.index, 0, taskObj);
        // 2. destination droppableId에 index에 붙여넣는다
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
