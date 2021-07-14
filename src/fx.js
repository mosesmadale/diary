window.onscroll = () => {
    const navBar = document.querySelector('.title');
    if (window.visualViewport.pageTop >= 30) {

        navBar.style.position = 'fixed';
        navBar.style.width = '100%';
        navBar.style.padding = '1em 2em';
        navBar.style.top = '0';
        navBar.style.left = '0';
        navBar.style.backgroundColor = 'white';
        navBar.style.zIndex = '99 !important';
        navBar.style.boxShadow = '0 3px 17px 1px rgba(204, 204, 204, 0.301)';
    } else if (window.visualViewport.pageTop <= 30) {
        navBar.style.position = 'unset';
        navBar.style.padding = '1em 0';
        navBar.style.backgroundColor = 'transparent';
        navBar.style.boxShadow = 'none';
    }
}