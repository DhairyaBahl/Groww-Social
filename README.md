# Groww-Social Web Application

Groww-Social is a web application designed to provide a social media experience with a focus on sharing photos. It allows users to view an infinite scrollable news feed of random photos, like and view details of each post, and explore user profiles with their uploaded images. The application is responsive for mobile devices and provides additional features such as like-on-double-click and dark/light mode. It also implements various optimizations such as lazy loading, Blurhash for image optimization, caching API responses, and converting the app to a Progressive Web App (PWA) for offline usage and easy installation.

## Features
### News Feed Section
Fetching Mechanism: The News Feed section fetches 10 random photos at a time, ensuring fresh content with each scroll.

Infinite Scroll: Users can continuously scroll down the News Feed section to load more photos dynamically.

isLiked Feature: Users can like posts, and the "isLiked" feature indicates whether the user has liked a particular post or not.

Show Total Likes: The total number of likes on each post is displayed to users.

Responsive for Mobile: The web application is designed to be responsive and accessible on various mobile devices.

Like on Double Click: Users can double-click on a post to like it, providing a convenient way to interact with content.

### Profile Section
Redirection: When a user opens a profile page from the News Feed, they are redirected to the respective user's profile page.

Fetching User Details: User details, such as username, profile picture, and bio, are fetched and displayed on the profile page.

Fetching Uploaded Images: The application fetches and displays all the images uploaded by the user in the form of a grid.

Image Click Event: When a user clicks on any image in the grid, the whole post is displayed on a new page.

Display Post Details: The new page shows the post's description, comments, and likes along with the image.

### Brownie Points
Lazy Loading: All images outside the viewport are lazily loaded, improving page loading performance.

Blurhash for Optimization: The Blurhash technique is used to optimize image loading and enhance user experience.

Dark/Light Mode: The application offers a toggle for dark/light mode, providing a personalized viewing experience.

Cache API Response: API responses are cached in local storage for one hour, reducing server requests and serving fresh data.

Cache TTL: A minimum cache time-to-live (TTL) is implemented to avoid serving stale data to users.

### Additional
Graceful Error Handling: The application handles various HTTP status codes, such as 403, 404, and 500, gracefully to ensure a smooth user experience.

Progressive Web App (PWA): The web application is converted into a PWA, allowing users to install the app on their devices.

### Technologies Used
Frontend: JavaScript (TypeScript) and NextTS
API: Unsplash API
Styling: CSS Modules

## Usage
After running the development server and accessing the application in your browser, you can:

Explore the News Feed: Scroll through the news feed to view random photos, like posts, and see the total number of likes on each post.

View User Profiles: Click on a username in the news feed to be redirected to the respective user's profile page. On the profile page, you can view user details, uploaded images in a grid, and click on any image to see the whole post with its description, comments, and likes.

Like-on-Double-Click: On the news feed, you can double-click on a post to like it instantly.

Dark/Light Mode: Toggle between dark and light mode using the theme switcher to change the appearance of the application.

Progressive Web App: If you are using a modern browser that supports PWAs, you can install the web application on your device.