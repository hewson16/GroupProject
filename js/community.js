document.addEventListener('DOMContentLoaded', () => {
    const commentList = document.getElementById('comment-list');
    const commentInput = document.getElementById('comment-input');
    const imageInput = document.getElementById('image-input');
    const submitComment = document.getElementById('submit-comment');

    // Handle adding a new comment
    submitComment.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        const imageFile = imageInput.files[0];

        if (commentText || imageFile) {
            const comment = document.createElement('div');
            comment.className = 'comment';

            // Add text if available
            if (commentText) {
                const commentTextNode = document.createElement('div');
                commentTextNode.className = 'comment-text';
                commentTextNode.textContent = commentText;
                comment.appendChild(commentTextNode);
            }

            // Add image if available
            if (imageFile) {
                const commentImage = document.createElement('img');
                commentImage.src = URL.createObjectURL(imageFile);
                comment.appendChild(commentImage);

                // Revoke object URL after it's used to free memory
                commentImage.onload = () => URL.revokeObjectURL(commentImage.src);
            }

            // Add comment actions (e.g., Reply)
            const actions = document.createElement('div');
            actions.className = 'comment-actions';
            const replyButton = document.createElement('button');
            replyButton.textContent = 'Reply';
            replyButton.className = 'reply-button';
            actions.appendChild(replyButton);
            comment.appendChild(actions);

            commentList.appendChild(comment);

            // Clear inputs
            commentInput.value = '';
            imageInput.value = '';

            // Add reply functionality
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



