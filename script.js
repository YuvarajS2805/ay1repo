var images = [
    'https://raw.githubusercontent.com/YuvarajS2805/ay1repo/master/ay1/anu11.jpg',
  ];
  
  var currentIndex = 0;
  
  // Function to randomize puzzle image and pieces
  function randomizeImage() {
    let root = document.documentElement;
    root.style.setProperty('--image', `url(${images[currentIndex]})`);
    
    const puzzleItems = document.querySelectorAll('#puzz i');
    puzzleItems.forEach(item => {
      item.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
      item.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
    });
  }
  
  // Reload the puzzle
  function reloadPuzzle() {
    document.querySelectorAll('.done, .dropped').forEach(item => {
      item.classList.remove('done', 'dropped');
    });
    const puzzleContainer = document.querySelector('#puz');
    puzzleContainer.classList.remove('allDone');
    puzzleContainer.style = '';
    
    // Load the next image
    currentIndex = (currentIndex + 1) % images.length;
    randomizeImage();
  }
  
  // Handle puzzle piece clicks (Mobile/Desktop)
  function handlePieceClick(element) {
    if (document.querySelector('.clicked')) {
      const clickedElement = document.querySelector('.clicked');
      if (clickedElement.className === element.className) {
        element.classList.add('dropped');
        clickedElement.classList.add('done');
        clickedElement.classList.remove('clicked');
  
        if (document.querySelectorAll('.dropped').length === 9) {
          showCompletionMessage();
        }
      }
    } else {
      element.classList.add('clicked');
    }
  }
  
  // Show completion message
  function showCompletionMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
      <p style="font-size: 24px; margin: 0; color: #fff;">✨ Congratulations! ✨</p>
      <h1 style="color: #ff69b4; font-size: 36px; margin: 10px 0;">You’ve unlocked my heart! ❤️</h1>
      <p style="font-size: 18px; color: #fff;">Life’s puzzle feels complete with you in it. 😊</p>
    `;
  
    // Remove grid lines or puzzle borders
    const puzzleContainer = document.querySelector('#puz');
    puzzleContainer.classList.add('allDone');
    puzzleContainer.style.background = `url(${images[currentIndex]}) no-repeat center/cover`; // Show the completed image
    puzzleContainer.style.border = 'none'; // Remove any borders
  
    // Styling the message container
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.padding = '30px';
    message.style.background = 'linear-gradient(145deg, rgba(255, 20, 147, 0.8), rgba(0, 0, 128, 0.8))';
    message.style.color = '#fff';
    message.style.borderRadius = '20px';
    message.style.textAlign = 'center';
    message.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.3)';
    message.style.animation = 'fadeIn 1s ease-in-out, pulse 1.5s infinite';
    message.style.zIndex = '1000';
    message.style.width = '80%'; // Adjust width for better centering on smaller screens
    message.style.maxWidth = '500px'; // Prevent it from being too wide
  
    // Adding a dreamy animation (pulse effect)
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translate(-50%, -55%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
      }
    `;
    document.head.appendChild(style);
  
    // Adding a close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#ff69b4';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '16px';
  
    closeButton.addEventListener('click', () => {
      document.body.removeChild(message);
      document.head.removeChild(style);
      reloadPuzzle(); // Restart the puzzle with the next image
    });
  
    message.appendChild(closeButton);
  
    // Append the message to the body
    document.body.appendChild(message);
  }
  
  // Drag-and-drop functionality
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.className);
  }
  
  function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
  
    if (ev.target.className === data) {
      ev.target.classList.add('dropped');
      document.querySelector(`.${data}[draggable="true"]`).classList.add('done');
  
      if (document.querySelectorAll('.dropped').length === 9) {
        showCompletionMessage();
      }
    }
  }
  
  // Event Listeners
  document.querySelectorAll('#puzz i').forEach(item => {
    item.addEventListener('click', () => handlePieceClick(item));
  });
  
  document.querySelectorAll('#puz i').forEach(item => {
    item.addEventListener('dragover', allowDrop);
    item.addEventListener('drop', drop);
  });
  
  // Initialize game
  randomizeImage();
  