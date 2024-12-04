console.log('community');

document.addEventListener('DOMContentLoaded', () => {
    const commentList = document.getElementById('comment-list');
    const commentInput = document.getElementById('comment-input');
    const submitComment = document.getElementById('submit-comment');

    // Handle adding a new comment
    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const comment = document.createElement('div');
            comment.className = 'comment';
            comment.innerHTML = `
                <div class="comment-text">${commentText}</div>
                <div class="comment-actions">
                    <button class="reply-button">Reply</button>
                </div>
            `;
            commentList.appendChild(comment);
            commentInput.value = '';

            const replyButton = comment.querySelector('.reply-button');
            replyButton.addEventListener('click', () => {
                const replyInput = document.createElement('textarea');
                replyInput.placeholder = 'Write a reply...';
                replyInput.rows = 2;

                const replySubmit = document.createElement('button');
                replySubmit.textContent = 'Post Reply';
                replySubmit.className = 'reply-submit';

                const replyContainer = document.createElement('div');
                replyContainer.className = 'reply-container';
                replyContainer.appendChild(replyInput);
                replyContainer.appendChild(replySubmit);
                comment.appendChild(replyContainer);

                replySubmit.addEventListener('click', () => {
                    const replyText = replyInput.value.trim();
                    if (replyText) {
                        const reply = document.createElement('div');
                        reply.className = 'comment reply';
                        reply.innerHTML = `<div class="comment-text">${replyText}</div>`;
                        comment.appendChild(reply);
                        replyContainer.remove();
                    }
                });
            });
        }
    });
});

