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
        if (currentIndex !== -1 && nextIndex !== -1 && !isGoingBack) {
            isGoingBack = nextIndex < currentIndex;
        }

        // Make all views non-interactive initially for the transition
        views.forEach(v => v.style.pointerEvents = 'none');

        if (currentView) {
            currentView.classList.remove('active');
            // Add exiting class based on direction
            if (isGoingBack) {
                currentView.classList.add('exiting-right');
            } else {
                currentView.classList.add('exiting-left');
            }
        }

        // Prepare the next view for entry
        nextView.classList.remove('exiting-left', 'exiting-right'); // Clean up any lingering exit states
        if (isGoingBack) {
            nextView.classList.add('entering-from-left');
        } else {
            nextView.classList.add('entering-from-right');
        }
        // Force a reflow before adding 'active' to ensure transition plays
        // Reading a property like offsetHeight is a common way to trigger reflow.
        void nextView.offsetHeight;

        nextView.classList.add('active');
        // Remove entry classes after transition starts to allow CSS to take over translateX(0)
        // The timeout should roughly match the transition duration or be slightly less.
        setTimeout(() => {
            nextView.classList.remove('entering-from-left', 'entering-from-right');
            // Re-enable pointer events for the new active view
            nextView.style.pointerEvents = 'auto';

            // Clean up exiting classes from the old view after transition
            if (currentView) {
                currentView.classList.remove('exiting-left', 'exiting-right');
            }
            currentView = nextView;
        }, 500); // Corresponds to transition duration in style.css
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
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

    // Initialize the first view
    if (currentView) {
        currentView.classList.remove('entering-from-left', 'entering-from-right', 'exiting-left', 'exiting-right');
        currentView.style.pointerEvents = 'auto'; // Ensure initial view is interactive
    } else if (views.length > 0) {
        currentView = views[0];
        currentView.classList.add('active');
        currentView.style.pointerEvents = 'auto';
        // Ensure it's correctly positioned if it wasn't the default active
        currentView.style.transform = 'translateX(0)';
        currentView.style.opacity = '1';
    }
}); 