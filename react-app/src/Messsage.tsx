let count = 0;

function Message() {
    count++;
    console.log('Messsage called', count);
    return <div>Message {count}</div>
}

export default Message;
