window.addEventListener('DOMContentLoaded', () => {
    likeTweet()
})

function likeTweet() {
    console.log('toto')
    const allHearts = document.querySelectorAll('.fa-heart');
    const tweetsContainer = document.querySelector('.tweets-list-container');


    allHearts.forEach(element => {
        element.addEventListener('click', (event) => {
            const tweetId = event.target.getAttribute('tweetid');
            axios.get(`/tweet/like/${tweetId}`)
                .then(response => {
                    console.log(response.data)
                    tweetsContainer.innerHTML = ''
                    tweetsContainer.innerHTML = response.data
                    likeTweet()
                 })
        })
    })
}