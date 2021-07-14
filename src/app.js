const lfetch = new XMLHttpRequest();

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const superScript = ['st', 'nd', 'rd'];
let sup = {
    value: null
}
lfetch.onreadystatechange = () => {
    if (lfetch.readyState === 4 && lfetch.status === 200) {
        let entries = JSON.parse(lfetch.responseText);
        let canvas = document.querySelector('.entries');
        canvas.innerHTML = '';
        if (entries.length === 0) {
            canvas.innerHTML = 'No entries yet!'
        }
        document.querySelector('.entry-count span').textContent = entries.length;
        entries.forEach(element => {

            let split = element.description.split('○Ç');
            let joined = split.join('<br>')
            let splitDate = element.date.split('§');
            splitDate[1] = `<sup>${splitDate[1]}</sup>`;
            let joinedDate = splitDate.join('');
            canvas.innerHTML += `<div class="entry">
                <div class="decl"><span>Dear Diary...</span><img src="./assets/img/close_black_24dp.svg" class="delete-entry" alt="delete-entry" data-type="${element['ID']}"></div>
                <div class="entry-title">${element.title}</div>
                <div class="content">${joined}</div>
                <div class="date">${joinedDate}</div>
                </div > `
        });
        document.querySelectorAll('.delete-entry').forEach(element => {
            element.onclick = () => {
                const xhr2 = new XMLHttpRequest();
                xhr2.open('GET', `http://localhost:8080?delete=${element.getAttribute('data-type')}`);
                xhr2.send();
                window.location.reload()
            }

        })
        document.querySelector('#clear').onclick = () => {
            canvas.innerHTML = '';
            document.querySelector('#search').value = '';
            entries.forEach((element, i) => {

                let split = element.description.split('○Ç');
                let joined = split.join('<br>')
                let splitDate = element.date.split('§');
                splitDate[1] = `<sup>${splitDate[1]}</sup>`;
                let joinedDate = splitDate.join('');
                canvas.innerHTML += `<div class="entry">
                    <div class="decl"><span>Dear Diary...</span><img src="./assets/img/close_black_24dp.svg" class="delete-entry" alt="delete-entry" data-type="${element['ID']}"></div>
                    <div class="entry-title">${element.title}</div>
                    <div class="content">${joined}</div>
                    <div class="date">${joinedDate}</div>
                    </div > `
            });
            document.querySelectorAll('.delete-entry').forEach(element => {
                element.onclick = () => {
                    const xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', `http://localhost:8080?delete=${element.getAttribute('data-type')}`);
                    xhr2.send();
                    window.location.reload()
                }

            })
        }
        document.querySelector('#search').oninput = () => {
            let txt = document.querySelector('#search').value.toLowerCase();

            let filtered = entries.filter(e => {
                let titleStore = e.title.toLowerCase();
                let descriptionStore = e.description.toLowerCase();
                let dateStore = e.date.toLowerCase();
                return titleStore.includes(txt) || descriptionStore.includes(txt) || dateStore.includes(txt)
            })
            canvas.innerHTML = '';
            if (entries.length === 0) {
                canvas.innerHTML = 'No entries yet!'
            }
            filtered.forEach((element, i) => {

                let split = element.description.split('○Ç');
                let joined = split.join('<br>')
                let splitDate = element.date.split('§');
                splitDate[1] = `<sup>${splitDate[1]}</sup>`;
                let joinedDate = splitDate.join('');
                canvas.innerHTML += `<div class="entry">
                        <div class="decl"><span>Dear Diary...</span><img src="./assets/img/close_black_24dp.svg" class="delete-entry" alt="delete-entry" data-type="${element['ID']}"></div>
                        <div class="entry-title">${element.title}</div>
                        <div class="content">${joined}</div>
                        <div class="date">${joinedDate}</div>
                        </div > `
            });
            document.querySelectorAll('.delete-entry').forEach(element => {
                element.onclick = () => {
                    console.log(element)
                    const xhr3 = new XMLHttpRequest();
                    xhr3.open('GET', `http://localhost:8080?delete=${element.getAttribute('data-type')}`);
                    xhr3.send();
                    window.location.reload()
                }

            })
        }
    }
}

lfetch.open('GET', `http://localhost:8080`);
lfetch.send();


document.querySelector('#create-entry').onclick = () => {
    document.querySelector('.popup').style.display = 'flex';

}


const closePopup = () => {
    setTimeout(() => {
        document.querySelector('.popup').style.display = 'none';
    }, 0)
}

const submitRequest = () => {
    const d = new Date();
    let title = document.querySelector('#entry-title').value;
    if (title === '') {
        title = 'Untitled';
    }
    try {
        sup.value = superScript[d.getDate()]
    } catch (err) {
        sup.value = 'th'
    }
    let dateString = `${d.getDate()}§${sup.value === undefined ? 'th' : null}§ ${months[d.getMonth()]} ${d.getFullYear()}, ${d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`
    const description = document.querySelector('textarea').value;
    let des = description.split('\n')
    let joined = des.join('○Ç');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:8080?title=${title}&description=${joined}&date=${dateString}`);
    xhr.send();
    window.location.reload()
}



document.querySelector('#search').onfocus = () => {
    document.querySelector('#search').classList.add('red-left')
    document.querySelector('.search-bar img').classList.add('red-right')
}

document.querySelector('#search').onblur = () => {
    document.querySelector('#search').classList.remove('red-left')
    document.querySelector('.search-bar img').classList.remove('red-right')
}