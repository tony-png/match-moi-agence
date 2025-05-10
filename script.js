document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll('.view');
    const buttons = document.querySelectorAll('button[data-goto]');
    let currentView = document.querySelector('.view.active');

    // Determine the order of views for forward/backward navigation sense
    const viewOrder = Array.from(views).map(v => v.id);

    function showView(targetViewId, isGoingBack = false) {
        const nextView = document.getElementById(targetViewId);

        if (!nextView || nextView === currentView) return;

        // Determine current and next view indices for direction
        const currentIndex = viewOrder.indexOf(currentView.id);
        const nextIndex = viewOrder.indexOf(targetViewId);

        // Override isGoingBack if we can infer from view order and it's not explicitly set by a 'back' button.
        // This helps if direct navigation (not via a specifically marked 'back' button) occurs.
        if (currentIndex !== -1 && nextIndex !== -1 && !isGoingBack && currentIndex !== nextIndex) {
            isGoingBack = nextIndex < currentIndex;
        }

        // Current view transitions out
        if (currentView) {
            currentView.classList.remove('active');
            if (isGoingBack) {
                currentView.classList.add('exiting-right');
            } else {
                currentView.classList.add('exiting-left');
            }
            // Add 'hidden' after transition
            setTimeout(() => {
                currentView.classList.remove('exiting-left', 'exiting-right');
                currentView.classList.add('hidden'); 
            }, 500); // Match CSS transition duration
        }

        // Next view transitions in
        nextView.classList.remove('hidden'); // Make it part of the layout before transition
        nextView.classList.remove('exiting-left', 'exiting-right'); // Clean up any lingering exit states
        
        if (isGoingBack) {
            nextView.classList.add('entering-from-left');
        } else {
            nextView.classList.add('entering-from-right');
        }
        
        // Force a reflow before adding 'active' to ensure transition plays
        void nextView.offsetHeight;

        nextView.classList.add('active');
        
        // Clean up entering classes after transition starts
        setTimeout(() => {
            nextView.classList.remove('entering-from-left', 'entering-from-right');
            currentView = nextView; // Update currentView after transition is likely complete
        }, 500); // Match CSS transition duration (or slightly less to remove class as anim starts)
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetViewId = button.getAttribute('data-goto');
            if (targetViewId) {
                // A simple way to check if it's a 'back' button is by its text or a data-attribute.
                // For this example, I'll assume any button that takes you to a previous view in `viewOrder`
                // or has specific text might be a 'back' action. 
                // A more robust way is to add a specific data-attribute like `data-direction="back"`.
                // For now, we'll try to infer from view order or if button text includes "Retour"
                const currentId = currentView ? currentView.id : null;
                const currentIndex = currentId ? viewOrder.indexOf(currentId) : -1;
                const targetIndex = viewOrder.indexOf(targetViewId);
                let isBackNavigation = (targetIndex < currentIndex && currentIndex !== -1 && targetIndex !== -1) || button.textContent.includes('Retour');
                
                showView(targetViewId, isBackNavigation);
            }
        });
    });

    // Initialize the first view (which should not be hidden by default in HTML)
    if (currentView) {
        currentView.classList.remove('hidden'); // Ensure first active view is not hidden
        currentView.classList.remove('entering-from-left', 'entering-from-right', 'exiting-left', 'exiting-right');
        // Ensure it's correctly positioned if it wasn't the default active or if classes were misapplied
        currentView.style.transform = 'translateX(0)';
        currentView.style.opacity = '1';
    } else if (views.length > 0) { // Fallback if no view has .active initially
        currentView = views[0];
        currentView.classList.remove('hidden');
        currentView.classList.add('active');
        currentView.style.transform = 'translateX(0)';
        currentView.style.opacity = '1';
    }
}); 