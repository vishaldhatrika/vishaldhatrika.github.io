
const apiKey = 'AIzaSyB-15B1I83PDmCMIlI7cw-074T528fLO14';
const blogId = '1134659980298051767';
const maxCharacters = 350; 

fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts?key=${apiKey}`)
.then(response => response.json())
.then(data => {
      const postsContainer = document.getElementById('posts-container');
      let i=0;
      data.items.forEach(post => {
            i++;
            if(i>2){
                  return;
            }
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.classList.add('blog-post-item');
      
      postElement.innerHTML = `
            <h6 style="font-weight:700;">${post.title}</h6>
            <p> 
                  ${truncateString(stripHtmlTags(post.content), maxCharacters)}
                  <a href="${post.url}" target="_blank" class="btn btn-sm btn-carousel blogContinueBtn" rel="noopener noreferrer">Continue reading..</a>
                  </p>
            
      `;
      postsContainer.appendChild(postElement);
      });
      })
.catch(error => console.error('Error fetching posts:', error));


function truncateString(str, maxLength) {
      if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
      } else {
      return str;
      }
}

// Function to strip HTML tags from a string
function stripHtmlTags(html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
}