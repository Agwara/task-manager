// src/components/DraggableTaskItem/DraggableTaskItem.tsx

import React, { useRef } from 'react';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import { Identifier, XYCoord } from 'dnd-core';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../types/Task';
import styles from './styles.module.css';

interface DraggableTaskItemProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const DraggableTaskItem: React.FC<DraggableTaskItemProps> = ({
  task,
  index,
  moveTask,
  onClick,
  onEdit,
  onDelete
}) => {
  const ref = useRef<HTMLLIElement>(null);

  // Configure drop target
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'TASK',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only move when the mouse has crossed half of the item's height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to perform the move
      moveTask(dragIndex, hoverIndex);
      // Mutate the dragged item index for performance.
      item.index = hoverIndex;
    }
  });

  // Configure drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: () => {
      return { id: task.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Connect drag and drop refs
  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={isDragging ? styles.draggableItemActive : styles.draggableItem}
      data-handler-id={handlerId}
    >
      <TaskItem
        task={task}
        onClick={onClick}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </li>
  );
};

export default DraggableTaskItem;
