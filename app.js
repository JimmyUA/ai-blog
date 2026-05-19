// Global Application Logic

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      // Simple animate toggle button (hamburger to cross)
      navToggle.classList.toggle('active');
      const spans = navToggle.querySelectorAll('span');
      if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Header Scroll State
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Render Recent Blog Posts on Homepage
  const recentGrid = document.getElementById('recent-blog-grid');
  if (recentGrid && typeof BLOG_POSTS !== 'undefined') {
    // Clear shimmer loaders
    recentGrid.innerHTML = '';
    
    // Grab the first 3 posts
    const recentPosts = BLOG_POSTS.slice(0, 3);
    
    if (recentPosts.length === 0) {
      recentGrid.innerHTML = '<div class="no-results">No posts found. Check back later!</div>';
      return;
    }
    
    recentPosts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card blog-card';
      card.innerHTML = `
        <div class="blog-card-image-wrap">
          <img src="${post.coverImage}" alt="${post.title}" class="blog-card-image" loading="lazy">
          <span class="blog-card-category">${post.category}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span><i data-lucide="calendar" style="width: 14px; height: 14px;"></i> ${post.date}</span>
            <span><i data-lucide="clock" style="width: 14px; height: 14px;"></i> ${post.readTime}</span>
          </div>
          <h3 class="blog-card-title"><a href="post.html?id=${post.id}">${post.title}</a></h3>
          <p class="blog-card-summary">${post.summary}</p>
          <div class="blog-card-footer">
            <div class="blog-card-author">
              <img src="${post.author.avatar}" alt="${post.author.name}" class="blog-card-author-img">
              <span>${post.author.name}</span>
            </div>
            <a href="post.html?id=${post.id}" class="read-more-link">Read <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></a>
          </div>
        </div>
      `;
      recentGrid.appendChild(card);
    });

    // Reinitialize icons for newly added HTML elements
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
});
