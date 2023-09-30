const addNoteBtn = document.querySelector('.circle');
const allnotesDiv = document.querySelector('.allNotes');
const dataUpdateLocalStorage = () => {
    const textAreaData = document.querySelectorAll('.editText');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}
const addNote = (text = '') => {

    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `<div class="noteBtn">
                        <i class="fa-solid fa-pen-to-square" id="noteEdit"></i>
                        <i class="fa-solid fa-trash-can" id="noteDelete"></i>
                    </div>
                        <div class="main ${text ? '' : 'hidden'}">
                            <textarea class="main-text"" disabled></textarea>
                        </div>
                        <textarea class="editText ${text ? 'hidden' : ''}" ></textarea>`;
    note.insertAdjacentHTML('afterbegin', htmlData);


    //getting references
    const editButton = note.querySelector('#noteEdit');
    const deleteButton = note.querySelector('#noteDelete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('.editText');
    const mainText = note.querySelector('.main-text');
    //delete note
    deleteButton.addEventListener('click', (e) => {
        note.remove();
        dataUpdateLocalStorage();
    });

    textArea.value = text;
    mainText.value = text;

    //toggle using edit button
    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');

    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainText.value = value;
        dataUpdateLocalStorage();
    });


    allnotesDiv.appendChild(note);
    document.body.appendChild(allnotesDiv);



}
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) { notes.forEach((note) => addNote(note)) }
addNoteBtn.addEventListener('click', () => addNote());