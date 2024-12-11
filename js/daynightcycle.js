<script>
    document.addEventListener("DOMContentLoaded", () => {
        const video = document.querySelector("video");

        // Restart the video on page load
        if (video) {
            video.currentTime = 0;
            video.play();
        }

        // Ensure video restarts when navigating back
        window.addEventListener("pageshow", () => {
            if (video) {
                video.currentTime = 0;
                video.play();
            }
        });
    });
</script>
