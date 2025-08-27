document.addEventListener('DOMContentLoaded', function() {
    // Animate books sliding in
    const books = document.querySelectorAll('.book');
    books.forEach((book, i) => {
        book.style.opacity = 0;
        book.style.transform = 'translateY(40px)';
        setTimeout(() => {
            book.style.transition = 'opacity 0.6s cubic-bezier(.77,0,.18,1), transform 0.6s cubic-bezier(.77,0,.18,1)';
            book.style.opacity = 1;
            book.style.transform = 'translateY(0)';
        }, 150 + i * 120);
    });

    // Modal popup for book details
    books.forEach(book => {
        book.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'book-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-btn">&times;</span>
                    <h3>${book.textContent}</h3>
                    <p>More details coming soon!</p>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            modal.querySelector('.close-btn').onclick = function() {
                modal.remove();
                document.body.style.overflow = '';
            };
        });
    });
});
