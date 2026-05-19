// Blog Listing & Viewing Logic

let activeCategory = 'all';
let searchQuery = '';

// Helper function to render blog cards to the grid
function renderBlogGrid(postsToRender) {
  const grid = document.getElementById('blog-posts-grid');
  if (!grid) return;

  grid.innerHTML = '';

  if (postsToRender.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <i data-lucide="search-code" style="width: 48px; height: 48px; margin-bottom: 1rem; color: var(--text-muted);"></i>
        <h3>No matching posts found</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your keywords or category filters.</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  postsToRender.forEach(post => {
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
    grid.appendChild(card);
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Function to filter and search posts
function filterAndSearchPosts() {
  if (typeof BLOG_POSTS === 'undefined') return;

  const filtered = BLOG_POSTS.filter(post => {
    // Category match
    const categoryMatch = activeCategory === 'all' || post.category.toLowerCase() === activeCategory.toLowerCase();
    
    // Search match (title, summary, tags)
    const query = searchQuery.toLowerCase().trim();
    const searchMatch = !query || 
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query));
      
    return categoryMatch && searchMatch;
  });

  renderBlogGrid(filtered);
}

// Initialise Blog Listing Page
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('blog-posts-grid');
  if (!grid) return; // Not on blog listing page

  // Initial render
  if (typeof BLOG_POSTS !== 'undefined') {
    renderBlogGrid(BLOG_POSTS);
  }

  // Setup Category Pills
  const pills = document.querySelectorAll('.category-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category');
      filterAndSearchPosts();
    });
  });

  // Setup Search Input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      filterAndSearchPosts();
    });
  }
});

// Load Single Blog Post details (called from post.html script block)
function loadSinglePost(postId) {
  if (typeof BLOG_POSTS === 'undefined') return;

  const post = BLOG_POSTS.find(p => p.id === postId);
  
  const headerContainer = document.getElementById('post-header-container');
  const coverContainer = document.getElementById('post-cover-container');
  const contentContainer = document.getElementById('post-content-container');

  if (!post) {
    // Renders error state if post does not exist
    document.title = "Post Not Found | Sergii Prykhodko";
    if (headerContainer) {
      headerContainer.innerHTML = `
        <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem;">Article Not Found</h1>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">The blog article you are looking for might have been moved or deleted.</p>
        <a href="blog.html" class="btn btn-primary"><i data-lucide="arrow-left"></i> Return to Blog</a>
      `;
    }
    if (coverContainer) coverContainer.style.display = 'none';
    if (contentContainer) contentContainer.style.display = 'none';
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  // Set page titles and meta headers
  document.title = `${post.title} | Sergii Prykhodko`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', post.summary);
  }

  // Render header info
  if (headerContainer) {
    headerContainer.innerHTML = `
      <span class="blog-card-category" style="position: static; display: inline-block; margin-bottom: 1.5rem;">${post.category}</span>
      <h1 class="post-title">${post.title}</h1>
      
      <div class="post-meta">
        <div class="post-meta-item">
          <i data-lucide="calendar" style="width: 16px; height: 16px;"></i> ${post.date}
        </div>
        <div class="post-meta-item">
          <i data-lucide="clock" style="width: 16px; height: 16px;"></i> ${post.readTime}
        </div>
        <div class="post-meta-item">
          <i data-lucide="tag" style="width: 16px; height: 16px;"></i> 
          ${post.tags.map(tag => `<span style="margin-right: 0.5rem; color: var(--accent-blue); font-weight: 500;">#${tag}</span>`).join('')}
        </div>
      </div>
      
      <div class="post-author-block">
        <img src="${post.author.avatar}" alt="${post.author.name}" class="post-author-avatar">
        <div>
          <div class="post-author-name">${post.author.name}</div>
          <div class="post-author-title">${post.author.title}</div>
        </div>
      </div>
    `;
  }

  // Render cover image
  if (coverContainer) {
    coverContainer.innerHTML = `
      <img src="${post.coverImage}" alt="${post.title}" class="post-cover-image">
    `;
  }

  // Render body content
  if (contentContainer) {
    contentContainer.innerHTML = post.content;
  }

  // Reload icons
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Run Prism code highlight if loaded
  if (typeof Prism !== 'undefined') {
    Prism.highlightAll();
  }
}
