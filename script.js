document.addEventListener('DOMContentLoaded',(e)=>{
    const submitBtn  = document.querySelector('#submitComment');
    const commentTxt  = document.querySelector('#commentInput');
    const commentContainer  = document.querySelector('#commentsContainer');

    //#region EVENT LISTENERS
    submitBtn.addEventListener('click',()=>{
        comment = commentTxt.value;
        if(comment){
            addComment(comment);

            commentTxt.value="";
        }
    });

    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;

        if(currElement.classList.contains('replyBtn')){
            const parentEle = currElement.parentElement;
            const replyComment = parentEle.querySelector('.replyInput');
             const nestedContainers = parentEle.querySelectorAll('.repliesContainer');

                comment = replyComment.value;
                if(comment){
                    replyComments(parentEle,comment,nestedContainers.length);
                    replyComment.value="";
                }
        }
    });

    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;
        
        if(currElement.classList.contains('deletebtn')){
            const parentEle = currElement.parentElement;
            let nestedContainers = parentEle.querySelectorAll('.repliesContainer'); 
            let count=nestedContainers.length;
            removeComment(parentEle,count);
        }
    });
    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
    
        if (currElement.classList.contains('toggleRepliesBtn')) {
            const parentEle = currElement.parentElement; 
            showReplies(parentEle); 
        }
    });
    

    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;

        if(currElement.classList.contains('likeBtn')){
            let count=parseInt(currElement.nextElementSibling.textContent);

            likefunc(currElement,count);
        }
    });

    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;

        if(currElement.classList.contains('dislikeBtn')){
            let count=parseInt(currElement.nextElementSibling.textContent);

            dislikefunc(currElement,count);
        }
    });

//#endregion

    //#region FUNCTIONS
    function showReplies(parentEle) {
        const nestedContainers = parentEle.querySelectorAll('.repliesContainer');
        const toggleBtn = parentEle.querySelector('.toggleRepliesBtn'); 
    
        // Check if any nested containers are currently visible
        const anyVisible = Array.from(nestedContainers).some(nestedContainer => 
            nestedContainer.style.display === 'block');
    
        nestedContainers.forEach(nestedContainer => {
            // Toggle the display of the specific nested container
            if (anyVisible) {
                nestedContainer.style.display = 'none'; // Collapse
            } else {
                nestedContainer.style.display = 'block'; // Expand
            }
        });
    
        // Update the toggle button text based on visibility state
        toggleBtn.textContent = anyVisible ? 'Show Replies' : 'Hide Replies';
    }      

    function likefunc(currElement,count){

        let isLiked =true;

        if(isLiked){
            count++;
            const likec = currElement.parentElement.querySelector(".likeCount");
            likec.textContent=`${count} Likes`;
        }

        else{
            count--;
            const likec = currElement.parentElement.querySelector(".likeCount");
            likec.textContent=count;
        }

        isLiked!=isLiked;
    }

    function dislikefunc(currElement,count){

        let isDisLiked =true;

        if(isDisLiked){
            count++;
            const likec = currElement.parentElement.querySelector(".dislikeCount");
            likec.textContent=`${count} DisLikes`;
        }

        else{
            count--;
            const likec = currElement.parentElement.querySelector(".likeCount");
            likec.textContent=`${count} DisLikes`;
        }

        isDisLiked!=isDisLiked;
    }

    function removeComment(comment,commentsCount){
        let count =comment.parentElement.querySelector(".commentsCount").textContent;
        count--;
        comment.remove();
        comment.parentElement.querySelector(".commentsCount").textContent = `comments ${count}`;
    }
    
    function addComment(comment){
        const commentElement=document.createElement('div');
        commentElement.classList.add('repliesContainer');

        commentElement.innerHTML = `        
                                    <div class="repliedcomments">
                                    <p>${comment}    </p>
                                        <button class="likeBtn">👍</button>
                                        <span class="likeCount">0 Likes</span>    
                                        <button class="dislikeBtn">👎</button> 
                                        <span class="dislikeCount">0 DisLikes</span>
                                    </div>

                                    <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                                    <button class="deletebtn">Delete</button>
                                    <button class="toggleRepliesBtn">Hide Replies</button> <!-- Toggle button -->
                                    <button class="commentsCount">comments</button>
                                    <button class="replyBtn">Reply</button>

                                 `;

        commentContainer.appendChild(commentElement);
    }

    function replyComments(parentElement,comment,commentsCount){
        const commentElement=document.createElement('div');
        commentElement.classList.add('repliesContainer');

        commentElement.innerHTML = `        
                                    <div class="repliedcomments">
                                    <p>${comment}    </p>
                                        <button class="likeBtn">👍</button>
                                        <span class="likeCount">0 Likes</span>    
                                        <button class="dislikeBtn">👎</button> 
                                        <span class="dislikeCount">0 DisLikes</span>
                                    </div>
                                

                                    <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                                    <button class="deletebtn">Delete</button>
                                    <button class="toggleRepliesBtn">Hide Replies</button> <!-- Toggle button -->
                                    <button class="commentsCount">comments</button>
                                    <button class="replyBtn">Reply</button>
                                 `;

        parentElement.appendChild(commentElement);

        parentElement.querySelector(".commentsCount").textContent = `comments ${commentsCount}`;
    }
    //#endregion
})