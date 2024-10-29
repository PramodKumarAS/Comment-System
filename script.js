document.addEventListener('DOMContentLoaded',(e)=>{

    const commentContainer  = document.querySelector('#commentsContainer');
    const submitBtn  = document.querySelector('#submitComment');
    const commentTxt  = document.querySelector('#commentInput');
   
    //#region EVENT LISTENERS

    //EVENT 1:When User Mouse over on Comment button change the Comment button visibiliy(cursor,backgroundcolor,opacity)
    submitBtn.addEventListener('mouseover', () => {
        submitBtn.style.cursor = commentTxt.value ? "pointer" : "not-allowed";
        submitBtn.style.backgroundColor  = commentTxt.value ? "rgb(80, 210, 37)":"";
        submitBtn.style.opacity  = commentTxt.value ? "1" : "0.5";
    });

    //EVENT 2:When User starts entering comment change the Comment button visibiliy(backgroundcolor,opacity)
    commentTxt.addEventListener('input', () => {
        submitBtn.style.backgroundColor  = commentTxt.value ? "rgb(80, 210, 37)":"";
        submitBtn.style.opacity  = commentTxt.value ? "1" : "0.5";
    });

    //EVENT 3:When User Click on comment button new comment should be added (without entering anything empty comment should not post)
    //Then remove the entered input from the text area and bring back the comment button to origin state.
    submitBtn.addEventListener('click',()=>{
        comment = commentTxt.value;

        if(comment){

            addComment(comment);

            commentTxt.value="";
            submitBtn.style.backgroundColor  = commentTxt.value ? "rgb(80, 210, 37)":"";
            submitBtn.style.opacity  = commentTxt.value ? "1" : "0.5";    
        }
    });


    //EVENT 4:Show/Hide the replay area based on reply button
    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
    
        if (currElement.classList.contains('replyBtn')) {
            const parentEle = currElement.parentElement;
            const replyInput = parentEle.querySelector('.replyContainer');
    
            if (replyInput.style.display === 'none' || !replyInput.style.display) {
                replyInput.style.display = 'flex'; 
            } else {
                replyInput.style.display = 'none'; 
            }
        }
    });
    
    //EVENT 5:When user clicks on reply buton comments should be added
    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
    
        if (currElement.id === 'replysubmitComment') {

            const parentEle = currElement.parentElement.parentElement;
            const replyInput = parentEle.querySelector('.replyInput');

            if(replyInput.value){
                replyComments(parentEle,replyInput.value);
                replyInput.value="";
            }
        }
    });
    
    //EVENT 6:When user clicks on delete button particular comment should be removed
    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;
        
        if(currElement.classList.contains('deleteComment')){
            const parentEle = currElement.parentElement;

            removeComment(parentEle);
        }
    });

    //EVENT 7:When click Show/Hide replies button replied comments should be shown /hidden
    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
    
        if (currElement.classList.contains('toggleRepliesBtn')) {
            const parentEle = currElement.parentElement; 
            showReplies(parentEle); 
        }
    });
    
    //EVENT 8:When user clicks on more option button delete button should disply
    commentContainer.addEventListener('click',(e)=>{
        const currElement = e.target;

        if(currElement.classList.contains('dots')){
            const parentEle = currElement.parentElement;
            const deletButton = parentEle.querySelector(".deleteComment");

            if(deletButton.style.display==='none' || !deletButton.style.display){
                deletButton.style.display='inline-block';
            }else{
                deletButton.style.display='none';
            }
        }
    });

//#endregion

    //#region FUNCTIONS
    function addComment(comment){
        const commentElement=document.createElement('div');
        commentElement.classList.add('repliesContainer');

        commentElement.innerHTML = `        
                                    <div class="repliedcomments">
                                      <div class="userDetail">
                                        <img src="https://assets.leetcode.com/users/Pramod_18/avatar_1726803350.png" alt="">
                                        <a>user_${Math.floor(1000 + Math.random() * 9000)}</a>
                                      </div>
                                        <p>${comment}</p>                                                                               
                                    </div>
                                    <button class="toggleRepliesBtn">Hide Comments</button>
                                    <button class="replyBtn">Reply</button>
                                    <button class="dots" id="moreOptions">...</button>
                                    <button class="deleteComment">Delete</button>           

                                    <div class="replyContainer">
                                        <img src="https://assets.leetcode.com/users/Pramod_18/avatar_1726803350.png" alt="">
                                        <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                                        <button id="replysubmitComment">Comment</button>
                                    </div>
                                 `;

        commentContainer.appendChild(commentElement);
    }

    function replyComments(parentElement,comment){
        const commentElement=document.createElement('div');
        commentElement.classList.add('repliesContainer');

        commentElement.innerHTML = `        
                                    <div class="repliedcomments">
                                      <div class="userDetail">
                                        <img src="https://assets.leetcode.com/users/Satansoft/avatar_1711147331.png" alt="">
                                        <a>user_${Math.floor(1000 + Math.random() * 9000)}</a>
                                      </div>
                                        <p>${comment}</p>
                                    </div>
                                
                                    
                                    <button class="toggleRepliesBtn">Hide Comments</button> 
                                    <button class="replyBtn">Reply</button>
                                    <button class="dots" id="moreOptions">...</button>
                                    <button class="deleteComment">Delete</button>          
                                    <div class="replyContainer">
                                        <img src="https://assets.leetcode.com/users/Pramod_18/avatar_1726803350.png" alt="">
                                        <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                                        <button id="replysubmitComment">Comment</button>
                                    </div>
                                 `;
        parentElement.appendChild(commentElement);
    }

    function showReplies(parentEle) {
        const nestedContainers = parentEle.querySelectorAll('.repliesContainer');
        const toggleBtn = parentEle.querySelector('.toggleRepliesBtn'); 
      
        if(nestedContainers.length===0){
            alert("No Replies to Hide!!!!!")
        }

        const anyVisible = Array.from(nestedContainers)
                                .some(nestedContainer => 
                                    nestedContainer.style.display === 'block' || !nestedContainer.style.display 
                                );
    
        nestedContainers.forEach(nestedContainer => {
            if (anyVisible) {
                nestedContainer.style.display = 'none'; 
            } else {
                nestedContainer.style.display = 'block'; 
            }
        });
    
        toggleBtn.textContent = anyVisible ? 'Show Comments' : 'Hide Comments';
    }      

    function removeComment(comment){
        comment.remove();
    }    
    //#endregion
})