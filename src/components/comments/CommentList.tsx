import CommentItem from './CommentItem';

export type CommentListProps = {
  comments: any;
  onRemove: any;
  isMine: boolean;
  currentId: string;
};

function CommentList({ comments, onRemove, isMine, currentId }: CommentListProps) {
  const numDescending = [...comments].sort((a, b) => b.upvotes - a.upvotes);

  return (
    <>
      {comments &&
        [...comments]
          .sort((a, b) => b.upvotes - a.upvotes)
          ?.map(comment => (
            <CommentItem
              comment={comment}
              key={comment.id}
              ownComment={currentId}
              onRemove={onRemove}
              isMine={isMine}
            />
          ))}
    </>
  );
}

export default CommentList;