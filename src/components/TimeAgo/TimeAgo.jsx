import {formatDistanceToNow} from 'date-fns'

const TimeAgo = ({ dateString }) => {
    if (dateString) {
         const timeAgo = formatDistanceToNow(new Date(dateString), {
           addSuffix: true,
         });
         return <span>{timeAgo}</span>;
    }
   
};

export default TimeAgo;