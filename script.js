document.addEventListener('DOMContentLoaded', (e) => {
    const commentContainer = document.querySelector('#commentsContainer');
    const submitBtn = document.querySelector('#submitComment');
    const commentTxt = document.querySelector('#commentInput');
    let _commentDataArray = [];

    //#region Load comments and replies from localStorage on initial load
    if (localStorage.getItem("comments")) {
        _commentDataArray = JSON.parse(localStorage.getItem("comments"));
        _commentDataArray.forEach((comment) => {
            renderComment(comment.comment, comment.userId, comment.replies);         
        });
    }
    //#endregion
 
    //#region EVENT LISTENERS

    submitBtn.addEventListener('mouseover', () => {
        submitBtn.style.cursor = commentTxt.value ? "pointer" : "not-allowed";
        submitBtn.style.backgroundColor = commentTxt.value ? "rgb(80, 210, 37)" : "";
        submitBtn.style.opacity = commentTxt.value ? "1" : "0.5";
    });

    commentTxt.addEventListener('input', () => {
        submitBtn.style.backgroundColor = commentTxt.value ? "rgb(80, 210, 37)" : "";
        submitBtn.style.opacity = commentTxt.value ? "1" : "0.5";
    });

    submitBtn.addEventListener('click', () => {
        const comment = commentTxt.value;
        if (comment) {
            const userId = Math.floor(1000 + Math.random() * 9000);
            addNewComment(comment, userId);
            commentTxt.value = "";
            submitBtn.style.backgroundColor = "";
            submitBtn.style.opacity = "0.5";
        }
    });

    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
        if (currElement.classList.contains('replyBtn')) {
            const parentEle = currElement.parentElement;
            const replyInput = parentEle.querySelector('.replyContainer');
            replyInput.style.display = replyInput.style.display === 'none' ? 'flex' : 'none';
            currElement.scrollIntoView({ behavior: "smooth" });
        }
    });

    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
        if (currElement.id === 'replysubmitComment') {
            const parentEle = currElement.closest('.repliesContainer');
            const replyInput = parentEle.querySelector('.replyInput');
            if (replyInput.value) {
                const userId = Math.floor(1000 + Math.random() * 9000);
                addReply(parentEle, replyInput.value, userId);
                replyInput.value = "";
            }
        }
    });

    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
        if (currElement.classList.contains('deleteComment')) {
            const parentEle = currElement.closest('.repliesContainer');
            removeComment(parentEle);
        }
    });

    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
        if (currElement.classList.contains('toggleRepliesBtn')) {
            const parentEle = currElement.parentElement;
            toggleReplies(parentEle);
        }
    });

    commentContainer.addEventListener('click', (e) => {
        const currElement = e.target;
    
        if (currElement.classList.contains('toggleRepliesBtn')) {
            console.log("aaa",currElement);

            const parentEle = currElement.parentElement; 
            showReplies(parentEle); 
        }
    });

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

    function renderComment(comment, userId, replies = []) {
        const commentElement = createCommentElement(comment, userId);
        commentContainer.appendChild(commentElement);

        replies.forEach(reply => {
            renderReply(commentElement, reply.comment, reply.userId);
            toggleReplies(commentElement)
        });
    }

    function addNewComment(comment, userId) {
        const commentElement = createCommentElement(comment, userId);
        commentContainer.appendChild(commentElement);
        commentElement.scrollIntoView({ behavior: "smooth" });

        const commentObj = { userId, comment, replies: [] };
        _commentDataArray.push(commentObj);
        localStorage.setItem("comments", JSON.stringify(_commentDataArray));
    }

    function createCommentElement(comment, userId) {
        // Array of image URLs to choose from
        const images = [
            "https://assets.leetcode.com/users/Satansoft/avatar_1711147331.png",
            "https://assets.leetcode.com/users/Pramod_18/avatar_1726803350.png",
            "https://assets.leetcode.com/users/adityakumar8068/avatar_1721314186.png",
            "https://assets.leetcode.com/users/avatars/avatar_1690312990.png",
            "https://assets.leetcode.com/users/avatars/avatar_1682781164.png",
            "https://assets.leetcode.com/users/avatars/avatar_1641956272.png",
            "https://assets.leetcode.com/users/aankiitt/avatar_1728638856.png"
            // Add more image URLs here as needed
        ];
    
        // Retrieve the avatar from localStorage if it exists; otherwise, assign a new one
        let userAvatars = JSON.parse(localStorage.getItem("userAvatars")) || {};
    
        // Check if the userId has an avatar assigned in localStorage
        if (!userAvatars[userId]) {
            // Assign a random avatar if this userId doesn't have one yet
            const randomImage = images[Math.floor(Math.random() * images.length)];
            userAvatars[userId] = randomImage;
            localStorage.setItem("userAvatars", JSON.stringify(userAvatars));
        }
    
        // Use the stored avatar for the userId
        const avatar = userAvatars[userId];
    
        const commentElement = document.createElement('div');
        commentElement.classList.add('repliesContainer');
        commentElement.dataset.userId = userId;
        commentElement.innerHTML = `
            <div class="repliedcomments">
                <div class="userDetail">
                    <img src="${avatar}" alt="User Avatar">
                    <a>user_${userId}</a>
                </div>
                <p>${comment}</p>
            </div>
            <button class="toggleRepliesBtn">Hide Replies</button>
            <button class="replyBtn">Reply</button>
            <button class="dots" id="moreOptions">...</button>
            <button class="deleteComment">Delete</button>
           
            <div class="replyContainer" style="display: none;">
                <img src="${avatar}" alt="User Avatar">
                <textarea class="replyInput" placeholder="Write a reply..."></textarea>
                <button id="replysubmitComment">Comment</button>
            </div>
        `;

        return commentElement;
    }
    
    function renderReply(parentElement, comment, userId) {
        const replyElement = createCommentElement(comment, userId);
        parentElement.appendChild(replyElement);
    }

    function addReply(parentElement, comment, userId) {
        const replyElement = createCommentElement(comment, userId);
        parentElement.appendChild(replyElement);
        replyElement.scrollIntoView({ behavior: "smooth" });

        const parentUserId = parseInt(parentElement.dataset.userId, 10);
        const parentComment = _commentDataArray.find(comment => comment.userId === parentUserId);
        if (parentComment) {
            parentComment.replies.push({ comment, userId });
            localStorage.setItem("comments", JSON.stringify(_commentDataArray));
        }
    }

    function toggleReplies(parentEle) {
        const nestedContainers = parentEle.querySelectorAll('.repliesContainer');
        const toggleBtn = parentEle.querySelector('.toggleRepliesBtn');
        const anyVisible = Array.from(nestedContainers).some(
            nestedContainer => nestedContainer.style.display === 'block' || !nestedContainer.style.display
        );

        nestedContainers.forEach(nestedContainer => {
            nestedContainer.style.display = anyVisible ? 'none' : 'block';
        });

        toggleBtn.textContent = anyVisible ? 'Show Replies' : 'Hide Replies';
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
            if (!anyVisible) {
                nestedContainer.style.display = 'none'; 
            } else {
                nestedContainer.style.display = 'block'; 
            }
        });
    
        toggleBtn.textContent = anyVisible ? 'Hide Replies' : 'Show Replies';
    }

    function removeComment(commentElement) {
        const userId = parseInt(commentElement.dataset.userId, 10);
        _commentDataArray = _commentDataArray.filter(comment => comment.userId !== userId);
        localStorage.setItem("comments", JSON.stringify(_commentDataArray));
        commentElement.remove();
    }
    //#endregion
});