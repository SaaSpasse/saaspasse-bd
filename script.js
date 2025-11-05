// Comic book navigation with swipe support
class ComicNavigator {
    constructor() {
        this.currentPage = 0;
        this.pages = document.querySelectorAll('.page');
        this.totalPages = this.pages.length;
        this.prevBtn = document.querySelector('.nav-btn.prev');
        this.nextBtn = document.querySelector('.nav-btn.next');
        this.currentPageSpan = document.querySelector('.current-page');
        this.totalPagesSpan = document.querySelector('.total-pages');
        this.viewer = document.querySelector('.comic-viewer');

        // Touch/swipe handling
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.minSwipeDistance = 50;

        this.init();
    }

    init() {
        // Update total pages display
        this.totalPagesSpan.textContent = this.totalPages;

        // Button click handlers
        this.prevBtn.addEventListener('click', () => this.prevPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());

        // Touch handlers for swipe
        this.viewer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.viewer.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Initial state
        this.updateNavigation();
    }

    showPage(index) {
        // Remove active class from all pages
        this.pages.forEach(page => page.classList.remove('active'));

        // Add active class to current page
        this.pages[index].classList.add('active');

        // Update current page number
        this.currentPageSpan.textContent = index + 1;

        // Update navigation buttons
        this.updateNavigation();
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.showPage(this.currentPage);
        }
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.showPage(this.currentPage);
        }
    }

    updateNavigation() {
        // Disable prev button on first page
        this.prevBtn.disabled = this.currentPage === 0;

        // Disable next button on last page
        this.nextBtn.disabled = this.currentPage === this.totalPages - 1;
    }

    handleTouchStart(e) {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd(e) {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;

        // Swipe left (next page)
        if (swipeDistance < -this.minSwipeDistance) {
            this.nextPage();
        }

        // Swipe right (previous page)
        if (swipeDistance > this.minSwipeDistance) {
            this.prevPage();
        }
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowLeft':
                this.prevPage();
                break;
            case 'ArrowRight':
                this.nextPage();
                break;
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ComicNavigator();
});
