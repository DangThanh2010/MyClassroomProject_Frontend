import {DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

import Assignment from './assignment';
function ListAssignment() {
  const data = [{
    id: "1",
    name: "one",
    points: "1"
  },{
    id:"2",
    name: "two",
    points: "2"
  },{
    id: "3",
    name: "three",
    points: "0.5"
  },{
    id: "4",
    name: "four",
    points: "2.5"
  },{
    id: "5",
    name: "five",
    points: "3"
  }];
  const [list, setList] = useState(data);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onEnd = (result) => {
    setList(reorder(list, result.source.index, result.destination.index));
  };
  return (
        <DragDropContext onDragEnd= {onEnd}>
            <Droppable
            droppableId = "12345678"
            >
              {(provided, snapshot) => (
                <div
                style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                ref = {provided.innerRef}
                >
                  {list.map((item, index) => (
                    <Draggable
                    draggableId = {(item.id)}
                    key = {item.id}
                    index = {index}
                    >
                      {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                            <Assignment item={item}>

                            </Assignment>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
        </DragDropContext>
  );
}

export default ListAssignment;
