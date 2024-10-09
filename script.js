const commentFormEle = document.querySelector('#commentForm');
const commentInputEle = document.querySelector('#commentInput');
const submitCommentEle = document.querySelector('#submitComment');
const body = document.querySelector('body');
const commentsContainer = document.querySelector('#commentsContainer');
const textAreaEle = document.querySelector('#commentInput');


submitCommentEle.addEventListener('click', () => {

    if(textAreaEle.value){
            const repliesContainer = document.createElement('div');
            repliesContainer.id='commentsContainer';

            const repliesEle =`        <div class="repliesContainermain">repliesContainermain
                                        <p>${textAreaEle.value}</p>
                                        <button id ="replyBtn_1" class="replyBtn">Reply</button>
                                        <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                                        <div id="deletebtn">
                                                <button class="delete">delete</button>
                                        </div>
                                        
                                    </div>`

            repliesContainer.innerHTML=repliesEle;
            body.appendChild(repliesContainer);
    }
});

document.addEventListener('click', (event) => {

    if (event.target.className === 'delete') {
        event.target.parentElement.parentElement.remove();
    }
});


document.addEventListener('click', (event) => {
    
    console.log(event)

    const container = document.querySelector('.repliesContainermain');
    const repliesContainer = document.createElement('div');

    if (event.target.id === 'replyBtn_1') {
        const repliesEle =`<div class="nestedrepliesContainer">nestedrepliesContainer
                                <p>Some sample reply1...</p>
                                <button id="replyBtn_2" class="replyBtn">Reply</button>
                                <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                           </div>`

        repliesContainer.innerHTML=repliesEle;
        container.appendChild(repliesContainer);
}
});

