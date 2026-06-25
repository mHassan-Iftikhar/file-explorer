const detailsPane = document.querySelector('.action-bar-right');
const explorerBody = document.querySelector('#explorer-body');
const detailsRightPane = document.querySelector('.details.right-pane');

detailsPane.addEventListener('click', (e) => {
    explorerBody.appendChild(detailsRightPane);
});